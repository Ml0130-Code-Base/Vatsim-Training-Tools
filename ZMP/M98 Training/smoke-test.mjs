#!/usr/bin/env node
/* Headless smoke test for m98-drill-deck.html.
   Covers the Drill Deck (live player) and the Drill Builder + Training Notebook.
   Usage: node smoke-test.mjs [path-to-html]   (default: m98-drill-deck.html)
   Exits nonzero on any exception or failed assertion. */
import fs from 'node:fs';

const path = process.argv[2] || 'm98-drill-deck.html';
const html = fs.readFileSync(path, 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
/* every script in the page is now an extension block, in dependency order:
   Drill Deck, then Drill Builder, then the Handoff ID resolver.
   Evaluate them the way the browser would. */
const blocks = scripts;
if (blocks.length !== 3) { console.error("FAIL: expected 3 extension blocks, found " + blocks.length); process.exit(1); }

/* ---- minimal DOM stubs ---- */
const els = {};
const el = id => els[id] ||= {
  id, innerHTML: '', textContent: '', value: '', checked: false,
  classList: { toggle(){}, add(){}, remove(){} },
  dataset: {}, style: {}, scrollIntoView(){}, focus(){}
};
let tickFn = null;
globalThis.setInterval = fn => { tickFn = fn; return 1; };
const wrapStub = { querySelector: () => el('footer'), insertBefore(){}, appendChild(){} };
globalThis.document = {
  readyState: 'complete',
  head: { appendChild(){} },
  body: wrapStub,
  title: '',
  createElement: () => ({ textContent: '', innerHTML: '' }),
  getElementById: id => el(id),
  querySelector: s => (s === '.wrap' ? wrapStub : { textContent: '' }),
  querySelectorAll: () => [],
  addEventListener: (_, fn) => fn()
};
globalThis.window = globalThis;

const say = s => { el('dd-cmd').value = s; globalThis.ddSend(); };
const feedText = () => el('dd-feed').innerHTML.replace(/<[^>]+>/g, ' ');
let checks = 0;
const ok = label => { checks++; console.log('ok  ', label); };
const fail = (label, detail) => { console.error('FAIL:', label, detail === undefined ? '' : '— ' + detail); process.exit(1); };
const mustContain = (label, needle) => {
  if (!feedText().includes(needle)) fail(label, 'expected feed to contain: ' + needle);
  ok(label);
};
const assert = (label, cond, detail) => { if (!cond) fail(label, detail); ok(label); };

try {
  for (const js of blocks) eval(js);

  /* ============ 1. Drill Deck — player and parser ============ */
  globalThis.ddLoad('resume10r');
  globalThis.ddSel('DAL589');
  say('DAL589 expect runway 12L');           mustContain('runway word parses', 'expect one two left');
  say('SCX8127 resume published speed');      mustContain('published restore graded good', 'Ladder speeds restored');
  say('DAL589 maintain 8000');                mustContain('bare-maintain draws crew query', 'confirm you want us');
  say('DAL589 descend and maintain 8000');    mustContain('proper altitude phraseology parses', 'descend and maintain 8,000');
  say('SCX8127 flash');                        mustContain('flash accepted', 'takes the flash');

  /* grading events are tagged with the standing item they exercise */
  const tally = globalThis.ddb.tallyFeed();
  assert('speed restore tallies to the speed item', tally.speed.good >= 1, JSON.stringify(tally.speed));
  assert('bare maintain tallies to the maintain item', tally.maintain.flag >= 1, JSON.stringify(tally.maintain));
  assert('flash tallies to post-handoff', tally.posthandoff.good >= 1, JSON.stringify(tally.posthandoff));

  /* run the tape */
  globalThis.ddRate(4);
  for (let i = 0; i < 420; i++) tickFn();
  globalThis.ddEnd();
  const debrief = el('dd-debriefbox').innerHTML.replace(/<[^>]+>/g, ' ');
  if (!debrief.includes('Debrief')) fail('debrief did not render');
  ok('debrief renders');
  assert('debrief carries the response-timing panel', debrief.includes('Response timing'));
  assert('debrief offers the banking draft', debrief.includes('Bank this drill into the notebook'));

  /* fresh push: items clock + SAVVG default should fire when neglected */
  globalThis.ddLoad('freshpush');
  globalThis.ddRate(4);
  for (let i = 0; i < 420; i++) tickFn();
  mustContain('items-owed clock fires', 'still owed');
  mustContain('SAVVG runway default fires', 'crossed SAVVG with no runway');

  /* ============ 2. Response timing ============ */
  globalThis.ddLoad('resume10r');
  globalThis.ddRate(4);
  for (let i = 0; i < 12; i++) tickFn();          /* 48 sim seconds pass untouched */
  say('DAL589 expect runway 12R');
  mustContain('slow first word is flagged against the target', 'waited');
  mustContain('the flag says how far the strip moved', 'NM while you were composing');
  let tm = globalThis.ddb.timingSummary();
  assert('acknowledgement lag recorded', tm.n >= 1 && tm.worst >= 40, JSON.stringify(tm));
  globalThis.ddRate(0);
  say('SCX8127 expect runway 12R');
  tm = globalThis.ddb.timingSummary();
  assert('transmissions composed while paused are counted', tm.txPaused >= 1, JSON.stringify(tm));

  /* run hot refuses the pause */
  globalThis.ddb.state.hot = true;
  globalThis.ddRate(4);
  globalThis.ddRate(0);
  assert('run hot refuses the pause', globalThis.ddb.state.hot && feedText().includes('the pause is disabled'));
  globalThis.ddb.state.hot = false;
  globalThis.ddRate(0);

  /* the review modules are gone; the page is drill-only and mounts in workflow order */
  /* three pages rather than one scroll */
  assert('the page tabs exist and hold the sections in workflow order',
    globalThis.document.getElementById('ddb-view-setup') !== undefined);

  assert('no review module survives in the page',
    !/id="mod-(dda|scan|tunnel|clr|shrv|phr)"/.test(html) && html.indexOf('const MODULES') < 0);
  assert('sections mount in workflow order',
    ['mod-pos', 'mod-build', 'mod-live', 'mod-notes', 'mod-log'].every(id => !!globalThis.document.getElementById(id)));

  /* ============ 3. Route data — every gate, every SID ============ */
  assert('all six mainline arrival gates are in the route data',
    Object.keys(globalThis.DD.ROUTES).join(',') === 'NITZR,BLUEM,TORGY,KKILR,MUSCL,BAINY',
    Object.keys(globalThis.DD.ROUTES).join(','));
  /* each gate's entry fix should sit at its published distance from the MSP VOR */
  const GATE_DME = {NITZR:44, BLUEM:43, TORGY:51, KKILR:45, MUSCL:44, BAINY:55};
  Object.keys(GATE_DME).forEach(g => {
    const p = globalThis.DD.ROUTES[g][0], d = Math.sqrt(p.e*p.e + p.n*p.n);
    if (Math.abs(d - GATE_DME[g]) > 2)
      fail('gate entry distance', g + ' plots at ' + d.toFixed(1) + ' NM, reference says ' + GATE_DME[g]);
  });
  ok('every arrival gate plots at its published distance from the MSP VOR');
  /* ZMP-M98 LOA Table 2 on the 12s: KKILR, NITZR, BLUEM and TORGY take the 12R
     transition and BAINY and MUSCL take 12L. So KKILR merges onto the 12R trunk,
     and MUSCL — on its own CMMOE/FSCOT tail — shares no tail with any gate. */
  assert('KKILR merges onto the GREAK tail with NITZR, per Table 2',
    globalThis.DD.sharedTail(globalThis.DD.ROUTES.KKILR, globalThis.DD.ROUTES.NITZR).fix === 'GREAK');
  assert('MUSCL flies its Table 2 12L tail and shares no tail with the 12R gates',
    globalThis.DD.ROUTES.MUSCL.slice(-2).map(p => p.f).join(',') === 'CMMOE,FSCOT'
    && ['NITZR','BLUEM','KKILR','TORGY','BAINY'].every(g =>
         globalThis.DD.sharedTail(globalThis.DD.ROUTES.MUSCL, globalThis.DD.ROUTES[g]) === null),
    globalThis.DD.ROUTES.MUSCL.map(p => p.f).join(','));
  assert('BAINY shares no tail with TORGY, so they are never compared in trail',
    globalThis.DD.sharedTail(globalThis.DD.ROUTES.BAINY, globalThis.DD.ROUTES.TORGY) === null);
  assert('every gate has a floor and a stated basis for it',
    Object.keys(globalThis.DD.ROUTES).every(g => globalThis.DD.FLOORS[g] && globalThis.DD.FLOOR_BASIS[g]));
  /* near/far on a 12s, owner-verified: TORGY and BAINY are the near gates at
     7,000, and NITZR, BLUEM, KKILR and MUSCL are far at 8,000. This assertion
     was the wrong way round until 2026-09-04 — it was left behind by the
     near/far correction and never caught, because the harness has never run. */
  assert('the near gates sit at 7,000 and the far gates at 8,000',
    ['TORGY','BAINY'].every(g => globalThis.DD.FLOORS[g] === 7000)
    && ['NITZR','BLUEM','KKILR','MUSCL'].every(g => globalThis.DD.FLOORS[g] === 8000),
    JSON.stringify(globalThis.DD.FLOORS));
  assert('and each basis says it is derived, with Appendix A unread',
    Object.keys(globalThis.DD.FLOORS).every(g => globalThis.DD.FLOOR_BASIS[g].indexOf('4-4c(7)') >= 0));

  /* ============ 3b. The flow — ZMP-M98 LOA Table 2 ============
     ROUTES holds one configuration at a time. Every assertion after this
     section assumes the 12s, so this block restores it before it ends. */
  assert('Table 2 carries exactly the six rows the document has',
    Object.keys(globalThis.DD.TABLE2).join(',') === '12,12-17,30,30-17,30-35,17-22',
    Object.keys(globalThis.DD.TABLE2).join(','));
  assert('Table 2 on the 12s: MUSCL and BAINY 12L, the other four 12R',
    ['MUSCL','BAINY'].every(g => globalThis.DD.TABLE2['12'][g] === '12L')
    && ['NITZR','BLUEM','TORGY','KKILR'].every(g => globalThis.DD.TABLE2['12'][g] === '12R'));
  assert('Table 2 on the 30s: MUSCL and BAINY 30R, the other four 30L',
    ['MUSCL','BAINY'].every(g => globalThis.DD.TABLE2['30'][g] === '30R')
    && ['NITZR','BLUEM','TORGY','KKILR'].every(g => globalThis.DD.TABLE2['30'][g] === '30L'));

  globalThis.DD.setFlow('30');
  assert('the 30s loads all six gates, in the same order as the 12s',
    globalThis.DD.routeCfg() === '30'
    && Object.keys(globalThis.DD.ROUTES).join(',') === 'NITZR,BLUEM,TORGY,KKILR,MUSCL,BAINY',
    globalThis.DD.routeCfg() + ' / ' + Object.keys(globalThis.DD.ROUTES).join(','));
  assert('every 30s gate still plots at its published distance from the MSP VOR',
    Object.keys(GATE_DME).every(g => {
      const p = globalThis.DD.ROUTES[g][0];
      return Math.abs(Math.sqrt(p.e*p.e + p.n*p.n) - GATE_DME[g]) <= 2;
    }));
  assert('the 30s ladders end where the STAR reference says they do',
    globalThis.DD.ROUTES.NITZR.slice(-2).map(p=>p.f).join(',') === 'CANDD,HAPTN'
    && globalThis.DD.ROUTES.BLUEM.slice(-2).map(p=>p.f).join(',') === 'CANDD,HAPTN'
    && globalThis.DD.ROUTES.TORGY.slice(-2).map(p=>p.f).join(',') === 'MAUER,LEDRZ'
    && globalThis.DD.ROUTES.KKILR.slice(-2).map(p=>p.f).join(',') === 'STUWE,GEEQU'
    && globalThis.DD.ROUTES.MUSCL.slice(-2).map(p=>p.f).join(',') === 'KROIX,TRTEL'
    && globalThis.DD.ROUTES.BAINY.slice(-2).map(p=>p.f).join(',') === 'PRRPL,OSMOH');
  /* On the 30s NITZR and BLUEM genuinely merge, which is the mirror of KKILR
     and NITZR merging on the 12s. MUSCL is on its own tail in both flows. */
  assert('NITZR and BLUEM merge at CANDD on the 30s, and MUSCL shares no tail',
    globalThis.DD.sharedTail(globalThis.DD.ROUTES.NITZR, globalThis.DD.ROUTES.BLUEM).fix === 'CANDD'
    && ['NITZR','BLUEM','TORGY','KKILR','BAINY'].every(g =>
         globalThis.DD.sharedTail(globalThis.DD.ROUTES.MUSCL, globalThis.DD.ROUTES[g]) === null));
  /* Near and far belong to the flow: the 12s answer reverses on the 30s, and
     the floors have to reverse with it or the two have drifted apart. */
  assert('the floors reverse on the 30s',
    ['NITZR','BLUEM','KKILR','MUSCL'].every(g => globalThis.DD.FLOORS[g] === 7000)
    && ['TORGY','BAINY'].every(g => globalThis.DD.FLOORS[g] === 8000),
    JSON.stringify(globalThis.DD.FLOORS));

  /* A configuration Table 2 has no row for gets no geometry at all, rather
     than borrowing another flow's. 4, 22, 4-35 and the 30/12 noise default. */
  ['4','22','4-35','30/12'].forEach(c => {
    globalThis.DD.setFlow(c);
    if (globalThis.DD.routeCfg() !== null || Object.keys(globalThis.DD.ROUTES).length !== 0)
      fail('uncarried configuration invents geometry', c + ' gave ' + globalThis.DD.routeCfg());
    if (globalThis.DD.flowCarried(c)) fail('uncarried configuration reports carried', c);
  });
  ok('the four configurations Table 2 does not name carry no arrival geometry');

  /* KKILR and WILDD arrivals are prohibited entirely on a 17-22 (LOA 5.b(3)),
     which Table 2 records as N/A — so the gate must be absent, not empty. */
  globalThis.DD.setFlow('17-22');
  assert('KKILR is absent on a 17-22 and the other five load',
    !globalThis.DD.ROUTES.KKILR
    && Object.keys(globalThis.DD.ROUTES).join(',') === 'NITZR,BLUEM,TORGY,MUSCL,BAINY',
    Object.keys(globalThis.DD.ROUTES).join(','));

  /* An assigned runway overrides the Table 2 transition — that is a crossover,
     and for most gate/runway pairs it is a real lateral reroute. */
  globalThis.DD.setFlow('12');
  assert('an assigned runway re-paths the gate off its Table 2 transition',
    globalThis.DD.transitionFor('12','MUSCL') === '12L'
    && globalThis.DD.ladderFor('12','MUSCL',null).slice(-2).map(p=>p.f).join(',') === 'CMMOE,FSCOT'
    && globalThis.DD.ladderFor('12','MUSCL','12R').slice(-2).map(p=>p.f).join(',') === 'GREAK,TIETN');
  assert('and the flow is back on the 12s for everything that follows',
    globalThis.DD.routeCfg() === '12'
    && globalThis.DD.ROUTES.MUSCL.slice(-2).map(p=>p.f).join(',') === 'CMMOE,FSCOT');

  /* the feeder north/south split — SOP 4-4d */
  assert('the 12s split puts BAINY, MUSCL and KKILR north and the rest south',
    globalThis.DD.FEEDER_SPLIT['12'].N.join(',') === 'BAINY,MUSCL,KKILR'
    && globalThis.DD.FEEDER_SPLIT['12'].S.join(',') === 'NITZR,BLUEM,TORGY');
  /* which sector an arrival gate belongs to — SOP 4-2, 4-4d and 4-5 */
  const rcv = (gate, rwy) => globalThis.DD.receiverFor(
    globalThis.DD.mkAc({cs:'T1', type:'B738', role:'arrival', gate, rwy, alt:12000, ias:280}));
  assert('a gate on its own side is a straight handoff down the localizer split',
    rcv('NITZR','12R').pos === 'S' && rcv('MUSCL','12L').pos === 'N'
    && globalThis.DD.crossoverFor('NITZR','12R').type === 'none');
  assert('the order’s own worked example — a BAINY OPD to 12R goes to N',
    rcv('BAINY','12R').pos === 'N'
    && globalThis.DD.crossoverFor('BAINY','12R').type === 'near',
    rcv('BAINY','12R').pos + '/' + globalThis.DD.crossoverFor('BAINY','12R').type);
  /* On a 12s TORGY and BAINY are the near gates, so a crossover on either of
     them is a near-gate crossover and goes to the Arrival it reaches first —
     its own gate's side, not the runway's. */
  assert('a near-gate crossover on an OPD goes to whoever it reaches first, not the runway’s controller',
    rcv('TORGY','12L').pos === 'S' && rcv('BAINY','12R').pos === 'N',
    rcv('TORGY','12L').pos + '/' + rcv('BAINY','12R').pos);
  /* The other four are far gates on a 12s, and a far-gate crossover is not an
     Arrival handoff at all — it goes to that side's Feeder, following the
     combining chain rather than a hardcoded frequency. */
  assert('a far-gate crossover goes to a Feeder instead of Arrival, and follows whoever is open',
    globalThis.DD.crossoverFor('NITZR','12L').type === 'far'
    && ['I','H'].indexOf(rcv('NITZR','12L').pos) >= 0
    && rcv('NITZR','12L').frq === globalThis.DD.FEEDER_POS.I.frq
    && globalThis.DD.crossoverFor('MUSCL','12R').type === 'far',
    rcv('NITZR','12L').pos + '/' + rcv('NITZR','12L').frq);
  assert('the two 4-5 carve-outs are carried verbatim and neither is a no-op',
    globalThis.DD.CROSSOVER_EXEMPT.length === 2
    && globalThis.DD.crossoverFor('KKILR','12R','12').type === 'none'
    && globalThis.DD.crossoverFor('KKILR','30L','30').type === 'none'
    && rcv('KKILR','12R').pos === 'S');
  /* Near and far belong to the flow, not the gate: a near gate drops onto the
     final, a far one has to be vectored to it, so the answer reverses between
     the 12s and the 30s. */
  assert('on a 12s the near gates are TORGY and BAINY',
    ['TORGY','BAINY'].every(g => globalThis.DD.nearFarFor('12', g) === 'near')
    && ['NITZR','BLUEM','KKILR','MUSCL'].every(g => globalThis.DD.nearFarFor('12', g) === 'far'));
  assert('and running the 30s it reverses',
    ['TORGY','BAINY'].every(g => globalThis.DD.nearFarFor('30', g) === 'far')
    && ['NITZR','BLUEM','KKILR','MUSCL'].every(g => globalThis.DD.nearFarFor('30', g) === 'near'));
  assert('the floors are derived from that rather than written out twice',
    Object.keys(globalThis.DD.ROUTES).every(g =>
      globalThis.DD.FLOORS[g] === globalThis.DD.floorFor('12', g)
      && globalThis.DD.FLOORS[g] === (globalThis.DD.nearFarFor('12', g) === 'near' ? 7000 : 8000)),
    JSON.stringify(globalThis.DD.FLOORS));
  assert('a configuration the order never assigns gates for answers with nothing',
    globalThis.DD.nearFarFor('4', 'TORGY') === null && globalThis.DD.floorFor('22', 'BAINY') === null);
  /* the tell that the reading is right: each 4-5 carve-out names the class
     KKILR actually has in that configuration, and neither is a no-op */
  assert('KKILR is far on the 12s and near on the 30s, which is what the carve-outs assume',
    globalThis.DD.nearFarFor('12','KKILR') === 'far'
    && globalThis.DD.nearFarFor('30','KKILR') === 'near'
    && globalThis.DD.CROSSOVER_EXEMPT.some(e => e.rwy === '12R' && e.kind === 'far')
    && globalThis.DD.CROSSOVER_EXEMPT.some(e => e.rwy === '30L' && e.kind === 'near'));
  assert('every position resolves to the name SOP 2-1 gives it',
    globalThis.DD.posName('I') === 'North Feeder' && globalThis.DD.posName('S') === 'South Arrival'
    && globalThis.DD.sideOfPos('I') === 'N' && globalThis.DD.sideOfPos('S') === 'S');

  assert('feederFor answers per configuration',
    globalThis.DD.feederFor('12','KKILR') === 'I' && globalThis.DD.feederFor('12','NITZR') === 'H'
    && globalThis.DD.feederFor('17-22','TORGY') === 'I',
    [globalThis.DD.feederFor('12','KKILR'), globalThis.DD.feederFor('17-22','TORGY')].join('/'));

  /* Table 1 heading bands as the receiving ZMP sector */
  assert('Table 1 places the SIDs that fall in a band',
    globalThis.DD.zmpSectorFor(159).sector === 'Sector 07'
    && globalThis.DD.zmpSectorFor(59).sector === 'Sector 06'
    && globalThis.DD.zmpSectorFor(210).sector === 'Sector 08');
  assert('a bearing between the bands names no sector rather than rounding into one',
    globalThis.DD.zmpSectorFor(311) === null && globalThis.DD.zmpSectorFor(135) === null);
  assert('a departure receiver names its sector where Table 1 supports one',
    globalThis.DD.receiverFor(globalThis.DD.mkAc({cs:'D9', type:'B738', role:'departure',
      sid:'WLSTN', fromStart:5, alt:12000, ias:280})).name.indexOf('Sector 06') >= 0);

  /* charted obstructions — SOP 8-1 */
  assert('all seven obstructions are carried', globalThis.DD.OBSTRUCTIONS.length === 7);
  assert('Arden Hills / Shoreview is at MSP 018/011 and 2,438 feet, and is the watched one',
    globalThis.DD.OBSTRUCTIONS.some(o => o.r === 18 && o.d === 11 && o.ft === 2438 && o.watch));

  /* Departure Dispersal Area verticals — the altitudes are known, the shape is not */
  assert('the four dispersal-area slices are carried with their citations',
    globalThis.DD.DDA_VERTICALS.length === 4
    && globalThis.DD.DDA_VERTICALS.every(v => v.src.indexOf('LOA 5.a') >= 0));

  /* the dispersal area's lateral shape, traced off the chart 2026-08-31 */
  const dda = globalThis.DD.ddaFor('12');
  assert('the 12 and 12-17 dispersal area carries a traced polygon',
    !!dda && dda.poly.length >= 12 && dda.cfgs.indexOf('12-17') >= 0
    && dda.src.toLowerCase().indexOf('traced') >= 0,
    dda ? dda.poly.length + ' vertices' : 'no area');
  assert('its outer edge is the arc the chart draws, near 11.4 NM',
    Math.abs(dda.arc - 11.4) < 0.1
    && dda.poly.filter(p => Math.abs(p[1] - dda.arc) < 0.15).length >= 8);
  assert('the sector runs from the Class B edge round to the southwest',
    Math.min(...dda.poly.map(p => p[0])) === 74
    && Math.max(...dda.poly.map(p => p[0])) === 218);
  const at = (b, d) => globalThis.DD.inDDA(d * Math.sin(b * Math.PI / 180), d * Math.cos(b * Math.PI / 180));
  assert('a point in the southeast fan is inside it', at(140, 10) && at(150, 8) && at(120, 6));
  assert('the far side of the field and beyond the arc are outside',
    !at(300, 8) && !at(10, 5) && !at(150, 13) && !at(140, 20),
    [at(300, 8), at(10, 5), at(150, 13), at(140, 20)].join('/'));
  /* every arrival gate stream can actually be generated */
  {
    const gates = Object.keys(globalThis.DD.ROUTES);
    const seen = {}; let bad = 0, wrong = 0;
    for (const g of gates) {
      for (let s = 0; s < 12; s++) {
        const d = globalThis.ddb.gen({seed: s * 7 + 1, mixGates: [g], count: 3,
          focus: ['free','sep','floors','speed','posthandoff','maintain'][s % 6],
          pressure: ['routine','compressed','saturated'][s % 3]});
        const v = globalThis.ddb.validate(d);
        if (v.errors && v.errors.length) bad++;
        for (const a of d.ac) if (a.gate) { seen[a.gate] = true; if (a.gate !== g) wrong++; }
      }
    }
    assert('a single-gate stream generates cleanly for all six gates',
      Object.keys(seen).length === gates.length && bad === 0 && wrong === 0,
      Object.keys(seen).sort().join(',') + ' errs=' + bad + ' wrong=' + wrong);
    const all = {};
    for (let s = 0; s < 40; s++) {
      const d = globalThis.ddb.gen({seed: s * 13 + 5, mixGates: gates.slice(), count: 3});
      for (const a of d.ac) if (a.gate) all[a.gate] = true;
    }
    assert('an all-gates mix reaches every gate rather than the first few',
      Object.keys(all).length === gates.length, Object.keys(all).sort().join(','));
    const ids = globalThis.ddb.mixOptions().map(o => o.id);
    assert('the gate control offers the seat’s own gates, the other Feeder’s, and one stream per gate',
      ids.indexOf('mine') >= 0 && ids.indexOf('all') >= 0
      && gates.every(g => ids.indexOf('g:' + g) >= 0));
    /* when only one Feeder is being worked the other half is offered separately;
       when both are, there is no "other Feeder" entry and mine is already all */
    const mine = globalThis.ddb.mixGates('mine');
    const theirs = ids.indexOf('theirs') >= 0 ? globalThis.ddb.mixGates('theirs') : [];
    assert('the seat’s gates and the other Feeder’s together account for every gate',
      mine.concat(theirs).sort().join(',') === gates.slice().sort().join(','),
      mine.join('+') + ' / ' + theirs.join('+'));
  }

  assert('no gate sits inside it — the ladders stay clear',
    Object.keys(globalThis.DD.ROUTES).every(g => {
      const r = globalThis.DD.ROUTES[g], p = r[0];
      return !globalThis.DD.inDDA(p.e, p.n);
    }));
  assert('a configuration the shape was not traced for answers with nothing',
    globalThis.DD.ddaFor('4-35') === null && globalThis.DD.ddaFor('30') === null);

  assert('all nine turbojet SIDs are in the departure data',
    Object.keys(globalThis.DD.DEPS).length === 9, Object.keys(globalThis.DD.DEPS).join(','));
  const SID_DME = {COULT:{TAXEE:34,COULT:48}, KBREW:{HRBEK:35,HOMUR:47}, LEINY:{TONCA:17,BOTNE:34,KUUGL:48},
    ORSKY:{JURNY:20,RUMLE:33,PEDLN:48}, RST:{FOBUG:30,DOKTR:41,CORDY:50}, SCHEP:{HUGIR:20,MCONL:32,ARREX:48},
    SMERF:{ZOGAP:29,PAGOZ:48}, WLSTN:{SNINE:33,DWIYT:47}, ZMBRO:{JEDET:34,ZMBRO:47}};
  Object.keys(SID_DME).forEach(k => globalThis.DD.DEPS[k].forEach(p => {
    if (!SID_DME[k][p.f]) return;
    const d = Math.sqrt(p.e*p.e + p.n*p.n);
    if (Math.abs(d - SID_DME[k][p.f]) > 1.5)
      fail('SID join distance', k + '/' + p.f + ' plots at ' + d.toFixed(1) + ', reference says ' + SID_DME[k][p.f]);
  }));
  ok('every SID join fix plots at its published distance');
  assert('the release rule is 25 DME or leaving 11,000',
    globalThis.DD.DEP_RELEASE.dme === 25 && globalThis.DD.DEP_RELEASE.alt === 11000);

  /* ============ 3a-b. Departure gates and scratchpad #1 — M98 7110.26A ============ */
  /* A gate is the fix a departure exits M98 through, and several SIDs share one.
     Scratchpad #1 is the gate letter plus the two-digit altitude in thousands. */
  const GATES = globalThis.DD.DEP_GATES;
  assert('eight departure gates', Object.keys(GATES).length === 8);
  assert('the gate letters are the 7110.26A set',
    Object.keys(GATES).sort().join() === 'A,B,D,E,F,N,O,R');
  assert('the two dual-fix gates carry their alternate',
    GATES.B.alt === 'DLH' && GATES.O.alt === 'FOD');
  assert('every gate names a fix', Object.values(GATES).every(g => !!g.fix));

  const SG = globalThis.DD.SID_GATE;
  assert('every SID in DEPS has a gate record',
    Object.keys(SG).sort().join() === Object.keys(globalThis.DD.DEPS).sort().join());
  assert('every lettered SID points at a real gate',
    Object.values(SG).filter(g => g.gate).every(g => !!GATES[g.gate]));
  assert('a SID gate fix matches that gate primary or alternate',
    Object.values(SG).filter(g => g.gate)
      .every(g => GATES[g.gate].fix === g.fix || GATES[g.gate].alt === g.fix));
  assert('every SID carries the bearing the mapping was derived from',
    Object.values(SG).every(g => typeof g.brg === 'number' && g.brg >= 0 && g.brg < 360));

  /* SMERF and LEINY are drawn on the chart without a gate letter and are absent
     from the 7110.26A list. They must stay null rather than being assigned one. */
  assert('SMERF has no gate letter', globalThis.DD.gateForSid('SMERF') === null);
  assert('LEINY has no gate letter', globalThis.DD.gateForSid('LEINY') === null);
  assert('exactly two SIDs are ungated',
    Object.values(SG).filter(g => g.gate === null).length === 2);
  /* gates A and B are real but no turbojet SID in this set uses them */
  assert('gates A and B are used by no SID in the turbojet set',
    !Object.values(SG).some(g => g.gate === 'A' || g.gate === 'B'));

  assert('COULT exits the DLL gate', globalThis.DD.gateForSid('COULT') === 'D');
  assert('KBREW exits the FAR gate', globalThis.DD.gateForSid('KBREW') === 'F');
  assert('ZMBRO exits the ODI gate', globalThis.DD.gateForSid('ZMBRO') === 'N');
  assert('ORSKY and SCHEP share the O gate',
    globalThis.DD.gateForSid('ORSKY') === 'O' && globalThis.DD.gateForSid('SCHEP') === 'O',
    'a gate consists of several SIDs — this is the case that proves it');

  /* the chart's own datablock example is BMJ59 / E11 — WLSTN out the EAU gate at 11,000 */
  assert('scratchpad #1 reproduces the chart example E11',
    globalThis.DD.scratchpadFor('WLSTN', 11000) === 'E11',
    globalThis.DD.scratchpadFor('WLSTN', 11000));
  assert('scratchpad #1 zero-pads a single-digit altitude',
    globalThis.DD.scratchpadFor('COULT', 9000) === 'D09');
  /* With no altitude the order's form (b) applies — the THREE-LETTER gate. A bare
     letter would be one character and CRC will not take it (3-4 alphanumeric). */
  assert('scratchpad #1 falls back to the three-letter gate, not a bare letter',
    globalThis.DD.scratchpadFor('RST') === 'RST');
  assert('the three-letter fallback is the SID own exit fix',
    globalThis.DD.scratchpadFor('ORSKY') === 'FOD',
    globalThis.DD.scratchpadFor('ORSKY'));
  /* every generated entry must be enterable in the client */
  assert('every generated scratchpad is a valid CRC entry',
    Object.keys(SG).filter(s => SG[s].gate)
      .every(s => globalThis.DD.scratchpadValid(globalThis.DD.scratchpadFor(s, 11000))
                && globalThis.DD.scratchpadValid(globalThis.DD.scratchpadFor(s))));
  assert('scratchpadValid rejects a bare gate letter', !globalThis.DD.scratchpadValid('R'));
  assert('scratchpadValid rejects an over-long entry', !globalThis.DD.scratchpadValid('ABCDE'));
  assert('scratchpad #1 is null for a SID with no gate, never invented',
    globalThis.DD.scratchpadFor('SMERF', 12000) === null);

  /* ============ 3b. Wake class comes off the type, not off a dropdown ============ */
  const wk = globalThis.DD.wakeOf;
  assert('super is recognised', wk('A388').cls === 'super' && wk('A388').heavy);
  assert('heavy is by weight', wk('A339').heavy && wk('B763').heavy && wk('B77W').heavy);
  assert('the 757 is a large that carries its own note',
    wk('B752').cls === 'large' && !wk('B752').heavy && wk('B752').note, wk('B752').label);
  assert('narrowbodies are large and light singles are small',
    wk('B738').cls === 'large' && wk('C172').cls === 'small');
  assert('an unknown type tags NOWGT rather than guessing',
    wk('ZZZZ').cls === 'nowgt' && wk('ZZZZ').known === false && wk('ZZZZ').note.indexOf('10 NM') >= 0);
  assert('the engine derives wake and ignores any wake handed to it',
    globalThis.DD.mkAc({cs:'X1', type:'B738', wake:'H', gate:'NITZR', dtgEnd:20, alt:12000, ias:280}).wake === ''
    && globalThis.DD.mkAc({cs:'X2', type:'A339', gate:'NITZR', dtgEnd:20, alt:12000, ias:280}).wake === 'H');

  /* ============ 3c. Scope layers ============ */
  globalThis.ddLoad('resume10r');
  const polys = () => (el('dd-scopebox').innerHTML.match(/<polyline/g) || []).length;
  globalThis.ddLayers('tracked'); const lTracked = polys();
  globalThis.ddLayers('stars');   const lStars = polys();
  globalThis.ddLayers('sids');    const lSids = polys();
  globalThis.ddLayers('both');    const lBoth = polys();
  globalThis.ddLayers('off');     const lOff = polys();
  assert('tracked draws only the routes in use', lTracked === 3, lTracked);
  assert('all STARs draws all six ladders', lStars === 6, lStars);
  assert('all SIDs adds the nine SIDs without hiding the tracked ladders', lSids === 3 + 9, lSids);
  assert('all SIDs and STARs draws everything', lBoth === 6 + 9, lBoth);
  assert('off draws no route geometry at all', lOff === 0, lOff);
  globalThis.ddLayers('tracked');

  /* ============ 3d. Flight rules and route ============ */
  assert('a route is the fix sequence from the reference data, with no invented procedure name',
    globalThis.DD.routeTextFor({role:'arrival', gate:'NITZR'}) === 'NITZR WRSAW DAHRL GDNEE ELLKO SAVVG GREAK TIETN'
    && globalThis.DD.routeTextFor({role:'departure', sid:'WLSTN'}) === 'MSP SNINE DWIYT GRB',
    globalThis.DD.routeTextFor({role:'departure', sid:'WLSTN'}));
  const ifrAc = globalThis.DD.mkAc({cs:'DAL1', type:'B738', gate:'NITZR', dtgEnd:20, alt:12000, ias:280});
  assert('a strip defaults to IFR and fills its own route',
    ifrAc.rules === 'IFR' && ifrAc.filed.indexOf('NITZR') === 0, ifrAc.rules + ' ' + ifrAc.filed);
  assert('the filed route never collides with the geometric track',
    Array.isArray(ifrAc.route) && typeof ifrAc.filed === 'string');
  const vfrAc = globalThis.DD.mkAc({cs:'N23V', type:'C172', role:'overflight', rules:'VFR',
    entry:{r:200,d:36}, exit:{r:40,d:36}, alt:4500, ias:120});
  assert('VFR is carried through and gets no route invented for it',
    vfrAc.rules === 'VFR' && vfrAc.filed === '', vfrAc.rules + ' ' + JSON.stringify(vfrAc.filed));

  /* ============ 3d-b. Who is on the other side of the boundary ============ */
  assert('the RST boundary is the three owner-supplied radial/DME points',
    JSON.stringify(globalThis.DD.RST_BOUNDARY) === '[[185,38],[158,41],[149,40]]',
    JSON.stringify(globalThis.DD.RST_BOUNDARY));
  assert('RST owns 9,000 and below inside the arc',
    globalThis.DD.neighbourAt(158, 6500).pos === 'RST'
    && globalThis.DD.neighbourAt(158, 9000).pos === 'RST');
  assert('Center owns above 9,000 on the same bearing',
    globalThis.DD.neighbourAt(158, 9500).pos === 'ZMP'
    && globalThis.DD.neighbourAt(158, 12000).pos === 'ZMP');
  assert('the arc ends where the boundary points end',
    globalThis.DD.neighbourAt(149, 7000).pos === 'RST'
    && globalThis.DD.neighbourAt(185, 7000).pos === 'RST'
    && globalThis.DD.neighbourAt(148, 7000).pos === 'ZMP'
    && globalThis.DD.neighbourAt(186, 7000).pos === 'ZMP');
  assert('everything else around M98 is Center at any altitude',
    [0, 45, 90, 270, 300].every(b => globalThis.DD.neighbourAt(b, 4000).pos === 'ZMP'));

  /* Rochester is not 24 hours — closed, the delegated airspace reverts to
     Center Sector 07 (M98/RST LOA 4.a, ZMP/RST LOA 6.B) */
  assert('the closed owner is Center Sector 07', globalThis.DD.RST_CLOSED_OWNER === 'ZMP Sector 07');
  globalThis.DD.setRstOpen(false);
  const shut = globalThis.DD.neighbourAt(158, 7000);
  assert('with Rochester closed that corner is Center top to bottom',
    shut.pos === 'ZMP' && shut.name === 'ZMP Sector 07' && shut.why.indexOf('4.a') >= 0, shut.why);
  assert('and nothing inside the arc goes to RST at any altitude',
    [3000, 5000, 7000, 9000].every(al => globalThis.DD.neighbourAt(158, al).pos === 'ZMP'));
  globalThis.DD.setRstOpen(true);
  assert('reopening restores it', globalThis.DD.neighbourAt(158, 7000).pos === 'RST');

  /* the LOA numbers */
  assert('M98 enters RST airspace at 3, 5, 7 or 9 only — LOA 5.b(1)',
    JSON.stringify(globalThis.DD.RST_ENTRY_ALTS) === '[3000,5000,7000,9000]');
  assert('RST enters overflights at 4, 6 or 8 — LOA 5.a(6)',
    JSON.stringify(globalThis.DD.RST_OVF_ALTS) === '[4000,6000,8000]');
  assert('Rochester answers on 119.8 or 119.2 — LOA 5.b(3)',
    JSON.stringify(globalThis.DD.RST_FREQS) === '["119.8","119.2"]');
  assert('the RST receiver carries its frequency',
    globalThis.DD.neighbourAt(158, 7000).frq === '119.8');
  /* the RST departure is the only one that leaves through that arc */
  const lowRst = globalThis.DD.mkAc({cs:'D1', type:'B738', role:'departure', sid:'RST', fromStart:5, alt:6000, ias:250});
  const highRst = globalThis.DD.mkAc({cs:'D2', type:'B738', role:'departure', sid:'RST', fromStart:5, alt:12000, ias:280});
  assert('a low RST departure goes to Rochester and a high one to Center',
    globalThis.DD.receiverFor(lowRst).pos === 'RST' && globalThis.DD.receiverFor(highRst).pos === 'ZMP',
    globalThis.DD.receiverFor(lowRst).pos + '/' + globalThis.DD.receiverFor(highRst).pos);
  assert('no other SID leaves through the RST arc',
    Object.keys(globalThis.DD.DEPS).filter(k => {
      const p = globalThis.DD.DEPS[k][globalThis.DD.DEPS[k].length - 1];
      return globalThis.DD.neighbourAt((Math.atan2(p.e, p.n) * 180 / Math.PI + 360) % 360, 6000).pos === 'RST';
    }).join(',') === 'RST');

  /* ============ 3e. Radar service — handed off, or calling you cold ============ */
  const handed = globalThis.DD.mkAc({cs:'N77CM', type:'SR22', role:'overflight', rules:'VFR',
    radar:'established', from:'Rochester approach', entry:{r:150,d:36}, exit:{r:330,d:36}, alt:5500, ias:150});
  const cold = globalThis.DD.mkAc({cs:'N23V', type:'C172', role:'overflight', rules:'VFR',
    radar:'none', entry:{r:200,d:36}, exit:{r:40,d:36}, alt:4500, ias:120});
  assert('a handoff arrives identified', handed.identified === true && handed.from === 'Rochester approach');
  assert('a cold call arrives with nothing on it',
    cold.identified === false && cold.squawk === null, JSON.stringify({id:cold.identified, sq:cold.squawk}));
  const handedIfr = globalThis.DD.mkAc({cs:'D1', type:'B738', gate:'NITZR', dtgEnd:20, alt:12000, ias:280});
  assert('an IFR strip is established unless it is a pop-up — identified, and on a clearance',
    handedIfr.identified === true && handedIfr.popup === false && handedIfr.ifrCleared === true,
    JSON.stringify({id:handedIfr.identified, pop:handedIfr.popup, clr:handedIfr.ifrCleared}));
  const popIfr = globalThis.DD.mkAc({cs:'N6398G', type:'C172', role:'overflight', rules:'IFR', radar:'none',
    entry:{r:200,d:36}, exit:{r:40,d:36}, alt:4500, ias:120});
  assert('a pop-up IFR has none of the three',
    popIfr.identified === false && popIfr.popup === true && popIfr.ifrCleared === false);
  assert('a VFR cold call is not a pop-up and owes no clearance',
    cold.popup === false && cold.ifrCleared === false);

  /* five radar-service states, and only the ones a job can legally be in */
  assert('all five radar states exist',
    ['established','departure','popup','following','none']
      .every(s => !!globalThis.DD.RADAR_STATES[s]));
  assert('an IFR arrival is a handoff or a pop-up, and never wants flight following',
    globalThis.DD.radarStatesFor('arrival','IFR').join(',') === 'established,popup');
  assert('an IFR departure is off the tower or handed off, and never a pop-up',
    globalThis.DD.radarStatesFor('departure','IFR').join(',') === 'departure,established');
  assert('a VFR aircraft can be picking up flight following',
    globalThis.DD.radarStatesFor('overflight','VFR').indexOf('following') >= 0);
  const offTwr = globalThis.DD.mkAc({cs:'DAL77', type:'B738', role:'departure', rules:'IFR',
    radar:'departure', sid:'COULT', dep:'KMSP', depRwy:'12R', alt:3000, ias:210, fromStart:3, squawk:'4231'});
  assert('one off the tower has a clearance and a code but is not identified yet',
    offTwr.identified === false && offTwr.squawk === '4231' && offTwr.ifrCleared === true
    && offTwr.popup === false,
    JSON.stringify({id:offTwr.identified, sq:offTwr.squawk, clr:offTwr.ifrCleared}));
  const ff = globalThis.DD.mkAc({cs:'N11AB', type:'C172', role:'overflight', rules:'VFR',
    radar:'following', entry:{r:140,d:30}, exit:{r:320,d:30}, alt:4500, ias:110});
  assert('one picking up flight following has nothing on it yet',
    ff.following === true && ff.identified === false && ff.squawk === null);
  assert('a stored drill from before the five states still reads correctly',
    globalThis.DD.normRadar('none','IFR','arrival') === 'popup'
    && globalThis.DD.normRadar('none','VFR','overflight') === 'none'
    && globalThis.DD.normRadar('established','IFR','arrival') === 'established');

  /* handed off by follows the job */
  assert('a departure is handed off by the tower at the field it left',
    globalThis.DD.towerHandoffFor('KMSP').name === 'Minneapolis Tower'
    && globalThis.DD.towerHandoffFor('KSTP').name === 'St. Paul Tower'
    && globalThis.DD.towerHandoffFor('KSTP').frq === '119.1');

  /* runways come off the airport, and every one of them is offered */
  assert('MSP carries all four runway pairs',
    globalThis.DD.runwaysAt('KMSP').join(' ') === '12L 12R 30L 30R 4 22 17 35');
  assert('the satellites carry their own inventories, with MIC corrected',
    globalThis.DD.runwaysAt('KMIC').join(' ') === '6L 6R 24L 24R 14 32'
    && globalThis.DD.runwaysAt('KMIC').indexOf('14R') < 0
    && globalThis.DD.runwaysAt('KSTP').join(' ') === '14 32 13 31 9 27'
    && globalThis.DD.runwaysAt('KANE').join(' ') === '9 27 18 36');
  assert('satellite IFR initial altitudes are per runway where the order makes them so',
    globalThis.DD.initAltAt('KFCM','28L') === 3000 && globalThis.DD.initAltAt('KFCM','10R') === 2500
    && globalThis.DD.initAltAt('KANE','27') === 3000 && globalThis.DD.initAltAt('KMSP','12R') === null);
  assert('only the parallels name a side of the localizer',
    globalThis.DD.sideOfRunway('12L') === 'N' && globalThis.DD.sideOfRunway('30L') === 'S'
    && globalThis.DD.sideOfRunway('17') === null);

  /* an arrival has to be one that actually ends at the field it is landing at */
  assert('the six RNAV gates and KASPR are MSP arrivals and nothing else',
    ['NITZR','BLUEM','TORGY','KKILR','MUSCL','BAINY','KASPR'].every(g =>
      globalThis.DD.ARRIVALS[g].serves.join(',') === 'KMSP'));
  assert('BLUEM into a satellite is refused — the bug this table exists to stop',
    globalThis.DD.arrivalServes('BLUEM','KMSP') === true
    && globalThis.DD.arrivalServes('BLUEM','KSTP') === false);
  assert('AGUDE and ENCEE funnel to the GEP hub and reach every satellite field',
    globalThis.DD.SAT_FIELDS.every(f => globalThis.DD.arrivalServes('AGUDE', f)
                                     && globalThis.DD.arrivalServes('ENCEE', f))
    && globalThis.DD.arrivalServes('AGUDE','KMSP') === false);
  assert('TWOLF terminates at KEWTY and feeds only the southern satellites',
    globalThis.DD.ARRIVALS.TWOLF.serves.join(',') === 'KFCM,KLVN'
    && globalThis.DD.arrivalServes('TWOLF','KSTP') === false);
  assert('GOPHER ONE off the GEP VOR is the one that serves MSP and the satellites both',
    globalThis.DD.arrivalServes('GEP','KMSP') && globalThis.DD.arrivalServes('GEP','KMIC'));
  assert('the arrivals offered for a field are exactly the ones that serve it',
    globalThis.DD.arrivalsFor('KSTP').join(',') === 'GEP,AGUDE,ENCEE'
    && globalThis.DD.arrivalsFor('KFCM').join(',') === 'GEP,AGUDE,ENCEE,TWOLF',
    globalThis.DD.arrivalsFor('KSTP').join(','));
  /* the satellite ladders, and the entries that do not fly one at all */
  assert('the three satellite STARs are carried and fly',
    ['AGUDE','ENCEE','TWOLF'].every(k => globalThis.DD.SAT_ROUTES[k]
      && globalThis.DD.SAT_ROUTES[k].total > 30 && globalThis.DD.ARRIVALS[k].flies));
  assert('they are kept out of ROUTES, which stays the six MSP gates',
    Object.keys(globalThis.DD.ROUTES).length === 6
    && ['AGUDE','ENCEE','TWOLF'].every(k => !globalThis.DD.ROUTES[k]));
  assert('AGUDE and ENCEE end on the GEP VOR, TWOLF on KEWTY',
    globalThis.DD.SAT_ROUTES.AGUDE.slice(-1)[0].f === 'GEP'
    && globalThis.DD.SAT_ROUTES.ENCEE.slice(-1)[0].f === 'GEP'
    && globalThis.DD.SAT_ROUTES.TWOLF.slice(-1)[0].f === 'KEWTY');
  assert('the crossings split jets from turboprops the way Table 4 does',
    globalThis.DD.SAT_ROUTES.AGUDE[0].at === 8000 && globalThis.DD.SAT_ROUTES.AGUDE[0].atProp === 6000
    && globalThis.DD.SAT_ROUTES.ENCEE.filter(p => p.f === 'RIXIE')[0].at === 8000
    && globalThis.DD.SAT_ROUTES.ENCEE.filter(p => p.f === 'RIXIE')[0].atProp === 7000
    && globalThis.DD.SAT_ROUTES.TWOLF.filter(p => p.f === 'TRGET')[0].at === 7000);
  assert('the GEP VOR plots where the SID data already puts it',
    Math.abs(globalThis.DD.SAT_ROUTES.AGUDE.slice(-1)[0].lat - globalThis.DD.DEPS.KBREW[1].lat) < 0.001
    && Math.abs(globalThis.DD.SAT_ROUTES.AGUDE.slice(-1)[0].lon - globalThis.DD.DEPS.KBREW[1].lon) < 0.001);

  /* the non-STAR entries — ZMP-M98 LOA 3g */
  assert('the direct satellite entries are carried with their citations',
    Object.keys(globalThis.DD.SAT_DIRECT).length === 5
    && Object.keys(globalThis.DD.SAT_DIRECT).every(k =>
         /LOA (3g|4\.g)/.test(globalThis.DD.SAT_DIRECT[k].src)
         && globalThis.DD.SAT_DIRECT[k].alt > 0));
  assert('each one only reaches the fields the agreement gives it',
    globalThis.DD.SAT_DIRECT.SECT10.serves.join(',') === 'KFCM'
    && globalThis.DD.SAT_DIRECT.RGK.serves.join(',') === 'KFCM,KLVN'
    && globalThis.DD.arrivalServes('SECT10','KSTP') === false);
  {
    const r = globalThis.DD.satDirectRoute('RGK', {r:140, d:36}, 'KFCM');
    assert('a direct routing builds a track from the boundary through its via fix to the field',
      r && r.length === 3 && r[1].f === 'FGT' && r[2].f === 'FCM' && r.total > 20,
      r ? r.map(p => p.f).join('>') + ' ' + r.total.toFixed(1) : 'null');
  }

  /* a satellite arrival belongs to its field's seat, and folds when it is closed */
  {
    globalThis.ddbPreset('full');
    const mic = globalThis.DD.receiverFor(globalThis.DD.mkAc({cs:'T', type:'CRJ2', role:'arrival',
      gate:'AGUDE', dest:'KMIC', alt:11000, ias:280, dtgEnd:20}));
    assert('with the satellites open it goes to the seat that owns the field',
      mic.pos === 'K' && mic.frq === '126.5', mic.pos + '/' + mic.frq);
    globalThis.ddbPreset('standard');
    const folded = globalThis.DD.receiverFor(globalThis.DD.mkAc({cs:'T', type:'CRJ2', role:'arrival',
      gate:'AGUDE', dest:'KMIC', alt:11000, ias:280, dtgEnd:20}));
    assert('and folds through the combining chain when that seat is closed',
      folded.pos !== 'K' && !!folded.frq, folded.pos);
  }
  assert('each satellite field belongs to the seat SOP 6-2 puts it in',
    globalThis.DD.satSeatFor('KFCM') === 'E' && globalThis.DD.satSeatFor('KLVN') === 'E'
    && globalThis.DD.satSeatFor('KMIC') === 'K' && globalThis.DD.satSeatFor('KANE') === 'K'
    && globalThis.DD.satSeatFor('KSTP') === 'G');
  assert('Airlake is carried without inventing a runway inventory for it',
    globalThis.DD.runwaysAt('KLVN').length === 0);
  {
    const bad = globalThis.ddb.gen({seed:7, mixGates:['BLUEM'], count:1});
    bad.ac[0].dest = 'KSTP';
    const v = globalThis.ddb.validate(bad);
    assert('and the builder refuses that strip, naming what would serve the field',
      v.errors.some(e => e.indexOf('does not serve that field') >= 0 && e.indexOf('AGUDE') >= 0),
      v.errors.join(' | '));
  }

  /* D-ATIS — the paste path, which is the one that works with no network */
  {
    const coded = globalThis.ddb.parseDatis(
      'KMSP ATIS INFO J 1553Z. 15009KT 10SM FEW050 BKN250 22/12 A2980. ' +
      'ILS RWY 12L, ILS RWY 12R APCHS IN USE. LNDG RWY 12L, 12R. DEPTG RWY 12L, 12R.');
    assert('the coded D-ATIS gives the flow and the whole observation',
      coded.cfg === '12' && coded.wind === '150/9' && coded.vis === 10
      && coded.ceil === 25000 && coded.altim === '2980' && coded.atis === 'J'
      && coded.missed.length === 0,
      JSON.stringify(coded));
    const spoken = globalThis.ddb.parseDatis(
      'MINNEAPOLIS INFORMATION K. 1753Z. WIND 310 AT 14 GUSTS TO 22. VISIBILITY 3. ' +
      'SKY CONDITION OVERCAST 1200. ALTIMETER 2 9 8 5. LANDING RUNWAYS 30L AND 30R. ' +
      'DEPARTING RUNWAYS 30L AND 30R.');
    assert('and so does the spoken one, gusts and spaced altimeter included',
      spoken.cfg === '30' && spoken.wind === '310/14G22' && spoken.vis === 3
      && spoken.ceil === 1200 && spoken.altim === '2985',
      JSON.stringify(spoken));
    assert('the departures break the tie between configurations that land the same runways',
      globalThis.ddb.parseDatis('KMSP INFO B. 15012KT 10SM SCT040 A3001. LNDG RWY 12L, 12R. DEPTG RWY 12L, 12R, 17.').cfg === '12-17'
      && globalThis.ddb.parseDatis('KMSP INFO C. 30005KT 10SM CLR A2995. LNDG RWY 30L, 30R. DEPTG RWY 12L, 12R.').cfg === '30/12'
      && globalThis.ddb.parseDatis('KMSP INFO D. 34015KT 3SM OVC018 A2970. LNDG RWY 30L, 30R, 35. DEPTG RWY 30L, 30R.').cfg === '30-35');
    assert('few and scattered are not a ceiling, so that sky is unlimited',
      globalThis.ddb.parseDatis('KMSP INFO B. 15012KT 10SM SCT040 A3001. LNDG RWY 12L, 12R.').ceil === 12000);
    assert('calm reads as calm and a fractional visibility survives',
      globalThis.ddb.parseDatis('KMSP INFO E. 00000KT 1 1/2SM BR OVC004 A2988. LNDG RWY 12L, 12R.').wind === 'calm'
      && globalThis.ddb.parseDatis('KMSP INFO E. 00000KT 1 1/2SM BR OVC004 A2988. LNDG RWY 12L, 12R.').vis === 1.5);
    assert('what it could not read is listed rather than guessed at',
      globalThis.ddb.parseDatis('KMSP INFO F. LNDG RWY 12L, 12R.').missed.join(',').indexOf('wind') >= 0);
    assert('and nothing at all comes back as nothing',
      globalThis.ddb.parseDatis('') === null && globalThis.ddb.parseDatis('   ') === null);
    assert('the source unwrapper takes a bare string or the array the APIs return',
      globalThis.ddb.datisText('RAW TEXT') === 'RAW TEXT'
      && globalThis.ddb.datisText([{airport:'KMSP', datis:'FROM THE ARRAY'}]) === 'FROM THE ARRAY');
    /* MSP runs a split broadcast and buries closed runways in the notices —
       both are how the real field reads, so both are covered here */
    assert('both halves of a split D-ATIS come back, not just the first',
      globalThis.ddb.datisText([{type:'arr', datis:'AAA'}, {type:'dep', datis:'BBB'}]).indexOf('AAA') >= 0
      && globalThis.ddb.datisText([{type:'arr', datis:'AAA'}, {type:'dep', datis:'BBB'}]).indexOf('BBB') >= 0);
    {
      const live = globalThis.ddb.parseDatis(
        'MSP ARR INFO J 0353Z. 22003KT 10SM CLR 25/18 A2992 RMK AO2. VISUAL RWY 30L APCH IN USE. ' +
        'NOTICE TO AIRMEN. RWYS 12L, 30R CLSD, RWYS 4, 22 CLSD.\n\n' +
        'MSP DEP INFO W 0353Z. 22003KT 10SM CLR A2992. DEPARTING RWY 30L. NOTICE TO AIRMEN. RWYS 12L, 30R CLSD.');
      assert('the approach in use reads even when the runway sits ahead of the phrase',
        live.land.join(',') === '30L' && live.dep.join(',') === '30L', JSON.stringify(live.land));
      assert('runways named as closed in the notices are never read as in use',
        live.land.indexOf('12L') < 0 && live.land.indexOf('4') < 0 && live.land.indexOf('22') < 0);
      assert('each broadcast keeps its own information letter',
        live.atis === 'J' && live.atisDep === 'W');
      assert('a single advertised runway still matches its flow, and says it was a subset',
        live.cfg === '30' && live.partial === true);
    }
    /* the tool is offline first, so each broadcast gets pasted on its own */
    {
      const sp = globalThis.ddb.datisSplit([
        {airport:'KMSP', type:'arr', code:'J', datis:'MSP ARR INFO J. VISUAL RWY 12L, 12R APCH IN USE.'},
        {airport:'KMSP', type:'dep', code:'W', datis:'MSP DEP INFO W. DEPARTING RWY 12L, 12R, 17.'}]);
      assert('a fetched payload sorts into the arrival box and the departure box',
        sp.arr.indexOf('ARR INFO J') >= 0 && sp.dep.indexOf('DEP INFO W') >= 0);
      assert('an untagged payload is sorted on what the text calls itself',
        globalThis.ddb.datisSplit([{datis:'MSP DEP INFO W. DEPARTING RWY 30L.'}]).dep.indexOf('DEP INFO W') >= 0);
      const both = globalThis.ddb.parseDatis(globalThis.ddb.datisJoined(
        {datisArr:'MSP ARR INFO J. 22003KT 10SM CLR A2992. VISUAL RWY 12L, 12R APCH IN USE.',
         datisDep:'MSP DEP INFO W. DEPARTING RWY 12L, 12R, 17.'}));
      assert('the two boxes together settle a configuration one alone cannot',
        both.cfg === '12-17' && both.atis === 'J' && both.atisDep === 'W', JSON.stringify(both.cfg));
      const arrOnly = globalThis.ddb.parseDatis(globalThis.ddb.datisJoined(
        {datisArr:'MSP ARR INFO J. 22003KT 10SM CLR A2992. VISUAL RWY 12L, 12R APCH IN USE.'}));
      assert('the arrival broadcast alone still gives the flow and the weather',
        arrOnly.cfg === '12' && arrOnly.altim === '2992' && !arrOnly.dep);
      const depOnly = globalThis.ddb.parseDatis(globalThis.ddb.datisJoined(
        {datisDep:'MSP DEP INFO W. 22003KT 10SM CLR A2992. DEPARTING RWY 12L, 12R, 17.'}));
      assert('the departure broadcast alone gives the weather and the departures but no flow',
        depOnly.cfg === null && depOnly.dep.join(',') === '12L,12R,17' && depOnly.atis === 'W');
      assert('and two empty boxes are nothing rather than an empty answer',
        globalThis.ddb.parseDatis(globalThis.ddb.datisJoined({datisArr:'', datisDep:''})) === null);
    }
  }

  /* the navaids a departure starts on are not direct-to fixes */
  assert('the navaids at the head of the SIDs are marked',
    globalThis.DD.DEP_VORS.join(',') === 'MSP,GEP,FGT'
    && globalThis.DD.DEPS.KBREW.filter(p => p.vor).map(p => p.f).join(',') === 'MSP,GEP'
    && globalThis.DD.DEPS.COULT.filter(p => !p.vor).length === 2);

  /* ============ 4. Position setup ============ */
  assert('all eleven SOP 2-1 positions are present', globalThis.ddb.POSITIONS.length === 11, globalThis.ddb.POSITIONS.length);
  assert('the base seat is South Feeder', globalThis.ddb.state.pos.seat === 'H', globalThis.ddb.state.pos.seat);
  assert('the usual split sends 12R to S and 12L to N',
    globalThis.DD.RECEIVER['12R'].pos === 'S' && globalThis.DD.RECEIVER['12R'].frq === '126.95'
    && globalThis.DD.RECEIVER['12L'].pos === 'N' && globalThis.DD.RECEIVER['12L'].frq === '119.3',
    JSON.stringify(globalThis.DD.RECEIVER));

  /* closing a position folds it into whoever is still open along H → R → N → S */
  globalThis.ddbOpen('S', false);
  assert('with South Final closed both runways answer on N',
    globalThis.DD.RECEIVER['12R'].pos === 'N' && globalThis.DD.RECEIVER['12R'].frq === '119.3'
    && globalThis.DD.RECEIVER['12L'].pos === 'N',
    JSON.stringify(globalThis.DD.RECEIVER));
  assert('a closed departure folds into R', globalThis.ddb.ownerOf('D').id === 'R', globalThis.ddb.ownerOf('D').id);
  assert('a closed satellite folds all the way to H', globalThis.ddb.ownerOf('G').id === 'H', globalThis.ddb.ownerOf('G').id);

  globalThis.ddbPreset('single');
  assert('single controller puts everything on H',
    globalThis.DD.RECEIVER['12R'].pos === 'H' && globalThis.DD.RECEIVER['12R'].frq === '135.475'
    && globalThis.DD.RECEIVER['12L'].pos === 'H',
    JSON.stringify(globalThis.DD.RECEIVER));

  /* the player grades against whoever actually owns the arrival */
  globalThis.ddLoad('resume10r');
  globalThis.ddSel('DAL589');
  say('DAL589 flash south');
  mustContain('flashing to a position that is not open bounces', 'bounces the flash');
  say('DAL589 flash');
  mustContain('a bare flash goes to whoever owns it', 'H takes the flash');
  say('DAL589 contact approach 126.95');
  mustContain('the frequency of a combined-away position is rejected', 'Wrong frequency for H');

  /* the seat rides on the drill frame, and you can work more than one */
  globalThis.ddbPreset('standard');
  globalThis.ddbSeat('I'); globalThis.ddbSeat('H');
  assert('taking a seat opens it', globalThis.ddb.isOpen('I'));
  assert('the frame names the seat, its identifier and its frequency',
    globalThis.ddb.seatLabel() === 'North Feeder (I · 126.35)', globalThis.ddb.seatLabel());
  globalThis.ddbSeat('D');
  assert('two positions can be worked at once — the Drill 10 seat',
    globalThis.ddb.seatIds().sort().join(',') === 'D,I', globalThis.ddb.seatIds().sort().join(','));
  assert('the combined label reads the way the drill log writes it',
    globalThis.ddb.seatLabel().indexOf('Combined D + I') === 0, globalThis.ddb.seatLabel());
  assert('your own seats are not listed as open around you',
    globalThis.ddb.openLabel().indexOf('North Feeder') < 0, globalThis.ddb.openLabel());
  globalThis.ddbSeat('D');
  assert('dropping back to one seat works', globalThis.ddb.seatIds().join(',') === 'I');
  globalThis.ddbSeat('I');
  assert('the last seat cannot be dropped', globalThis.ddb.seatIds().join(',') === 'I');
  globalThis.ddbPreset('standard');
  assert('a preset that closes your seat moves you to whoever absorbed it',
    globalThis.ddb.seatIds().join(',') === 'H', globalThis.ddb.seatIds().join(','));
  assert('and the receivers come back to the usual split',
    globalThis.DD.RECEIVER['12R'].pos === 'S' && globalThis.DD.RECEIVER['12L'].pos === 'N',
    JSON.stringify(globalThis.DD.RECEIVER));
  assert('a generated drill carries the seat and what is open',
    globalThis.ddb.gen({ seed: 5, focus: 'free', pressure: 'routine', count: 2 }).seat.indexOf('South Feeder (H') === 0,
    globalThis.ddb.gen({ seed: 5, focus: 'free', pressure: 'routine', count: 2 }).seat);

  /* ============ 4. Builder — generate, validate, fly ============ */
  const built = globalThis.ddb.gen({ seed: 4242, focus: 'floors', pressure: 'compressed', count: 3 });
  assert('generator produces the asked-for strip count', built.ac.length === 3, built.ac.length);
  assert('generator is reproducible from its seed',
    JSON.stringify(globalThis.ddb.gen({ seed: 4242, focus: 'floors', pressure: 'compressed', count: 3 }).ac)
      === JSON.stringify(built.ac));
  let v = globalThis.ddb.validate(built);
  assert('generated drill validates clean', v.errors.length === 0, v.errors.join(' | '));

  let combos = 0;
  for (const f of ['free', 'sep', 'maintain', 'floors', 'speed', 'posthandoff'])
    for (const p of ['routine', 'compressed', 'saturated'])
      for (const mx of [['NITZR','BLUEM','TORGY'], ['BAINY','MUSCL','KKILR'], Object.keys(globalThis.DD.ROUTES)])
        for (const c of [2, 3, 4, 5, 6])
          for (const sd of [1, 77, 4242, 90210]) {
            combos++;
            const g = globalThis.ddb.gen({ seed: sd, focus: f, mixGates: mx, pressure: p, count: c,
                                          deps: sd % 3, overflight: sd === 77 });
            const gv = globalThis.ddb.validate(g);
            if (gv.errors.length) fail('generated ' + f + '/' + p + '/' + mx.join('-') + '/' + c + '/' + sd, gv.errors.join(' | '));
            const wantN = c + (sd % 3) + (sd === 77 ? 1 : 0);
            if (g.ac.length !== wantN) fail('generated strip count', f + '/' + c + ' wanted ' + wantN + ' gave ' + g.ac.length);
            g.ac.forEach(a => {
              if (a.rules === 'IFR' && !String(a.route || '').trim())
                fail('generated IFR strip without a route', a.cs + ' on ' + f + '/' + sd);
              if ((a.role || 'arrival') !== 'arrival') return;
              if (a.alt < globalThis.DD.FLOORS[a.gate]) fail('generated start above the gate floor', a.cs + ' ' + a.alt + ' at ' + a.gate);
            });
          }
  ok('every generated drill validates and starts at or above its gate floor (' + combos + ' combinations)');

  /* validation refuses what the reference data will not carry */
  v = globalThis.ddb.validate({
    name: '', cfg: '12', ceil: 5000, vis: 10, ac: [
      { cs: 'DAL100', type: 'B738', gate: 'NITZR', dtg: 10, alt: 5000, ias: 250, mode: 'published', ckdIn: true },
      { cs: 'DAL100', type: 'B738', gate: 'ZZZZZ', dtg: 10, alt: 9000, ias: 250, mode: 'published', ckdIn: true },
      { cs: 'DAL200', type: 'A339', wake: 'H', gate: 'TORGY', dtg: 12, alt: 10000, ias: 250, mode: 'published', rwy: '12L', ckdIn: true }
    ]
  });
  const joined = v.errors.join(' | ');
  assert('unnamed drill rejected', joined.includes('needs a name'), joined);
  assert('below-floor start rejected', joined.includes('below the'), joined);
  assert('unknown gate rejected', joined.includes('not a gate'), joined);
  assert('duplicate callsign rejected', joined.includes('duplicate callsign'), joined);
  assert('heavy off the 12R transition rejected (ZMP Table 2c)',
    joined.includes('heavy jets take the 12R/30L'), joined);

  /* the configuration has to follow the weather, not the other way round */
  const cro = globalThis.ddb.validate({ name: 'cro', cfg: '30-35', ceil: 1800, vis: 6,
    ac: [{ cs: 'DAL1', type: 'B738', gate: 'NITZR', dtg: 12, alt: 9000, ias: 250, mode: 'published', ckdIn: true }] });
  assert('CRO below its 2,200 ceiling rejected (LOA 7.i)', cro.errors.some(e => e.includes('2,200')), cro.errors.join(' | '));
  const c1722 = globalThis.ddb.validate({ name: '1722', cfg: '17-22', ceil: 1200, vis: 5,
    ac: [{ cs: 'DAL1', type: 'B738', gate: 'NITZR', dtg: 12, alt: 9000, ias: 250, mode: 'published', ckdIn: true }] });
  assert('17-22 below its 1,400 ceiling rejected (SOP 7-1 / LOA 11)', c1722.errors.some(e => e.includes('1,400')), c1722.errors.join(' | '));

  /* flight categories off the drill-format thresholds */
  assert('flight categories derive from ceiling and visibility',
    globalThis.ddb.category(5000, 10) === 'VFR' && globalThis.ddb.category(2500, 10) === 'MVFR'
    && globalThis.ddb.category(800, 10) === 'IFR' && globalThis.ddb.category(5000, 0.5) === 'LIFR',
    [5000, 2500, 800].map(c => globalThis.ddb.category(c, 10)).join(','));

  /* callsign voicing — carrier callsign reference */
  const voice = globalThis.ddb.spoken;
  assert('four-digit flight numbers group in twos', voice('EDV4555') === 'Endeavor forty-five fifty-five', voice('EDV4555'));
  assert('three-digit flight numbers lead single then pair', voice('DAL597') === 'Delta five ninety-seven', voice('DAL597'));
  assert('round hundreds say hundred', voice('DAL500') === 'Delta five hundred', voice('DAL500'));
  assert('non-round hundreds say the zero straight', voice('DAL505') === 'Delta five zero five', voice('DAL505'));
  assert('registrations spell out character by character', voice('N1418B') === 'november one four one eight bravo', voice('N1418B'));

  /* a start that opens inside the trunk check is a warning, not an error */
  v = globalThis.ddb.validate({
    name: 'trunk', ac: [
      { cs: 'DAL1', type: 'B738', gate: 'NITZR', dtg: 12, alt: 9000, ias: 250, mode: 'published', ckdIn: true },
      { cs: 'DAL2', type: 'B738', gate: 'BLUEM', dtg: 13, alt: 9000, ias: 250, mode: 'published', ckdIn: true }
    ]
  });
  assert('co-altitude opening warns without blocking',
    v.errors.length === 0 && v.warnings.some(w => w.includes('loss of separation')), v.warnings.join(' | '));

  /* save it, fly it */
  built.name = 'Smoke drill';
  const sv = globalThis.ddb.saveDrill(built);
  assert('saving a valid drill reports no errors', sv.errors.length === 0);
  assert('saved drill is in the state', globalThis.ddb.state.drills.some(d => d.id === built.id));
  globalThis.ddb.runDrill(built);
  assert('built drill loads into the player', globalThis.DD.sim.ac.length === 3, globalThis.DD.sim.ac.length);
  assert('built drill opens running, not paused', globalThis.DD.sim.rate === 1, globalThis.DD.sim.rate);
  assert('built strips carry their callsigns',
    globalThis.DD.sim.ac[0].cs === built.ac[0].cs, globalThis.DD.sim.ac[0].cs);

  /* fly it far enough to grade something, then end it */
  globalThis.ddRate(4);
  globalThis.ddSel(built.ac[0].cs);
  say(built.ac[0].cs + ' flash');
  say(built.ac[0].cs + ' descend and maintain 8000');
  for (let i = 0; i < 200; i++) tickFn();
  globalThis.ddEnd();

  /* ============ 4b. Departures, overflights, and one transmission carrying several instructions ============ */
  globalThis.DD.SCENARIOS.push({id:'mixed', name:'Mixed', frame:'test', altim:'2980', brief:'',
    ac:() => [
      {cs:'DAL512', type:'B738', role:'departure', sid:'WLSTN', fromStart:3, alt:5000, ias:250, ckdIn:true},
      {cs:'SCX880', type:'B738', role:'departure', sid:'ORSKY', fromStart:3, alt:5000, ias:250, ckdIn:true},
      {cs:'N23V',   type:'C172', role:'overflight', entry:{r:200,d:36}, exit:{r:40,d:36}, alt:4500, ias:120, ckdIn:true},
      {cs:'DAL589', type:'B738', gate:'KKILR', dtgEnd:30, alt:14000, ias:280, ckdIn:true}
    ]});
  globalThis.ddLoad('mixed');
  assert('a drill can mix arrivals, departures and overflights',
    globalThis.DD.sim.ac.map(a => a.role).join(',') === 'departure,departure,overflight,arrival',
    globalThis.DD.sim.ac.map(a => a.role).join(','));
  assert('departures and overflights go to Center, arrivals to the Arrival controller',
    globalThis.DD.receiverFor(globalThis.DD.sim.ac[0]).pos === 'ZMP'
    && globalThis.DD.receiverFor(globalThis.DD.sim.ac[3]).pos === 'S');

  /* one transmission, several instructions, one readback */
  globalThis.ddSel('DAL589');
  say('DAL589 altimeter 2980 expect runway 12R descend via the arrival descend and maintain 11000 reduce speed to 250');
  const mixed = globalThis.DD.sim.ac[3];
  assert('every clause in a combined transmission takes effect',
    mixed.rwy === '12R' && mixed.altim === true && mixed.hardAlt === 11000
    && mixed.spdMode === 'assigned' && mixed.iasAsg === 250,
    JSON.stringify({rwy:mixed.rwy, altim:mixed.altim, alt:mixed.hardAlt, spd:mixed.spdMode, asg:mixed.iasAsg}));
  mustContain('the crew reads the whole clearance back in one line', 'expect runway one two right, two niner eight zero');
  assert('and it is one readback, not one per clause',
    globalThis.DD.sim.feed.filter(e => e.kind === 'crew' && e.html.indexOf('expect runway one two right') >= 0).length === 1);

  /* every runway at the field, digits or spoken, and never a callsign digit */
  {
    const tries = [['expect runway 12 left','12L'], ['expect runway one two right','12R'],
                   ['expect runway 30L','30L'],     ['expect runway three zero right','30R'],
                   ['expect runway 17','17'],       ['expect runway three five','35'],
                   ['expect runway 4','4'],         ['expect runway two two','22']];
    let wrong = [];
    for (const [phrase, want] of tries) {
      const t = globalThis.DD.sim.ac[3];
      t.rwy = null;
      say('DAL589 ' + phrase);
      if (t.rwy !== want) wrong.push(phrase + ' gave ' + t.rwy);
    }
    assert('every MSP runway can be issued, spoken or in digits', wrong.length === 0, wrong.join(' | '));
    const t2 = globalThis.DD.sim.ac[3];
    t2.rwy = null; say('DAL589 say altitude');
    assert('a digit in the callsign is never read as a runway', t2.rwy === null, t2.rwy);
    t2.rwy = '12R';
  }

  /* an altimeter that is not the one the field is on */
  say('DAL589 altimeter 2992');
  mustContain('a wrong altimeter setting is caught', 'and the field is on');
  assert('altimeter parses numeric, spoken and decimal alike',
    globalThis.DD.altimIn('altimeter 2992') === '2992'
    && globalThis.DD.altimIn('altimeter two niner niner two') === '2992'
    && globalThis.DD.altimIn('altimeter 29.92') === '2992');

  /* the departure release — ZMP-M98 LOA 4.c */
  globalThis.ddSel('DAL512');
  say('DAL512 climb and maintain 14000');
  say('DAL512 flash');
  say('DAL512 contact center');
  say('SCX880 climb and maintain 14000');
  globalThis.ddRate(4);
  for (let i = 0; i < 200; i++) tickFn();
  mustContain('a departure released before the gate makes 4.c', 'the release made 4.c');
  mustContain('a departure that was never released is a crit', 'no flash and no switch');
  mustContain('the crit cites the rule', '25 NM from the MSP DME or leaving 11,000');
  assert('the release grades to post-handoff both ways',
    globalThis.ddb.tallyFeed().posthandoff.good >= 1 && globalThis.ddb.tallyFeed().posthandoff.flag >= 1,
    JSON.stringify(globalThis.ddb.tallyFeed().posthandoff));
  /* rules-driven behaviour and refusals */
  const vfrChecks = globalThis.ddb.validate({name:'x', cfg:'12', ceil:5000, vis:10, ac:[
    {cs:'DAL1', type:'B738', role:'arrival', rules:'IFR', route:'', gate:'NITZR', dtg:20, alt:12000, ias:280, mode:'published', ckdIn:true},
    {cs:'N1AB', type:'C172', role:'overflight', rules:'VFR', route:'', entryR:200, entryD:36, exitR:40, exitD:36, alt:19000, ias:120, mode:'free', ckdIn:true},
    {cs:'N2CD', type:'SR22', role:'arrival', rules:'VFR', route:'', gate:'BLUEM', dtg:25, alt:9000, ias:160, mode:'published', ckdIn:true}
  ]});
  const vj = vfrChecks.errors.join(' | ');
  assert('an IFR strip with no route is refused', vj.indexOf('is IFR with no route') >= 0, vj);
  assert('VFR in Class A is refused', vj.indexOf('Class A starts at 18,000') >= 0, vj);
  assert('a VFR arrival on a ladder warns rather than blocks',
    vfrChecks.warnings.some(w => w.indexOf('is not flying the descend-via') >= 0), vfrChecks.warnings.join(' | '));
  const vfrImc = globalThis.ddb.validate({name:'x', cfg:'12', ceil:800, vis:2, ac:[
    {cs:'N1AB', type:'C172', role:'overflight', rules:'VFR', route:'', entryR:200, entryD:36, exitR:40, exitD:36, alt:4500, ias:120, mode:'free', ckdIn:true}
  ]});
  /* the order it has to happen in */
  globalThis.DD.SCENARIOS.push({id:'radar', name:'Radar', frame:'test', altim:'2980', brief:'',
    ac:() => [
      {cs:'N23V',  type:'C172', role:'overflight', rules:'VFR', radar:'none',
       entry:{r:200,d:36}, exit:{r:40,d:36}, alt:4500, ias:120, ckdIn:true},
      {cs:'N77CM', type:'SR22', role:'overflight', rules:'VFR', radar:'established', from:'Rochester approach',
       entry:{r:150,d:36}, exit:{r:330,d:36}, alt:5500, ias:150, ckdIn:true}
    ]});
  globalThis.ddLoad('radar');
  globalThis.ddSel('N23V');
  say('N23V descend and maintain 3500');
  mustContain('working an unidentified aircraft is flagged', 'before radar service exists');
  say('N23V radar contact');
  mustContain('radar contact with no code assigned is refused', 'nothing to be in radar contact with');
  say('N23V squawk 0123');
  say('N23V radar contact');
  mustContain('a code then an identification establishes the service', 'radar service established');
  assert('the strip now carries the code',
    globalThis.DD.sim.ac[0].identified === true && globalThis.DD.sim.ac[0].squawk === '0123');
  globalThis.ddSel('N77CM');
  say('N77CM radar contact');
  mustContain('identifying one that arrived identified is called redundant', 'was already in radar contact');
  /* naming the wrong neighbour */
  globalThis.DD.SCENARIOS.push({id:'rst', name:'RST', frame:'test', altim:'2980', brief:'',
    ac:() => [
      {cs:'DAL100', type:'B738', role:'departure', sid:'RST', fromStart:5, alt:6000,  ias:250, ckdIn:true},
      {cs:'DAL200', type:'B738', role:'departure', sid:'RST', fromStart:5, alt:12000, ias:280, ckdIn:true}
    ]});
  globalThis.ddLoad('rst');
  globalThis.ddSel('DAL100');
  say('DAL100 flash center');
  mustContain('flashing a low RST departure to Center is refused', 'wrong neighbour');
  say('DAL100 flash rochester');
  mustContain('flashing it to Rochester is taken', 'Rochester approach takes the flash');
  say('DAL100 contact center');
  mustContain('switching it to Center is caught', 'goes to Rochester, not Center');
  globalThis.ddSel('DAL200');
  say('DAL200 flash rochester');
  mustContain('flashing a high one to Rochester is refused', 'wrong neighbour');

  /* handing to Rochester at an altitude the LOA does not allow */
  globalThis.DD.SCENARIOS.push({id:'rstalt', name:'RST alt', frame:'test', altim:'2980', brief:'',
    ac:() => [
      {cs:'DAL400', type:'B738', role:'departure', sid:'RST', fromStart:5, alt:6000, ias:250, ckdIn:true},
      {cs:'DAL500', type:'B738', role:'departure', sid:'RST', fromStart:5, alt:7000, ias:250, ckdIn:true}
    ]});
  globalThis.ddLoad('rstalt');
  globalThis.ddSel('DAL400');
  say('DAL400 flash rochester');
  say('DAL400 contact rochester 119.8');
  mustContain('6,000 into RST airspace is flagged against 5.b(1)', '3,000, 5,000, 7,000 or 9,000');
  globalThis.ddSel('DAL500');
  say('DAL500 flash rochester');
  say('DAL500 contact rochester 119.2');
  assert('either Rochester frequency is accepted',
    globalThis.DD.sim.ac[1].switched === true && feedText().indexOf('Wrong frequency for RST') < 0);

  /* back to the radar-service scenario for the rest */
  globalThis.ddLoad('radar');
  globalThis.ddSel('N77CM');
  /* a pop-up IFR owes a clearance, and the clearance has to be complete —
     the session-7 pattern in the OJT review */
  globalThis.DD.SCENARIOS.push({id:'popup', name:'Popup', frame:'test', altim:'2980', brief:'',
    ac:() => [
      {cs:'N6398G', type:'C172', role:'overflight', rules:'IFR', radar:'none',
       entry:{r:200,d:36}, exit:{r:40,d:36}, alt:4500, ias:120, ckdIn:true},
      {cs:'N44XY',  type:'SR22', role:'overflight', rules:'VFR', radar:'none',
       entry:{r:190,d:36}, exit:{r:30,d:36}, alt:5500, ias:130, ckdIn:true}
    ]});
  globalThis.ddLoad('popup');
  globalThis.ddSel('N6398G');
  say('N6398G descend and maintain 3500');
  mustContain('working a pop-up before clearing it is flagged', 'never been given a clearance');
  say('N6398G cleared to STP');
  mustContain('an incomplete clearance names what is missing', 'missing how it gets there');
  globalThis.ddLoad('popup');
  globalThis.ddSel('N6398G');
  say('N6398G squawk 0234');
  say('N6398G radar contact');
  say('N6398G cleared to STP airport via fly heading 040, climb and maintain 4000');
  mustContain('a complete clearance is where to, how, and how high', 'full IFR clearance');
  assert('and it puts the pop-up on a clearance', globalThis.DD.sim.ac[0].ifrCleared === true);
  globalThis.ddSel('N44XY');
  say('N44XY cleared to anywhere via direct climb and maintain 6000');
  mustContain('clearing a VFR aircraft is refused', 'no IFR clearance to issue');

  /* a pop-up has not filed anything, so it does not owe a route */
  const popNoRoute = globalThis.ddb.validate({name:'x', cfg:'12', ceil:5000, vis:10, ac:[
    {cs:'N1AB', type:'C172', role:'overflight', rules:'IFR', route:'', radar:'none',
     entryR:170, entryD:38, exitR:20, exitD:38, alt:5000, ias:120, mode:'free', ckdIn:true}
  ]});
  assert('a pop-up with no route is allowed', popNoRoute.errors.length === 0, popNoRoute.errors.join(' | '));
  const estNoRoute = globalThis.ddb.validate({name:'x', cfg:'12', ceil:5000, vis:10, ac:[
    {cs:'N2CD', type:'C172', role:'overflight', rules:'IFR', route:'', radar:'established', from:'ZMP Sector 5',
     entryR:100, entryD:38, exitR:280, exitD:38, alt:7000, ias:120, mode:'free', ckdIn:true}
  ]});
  assert('an established IFR strip still owes one',
    estNoRoute.errors.join(' | ').indexOf('is IFR with no route') >= 0, estNoRoute.errors.join(' | '));

  globalThis.ddLoad('radar');
  globalThis.ddSel('N77CM');
  say('N77CM radar service terminated');
  assert('radar service can be terminated',
    globalThis.DD.sim.ac[1].identified === false && globalThis.DD.sim.ac[1].radar === 'terminated');

  /* the two new service states on the frequency, and the navaid rule */
  {
    globalThis.DD.sim.ac.length = 0;
    const dep = globalThis.DD.mkAc({cs:'DAL77', type:'B738', role:'departure', rules:'IFR',
      radar:'departure', sid:'COULT', dep:'KMSP', depRwy:'12R', alt:3000, ias:210, fromStart:3});
    dep.onFreq = true; dep.ckdIn = true; dep.squawk = '4231';
    globalThis.DD.sim.ac.push(dep);
    const vfr = globalThis.DD.mkAc({cs:'N11AB', type:'C172', role:'overflight', rules:'VFR',
      radar:'following', entry:{r:140,d:30}, exit:{r:320,d:30}, alt:4500, ias:110});
    vfr.onFreq = true; vfr.ckdIn = true;
    globalThis.DD.sim.ac.push(vfr);

    say('DAL77 radar contact');
    mustContain('one off the tower gets radar contact, not a redundancy note', 'this is the identification it was owed');
    assert('and it is identified afterwards', dep.identified === true);

    say('DAL77 proceed direct MSP');
    mustContain('direct to the navaid at the head of a departure is refused', 'not because it is a fix you clear anybody direct to');
    say('DAL77 proceed direct TAXEE');
    mustContain('direct to a waypoint further along is read back honestly', 'does not re-path an aircraft');

    say('N11AB radar contact');
    mustContain('flight following without a code is refused', 'nothing to be in radar contact with');
    say('N11AB squawk 0234');
    say('N11AB radar contact');
    mustContain('a code then an identification picks up flight following', 'flight following established');
  }


  assert('VFR against an IFR field is flagged',
    vfrImc.warnings.some(w => w.indexOf('is VFR and the field is IFR') >= 0), vfrImc.warnings.join(' | '));
  assert('every generated IFR strip carries a route',
    globalThis.ddb.gen({seed:5150, focus:'free', pressure:'routine', count:3, deps:2, overflight:true})
      .ac.every(a => a.rules !== 'IFR' || String(a.route || '').trim().length > 0));

  assert('an overflight holds the speed it filed rather than accelerating',
    Math.round(globalThis.DD.sim.ac[2].ias) === 120, globalThis.DD.sim.ac[2].ias);
  assert('a departure only climbs when it is told to',
    globalThis.DD.sim.ac[1].alt > 5000, globalThis.DD.sim.ac[1].alt);

  /* ============ 5. Notebook — banking keeps the standing items current ============ */
  const draft = globalThis.ddb.draftFromSim();
  assert('draft carries a tally for every standing item',
    globalThis.DD.STANDING.every(s => draft.tally[s.id]), Object.keys(draft.tally).join(','));
  assert('draft carries the timing summary', draft.timing && typeof draft.timing.target === 'number');
  assert('draft drafts something to bank', draft.banked.length + draft.open.length > 0);

  /* the drills that ran before this tool count the same as anything banked */
  assert('the record carries all seven prior drills',
    globalThis.ddb.PRIOR.length === 7 && globalThis.ddb.PRIOR.map(p => p.n).join(',') === '5,6,7,8,9,10,10R',
    globalThis.ddb.PRIOR.map(p => p.n).join(','));
  assert('every prior drill resolves to its library card',
    globalThis.ddb.PRIOR.every(p => !!globalThis.ddb.priorCard(p.n)),
    globalThis.ddb.PRIOR.filter(p => !globalThis.ddb.priorCard(p.n)).map(p => p.n).join(','));
  assert('the scrapped and the paused drills are both in the record',
    globalThis.ddb.PRIOR.some(p => p.state.indexOf('scrapped') >= 0)
    && globalThis.ddb.PRIOR.some(p => p.state.indexOf('paused') >= 0));
  assert('the ledger is the record plus whatever has been banked',
    globalThis.ddb.hist().length === globalThis.ddb.PRIOR.length + globalThis.ddb.state.entries.length);

  const beforeFloors = globalThis.ddb.itemStats('floors');
  assert('floors is scored from drill 10R, not treated as never exercised',
    beforeFloors.exposures === 1 && beforeFloors.last === '10R' && beforeFloors.lastResult === 'flag',
    JSON.stringify(beforeFloors));
  assert('the separation proof carries drills 7, 10 and 10R as the standing note says',
    globalThis.ddb.itemStats('sep').drills.join(',') === '7,10,10R',
    globalThis.ddb.itemStats('sep').drills.join(','));
  assert('speed-restoration carries drills 8 and 10R as the standing note says',
    globalThis.ddb.itemStats('speed').drills.join(',') === '8,10R',
    globalThis.ddb.itemStats('speed').drills.join(','));
  assert('post-handoff counts its clean reps as well as its flags',
    globalThis.ddb.itemStats('posthandoff').good === 3 && globalThis.ddb.itemStats('posthandoff').flag === 2,
    JSON.stringify(globalThis.ddb.itemStats('posthandoff')));
  assert('no standing item is left unexercised by the record',
    globalThis.DD.STANDING.every(s => globalThis.ddb.itemStats(s.id).exposures > 0),
    globalThis.DD.STANDING.filter(s => !globalThis.ddb.itemStats(s.id).exposures).map(s => s.id).join(','));

  draft.n = '11';
  draft.tally.floors = { good: 2, flag: 0 };
  globalThis.ddb.bank(draft);
  const afterFloors = globalThis.ddb.itemStats('floors');
  assert('banking adds to the record rather than replacing it',
    afterFloors.exposures === 2 && afterFloors.drills.join(',') === '10R,11', JSON.stringify(afterFloors));
  assert('banking records which drill it came from', afterFloors.last === '11', afterFloors.last);
  assert('a clean exposure after a flagged one starts a streak of one', afterFloors.streak === 1, afterFloors.streak);
  assert('the banked drill is in the library', globalThis.DD.DRILL_LOG.some(d => d.n === '11'));
  assert('the library still holds the seeded history', globalThis.DD.DRILL_LOG.some(d => d.n === '10R'));
  assert('the next drill number advances', globalThis.ddb.state.seq === 12, globalThis.ddb.state.seq);

  /* a flagged item outranks a clean one */
  const rank = globalThis.ddb.ranked();
  assert('a flagged item outranks the one just flown clean',
    rank.indexOf('floors') > rank.indexOf('sep'), rank.join(' > '));
  assert('status reads back in plain language',
    globalThis.ddb.statusOf('floors').label.length > 0 && globalThis.ddb.statusOf('sep').label.includes('open'));
  assert('the currency line names the drills behind it',
    globalThis.ddb.itemStats('sep').drills.length === 3 && globalThis.ddb.itemStats('sep').fromDocs === true,
    JSON.stringify(globalThis.ddb.itemStats('sep')));

  /* ============ 6. Exports ============ */
  const code = globalThis.ddb.toCode(built);
  assert('scenario code export is shaped like a SCENARIOS entry',
    code.includes("id:'") && code.includes('ac:function(){ return [') && code.includes("gate:'"), code.slice(0, 80));
  const md = globalThis.ddb.toMd();
  assert('markdown export names the standing items', md.includes('Standing items — currency'));
  assert('markdown export uses the practice-log shape',
    md.includes('**Drills run**') && md.includes('**Suggested next reps**'), md.slice(0, 120));
  assert('markdown export carries the banked drill', md.includes('Drill 11'));
  assert('markdown export names the drills behind each standing item',
    md.includes('on record: 7, 10, 10R'), md.split('\n').filter(l => l.indexOf('Separation proof') >= 0).join(' | '));
  assert('markdown export lists every standing item',
    globalThis.DD.STANDING.every(s => md.includes(s.t.replace(/"/g, '"'))), md.length);

  /* ============ 7. Handoff IDs ============
     Values from the ZMP vNAS record, 2026-08-26; composition rules from
     docs.virtualnas.net, 2026-09-01. Both transcribed in
     claude_ZMP_Handoff_ID_Reference.md, which is authoritative. */
  const H = globalThis.ddh;
  assert('handoff block exports window.ddh', !!H);

  /* The structural fact the whole M98 section turns on. */
  const radar = H.M98_TCP.filter(r => r[4] === 'radar');
  const towers = H.M98_TCP.filter(r => r[4] === 'tower');
  assert('every M98 radar seat is subset 1', radar.every(r => r[1] === 1));
  assert('every M98 tower or ground position is subset 2 or 3, except MSP local and delivery',
    towers.every(r => r[1] >= 1 && r[1] <= 3));
  assert('all eleven SOP 2-1 radar positions are present', radar.length === 11);
  assert('every SOP 2-1 position in the deck has a TCP',
    globalThis.DD.POS_NAME && Object.keys(globalThis.DD.POS_NAME)
      .every(p => radar.some(r => r[0] === p)));

  /* Same subset is a bare letter; crossing a subset must carry the digit. */
  assert('radar to radar is a bare sector letter', H.intra(1, 'N', 1).id === 'N');
  assert('radar to MSP ground carries the subset digit', H.intra(1, 'Y', 2).id === '2Y');
  assert('MSP Local West and MSP Ground differ by one digit',
    H.intra(1, 'Y', 1).id === 'Y' && H.intra(1, 'Y', 2).id === '2Y');
  assert('a tower reaching a radar seat also crosses back', H.intra(2, 'H', 1).id === '1H');

  /* The four MSP ground positions share one TCP and the ID cannot separate them. */
  const groundY = H.M98_TCP.filter(r => r[0] === 'Y' && r[1] === 2);
  assert('the MSP ground positions share a single TCP', groundY.length === 1);

  /* STARS -> STARS. The number is assigned by the sender, so it is asymmetric. */
  assert('M98 reaches RST on delta 1', H.DELTA_OUT === 1);
  assert('RST reaches M98 on delta 2 — not the same number', H.DELTA_IN === 2);
  assert('RST is the only STARS facility M98 can address', H.RST_TCP.length === 5);

  /* ERAM inbound. */
  assert('ZMP addresses M98 with the letter M', H.M98_FROM_ZMP.one === 'M');
  assert('M98 is adapted OneLetterAndSubset', H.M98_FROM_ZMP.fmt === 'OneLetterAndSubset');

  /* Honesty guards: adapted TCPs with nobody on them stay empty, and the
     ZMP interface list is the reference set's, not an invention. */
  assert('the four empty M98 TCPs are recorded as empty',
    H.M98_TCP.filter(r => r[4] === 'empty' && r[2] === null).length === 4);
  assert('the one empty RST TCP is recorded as empty',
    H.RST_TCP.filter(r => r[2] === null).length === 1);
  assert('every ZMP interface sector is two digits',
    H.ZMP_IFACE.every(z => /^\d{2}$/.test(z[0])));
  assert('open questions are rendered rather than guessed',
    H.OPEN_Q.length === 2 && H.OPEN_Q.every(o => !!o.q && !!o.why && !!o.close));

  console.log('\nSMOKE PASS — ' + path + ' — ' + checks + ' checks');
} catch (e) {
  console.error('FAIL: exception —', e.message);
  console.error(e.stack);
  process.exit(1);
}
