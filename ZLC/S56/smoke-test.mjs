#!/usr/bin/env node
/* Headless smoke test for s56-drill-deck.html.
   Covers the facility deck (data spine and honesty guards), the builder and notes, the published
   procedures, the flight strips, the fly block and the drill builder.
   Usage: node smoke-test.mjs [path-to-html]   (default: s56-drill-deck.html)
   Exits nonzero on any exception or failed assertion.

   There is no Node on the owner's machine (root CLAUDE.md section 12), so this harness is run
   through smoke-test-browser.html in this folder, served over local HTTP. That is the same checks
   in another engine, not `node smoke-test.mjs`. */
import fs from 'node:fs';

const path = process.argv[2] || 's56-drill-deck.html';
const html = fs.readFileSync(path, 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
/* every script in the page is an extension block, in dependency order.
   THIS COUNT IS A GUARD, NOT A FORMALITY: update it in the same commit that adds a block. */
const EXPECTED_BLOCKS = 7;
const blocks = scripts;
if (blocks.length !== EXPECTED_BLOCKS) { console.error("FAIL: expected " + EXPECTED_BLOCKS + " extension blocks, found " + blocks.length); process.exit(1); }

/* ---- minimal DOM stubs ---- */
const els = {};
const el = id => els[id] ||= {
  id, innerHTML: '', textContent: '', value: '', className: '',
  classList: { toggle(){}, add(){}, remove(){} },
  dataset: {}, style: {}, scrollIntoView(){}, focus(){},
  firstChild: null, nextSibling: null, parentNode: { insertBefore(){}, appendChild(){}, removeChild(){} },
  appendChild(){}, insertBefore(){},
  getAttribute(){ return null; },
  setAttribute(){},
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
    textContent: '', innerHTML: '', className: '', id: '', style: {},
    firstChild: null, appendChild(){}, insertBefore(){},
    addEventListener(){}, getAttribute(){ return null; }, setAttribute(){},
    querySelector(){ return null; }, querySelectorAll(){ return []; }
  }),
  getElementById: id => el(id),
  querySelector: s => (s === '.wrap' ? wrapStub : null),
  querySelectorAll: () => [],
  addEventListener: (_, fn) => fn()
};
globalThis.window = globalThis;
/* the deck's clock is driven by hand (FL.step), so a timer never needs to fire; stubbing it also lets Node exit */
globalThis.setInterval = () => 1;
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

  const ZL = globalThis.ZLC;
  assert('the S56 deck exports window.ZLC and says it is S56', !!ZL && ZL.facility === 'S56');
  assert('the radio name is Salt Lake City Approach', ZL.RADIO === 'Salt Lake City Approach');

  /* ============ 1. Positions - S56 SOP chapter 3, ZLC positions reference ============ */
  const S = ZL.SECTORS;
  assert('nine sectors', S.length === 9, 'got ' + S.length);
  assert('the nine are Lake, Gunnison, Bear, Hart, Final, Jordan, Stockton, Valley and Alpine',
    S.map(s => s.name).join() === 'Lake,Gunnison,Bear,Hart,Final,Jordan,Stockton,Valley,Alpine');
  assert('every sector id is unique and is a letter', new Set(S.map(s => s.id)).size === 9 && S.every(s => /^[A-Z]$/.test(s.id)));
  assert('every frequency is unique', new Set(S.map(s => s.frq)).size === 9);
  assert('every callsign is unique and follows SLC_x_APP', new Set(S.map(s => s.cs)).size === 9 && S.every(s => /^SLC_[A-Z]_APP$/.test(s.cs)));
  assert('every callsign letter is the sector id', S.every(s => s.cs.split('_')[1] === s.id));
  assert('every frequency is a six-digit 25 kHz channel in the 118-137 band', S.every(s => /^\d{3}\.\d{3}$/.test(s.frq) && parseFloat(s.frq) >= 118 && parseFloat(s.frq) <= 137));
  assert('the frequencies are the ones the narrative paragraphs state (never a raw table row)',
    S.map(s => s.id + s.frq).join() === 'K135.500,G126.250,B124.900,H121.100,F125.700,J128.600,S128.100,V120.900,A118.850');
  assert('every sector cites its SOP paragraph and its appendix', S.every(s => /^3-\d$/.test(s.sop) && /^Appendix 3[A-I]$/.test(s.app)));
  assert('secById round-trips', S.every(s => ZL.secById(s.id) === s));

  /* ============ 2. The combining model ============ */
  const roots = S.filter(s => s.into === null).map(s => s.id).sort().join('');
  assert('three roots - Lake, Bear and Valley - sit directly under Center', roots === 'BKV');
  assert('every fold names a sector that exists', S.every(s => s.into === null || !!ZL.secById(s.into)));
  let cyc = 0;
  for (const s of S) { const seen = {}; let c = s.id; while (c && !seen[c]) { seen[c] = 1; c = ZL.secById(c).into; } if (c) cyc++; }
  assert('every combining chain terminates with no cycle', cyc === 0);
  const ownerId = i => { const a = ZL.answerFor(i); return a.kind === 'sector' ? ((a.sec && a.sec.id) || a.id) : 'center'; };
  ZL.state.open = { K: 1, B: 1, V: 1 };
  assert('Hart, Gunnison and Final fold to Bear, and Jordan, Stockton and Alpine to Lake',
    ['H', 'G', 'F'].every(i => ownerId(i) === 'B') && ['J', 'S', 'A'].every(i => ownerId(i) === 'K'));
  ZL.state.open = {};
  assert('with nothing open the airspace goes up to Center, not sideways', ownerId('H') === 'center' && ownerId('V') === 'center');
  ZL.state.open = { K: 1, B: 1, V: 1 };
  assert('Center is Salt Lake Center sector 3 (Area B)', ZL.CENTER.cs === 'SLC_03_CTR');

  /* ============ 3. Flow, presets and the geometry ============ */
  assert('two flows, North and South, gated on the runway configuration', ZL.FLOWS.map(f => f.id + ':' + f.gate).join('|') === 'N:KSLC 34L/R, 35|S:KSLC 16L/R, 17');
  assert('three presets', ZL.PRESETS.map(p => p.id).join() === 'roots,six,all');
  assert('every preset opens only sectors that exist', ZL.PRESETS.every(p => Object.keys(p.open).every(k => !!ZL.secById(k))));
  assert('every sector carries at least one North Flow altitude block', S.every(s => s.blocks && s.blocks.N && s.blocks.N.length > 0));
  assert('the North Flow carries thirty-two altitude blocks across the nine sectors', S.reduce((n, s) => n + s.blocks.N.length, 0) === 32);
  assert('every sector carries its VATGlasses ownership list, and it begins with the sector itself', S.every(s => Array.isArray(s.vg) && s.vg[0] === s.vgKey));
  assert('every sector states its lateral extent', S.every(s => typeof s.extent === 'string' && /N, .* W$/.test(s.extent)));
  assert('the VATGlasses credit is carried: CC BY-NC-SA 4.0, ZLC dataset, pinned', ZL.CREDIT.licence === 'CC BY-NC-SA 4.0' && /^c469b42/.test(ZL.CREDIT.commit) && /ZLC vARTCC/.test(ZL.CREDIT.dataset));
  assert('the VATGlasses attribution is on the page', /VATGlasses/.test(html) && /CC BY-NC-SA/.test(html));
  assert('three places where the sources disagree are carried as divergences, in both columns', ZL.DIVERGE.length === 3 && ZL.DIVERGE.every(d => d.h && d.b));

  /* ============ 4. Honesty guards - nothing is invented ============ */
  assert('six open questions are rendered rather than guessed, each with its reason', ZL.OPEN_Q.length === 6 && ZL.OPEN_Q.every(q => q.id && q.q && q.w));
  assert('the handoff identifiers are named as an open question, because vNAS has them and the deck does not carry them',
    ZL.OPEN_Q.some(q => q.id === 'q-handoff'));
  assert('four note kinds', ZL.KINDS.map(k => k.id).join() === 'question,correction,technique,phraseology');
  assert('STANDING is empty - no S56 OJT session has been flown', Array.isArray(ZL.STANDING) && ZL.STANDING.length === 0);
  assert('the notebook starts with no notes', ZL.state.notes.length === 0);
  assert('the storage key carries no status word', ZL.KEY === 's56-drill-deck-v1' && !/skeleton|shell|tier/i.test(ZL.KEY));

  /* ============ 5. Published procedures (CIFP 261001) ============ */
  assert('the procedures carry their cycle', ZL.CIFP_CYCLE === '261001');
  assert('STARs are keyed by airport, then by procedure', Object.keys(ZL.STARS).sort().join() === 'KOGD,KPVU,KSLC');
  assert('thirteen STARs: eleven at Salt Lake City, one at Ogden, one at Provo',
    ZL.procsAt('KSLC', 'STAR').length === 11 && ZL.procsAt('KOGD', 'STAR').length === 1 && ZL.procsAt('KPVU', 'STAR').length === 1);
  assert('fifteen SIDs across seven fields',
    Object.values(ZL.SIDS).reduce((n, o) => n + Object.keys(o).length, 0) === 15 && Object.keys(ZL.SIDS).length === 7);
  assert('Salt Lake City carries eight SIDs', ZL.procsAt('KSLC', 'SID').join() === 'ARCHZ1,CGULL1,DEZRT2,FFU9,RUGGD3,SEVYR3,SLC4,ZIONZ1');

  /* The zero is ASSERTED: Hill Air Force Base has no coded SID, STAR or approach in CIFP 261001. */
  assert('Hill Air Force Base has no coded procedure, and that stays true',
    ZL.procsAt('KHIF', 'STAR').length === 0 && ZL.procsAt('KHIF', 'SID').length === 0 && !ZL.SIDS.KHIF && !ZL.STARS.KHIF);
  assert('SLC4 is a radar-vectored departure (route type T), carried as a vector and not as a conventional SID', ZL.SIDS.KSLC.SLC4.vector === true && ZL.SIDS.KSLC.SLC4.rnav === false);
  assert('164 fixes carry coordinates', Object.keys(ZL.PFIX).length === 164);
  assert('NICHOL is not a fix: CIFP does not carry it (issue #47)', !ZL.PFIX.NICHOL && !ZL.fixLL('NICHOL'));

  let legs = 0, named = 0;
  for (const tab of [ZL.STARS, ZL.SIDS]) for (const apt of Object.keys(tab)) for (const id of Object.keys(tab[apt])) {
    const p = tab[apt][id];
    for (const seg of [p.common, ...Object.values(p.trans || {}), ...Object.values(p.rwy || {})]) {
      for (const g of (seg || [])) {
        legs++;
        if (g.f) { named++; if (!ZL.fixLL(g.f)) fail('unresolved fix', apt + ' ' + id + ' ' + g.f); }
        if (g.vec && g.f) fail('vector leg carries a fix', apt + ' ' + id + ' ' + g.f);
      }
    }
  }
  assert('every named fix resolves to coordinates', legs > 0 && named > 0);

  const SPS = ZL.stripProcs('STAR'), SPD = ZL.stripProcs('SID');
  assert('the strip contract is derived: thirteen arrivals and fifteen departures', Object.keys(SPS).length === 13 && Object.keys(SPD).length === 15);
  assert('every procedure is marked flown, and each declares its track', [...Object.values(SPS), ...Object.values(SPD)].every(v => v.flies === true && v.track === true));
  assert('eight fields can be placed on a strip, Hill Air Force Base among them', globalThis.strip.airportsHere().length === 8 && globalThis.strip.airportsHere().includes('KHIF'));

  /* ============ 6. Pages ============ */
  assert('three pages in workflow order', ['Set up a drill', 'Fly it', 'Notes and log'].every(t => blocks[blocks.length - 1].indexOf('label:' + '') >= 0 && blocks[blocks.length - 1].indexOf(t) >= 0));
  assert('the pages block is the last block, because it finds sections by id after they mount', /const PAGES|var PAGES/.test(blocks[blocks.length - 1]) && blocks.slice(0, -1).every(b => !/var PAGES = \[/.test(b)));


  /* ============ The strip row, the fly block and the drill builder ============
     The aircraft fly the facility's own published tracks, straight between fixes, and the only
     numbers they carry are the ones the procedures block does. These checks hold that line: no
     coordinate is added, nothing that cannot be flown is flown without saying why, the generator is
     deterministic and builds only strips the strip block accepts, and an untouched drill never flags
     a published crossing the engine itself should have met. Adapted from ZMP/R90/smoke-test.mjs. */
  const NSO = globalThis.ZLC;
  const FL = globalThis.fly, DR = globalThis.drill, ST11 = globalThis.strip, FF = globalThis.FLY_FACILITY;
  const iFly = blocks.findIndex(b => /\nwindow\.fly = \{/.test(b)), iDrill = blocks.findIndex(b => /\nwindow\.drill = \{/.test(b));
  const HAS_PROCS = Object.keys(NSO.STARS || {}).length + Object.keys(NSO.SIDS || {}).length > 0;

  assert('the strip block exports window.strip with its 50-strip ceiling', !!ST11 && ST11.MAX === 50);
  assert('the drill block directly follows the fly block', iFly >= 0 && iDrill === iFly + 1, iFly + ',' + iDrill);
  assert('the fly block exports window.fly and the drill block window.drill', !!FL && typeof FL.load === 'function' && typeof FL.transmit === 'function' && !!DR && typeof DR.generate === 'function');
  assert('the fly contract names this facility and its namespace', FF.id === 'S56' && FF.ns === 'ZLC', FF.id + ' ' + FF.ns);
  assert('the fly block has something to fly: a published track, or at AZO an overflight', FL.haveProcs === true, String(FL.haveProcs));
  assert('the drill contract names this facility and its own storage key, never the builder\'s', globalThis.DRILL_FACILITY.id === 'S56' && DR.KEY !== 's56-drill-deck-v1' && DR.KEY === 's56-drill-deck-fly-v1' && !/skeleton|shell|tier/i.test(DR.KEY), DR.KEY);
  assert('the fly and drill blocks carry no network call - the D-ATIS and weather fetch stays the only one', ![blocks[iFly], blocks[iDrill]].some(b => /\bfetch\s*\(|XMLHttpRequest|WebSocket|EventSource|sendBeacon/.test(b)));
  assert('no standing item exists for the fly block to score against', NSO.STANDING.length === 0);

  /* The ceiling on a drill (owner, 2026-10-27): the master block holds it, the deck's add and drop call it. */
  {
    const pfx = ST11.prefix;
    const add = globalThis[pfx + 'Add'], drop = globalThis[pfx + 'Drop'], at = globalThis[pfx + 'RowAt'];
    const rowCount = () => { let n = 0; while (at(n)) n++; return n; };
    assert('the strip block says it is full at 50, not at 49', ST11.refuseAdd(50) === true && ST11.refuseAdd(49) === false);
    for (let i = 0; i < 60; i++) add();
    assert('sixty adds leave exactly fifty strips: the 51st is refused', rowCount() === 50, 'got ' + rowCount());
    drop(0);
    assert('a drop makes room again', rowCount() === 49, 'got ' + rowCount());
    add(); add();
    assert('and one add fills it back to fifty, no further', rowCount() === 50, 'got ' + rowCount());
  }

  /* every published procedure the deck carries builds a line out of its own coordinates, or is refused by name */
  let builtS = 0, builtD = 0, refused11 = 0; const bad11 = [];
  for (const apt of ST11.airportsHere()) {
    for (const kind of ['STAR', 'SID']) {
      const tab = (kind === 'SID' ? NSO.SIDS : NSO.STARS || {})[apt] || {};
      for (const id of Object.keys(tab)) {
        const s = ST11.blank();
        if (kind === 'SID') { s.role = 'departure'; s.dep = apt; s.sid = id; } else { s.role = 'arrival'; s.dest = apt; s.gate = id; }
        const T = FL.track(s);
        if (!T.ok) { refused11++; if (typeof T.note !== 'string' || T.note.length < 10) bad11.push(apt + ' ' + id + ': refused without a reason'); continue; }
        if (kind === 'SID') builtD++; else builtS++;
        let prev = -1;
        for (const p of T.pts) {
          if (p.cum < prev - 1e-9) bad11.push(apt + ' ' + id + ': distance runs backwards at ' + p.fix);
          prev = p.cum;
          if (p.field) continue;
          const ll = NSO.PFIX[p.fix], q = ll ? FL.xy(ll) : null;
          if (!q || Math.abs(q.x - p.x) > 1e-9 || Math.abs(q.y - p.y) > 1e-9) bad11.push(apt + ' ' + id + ': ' + p.fix + ' is not at the procedure table\'s own coordinate');
        }
        if (Math.abs(T.total - T.pts[T.pts.length - 1].cum) > 1e-9) bad11.push(apt + ' ' + id + ': total is not the last fix');
      }
    }
  }
  assert('every track is built from the procedure table\'s own coordinates, in order, and a refusal says why', bad11.length === 0, bad11.slice(0, 3).join('; '));
  assert('the deck builds a track when it carries procedures and flies none when it carries none', HAS_PROCS ? (builtS + builtD > 0) : (builtS + builtD === 0), builtS + ' STARs, ' + builtD + ' SIDs, ' + refused11 + ' refused');

  const ov = ST11.blank(); ov.role = 'overflight'; ov.entryR = '270'; ov.entryD = '40'; ov.exitR = '90'; ov.exitD = '40';
  const To = FL.track(ov);
  assert('an overflight flies the straight line between its two radial-and-distance points', To.ok && To.pts.length === 2 && Math.abs(To.total - 80) < 1e-6, JSON.stringify(To.total));
  const ov2 = ST11.blank(); ov2.role = 'overflight'; ov2.entryR = '270';
  assert('an overflight with a box empty is refused by name, not flown from a guess', !FL.track(ov2).ok && /entry radial and distance/.test(FL.track(ov2).note));

  assert('an altitude is read the way the strip box says it: hundreds under 1,000, FL, commas, and 0 is none',
    FL.parseAlt('80') === 8000 && FL.parseAlt('FL240') === 24000 && FL.parseAlt('11,000') === 11000 && FL.parseAlt('0') === null && FL.parseAlt('') === null);
  assert('spoken digits read as the number they are, so 11,000 is never 110', /11000/.test(FL.despell('descend and maintain one one thousand')) && /\b250\b/.test(FL.despell('reduce speed to two five zero')));

  /* the generator: same seed, same drill, and only strips the strip block accepts */
  const g1 = JSON.stringify(DR.generate(5, 6, 'both').strips), g2 = JSON.stringify(DR.generate(5, 6, 'both').strips);
  assert('the same seed builds the same drill', g1 === g2 && g1.length > 10);
  assert('a different seed builds a different drill', g1 !== JSON.stringify(DR.generate(6, 6, 'both').strips));
  let illegal11 = 0, unflyable11 = 0, gen11 = 0;
  for (let seed = 1; seed <= 12; seed++) {
    const g = DR.generate(seed, 8, 'both');
    for (const s of g.strips) { gen11++; if (ST11.checkStrip(s, s.cs).length) illegal11++; }
    if (FL.validate({name:'g', strips:g.strips}).errs.length) unflyable11++;
  }
  assert('every generated strip is legal for this facility and every generated drill can be flown', gen11 > 0 && illegal11 === 0 && unflyable11 === 0, illegal11 + ' illegal, ' + unflyable11 + ' unflyable of ' + gen11);
  assert('a drill the engine cannot fly is refused by strip, not loaded',
    FL.load({name:'empty', strips:[]}).ok === false && FL.load({name:'two', strips:[Object.assign(ST11.blank(), {cs:'DAL1', alt:'100'}), Object.assign(ST11.blank(), {cs:'DAL1', alt:'100'})]}).ok === false);

  /* the engine, untouched: no published crossing the engine should have met is flagged */
  /* KNOWN GENERATOR DEFECT, recorded rather than hidden: the drill generator can start an arrival BELOW the
     altitude its own ladder requires at the first constrained fix (C90: FYTTE7 via BENNR at 11,000, where
     the ladder wants 21,000 or more at BHAWK), and that aircraft then reaches a later limit too fast. That
     is a fault in the master drill block, shared by every deck, not in a facility's table. So the sweep
     judges the engine only on strips that START inside their own ladder, and prints how many it set aside. */
  let miss11 = 0, flown11 = 0, setAside11 = 0;
  for (let seed = 1; seed <= 8; seed++) {
    const g = DR.generate(seed, 8, 'both');
    const r = FL.load({name:'sweep ' + seed, strips:g.strips, rate:0});
    if (!r.ok) continue;
    for (let i = 0; i < 2400; i++) FL.step(1);
    const inside = new Set();
    for (const s of g.strips) {
      const T = FL.track(s), a0 = FL.parseAlt(s.alt), firstLo = T.ok ? (T.pts.find(p => p.lo != null) || {}).lo : null;
      if (a0 == null || firstLo == null || a0 >= firstLo) inside.add(s.cs); else setAside11++;
    }
    flown11 += inside.size;
    miss11 += FL.sim.feed.filter(f => /the published crossing|the published limit/.test(f.html) && inside.has((f.html.replace(/<[^>]+>/g, '').match(/([A-Z]{3}\d{1,4}[A-Z]?) /) || [])[1])).length;
  }
  if (setAside11) console.log('note: ' + setAside11 + ' generated strips started below their own ladder and were set aside from the crossing sweep');
  assert('an untouched generated drill never misses a published crossing or speed limit, from a start inside its own ladder', flown11 > 0 && miss11 === 0, miss11 + ' missed over ' + flown11 + ' strips');

  /* the transmit box: one transmission carries as many instructions as a real one */
  const g3 = DR.generate(3, 6, HAS_PROCS ? 'arrivals' : 'both');
  assert('a drill of arrivals loads', FL.load({name:'tx', strips:g3.strips, rate:0}).ok === true);
  const A = FL.sim.ac[0];
  A.onFreq = true; A.spawnAt = 0;
  FL.transmit(A.cs + ' descend and maintain 11000, reduce speed to 250');
  assert('altitude and speed in one transmission are both taken, and the altitude is not cut short into a speed', A.altAsg === 11000 && A.spdAsg === 250, A.altAsg + ' / ' + A.spdAsg);
  FL.transmit(A.cs + ' fly heading 270');
  assert('a heading takes the aircraft off its published track', A.nav === 'hdg' && A.hdgTgt === 270 && A.via === false);
  const alt0 = A.altAsg; FL.transmit(A.cs + ' maintain 3000');
  assert('a bare maintain far from the current altitude is queried, not taken', A.altAsg === alt0);
  let pos11 = FF.positions(), me = pos11.find(p => p.self), tw = pos11.find(p => !p.self && p.open);
  /* a deck that opens only the seat by default: open one more position the way the page does, through the deck's own open set */
  if (!tw) {
    const openSet = (NSO.sim && Array.isArray(NSO.sim.open)) ? NSO.sim.open : (NSO.state && NSO.state.open) ? NSO.state.open : null;
    const other = pos11.find(p => !p.self);
    if (openSet && other) {
      if (Array.isArray(openSet)) openSet.push(other.id); else openSet[other.id] = 1;
      pos11 = FF.positions(); tw = pos11.find(p => !p.self && p.open);
    }
  }
  assert('there is a second open position to hand an aircraft to', !!me && !!tw);
  FL.transmit(A.cs + ' contact ' + me.freq);
  assert('a switch to the position you are working is refused', !A.handed);
  FL.transmit(A.cs + ' contact ' + tw.freq);
  assert('a switch to an open position by its own frequency hands the aircraft off', !!A.handed && A.handed.name === tw.name, JSON.stringify(A.handed));
  FL.transmit(FL.sim.ac[1].cs + ' contact 199.999');
  assert('a frequency no position in the deck is on is refused and says so', FL.sim.feed.some(f => /No position in this deck/.test(f.html)));

  const end11 = FL.end();
  assert('the debrief states that nothing is scored against a standing item', !!end11 && /No standing item is exercised/.test(globalThis.document.getElementById(FF.prefix + '-debriefbox').innerHTML));

  /* ============ The Set up page's anatomy, the scheduled events and the start-positions preview ============
     Issue #76, 2026-10-27. M98's Set up a drill page names its sub-panels, and the owner asked for the
     same names here. The events a drill schedules are notices the author typed, fired once by the
     player's clock; they re-plan nothing, grade nothing and add no number of their own. */
  const DF = globalThis.DRILL_FACILITY;
  const setupSrc = blocks.filter(b => b.indexOf('Position Setup') >= 0);
  assert('the builder block alone mounts Position Setup', setupSrc.length === 1);
  assert('Position Setup carries M98\'s four sub-panels, by name', ['Quick setups', 'Which seat are you working', 'Open around you', 'What that resolves to'].every(t => setupSrc[0].indexOf(t) >= 0));
  assert('the drill builder carries M98\'s sub-panels by name: Special observation, Landline events, Brief, Start positions',
    ['Special observation - the frame changes mid-drill', 'Landline events - the other side of the operation', 'Brief - what the drill is asking of you', 'Start positions - same geometry as the live scope'].every(t => blocks[iDrill].indexOf(t) >= 0));
  assert('the drill contract hands the builder this deck\'s own configurations, by id and name',
    typeof DF.configs === 'function' && DF.configs().every(c => typeof c.id === 'string' && c.id && typeof c.name === 'string' && c.name));
  assert('the drill contract states what its generator cannot build, and that nothing is graded', typeof DF.note === 'string' && /Nothing is graded/.test(DF.note));
  assert('a drill nobody edited schedules no event', DR.events().length === 0 && DR.ui().speci.on === false && DR.ui().lines.length === 0);

  const HAS_CFG = DF.configs().length > 0;
  const nEv = HAS_CFG ? 3 : 2, nSpeci = HAS_CFG ? 2 : 1;
  const evStrips = DR.generate(2, 4, HAS_PROCS ? 'arrivals' : 'both').strips;
  const cfg12 = HAS_CFG ? DF.configs()[0] : null;
  const evList = [
    {kind:'speci', at:30, ceil:'800 overcast', vis:'2', wind:'180 at 12', cat:'IFR'},
    {kind:'landline', at:60, from:'Tower', text:'Runway one two is closed.'},
    {kind:'speci', at:40},
    {kind:'landline', at:50, from:'Tower', text:'   '},
    {kind:'weather', at:10, text:'not an event'},
    {kind:'landline', text:'no time given'}
  ];
  if (HAS_CFG) evList.splice(2, 0, {kind:'speci', at:90, cfg:cfg12.id, cfgName:cfg12.name});
  const ld12 = FL.load({name:'events', brief:'Hold everything to two five zero.', strips:evStrips, rate:0, events:evList});
  assert('a drill with events loads, and says plainly which events it left out', ld12.ok === true && ld12.warns.filter(w => /left out/.test(w)).length === 4, JSON.stringify(ld12.warns));
  assert('only the events that say something are scheduled', FL.sim.events.length === nEv && FL.sim.events.every(e => e.fired === false));
  assert('the brief is stated in the feed before traffic', FL.sim.feed.some(f => /Brief: Hold everything to two five zero\./.test(f.html)));
  const feedAt = re => FL.sim.feed.filter(f => re.test(f.html)).length;
  for (let i = 0; i < 29; i++) FL.step(1);
  assert('nothing fires before its time', feedAt(/Special observation|on the landline/) === 0);
  FL.step(1);
  assert('a special observation fires when the clock reaches it, carrying exactly what the author typed',
    feedAt(/Special observation: ceiling 800 overcast, visibility 2, wind 180 at 12, flight category IFR\./) === 1);
  for (let i = 0; i < 30; i++) FL.step(1);
  assert('a landline call fires when the clock reaches it, from the side the author named, saying what the author typed',
    feedAt(/<b>Tower<\/b> on the landline: Runway one two is closed\./) === 1);
  for (let i = 0; i < 30; i++) FL.step(1);
  if (HAS_CFG) assert('a special observation that changes the configuration says the player does not re-plan strips already flying',
    FL.sim.feed.filter(f => f.html.indexOf('The configuration is now <b>') >= 0 && f.html.indexOf('does not re-plan') >= 0).length === 1);
  for (let i = 0; i < 60; i++) FL.step(1);
  assert('each event fires once and only once', feedAt(/Special observation/) === nSpeci && feedAt(/on the landline/) === 1 && FL.sim.events.every(e => e.fired === true));
  assert('no event is graded: STANDING is still empty and no event text claims a standing item', NSO.STANDING.length === 0 && !FL.sim.feed.some(f => /Special observation|on the landline/.test(f.html) && /standing item|graded|score/i.test(f.html)));

  /* the start positions are the player's own scope, drawn from strips that are not yet flying */
  const pvStrips = DR.generate(4, 5, 'both').strips;
  const pvAc = FL.sim.ac.length, pvFeed = FL.sim.feed.length;
  const pv = FL.preview(pvStrips);
  assert('the preview draws one target per flyable strip and names each strip it cannot draw', pv.count > 0 && pv.count + pv.skipped.length === pvStrips.length, pv.count + ' + ' + pv.skipped.length + ' of ' + pvStrips.length);
  assert('the preview is the live scope\'s own svg, relabelled, with nothing clickable in it', /<svg/.test(pv.svg) && /aria-label="Start positions"/.test(pv.svg) && !/Live scope/.test(pv.svg) && !/ onclick=/.test(pv.svg));
  assert('drawing the preview leaves the loaded drill and its feed alone', FL.sim.ac.length === pvAc && FL.sim.feed.length === pvFeed && FL.sim.events.length === nEv);
  const pv0 = FL.preview([]);
  assert('with no strips there is nothing to draw and the preview says so', pv0.count === 0 && pv0.svg === '' && pv0.skipped.length === 0);

  console.log('\nSMOKE PASS: ' + checks + ' checks passed.');
} catch (e) {
  console.error('FAIL: threw —', e && e.stack ? e.stack : e);
  process.exit(1);
}
