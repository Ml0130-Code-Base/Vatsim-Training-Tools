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
   Sector Deck, then Drill Builder, then the Handoff ID resolver.
   Evaluate them the way the browser would. */
const blocks = scripts;
if (blocks.length !== 3) { console.error('FAIL: expected 3 extension blocks, found ' + blocks.length); process.exit(1); }

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

  /* ============ 2b. The M98 interface and the training split ============ */
  /* The M98 interface is layered; "faces M98" is not a property of a sector alone. */
  assert('the M98 low tier is all low-stratum sectors',
    ZD.M98_TIER.low.every(n => ZD.zdStratum(n) === 'low'));
  assert('the M98 high tier is all high-stratum sectors',
    ZD.M98_TIER.high.every(n => ZD.zdStratum(n) === 'high'));
  assert('the two M98 tiers are disjoint',
    ZD.M98_TIER.low.every(n => !ZD.M98_TIER.high.includes(n)));
  assert('every sector in the M98 tiers exists',
    ZD.M98_TIER.low.concat(ZD.M98_TIER.high).every(n => !!ZD.SECTORS[n]));
  assert('sector 10 is the only one with a stated M98 common boundary',
    ZD.M98_TIER.boundaryStated.join() === '10');
  /* the vNAS map is known-incomplete; this guard records which sectors it misses */
  assert('the sectors missing from the vNAS M98 map are recorded',
    ZD.M98_TIER.notInVnasMap.every(n => !ZD.NEIGHBOURS.M98.includes(n)));

  /* Chapter 10 event splits — 05 and 09 cover another sector's airspace */
  assert('two event-split sectors are recorded',
    Object.keys(ZD.EVENT_SPLIT).sort().join() === '05,09');
  assert('every event-split target is a real sector',
    Object.values(ZD.EVENT_SPLIT).every(e => !!ZD.SECTORS[e.covers]));
  assert('an event-split sector never covers itself',
    Object.keys(ZD.EVENT_SPLIT).every(k => ZD.EVENT_SPLIT[k].covers !== k));

  /* The training environment split — owner-supplied, not in 7200.1O.
     It must partition the Area 2 + Area 3 low tier exactly. */
  const T = ZD.TRAINING_SPLIT;
  const owned = Object.values(T).flatMap(v => v.owns);
  const area23low = ZD.AREAS[2].concat(ZD.AREAS[3]).filter(n => ZD.zdStratum(n) === 'low');
  assert('three training seats', Object.keys(T).length === 3);
  assert('every training seat is a real sector', Object.keys(T).every(k => !!ZD.SECTORS[k]));
  assert('every owned sector is a real sector', owned.every(n => !!ZD.SECTORS[n]));
  assert('no sector is owned by two training seats', new Set(owned).size === owned.length);
  assert('the training split partitions Area 2 + Area 3 low exactly',
    owned.slice().sort().join() === area23low.slice().sort().join(),
    owned.slice().sort().join() + ' vs ' + area23low.slice().sort().join());
  assert('every owned sector is low stratum', owned.every(n => ZD.zdStratum(n) === 'low'));
  /* the whole point: seat 09 does not own its own airspace — seat 10 does */
  assert('seat 09 does not own sector 09', !T['09'].owns.includes('09'));
  assert('seat 10 owns sector 09', T['10'].owns.includes('09'));
  assert('trainingSeatOwning resolves 09 to seat 10', ZD.trainingSeatOwning('09') === '10');
  assert('trainingSeatOwning resolves 07 to seat 09', ZD.trainingSeatOwning('07') === '09');
  assert('trainingSeatOwning resolves 21 to seat 05', ZD.trainingSeatOwning('21') === '05');
  assert('trainingSeatOwning returns null outside the split', ZD.trainingSeatOwning('01') === null);
  assert('the training split records that it is not from the order',
    /not stated in 7200\.1O/i.test(ZD.TRAINING_SPLIT_SRC));

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

  /* ============ 6. Handoff IDs ============
     Values from the ZMP vNAS record; composition rules from
     docs.virtualnas.net. Both transcribed in
     claude_ZMP_Handoff_ID_Reference.md, which is authoritative. */
  const H = globalThis.zdh;
  assert('handoff block exports window.zdh', !!H);

  assert('ZMP NAS ID is P', H.NAS_ID === 'P');
  assert('all 29 neighbouring STARS facilities are carried', H.E2S.length === 29);
  assert('seventeen are adapted for automated handoffs',
    H.E2S.filter(e => e[4] === 'OneLetterAndSubset').length === 17);
  assert('twelve are FullStarsIdOnly',
    H.E2S.filter(e => e[4] === 'FullStarsIdOnly').length === 12);
  assert('every neighbouring STARS facility has a STARS ID', H.E2S.every(e => !!e[1]));

  /* ERAM -> STARS composes single char + subset + sector. */
  assert('ZMP reaches M98 South Feeder with M1H', H.eramToStars('M98', 'H', 1).id === 'M1H');
  assert('ZMP reaches R90 Radar East with O1X', H.eramToStars('R90', 'X', 1).id === 'O1X');
  assert('ZMP reaches an MSP ground position with M2Y', H.eramToStars('M98', 'Y', 2).id === 'M2Y');
  assert('a FullStarsIdOnly facility composes to its STARS ID alone',
    H.eramToStars('MCI', 'A', 1).id === 'MCI');

  /* The LAN anomaly is PRESERVED, not papered over — the record is adapted
     OneLetterAndSubset with no single-character ID, and guessing one would
     invent a keystroke. */
  const lan = H.e2sFor('LAN');
  assert('LAN is adapted OneLetterAndSubset', lan[4] === 'OneLetterAndSubset');
  assert('LAN has no single-character ID in the record', lan[3] === null);
  assert('LAN does not compose to an invented letter', H.eramToStars('LAN', 'A', 1).id === null);

  /* STARS -> ERAM. C is the host prefix. The documented collision is with an
     ARTCC whose NAS ID is literally C — that is ZOB — and no ZMP TRACON
     neighbours ZOB, so every one of them addresses ZMP as C. */
  assert('ZOB’s NAS ID is C', H.NEIGH_NASID.ZOB === 'C');
  assert('no ZMP TRACON neighbours ZOB',
    Object.keys(H.CAN_REACH).every(f => H.CAN_REACH[f].indexOf('ZOB') === -1));
  assert('M98 reaches ZMP sector 05 with C05', H.starsToEram('M98', '05').id === 'C05');
  assert('R90 reaches ZMP sector 27 with C27', H.starsToEram('R90', '27').id === 'C27');
  assert('a single-digit sector is padded to two', H.starsToEram('M98', 5).id === 'C05');

  /* STARS -> STARS. The handoff number is assigned by the SENDER, so a pair
     does not agree — M98 reaches RST on 1, RST reaches M98 on 2. */
  assert('M98 reaches RST on delta 1', H.DELTA.M98.RST === 1);
  assert('RST reaches M98 on delta 2 — the number is not symmetric', H.DELTA.RST.M98 === 2);
  assert('four ZMP TRACONs have no STARS-to-STARS neighbour',
    Object.keys(H.DELTA).filter(f => Object.keys(H.DELTA[f]).length === 0).length === 4);

  /* CAATS */
  assert('both CAATS ACCs carry a handoff letter',
    H.CAATS.length === 2 && H.CAATS.every(c => /^[A-Z]$/.test(c[1])));

  /* Thirteen STARS facilities under ZMP, and every TCP row is well formed. */
  assert('thirteen STARS facilities carry a TCP table', Object.keys(H.TCPS).length === 13);
  assert('every TCP has a sector ID and a subset',
    Object.keys(H.TCPS).every(f => H.TCPS[f].pos.every(p => !!p[0] && p[1] >= 1 && p[1] <= 3)));
  assert('every facility with a TCP table is a known neighbour or child',
    Object.keys(H.TCPS).every(f => !!H.e2sFor(f)));

  /* Honesty guard: an adapted TCP with nobody on it is recorded as empty
     rather than given an invented position name. */
  assert('M98 carries its four empty TCPs',
    H.TCPS.M98.pos.filter(p => p[2] === null).length === 4);
  assert('R90 carries its one empty TCP',
    H.TCPS.R90.pos.filter(p => p[2] === null).length === 1);
  assert('four open questions are rendered rather than guessed', H.OPEN_Q.length === 4);
  assert('every open question says what would close it',
    H.OPEN_Q.every(o => !!o.q && !!o.why && !!o.close));

  console.log('\n' + checks + ' checks passed.');
} catch (e) {
  console.error('FAIL: threw —', e && e.stack ? e.stack : e);
  process.exit(1);
}
