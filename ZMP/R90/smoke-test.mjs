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
   Radar Deck, Drill Builder, Handoff ID resolver, D-ATIS and weather,
   Published procedures, Flight strips, Fly it, Drill builder.
   Evaluate them the way the browser would.

   THIS COUNT IS A GUARD, NOT A FORMALITY. It was left at 3 while the
   weather and strips blocks landed, so the harness would have refused
   to run against the very deck it describes — and nobody noticed,
   because there is no Node on the owner's machine and it has never
   been executed (root CLAUDE.md §12). Update it in the same commit
   that adds a block. */
const EXPECTED_BLOCKS = 8;
const blocks = scripts;
if (blocks.length !== EXPECTED_BLOCKS) { console.error("FAIL: expected " + EXPECTED_BLOCKS + " extension blocks, found " + blocks.length); process.exit(1); }

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

  /* ============ 7. Handoff IDs, and the Lincoln Final conflict ============
     Values from the ZMP vNAS record, 2026-08-26; composition rules from
     docs.virtualnas.net, 2026-09-01. Both transcribed in
     claude_ZMP_Handoff_ID_Reference.md, which is authoritative. */

  /* The conflict itself. R90 7220.10B 2-1 gives Lincoln Final the STARS ID F;
     vNAS points LNK_F_APP at TCP O.1 — Radar Offutt's TCP — and adapts no F
     sector in R90 at all. The tool carries BOTH and picks neither.
     These assertions fail the day someone quietly resolves it. */
  assert('exactly one R90 position is in conflict between the order and vNAS',
    ids.filter(k => RD.rdStarsConflicted(k)).length === 1);
  assert('the conflicted position is Lincoln Final', RD.rdStarsConflicted('LF') === true);
  assert('Lincoln Final carries the order’s F', RD.POSITIONS.LF.starsId === 'F');
  assert('Lincoln Final carries vNAS’s O alongside it', RD.POSITIONS.LF.starsIdVnas === 'O');
  assert('the conflict is explained in the data, not just flagged',
    typeof RD.POSITIONS.LF.conflict === 'string' && RD.POSITIONS.LF.conflict.length > 80);
  assert('the other five positions agree between the two sources',
    ids.filter(k => k !== 'LF').every(k => RD.POSITIONS[k].starsId === RD.POSITIONS[k].starsIdVnas));
  assert('Lincoln Final and Radar Offutt collide under the vNAS reading',
    RD.POSITIONS.LF.starsIdVnas === RD.POSITIONS.RO.starsIdVnas);

  const H = globalThis.rdh;
  assert('handoff block exports window.rdh', !!H);

  /* All six radar seats are subset 1, so radar to radar is a bare letter. */
  assert('every radar seat is subset 1', ids.every(k => RD.POSITIONS[k].subset === 1));
  assert('radar to radar is a bare sector letter', H.intra(1, 'X', 1).id === 'X');
  assert('radar to OMA ground carries the subset digit', H.intra(1, 'A', 2).id === '2A');
  assert('OMA Local and OMA Ground differ by one digit',
    H.intra(1, 'A', 1).id === 'A' && H.intra(1, 'A', 2).id === '2A');

  /* Ground and Clearance Delivery share a TCP at both OMA and LNK. */
  assert('OMA ground and clearance delivery share one TCP',
    H.R90_TOWER.filter(r => r[0] === 'A' && r[1] === 2).length === 1);
  assert('six tower and ground positions are carried', H.R90_TOWER.length === 6);

  /* STARS -> STARS. Both directions are 1 here, but that is coincidence. */
  assert('R90 reaches SUX on delta 1', H.DELTA_OUT === 1);
  assert('SUX reaches R90 on delta 1', H.DELTA_IN === 1);
  assert('SUX is the only STARS facility R90 can address', H.SUX_TCP.length === 5);

  /* ERAM inbound and the ZMP interface. */
  assert('ZMP addresses R90 with the letter O', H.R90_FROM_ZMP.one === 'O');
  assert('R90 is adapted OneLetterAndSubset', H.R90_FROM_ZMP.fmt === 'OneLetterAndSubset');
  assert('the three ZMP interface sectors are 26, 27 and 37',
    H.ZMP_IFACE.map(z => z[0]).join(',') === '26,27,37');

  /* Honesty guards. */
  assert('the one empty R90 TCP is recorded as empty', H.R90_EMPTY.length === 1);
  assert('the empty TCP is I.1', H.R90_EMPTY[0][0] === 'I' && H.R90_EMPTY[0][1] === 1);
  assert('the one empty SUX TCP is recorded as empty',
    H.SUX_TCP.filter(r => r[2] === null).length === 1);
  assert('three open questions are rendered rather than guessed',
    H.OPEN_Q.length === 3 && H.OPEN_Q.every(o => !!o.q && !!o.why && !!o.close));
  assert('the Lincoln Final question is one of them',
    H.OPEN_Q.some(o => /Lincoln Final/.test(o.q)));

  /* ============ 5. Published procedures (CIFP 260903) ============ */
  const P = globalThis.window.RD;

  assert('the five KOMA STARs are carried',
    P.procsAt('KOMA', 'STAR').join(',') === 'AANDY2,HOWRY3,LANTK2,MARWI4,TIMMO1');

  /* The two zeros are ASSERTED, not merely absent. A coding gap that
     quietly becomes a populated table is the failure this catches. */
  assert('KOMA has no coded SIDs, and that stays true',
    P.procsAt('KOMA', 'SID').length === 0);
  assert('Lincoln has neither a SID nor a STAR',
    P.procsAt('KLNK', 'STAR').length === 0 && P.procsAt('KLNK', 'SID').length === 0);

  /* Procedures are keyed by airport first: an ident is not unique across
     fields, and flattening that concatenates two fields' legs. */
  assert('STARS is keyed by airport, and KOMA is the only one',
    Object.keys(P.STARS).join(',') === 'KOMA');

  /* Every fix a leg names must resolve in the one fix table — a leg
     pointing at a fix with no coordinates is a track with a hole. */
  let legs = 0, named = 0;
  for (const apt of Object.keys(P.STARS)) {
    for (const id of Object.keys(P.STARS[apt])) {
      const p = P.STARS[apt][id];
      for (const seg of [p.common, ...Object.values(p.trans || {}), ...Object.values(p.rwy || {})]) {
        for (const g of (seg || [])) {
          legs++;
          if (g.f) { named++; if (!P.fixLL(g.f)) fail('unresolved fix', apt + ' ' + id + ' ' + g.f); }
          /* a vector leg must NOT carry a crossing fix */
          if (g.vec && g.f) fail('vector leg carries a fix', apt + ' ' + id + ' ' + g.f);
        }
      }
    }
  }
  assert('every named fix resolves to coordinates', legs > 0 && named > 0);
  assert('AANDY2 ends its RW32B track on a vector',
    P.endsOnVector(P.trackTo('KOMA', 'AANDY2', 'MZEEE', 'RW32B')));
  assert('the BRKSR join is not printed twice',
    P.trackTo('KOMA', 'AANDY2', 'MZEEE', 'RW32B').filter(g => g.f === 'BRKSR').length === 1);

  /* The strip contract is derived from the tables above, never typed. */
  const SP = P.stripProcs('STAR');
  assert('the strip contract carries the same five arrivals',
    Object.keys(SP).sort().join(',') === 'AANDY2,HOWRY3,LANTK2,MARWI4,TIMMO1');
  assert('every arrival is marked flown by the fly block, and each declares its track',
    Object.values(SP).every(v => v.flies === true && v.track === true));
  assert('serves is a list and names KOMA', SP.AANDY2.serves.join(',') === 'KOMA');

  /* The ceiling on a drill (owner, 2026-10-27): the master block holds it, the deck's add and drop call it. */
  {
    const pfx = globalThis.strip.prefix;
    const add = globalThis[pfx + 'Add'], drop = globalThis[pfx + 'Drop'], at = globalThis[pfx + 'RowAt'];
    const rowCount = () => { let n = 0; while (at(n)) n++; return n; };
    assert('the strip block carries the 50-strip ceiling and says it is full at 50, not at 49',
      globalThis.strip.MAX === 50 && globalThis.strip.refuseAdd(50) === true && globalThis.strip.refuseAdd(49) === false);
    for (let i = 0; i < 60; i++) add();
    assert('sixty adds leave exactly fifty strips: the 51st is refused', rowCount() === 50, 'got ' + rowCount());
    drop(0);
    assert('a drop makes room again', rowCount() === 49, 'got ' + rowCount());
    add(); add();
    assert('and one add fills it back to fifty, no further', rowCount() === 50, 'got ' + rowCount());
  }

  /* ============ 8. Closures out of the notices — issue #18 ============
     EVERY STRING BELOW IS VERBATIM FROM A LIVE PULL — datis.clowd.io/api/all,
     2026-09-21 0852Z, by the recipe in claude_DATIS_Field_Survey.md §1. Fixture
     text never comes from a document and is never composed by hand: both rounds
     of issue #13 were failures in text nobody had looked at yet, and neither was
     reachable by reading the parser. */
  {
    const OMA = 'OMA ATIS INFO U 0852Z. 00000KT 10SM BKN010 OVC015 17/16 A3006 (THREE ZERO ZERO SIX) '
      + 'RMK AO2 CIG 007V012 SLP177 60002 T01670156 56003. ILS APCH 36 IN USE, RNAV Y GPS APCH 32L, 32R IN USE. '
      + 'NOTICE TO AIRMEN. ILS RWY 32L OTS, ILS RWY 32R GS OTS, RY 32R MIDPOINT RVR OTS, '
      + 'RWY 32L, 32R PAPI OTS, VOT 109.0 OTS. BIRD ACTIVITY IN THE VICINITY OF OMAHA AIRPORT. '
      + 'ALL RWY COND CODES 5 5 5, WET AT 0555Z. ...ADVS YOU HAVE INFO U.';
    const W = globalThis.rdw, c = W.closures(OMA);
    /* OMAHA HAS NOTHING SHUT TODAY AND FOUR THINGS OUT. Reading any of those
       four as a closure would brief a runway shut that is landing traffic. */
    assert('a named item out of service is never read as a closed runway',
      c.closed.length === 0, JSON.stringify(c.closed));
    assert('the item and the runways it is out on are both read',
      c.ots.map(x => x.what + '@' + x.rwys.join('+')).join(';')
        === 'ILS@32L;ILS GS@32R;MIDPOINT RVR@32R;PAPI@32L+32R', JSON.stringify(c.ots));
    assert('the notice text is carried verbatim rather than summarised',
      c.text.indexOf('VOT 109.0 OTS') >= 0);
    /* THE PARSE WINDOW IS UNCHANGED. This is the guard that matters: the
       closures pass is read-only and must never feed the flow. */
    const o = W.read(OMA);
    assert('nothing in the notices ever becomes a runway in use',
      o.land.indexOf('32L') < 0 && o.land.indexOf('32R') < 0 && o.dep.length === 0,
      JSON.stringify([o.land, o.dep]));
    assert('and nothing advertised in use is also called closed', o.clash.length === 0);

    /* A FIELD WITH NO NOTICE HEADING. KORD and KSLC run their closures straight
       on from the flow, so the body's out-of-use sentences are the only copy
       (claude_DATIS_Field_Survey.md §4b). Verbatim, same pull, 0851Z. */
    const ORD = 'ORD ATIS INFO O 0851Z. 07013G18KT 10SM SCT025 BKN035 OVC055 16/12 A3009 RMK AO2 SLP187. '
      + 'ARR EXP VECTORS ILS RWY 10C APCH. DEPS EXP RWYS 10L FROM DD. 10,093 FT AVBL. '
      + 'RWY 4L, 22R CLSD, RWY 4R, 22L CLSD, RWY 9L, 27R CLSD, RWY 9R, 27L CLSD, RWY 10R, 28L CLSD. '
      + 'RWY 9L IM OTS, RWY 9C IM OTS, RWY 27C ALS OTS. READBACK ALL RWY HOLD SHORT INSTRUCTIONS.';
    const co = W.closures(ORD);
    assert('a field with no notice heading still yields its closures',
      co.closed.join(',') === '4L,22R,4R,22L,9L,27R,9R,27L,10R,28L', JSON.stringify(co.closed));
    assert('and its items out of service stay separate from them',
      co.ots.map(x => x.what + '@' + x.rwys.join('+')).join(';') === 'IM@9L;IM@9C;ALS@27C');
    assert('and none of it reaches the runways in use',
      W.read(ORD).land.join(',') === '10C', JSON.stringify(W.read(ORD).land));

    /* THE REFUSALS. A label this cannot read is left alone rather than guessed
       at, and each of these would otherwise have reported a runway shut that is
       open. All three are verbatim from the same pull. */
    assert('an unreadable lead never falls through to "runway closed"',
      W.closures('X. NOTICE TO AIRMEN. DME PORTION OF ILS RWY 9L OTS.').closed.length === 0);
    assert('a spelled-out runway list is refused, not half-read',
      W.closures('X. NOTICE TO AIRMEN. RWY 1 6 LEFT 3 4 RIGHT CLOSED.').closed.length === 0);
    assert('a taxiway that names a runway closes nothing',
      W.closures('X. NOTICE TO AIRMEN. TWY ECHO CLOSED NORTH OF RWY 10R.').closed.length === 0
      && W.closures('X. NOTICE TO AIRMEN. TWY J BTWN RWY 4 AND TWY K CLSD.').closed.length === 0);
    assert('a runway pair written with a slash is read as both',
      W.closures('X. NOTICE TO AIRMEN. RWY 11/29 CLSD, RWY 4L/22R CLSD.').closed.join(',')
        === '11,29,4L,22R');
    assert('a broadcast with no notices asserts nothing at all',
      W.closures('OMA ATIS INFO U. 00000KT 10SM CLR A3006. ILS APCH 36 IN USE.').closed.length === 0);

    /* KNOWN DEFECT, ISSUE #58 — NOT A CLOSURES BUG. KOMA writes two bare-list
       approach clauses in one sentence and the bare-list branch reads only the
       first, so Omaha is landing 36, 32L and 32R and this reads 36. Asserted as
       it behaves rather than as it should, so the day #58 lands this line fails
       and gets updated with it. */
    assert('#58 — the second bare-list approach clause is still lost',
      o.land.join(',') === '36', JSON.stringify(o.land));
  }

  /* ============ 11. The fly block and the drill builder (blocks 7 and 8) ============
     The aircraft fly the facility's own published tracks, straight between fixes, and the only
     numbers they carry are the ones the procedures block does. These checks hold that line: no
     coordinate is added, nothing that cannot be flown is flown without saying why, the generator is
     deterministic and builds only strips the strip block accepts, and an untouched drill never flags
     a published crossing the engine itself should have met. */
  const FL = globalThis.fly, DR = globalThis.drill, ST11 = globalThis.strip, FF = globalThis.FLY_FACILITY;
  assert('the fly block exports window.fly and the drill block window.drill', !!FL && typeof FL.load === 'function' && typeof FL.transmit === 'function' && !!DR && typeof DR.generate === 'function');
  assert('the fly contract names this facility and the deck carries procedures to fly', FF.id === 'R90' && FL.haveProcs === true);
  assert('the drill contract names this facility and its own storage key, never the builder\'s', globalThis.DRILL_FACILITY.id === 'R90' && DR.KEY !== 'r90-drill-deck-v1' && !/skeleton|shell|tier/i.test(DR.KEY), DR.KEY);
  assert('blocks 7 and 8 carry no network call - the D-ATIS fetch stays the only one', ![blocks[6], blocks[7]].some(b => /\bfetch\s*\(|XMLHttpRequest|WebSocket|EventSource|sendBeacon/.test(b)));
  assert('no standing item exists for the fly block to score against', RD.STANDING.length === 0);

  /* every published procedure the deck carries builds a line out of its own coordinates, or is refused by name */
  let builtS = 0, builtD = 0, refused11 = 0; const bad11 = [];
  for (const apt of ST11.airportsHere()) {
    for (const kind of ['STAR', 'SID']) {
      const tab = (kind === 'SID' ? RD.SIDS : RD.STARS)[apt] || {};
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
          const ll = RD.PFIX[p.fix], q = ll ? FL.xy(ll) : null;
          if (!q || Math.abs(q.x - p.x) > 1e-9 || Math.abs(q.y - p.y) > 1e-9) bad11.push(apt + ' ' + id + ': ' + p.fix + ' is not at the procedure table\'s own coordinate');
        }
        if (Math.abs(T.total - T.pts[T.pts.length - 1].cum) > 1e-9) bad11.push(apt + ' ' + id + ': total is not the last fix');
      }
    }
  }
  assert('every track is built from the procedure table\'s own coordinates, in order, and a refusal says why', bad11.length === 0, bad11.slice(0, 3).join('; '));
  assert('at least one STAR builds a track, and KOMA and Lincoln still have no SID to fly', builtS > 0 && builtD === 0, builtS + ' STARs, ' + builtD + ' SIDs, ' + refused11 + ' refused');

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
  let miss11 = 0, flown11 = 0;
  for (let seed = 1; seed <= 8; seed++) {
    const g = DR.generate(seed, 8, 'both');
    const r = FL.load({name:'sweep ' + seed, strips:g.strips, rate:0});
    if (!r.ok) continue;
    for (let i = 0; i < 2400; i++) FL.step(1);
    flown11 += g.strips.length;
    miss11 += FL.sim.feed.filter(f => /the published crossing|the published limit/.test(f.html)).length;
  }
  assert('an untouched generated drill never misses a published crossing or speed limit', flown11 > 0 && miss11 === 0, miss11 + ' missed over ' + flown11 + ' strips');

  /* the transmit box: one transmission carries as many instructions as a real one */
  const g3 = DR.generate(3, 6, 'arrivals');
  assert('a drill of arrivals loads', FL.load({name:'tx', strips:g3.strips, rate:0}).ok === true);
  const A = FL.sim.ac[0];
  A.onFreq = true; A.spawnAt = 0;
  FL.transmit(A.cs + ' descend and maintain 11000, reduce speed to 250');
  assert('altitude and speed in one transmission are both taken, and the altitude is not cut short into a speed', A.altAsg === 11000 && A.spdAsg === 250, A.altAsg + ' / ' + A.spdAsg);
  FL.transmit(A.cs + ' fly heading 270');
  assert('a heading takes the aircraft off its published track', A.nav === 'hdg' && A.hdgTgt === 270 && A.via === false);
  const alt0 = A.altAsg; FL.transmit(A.cs + ' maintain 3000');
  assert('a bare maintain far from the current altitude is queried, not taken', A.altAsg === alt0);
  const pos11 = FF.positions(), me = pos11.find(p => p.self), tw = pos11.find(p => !p.self && p.open);
  FL.transmit(A.cs + ' contact ' + me.freq);
  assert('a switch to the position you are working is refused', !A.handed);
  FL.transmit(A.cs + ' contact ' + tw.freq);
  assert('a switch to an open position by its own frequency hands the aircraft off', !!A.handed && A.handed.name === tw.name, JSON.stringify(A.handed));
  FL.transmit(FL.sim.ac[1].cs + ' contact 199.999');
  assert('a frequency no position in the deck is on is refused and says so', FL.sim.feed.some(f => /No position in this deck/.test(f.html)));

  const end11 = FL.end();
  assert('the debrief states that nothing is scored against a standing item', !!end11 && /No standing item is exercised/.test(globalThis.document.getElementById(FF.prefix + '-debriefbox').innerHTML));

  /* ============ 12. The Set up page's anatomy, the scheduled events and the start-positions preview ============
     Issue #76, 2026-10-27. M98's Set up a drill page names its sub-panels, and the owner asked for the
     same names here. The events a drill schedules are notices the author typed, fired once by the
     player's clock; they re-plan nothing, grade nothing and add no number of their own. */
  const DF = globalThis.DRILL_FACILITY;
  const setupSrc = blocks.filter(b => b.indexOf('Position Setup') >= 0);
  assert('the builder block alone mounts Position Setup', setupSrc.length === 1);
  assert('Position Setup carries M98\'s four sub-panels, by name', ['Quick setups', 'Which seat are you working', 'Open around you', 'What that resolves to'].every(t => setupSrc[0].indexOf(t) >= 0));
  assert('the drill builder carries M98\'s sub-panels by name: Special observation, Landline events, Brief, Start positions',
    ['Special observation - the frame changes mid-drill', 'Landline events - the other side of the operation', 'Brief - what the drill is asking of you', 'Start positions - same geometry as the live scope'].every(t => blocks[7].indexOf(t) >= 0));
  assert('the drill contract hands the builder this deck\'s own configurations, by id and name',
    typeof DF.configs === 'function' && DF.configs().length > 0 && DF.configs().every(c => typeof c.id === 'string' && c.id && typeof c.name === 'string' && c.name));
  assert('the drill contract states what its generator cannot build, and that nothing is graded', typeof DF.note === 'string' && /Nothing is graded/.test(DF.note));
  assert('a drill nobody edited schedules no event', DR.events().length === 0 && DR.ui().speci.on === false && DR.ui().lines.length === 0);

  const evStrips = DR.generate(2, 4, 'arrivals').strips;
  const cfg12 = DF.configs()[0];
  const ld12 = FL.load({name:'events', brief:'Hold everything to two five zero.', strips:evStrips, rate:0, events:[
    {kind:'speci', at:30, ceil:'800 overcast', vis:'2', wind:'180 at 12', cat:'IFR'},
    {kind:'landline', at:60, from:'Tower', text:'Runway one two is closed.'},
    {kind:'speci', at:90, cfg:cfg12.id, cfgName:cfg12.name},
    {kind:'speci', at:40},
    {kind:'landline', at:50, from:'Tower', text:'   '},
    {kind:'weather', at:10, text:'not an event'},
    {kind:'landline', text:'no time given'}
  ]});
  assert('a drill with events loads, and says plainly which events it left out', ld12.ok === true && ld12.warns.filter(w => /left out/.test(w)).length === 4, JSON.stringify(ld12.warns));
  assert('only the events that say something are scheduled', FL.sim.events.length === 3 && FL.sim.events.every(e => e.fired === false));
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
  assert('a special observation that changes the configuration says the player does not re-plan strips already flying',
    FL.sim.feed.filter(f => f.html.indexOf('The configuration is now <b>') >= 0 && f.html.indexOf('does not re-plan') >= 0).length === 1);
  for (let i = 0; i < 60; i++) FL.step(1);
  assert('each event fires once and only once', feedAt(/Special observation/) === 2 && feedAt(/on the landline/) === 1 && FL.sim.events.every(e => e.fired === true));
  assert('no event is graded: STANDING is still empty and no event text claims a standing item', RD.STANDING.length === 0 && !FL.sim.feed.some(f => /Special observation|on the landline/.test(f.html) && /standing item|graded|score/i.test(f.html)));

  /* the start positions are the player's own scope, drawn from strips that are not yet flying */
  const pvStrips = DR.generate(4, 5, 'both').strips;
  const pvAc = FL.sim.ac.length, pvFeed = FL.sim.feed.length;
  const pv = FL.preview(pvStrips);
  assert('the preview draws one target per flyable strip and names each strip it cannot draw', pv.count > 0 && pv.count + pv.skipped.length === pvStrips.length, pv.count + ' + ' + pv.skipped.length + ' of ' + pvStrips.length);
  assert('the preview is the live scope\'s own svg, relabelled, with nothing clickable in it', /<svg/.test(pv.svg) && /aria-label="Start positions"/.test(pv.svg) && !/Live scope/.test(pv.svg) && !/ onclick=/.test(pv.svg));
  assert('drawing the preview leaves the loaded drill and its feed alone', FL.sim.ac.length === pvAc && FL.sim.feed.length === pvFeed && FL.sim.events.length === 3);
  const pv0 = FL.preview([]);
  assert('with no strips there is nothing to draw and the preview says so', pv0.count === 0 && pv0.svg === '' && pv0.skipped.length === 0);

  console.log('\n' + checks + ' checks passed.');
} catch (e) {
  console.error('FAIL: threw —', e && e.stack ? e.stack : e);
  process.exit(1);
}
