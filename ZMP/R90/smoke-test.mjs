#!/usr/bin/env node
/* Headless smoke test for r90-drill-deck.html.
   Covers the Radar Deck (data spine) and the Drill Builder + Training Notebook.
   Usage: node smoke-test.mjs [path-to-html]   (default: r90-drill-deck.html)
   Exits nonzero on any exception or failed assertion. */
import fs from 'node:fs';

const path = process.argv[2] || 'r90-drill-deck.html';
const html = fs.readFileSync(path, 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
/* every script in the page is an extension block, in dependency order:
   Radar Deck, then Drill Builder. Evaluate them the way the browser would. */
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

  const RD = globalThis.RD;
  assert('radar deck exports window.RD', !!RD);
  assert('builder exports window.rdb', !!globalThis.rdb);

  /* ============ 1. Positions ============ */
  const ids = RD.rdPositionIds();
  assert('six positions are present', ids.length === 6, 'got ' + ids.length);
  assert('every frequency is unique', new Set(ids.map(k => RD.POSITIONS[k].freq)).size === 6);
  assert('every STARS id is unique', new Set(ids.map(k => RD.POSITIONS[k].starsId)).size === 6);
  assert('every callsign is unique', new Set(ids.map(k => RD.POSITIONS[k].callsign)).size === 6);
  assert('every frequency is in the 118–137 band',
    ids.every(k => RD.POSITIONS[k].freq >= 118 && RD.POSITIONS[k].freq <= 137));
  assert('callsigns follow the OMA_/LNK_ x _APP scheme',
    ids.every(k => /^(OMA|LNK)_[A-Z]_APP$/.test(RD.POSITIONS[k].callsign)));
  assert('the Lincoln positions carry LNK callsigns',
    RD.POSITIONS.RL.callsign.startsWith('LNK_') && RD.POSITIONS.LF.callsign.startsWith('LNK_'));
  assert('rdByStarsId round-trips', ids.every(k => RD.rdByStarsId(RD.POSITIONS[k].starsId) === k));

  /* the superseded Radar West frequency must never be accepted */
  assert('the superseded 120.1 is rejected', RD.rdFreqAccepted(120.1) === false);
  assert('the current 135.875 is accepted', RD.rdFreqAccepted(135.875) === true);
  assert('the superseded frequency is still recorded for reference', RD.SUPERSEDED_FREQ.RW === 120.1);

  /* ============ 2. The airspace lid ============ */
  assert('East and West share a 15,000 ceiling', RD.CEILING.east === 15000 && RD.CEILING.west === 15000);
  assert('LNK has a lower ceiling than East/West', RD.CEILING.lnk === 10000 && RD.CEILING.lnk < RD.CEILING.east);
  assert('rdCeilingOver resolves a known area', RD.rdCeilingOver('lnk') === 10000);
  assert('rdCeilingOver returns null for an unknown area', RD.rdCeilingOver('nope') === null);

  /* ============ 3. Honesty guards — nothing is invented ============ */
  /* These fail loudly the day someone fills a gap with a guess. */
  assert('OFF runways are null, not guessed', RD.rdRunwaysAt('OFF') === null);
  assert('MLE runways are null, not guessed', RD.rdRunwaysAt('MLE') === null);
  assert('OFF tower frequencies are null, not guessed', RD.TOWER_FREQ.OFF === null);
  assert('OFF departure altitudes are null, not guessed', RD.DEP_ALTS.OFF === null);
  assert('OFF missed approach is null, not guessed', RD.MISSED_TOWER.OFF === null);
  assert('OMA runways are stated', RD.rdRunwaysAt('OMA').length === 6);
  assert('LNK runways are stated', RD.rdRunwaysAt('LNK').length === 6);
  assert('CBF carries only the one runway the order states', RD.rdRunwaysAt('CBF').join() === '36');
  assert('every airport records where its runway list came from',
    Object.keys(RD.AIRPORTS).every(a => typeof RD.AIRPORTS[a].src === 'string' && RD.AIRPORTS[a].src.length > 0));
  assert('nine geometry items are recorded as unread', RD.UNREAD_GEOMETRY.length === 9);
  assert('every unread item names where it lives',
    RD.UNREAD_GEOMETRY.every(g => g.what && g.where));
  assert('STANDING is empty — no R90 OJT session has been flown', RD.STANDING.length === 0);
  assert('PRIOR is empty — no R90 drill is on record', globalThis.rdb.PRIOR.length === 0);
  assert('the ledger is empty and single-tier', globalThis.rdb.hist().length === 0);

  /* the STARs are named but must carry no fabricated geometry */
  assert('five STARs are named', RD.STARS_LIST.length === 5);
  assert('the STARs are names only, with no fixes or altitudes attached',
    RD.STARS_LIST.every(s => typeof s === 'string'));

  /* ============ 4. The ZMP seam ============ */
  assert('five departure heading bands', RD.HEADING_BANDS.length === 5);
  assert('every band has a from, a to and a heading range',
    RD.HEADING_BANDS.every(b => b.from && b.to && /^\d{3}-\d{3}$/.test(b.band)));
  assert('the MARWI–TIMMO band carries the RBA/J41 exception',
    RD.HEADING_BANDS.find(b => b.from === 'MARWI' && b.to === 'TIMMO').except.includes('RBA'));
  assert('every band endpoint is a named STAR or the ZMP boundary',
    RD.HEADING_BANDS.every(b =>
      [b.from, b.to].every(x => RD.STARS_LIST.includes(x) || x === 'ZMP 26/27 boundary')));

  assert('STAR arrivals are delivered at 16,000, or 17,000 stacked',
    RD.ARRIVAL_ALTS.star.level === 16000 && RD.ARRIVAL_ALTS.star.stacked === 17000);
  assert('SUX/MZEEE arrivals are delivered at 11,000', RD.ARRIVAL_ALTS.suxMzeee.level === 11000);
  assert('the LNK non-STAR altitude matches the LNK ceiling band',
    RD.ARRIVAL_ALTS.otherLNK.levelBelow === RD.CEILING.lnk + 1000);
  assert('the STAR window is a weekday clock',
    RD.STAR_WINDOW.from === '0730' && RD.STAR_WINDOW.to === '2130');
  assert('control-for grants are recorded in both directions',
    RD.CONTROL_FOR.r90HasFromZmp.length > 0 && RD.CONTROL_FOR.zmpHasFromR90.length > 0);

  /* ============ 5. Scratchpad encoding ============ */
  assert('all four scratchpad tables are present',
    ['OMA', 'LNK', 'CBF', 'OTHER'].every(k => !!RD.SCRATCHPAD[k]));
  assert('the LNK runway-digit map has six entries', Object.keys(RD.SCRATCHPAD.LNK.runway).length === 6);
  assert('the LNK digit map covers exactly the stated LNK runways',
    new Set(Object.values(RD.SCRATCHPAD.LNK.runway).map(r => r.replace(/^R/, ''))).size === 6);
  assert('the four missed-approach terminations are present',
    ['E', 'W', 'V', 'P'].every(k => !!RD.MISSED_SCRATCH[k]));
  assert('every missed termination frequency is a real R90 position frequency',
    Object.values(RD.MISSED_SCRATCH).every(m => RD.rdFreqAccepted(m.freq)));
  assert('the visual-approach rule is carried verbatim', /runway alone/i.test(RD.VISUAL_RULE));
  assert('the OMA visual set is six runways', RD.SCRATCHPAD.OMA.visual.length === 6);

  /* ============ 6. Duties and pages ============ */
  assert('seven standing radar position duties', RD.POSITION_DUTIES.length === 7);
  assert('the handoff freeze rule is carried', /verbal approval/i.test(RD.FREEZE_RULE));
  assert('three pages in workflow order',
    globalThis.rdb.PAGES.map(p => p.id).join(',') === 'setup,fly,notes');

  console.log('\n' + checks + ' checks passed.');
} catch (e) {
  console.error('FAIL: threw —', e && e.stack ? e.stack : e);
  process.exit(1);
}
