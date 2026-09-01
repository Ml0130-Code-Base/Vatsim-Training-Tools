#!/usr/bin/env node
/* Headless smoke test for zmp-drill-deck.html.
   Covers the Sector Deck (data spine) and the Drill Builder + Training Notebook.
   Usage: node smoke-test.mjs [path-to-html]   (default: zmp-drill-deck.html)
   Exits nonzero on any exception or failed assertion. */
import fs from 'node:fs';

const path = process.argv[2] || 'zmp-drill-deck.html';
const html = fs.readFileSync(path, 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
/* every script in the page is an extension block, in dependency order:
   Sector Deck, then Drill Builder. Evaluate them the way the browser would. */
const blocks = scripts;
if (blocks.length !== 2) { console.error('FAIL: expected 2 extension blocks, found ' + blocks.length); process.exit(1); }

/* ---- minimal DOM stubs ---- */
const els = {};
const el = id => els[id] ||= {
  id, innerHTML: '', textContent: '', value: '', className: '',
  classList: { toggle(){}, add(){}, remove(){} },
  dataset: {}, style: {}, scrollIntoView(){}, focus(){},
  firstChild: null,
  appendChild(){}, insertBefore(){},
  getAttribute(){ return null; },
  addEventListener(){},
  querySelector(){ return null; },
  querySelectorAll(){ return []; }
};
const wrapStub = {
  querySelector: s => (s === 'footer' ? el('footer') : null),
  insertBefore(){}, appendChild(){}
};
globalThis.document = {
  readyState: 'complete',
  head: { appendChild(){} },
  body: wrapStub,
  title: '',
  createElement: () => ({
    textContent: '', innerHTML: '', className: '', id: '',
    firstChild: null, appendChild(){}, insertBefore(){},
    addEventListener(){}, getAttribute(){ return null; },
    querySelector(){ return null; }, querySelectorAll(){ return []; }
  }),
  getElementById: id => el(id),
  querySelector: s => (s === '.wrap' ? wrapStub : null),
  querySelectorAll: () => [],
  addEventListener: (_, fn) => fn()
};
globalThis.window = globalThis;
globalThis.localStorage = {
  _d: {},
  getItem(k){ return Object.prototype.hasOwnProperty.call(this._d, k) ? this._d[k] : null; },
  setItem(k, v){ this._d[k] = String(v); },
  removeItem(k){ delete this._d[k]; }
};

let checks = 0;
const ok = label => { checks++; console.log('ok  ', label); };
const fail = (label, detail) => { console.error('FAIL:', label, detail === undefined ? '' : '— ' + detail); process.exit(1); };
const assert = (label, cond, detail) => { if (!cond) fail(label, detail); ok(label); };

try {
  for (const js of blocks) eval(js);

  const ZD = globalThis.ZD;
  assert('sector deck exports window.ZD', !!ZD);
  assert('builder exports window.zdb', !!globalThis.zdb);

  /* ============ 1. The sector spine ============ */
  const all = ZD.allSectors();
  assert('33 sectors are present', all.length === 33, 'got ' + all.length);
  assert('no sector appears twice', new Set(all).size === 33);

  /* the six areas partition the 33 exactly — no sector in two areas, none orphaned */
  const fromAreas = [];
  for (let a = 1; a <= 6; a++) fromAreas.push(...ZD.AREAS[a]);
  assert('the six areas partition the 33 sectors', fromAreas.length === 33 && new Set(fromAreas).size === 33);
  assert('every sector has an area', all.every(n => ZD.zdArea(n) >= 1 && ZD.zdArea(n) <= 6));

  /* every frequency is a real VHF air-band frequency */
  const inBand = f => f >= 118 && f <= 137;
  assert('every SOP frequency is in the 118–137 band', all.every(n => inBand(ZD.SECTORS[n].freq)));
  assert('every conflicting vNAS frequency is also in band',
    all.filter(ZD.zdConflicted).every(n => inBand(ZD.SECTORS[n].freqVnas)));

  /* the four known conflicts are carried as conflicts, not silently resolved */
  const conflicts = all.filter(ZD.zdConflicted).sort();
  assert('exactly the four documented frequency conflicts are flagged',
    JSON.stringify(conflicts) === JSON.stringify(['13', '22', '24', '25']), JSON.stringify(conflicts));
  assert('22 and 25 are carried as an exact transposition',
    ZD.SECTORS['22'].freq === ZD.SECTORS['25'].freqVnas &&
    ZD.SECTORS['25'].freq === ZD.SECTORS['22'].freqVnas);

  /* stratum decoding follows the ERAM filter, it is never hand-assigned */
  assert('stratum decodes from the altitude filter',
    ZD.zdStratum('06') === 'low' && ZD.zdStratum('11') === 'high' && ZD.zdStratum('24') === 'full');
  assert('sector 17 FL-prefixed filter still decodes to high', ZD.zdStratum('17') === 'high');
  assert('sector 21 is the only sector with a hard floor',
    all.filter(n => /^0[1-9]\d/.test(ZD.SECTORS[n].filter) === false && ZD.SECTORS[n].filter === '068B242').length === 1);
  assert('no sector decodes to unknown', all.every(n => ZD.zdStratum(n) !== 'unknown'));

  /* callsigns follow the MSP_nn_CTR scheme */
  assert('callsigns follow MSP_nn_CTR', all.every(n => /^MSP_\d{2}_CTR$/.test(ZD.zdCallsign(n))));

  /* ============ 2. Facility relationships ============ */
  assert('vZMP combines at sector 11 on 133.4',
    ZD.COMBINE_POINT.sector === '11' && ZD.COMBINE_POINT.freq === 133.4);
  assert('the combine point is a real sector', !!ZD.SECTORS[ZD.COMBINE_POINT.sector]);

  /* every sector named in the adjacency map must actually exist */
  const bad = [];
  for (const fac in ZD.NEIGHBOURS) for (const n of ZD.NEIGHBOURS[fac]) if (!ZD.SECTORS[n]) bad.push(fac + ':' + n);
  assert('every sector in the adjacency map exists', bad.length === 0, bad.join(' '));

  assert('R90 is faced by sectors 26, 27, 37',
    JSON.stringify(ZD.NEIGHBOURS.R90) === JSON.stringify(['26', '27', '37']));
  assert('M98 is faced by the six Area 2 and Area 3 low sectors',
    JSON.stringify(ZD.NEIGHBOURS.M98) === JSON.stringify(['05', '06', '07', '08', '09', '10']));
  assert('zdNeighboursOf is the inverse of NEIGHBOURS',
    ZD.zdNeighboursOf('27').includes('R90') && ZD.zdNeighboursOf('27').includes('ZKC'));

  /* ============ 3. The graded procedures ============ */
  assert('ERAM filter buffers are 1200 / 2200',
    ZD.FILTER_BUFFER.sep1000 === 1200 && ZD.FILTER_BUFFER.sep2000 === 2200);
  assert('separation is 5 NM standard, 3 NM reduced', ZD.SEP.standard === 5 && ZD.SEP.reduced === 3);
  assert('four single-site radar sites are named', ZD.SEP.sites.length === 4);
  assert('only three single-site radii are claimed as stated', ZD.SEP.statedRadii.length === 3);
  assert('sector 01 carries the 54 NM APN radius',
    ZD.SEP.statedRadii.some(r => r.sector === '01' && r.nm === 54));

  assert('the interim-altitude waiver is seven ordered pairs', ZD.INTERIM_WAIVER.length === 7);
  assert('every waiver pair names two real sectors',
    ZD.INTERIM_WAIVER.every(p => ZD.SECTORS[p[0]] && ZD.SECTORS[p[1]]));
  assert('a waiver pair always runs low to high or into 11',
    ZD.INTERIM_WAIVER.every(p => ZD.zdStratum(p[0]) === 'low'));

  assert('Data Block Coordination carries the 5 and 3 minute conditions',
    ZD.DBC_RULES.minutesFromBoundaryWhenEntered === 5 && ZD.DBC_RULES.handoffInitiatedBeforeMinutes === 3);
  assert('Data Block Coordination is adjacent-ZMP-sectors only', ZD.DBC_RULES.adjacentZmpSectorsOnly === true);
  assert('AIT does not apply to point-outs', ZD.AIT_RULES.notForPointOuts === true);
  assert('AIT records that VATCAN cannot accept it', ZD.AIT_RULES.vatcanCannotAccept === true);

  assert('the relief briefing checklist is ten items', ZD.PRB_CHECKLIST.length === 10);

  /* ============ 4. Honesty guards ============ */
  /* These fail loudly the day someone invents data the documents do not support. */
  assert('STANDING is empty — no ZMP OJT session has been flown', ZD.STANDING.length === 0);
  assert('PRIOR is empty — no ZMP drill is on record', globalThis.zdb.PRIOR.length === 0);
  assert('the ledger is empty and single-tier', globalThis.zdb.hist().length === 0);
  assert('ten vNAS-only sectors are recorded as undocumented', Object.keys(ZD.UNDOCUMENTED).length === 10);
  assert('no undocumented sector leaked into the seat list',
    Object.keys(ZD.UNDOCUMENTED).every(n => !ZD.SECTORS[n]));
  assert('the transfer-of-control table is still marked incomplete', ZD.XFER_CONTROL.length < 33);

  /* ============ 5. Pages ============ */
  assert('three pages in workflow order',
    globalThis.zdb.PAGES.map(p => p.id).join(',') === 'setup,fly,notes');

  console.log('\n' + checks + ' checks passed.');
} catch (e) {
  console.error('FAIL: threw —', e && e.stack ? e.stack : e);
  process.exit(1);
}
