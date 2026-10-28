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

  /* The filed route for a gate, taken from the tool rather than typed, so a
     fixture stays honest as the ladders change. Declared here because an
     IFR strip without a route is a hard error and most fixtures need one. */
  const routeOn = g => globalThis.DD.routeTextFor({ role: 'arrival', gate: g });

  /* ============ 1. Drill Deck — player and parser ============ */
  globalThis.ddLoad('resume10r');
  globalThis.ddSel('DAL589');
  say('DAL589 expect runway 12L');           mustContain('runway word parses', 'expect runway one two left');
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
  /* The SET of rows, not their order. '12' and '30' are integer-index keys and
     JavaScript enumerates those first in ascending numeric order, ahead of
     every string key — so Object.keys gives 12,30,12-17,30-17,30-35,17-22 and
     never the source order, whatever the object literal says. This assertion
     read the source order until 2026-09-07, when the harness was executed for
     the first time and it failed on line one of the flow section. Do not
     "fix" it back. */
  assert('Table 2 carries exactly the six rows the document has',
    Object.keys(globalThis.DD.TABLE2).slice().sort().join(',') === '12,12-17,17-22,30,30-17,30-35',
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

  /* A configuration nothing resolves gets no geometry at all, rather than
     borrowing another flow's. 4, 22 and 4-35: Table 2 names none of them, and
     the landing-flow rule does not reach them either, because no Table 2 row
     lands 4, lands 22 alone, or lands a straight 35. Issue #15 questions 2-3. */
  ['4','22','4-35'].forEach(c => {
    globalThis.DD.setFlow(c);
    if (globalThis.DD.routeCfg() !== null || Object.keys(globalThis.DD.ROUTES).length !== 0)
      fail('uncarried configuration invents geometry', c + ' gave ' + globalThis.DD.routeCfg());
    if (globalThis.DD.flowCarried(c)) fail('uncarried configuration reports carried', c);
  });
  ok('the three configurations nothing resolves carry no arrival geometry');

  /* 30/12 IS carried, and not out of Table 2. It takes the 30 row because the
     advertised landing runway is the configuration (MSP-M98 LOA 9.h.1(b)) and
     the transition follows the landing flow (owner, 2026-09-21). The row must
     equal the 30 row exactly, and the provenance must be on the page — a
     carried value with no footnote would read as published. */
  const GA = ['NITZR','BLUEM','TORGY','KKILR','MUSCL','BAINY'];
  /* THE RULE IS AN ALIAS, NOT A COPIED ROW. Table 2 must NOT gain a 30/12 key:
     a copied row resolves the transitions and leaves near/far and the handoff
     floors null, which made every 30/12 crossover read as near. Caught
     2026-09-21 before it shipped; this is the guard. */
  assert('30/12 is an alias onto 30, not a second copy of the row',
    !Object.prototype.hasOwnProperty.call(globalThis.DD.TABLE2, '30/12')
    && globalThis.DD.cfgFlow('30/12') === '30'
    && globalThis.DD.cfgFlow('30') === '30'
    && globalThis.DD.cfgFlow('4') === '4',
    Object.keys(globalThis.DD.TABLE2).join(','));
  globalThis.DD.setFlow('30/12');
  assert('30/12 resolves the 30 transitions for every gate',
    globalThis.DD.flowCarried('30/12')
    && GA.every(g => globalThis.DD.transitionFor('30/12', g) === globalThis.DD.transitionFor('30', g)),
    GA.map(g => g + '=' + globalThis.DD.transitionFor('30/12', g)).join(' '));
  assert('and the six gates load their 30s ladders, under the real configuration name',
    Object.keys(globalThis.DD.ROUTES).length === 6 && globalThis.DD.routeCfg() === '30/12',
    globalThis.DD.routeCfg() + ' ' + Object.keys(globalThis.DD.ROUTES).join(','));
  /* The half a copied row would have missed. */
  assert('and the near/far split follows the landing flow too',
    GA.every(g => globalThis.DD.nearFarFor('30/12', g) === globalThis.DD.nearFarFor('30', g))
    && globalThis.DD.nearFarFor('30/12','TORGY') === 'far'
    && globalThis.DD.nearFarFor('30/12','NITZR') === 'near',
    GA.map(g => g + '=' + globalThis.DD.nearFarFor('30/12', g)).join(' '));
  assert('and the handoff floors are the 30s floors, not null',
    GA.every(g => globalThis.DD.floorFor('30/12', g) === globalThis.DD.floorFor('30', g))
    && globalThis.DD.floorFor('30/12','TORGY') === 8000
    && globalThis.DD.floorFor('30/12','NITZR') === 7000,
    GA.map(g => g + '=' + globalThis.DD.floorFor('30/12', g)).join(' '));
  assert('so a far-gate 30/12 crossover is graded far, not near',
    globalThis.DD.crossoverFor('TORGY','30R','30/12').type === 'far'
    && globalThis.DD.crossoverFor('NITZR','30R','30/12').type === 'near',
    JSON.stringify(globalThis.DD.crossoverFor('TORGY','30R','30/12')));
  assert('and it says on the page that Table 2 does not publish it',
    /no row for 30\/12/.test(globalThis.DD.TABLE2_FOOTNOTE['30/12'] || '')
    && /9\.h\.1\(b\)/.test(globalThis.DD.TABLE2_FOOTNOTE['30/12'] || '')
    && /2026-09-21/.test(globalThis.DD.TABLE2_FOOTNOTE['30/12'] || ''),
    globalThis.DD.TABLE2_FOOTNOTE['30/12']);
  globalThis.DD.setFlow('12');

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
  /* "Final", not "Arrival": SOP 2-1 writes "South Final/Arrival", and M98 has four
     position types — Feeder, Final, Departure, Satellite (owner, 2026-09-21). The
     deck took the rename in 9677aa8 and this line did not, so the harness failed
     here from then until 2026-10-14. */
  assert('every position resolves to the name SOP 2-1 gives it',
    globalThis.DD.posName('I') === 'North Feeder' && globalThis.DD.posName('S') === 'South Final'
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
  /* NRTHN1's TTOWN transition leaves on 059 at DWIYT, inside the 040-060 band */
  assert('a departure receiver names its sector where Table 1 supports one',
    globalThis.DD.receiverFor(globalThis.DD.mkAc({cs:'D9', type:'B738', role:'departure',
      sid:'NRTHN1.TTOWN', fromStart:5, alt:12000, ias:280})).name.indexOf('Sector 06') >= 0);

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

  /* ============ The 2026-10-29 SID set — CIFP 261029, issue #61 ============
     Carried early by the owner's choice (2026-10-14), one entry per transition,
     each drawn out to 50 NM from MSP (owner, 2026-10-22; it was 80 NM from 2026-10-14). */
  {
    const DP = globalThis.DD.DEPS, SS = globalThis.DD.SID_SET, keys = Object.keys(DP);
    assert('the nine SIDs MSP codes in CIFP 261029 are carried, one entry per transition, and DUHCK1 beside them',
      Object.keys(SS).filter(s => globalThis.DD.SID_FIELDS.KMSP.includes(s)).join() === 'BITEZ1,BUNYN1,HTDSH1,KBREW1,NRTHN1,SNOWZ1,SNUPE1,TOTTZ1,ZMBRO1'
      && Object.keys(SS).length === 10 && SS.DUHCK1 !== undefined
      && keys.length === 25 && keys.every(k => !k.startsWith('DUHCK1.')), keys.length);
    assert('every entry is keyed SID.TRANSITION, the way a flight plan files it',
      keys.every(k => /^[A-Z]{3,5}\d\.[A-Z]{3,5}$/.test(k) && SS[k.split('.')[0]].trans[k.split('.')[1]] !== undefined));
    assert('every track starts at the field, and only the first point is the field',
      keys.every(k => DP[k][0].field === true && DP[k][0].f === 'MSP' && DP[k].filter(p => p.field).length === 1));
    assert('no drawn fix is more than 50 NM from MSP — owner, 2026-10-22, the STARS limit',
      globalThis.DD.SID_MAP.nm === 50 && keys.every(k => DP[k].every(p => Math.sqrt(p.e*p.e + p.n*p.n) <= 50)));
    /* the table still holds every fix out to 80 NM exactly as CIFP gives it — the limit is
       applied when the tracks are built, so the direct-to list and the reference are unaffected */
    assert('the SID table keeps the fixes past 50 NM — FOOLS, HHCEE, HSTIN, KBREW — and none of them is drawn',
      SS.TOTTZ1.trans.ALO.includes('FOOLS') && SS.BITEZ1.trans.DKOTA.includes('HHCEE') && SS.SNOWZ1.trans.DABOY.includes('HSTIN') && SS.KBREW1.common.includes('KBREW')
      && keys.every(k => DP[k].every(p => !['FOOLS', 'HHCEE', 'HSTIN', 'KBREW'].includes(p.f))));
    {
      const END = { 'BITEZ1.DKOTA': 'TICKK', 'BITEZ1.LEINY': 'TICKK', 'BITEZ1.SMERF': 'PAGOZ', 'BUNYN1.DLH': 'BAYBB', 'BUNYN1.KVUSI': 'GPERS',
        'HTDSH1.ALO': 'CORDY', 'HTDSH1.OANNA': 'CORDY', 'HTDSH1.OHHMY': 'CORDY', 'HTDSH1.ZZIPR': 'CORDY', 'HTDSH1.BRIBE': 'ZMBRO',
        'KBREW1.KEETN': 'HOMUR', 'NRTHN1.AROND': 'WAHLI', 'NRTHN1.TTOWN': 'DWIYT', 'SNOWZ1.DABOY': 'PEDLN', 'SNOWZ1.ZZEEE': 'PEDLN',
        'SNOWZ1.ISTIQ': 'SLAYR', 'SNOWZ1.LLUKY': 'SLAYR', 'SNOWZ1.SMTHA': 'SLAYR', 'SNUPE1.DLL': 'WDSTK', 'TOTTZ1.ALO': 'CORDY',
        'TOTTZ1.FOOLS': 'CORDY', 'TOTTZ1.OANNA': 'CORDY', 'TOTTZ1.OHHMY': 'CORDY', 'TOTTZ1.ZZIPR': 'CORDY', 'ZMBRO1.BRIBE': 'ZMBRO' };
      assert('every track stops at the last coded fix inside 50 NM — they end 39 to 50 NM out, not at the ring',
        keys.every(k => DP[k].slice(-1)[0].f === END[k]) && Object.keys(END).length === keys.length,
        keys.filter(k => DP[k].slice(-1)[0].f !== END[k]).map(k => k + ':' + DP[k].slice(-1)[0].f).join());
    }
    /* every mapped fix where claude_MSP_SID_Reference.md puts it, from MSP */
    const SID_DME = {MANCY:6.9, RUBRB:7.0, HHOBA:12.8, ITZME:13.1, SIEDL:15.2, SNOWZ:15.3, SLALM:19.3,
      SLUSH:21.2, JBUGG:22.3, HTDSH:22.8, BITEZ:22.8, NRTHN:24.1, PNUTZ:28.4, BUNYN:31.6, MOGLL:31.9,
      PRRCH:32.5, PIIKE:32.7, PLOWW:33.0, SKITO:33.1, ZOGAP:33.8, JEDET:34.0, HRBEK:34.8, TOTTZ:36.2,
      TICKK:39.1, SNUPE:39.6, PAGOZ:41.5, GPERS:45.7, BAYBB:46.6, DWIYT:47.0, ZMBRO:47.3, HOMUR:47.4,
      WDSTK:47.8, PEDLN:48.1, SLAYR:48.3, WAHLI:49.5, CORDY:49.5, HHCEE:52.1, HSTIN:62.0, KBREW:68.0, FOOLS:72.3};
    /* DUHCK1's three fixes, from the same reference table — satellite-only, so the
       MSP loop below never meets them; the satellite loop further down does */
    const SAT_DME = {GGREY:20.3, DUHCK:31.1, MGHTY:45.9};
    assert('the coordinate table and the reference name the same forty-three fixes',
      Object.keys(globalThis.DD.SID_FIX).sort().join() === Object.keys(SID_DME).concat(Object.keys(SAT_DME)).sort().join(),
      Object.keys(globalThis.DD.SID_FIX).length);
    /* The reference distances are true ranges; the deck's plane is flat and fixed
       at 44.5 N (COSL), so a far fix plots up to half a mile off — 0.53 NM at
       KBREW, 68 NM out, measured 2026-10-18. One mile catches a wrong coordinate
       and passes the projection; the retired set's check allowed 1.5. */
    keys.forEach(k => DP[k].forEach(p => {
      if (p.field) return;
      const d = Math.sqrt(p.e*p.e + p.n*p.n);
      if (Math.abs(d - SID_DME[p.f]) > 1.0)
        fail('SID fix distance', k + '/' + p.f + ' plots at ' + d.toFixed(1) + ', the reference says ' + SID_DME[p.f]);
    }));
    ok('every SID fix plots at the distance the reference gives it');
    /* HTDSH1 and SNOWZ1 are valid off every runway (owner, 2026-10-18); off 17
       they fly the coded RNAV segment to RUBRB, then vectors to join. Until that
       ruling the deck read their Runway 17 transition as "Runway 17 only". */
    const D17 = globalThis.DD.DEPS17;
    assert('HTDSH1 and SNOWZ1 are the two SIDs with a Runway 17 segment',
      Object.keys(SS).filter(s => globalThis.DD.sidRw17Leg(s)).join() === 'HTDSH1,SNOWZ1'
      && Object.keys(D17).every(k => /^(HTDSH1|SNOWZ1)\./.test(k)) && Object.keys(D17).length === 10);
    assert('off any runway they are vectored to join at ITZME or MANCY, like the other seven',
      keys.filter(k => /^HTDSH1\./.test(k)).every(k => DP[k][1].f === 'ITZME' && DP[k][1].climbAA === 3500)
      && keys.filter(k => /^SNOWZ1\./.test(k)).every(k => DP[k][1].f === 'MANCY' && DP[k][1].climbAA === 4000)
      && keys.every(k => DP[k].every(p => p.f !== 'RUBRB')));
    assert('off 17 they fly RUBRB at or above 3,500 first, then the same common route',
      Object.keys(D17).every(k => D17[k].rw17 === true && D17[k][1].f === 'RUBRB' && D17[k][1].climbAA === 3500
        && D17[k].slice(2).map(p => p.f).join() === DP[k].slice(1).map(p => p.f).join()));
    assert('depTrackFor picks the runway: 17 through RUBRB, anything else or nothing straight to the SID',
      globalThis.DD.depTrackFor('HTDSH1.ALO', '17') === D17['HTDSH1.ALO']
      && globalThis.DD.depTrackFor('HTDSH1.ALO', '30L') === DP['HTDSH1.ALO']
      && globalThis.DD.depTrackFor('HTDSH1.ALO', null) === DP['HTDSH1.ALO']
      && globalThis.DD.depTrackFor('BITEZ1.DKOTA', '17') === DP['BITEZ1.DKOTA']);
    assert('and an aircraft built off 17 is on the RUBRB track from the first tick',
      globalThis.DD.mkAc({cs:'D17', type:'B738', role:'departure', sid:'SNOWZ1.ISTIQ', depRwy:'17', fromStart:2, alt:3000, ias:210}).route[1].f === 'RUBRB'
      && globalThis.DD.mkAc({cs:'D30', type:'B738', role:'departure', sid:'SNOWZ1.ISTIQ', depRwy:'30L', fromStart:2, alt:3000, ias:210}).route[1].f === 'MANCY');
    assert('the other seven start at a first fix of their own, with its at-or-above crossing',
      DP['BITEZ1.DKOTA'][1].f === 'HHOBA' && DP['BITEZ1.DKOTA'][1].climbAA === 4000
      && DP['KBREW1.KEETN'][1].f === 'HRBEK' && DP['KBREW1.KEETN'][1].climbAA === 5000
      && DP['NRTHN1.TTOWN'][1].climbAA === 4200 && DP['TOTTZ1.ALO'][1].climbAA === 3900);
    assert('KBREW and ZMBRO are new routes under old names — no GEP, no start at the field VOR',
      DP['KBREW1.KEETN'].every(p => p.f !== 'GEP') && DP['ZMBRO1.BRIBE'][1].f === 'JEDET');
    assert('a departure crossing rides as climbAA, never as an arrival field',
      keys.every(k => DP[k].every(p => p.aa === undefined && p.at === undefined)));
    assert('a transition with no fix inside 50 NM is kept by name and ends at the last fix that is — KBREW is 69 out, so KBREW1 ends at HOMUR',
      DP['KBREW1.KEETN'].slice(-1)[0].f === 'HOMUR' && DP['ZMBRO1.BRIBE'].slice(-1)[0].f === 'ZMBRO');
    assert('ANE, FCM and STP have eight SIDs, MIC none, and DUHCK1 is theirs alone',
      ['KANE', 'KFCM', 'KSTP'].every(f => globalThis.DD.SID_FIELDS[f].join() === 'BITEZ1,BUNYN1,DUHCK1,KBREW1,NRTHN1,SNUPE1,TOTTZ1,ZMBRO1')
      && globalThis.DD.SID_FIELDS.KMIC.length === 0 && !globalThis.DD.SID_FIELDS.KMSP.includes('DUHCK1'));

    /* ---- satellite departures fly — issue #67 ----
       CIFP 261029, KANE/KFCM/KSTP: route types 5 (common) and 6 (en route
       transition) only, legs identical at all three; DUHCK1 is GGREY at or above
       4,000, DUHCK, then MGHTY on each of LLUKY, SBRNA and STIER. */
    const DA = globalThis.DD.DEPS_AT, SATS = { KANE: 'ANE', KFCM: 'FCM', KSTP: 'STP' };
    assert('ANE, FCM and STP each carry eighteen entries, MIC and LVN none',
      Object.keys(SATS).every(f => Object.keys(DA[f]).length === 18) && DA.KMIC === undefined && DA.KLVN === undefined,
      Object.keys(DA).map(f => f + ':' + Object.keys(DA[f]).length).join());
    assert('a satellite track starts at its own field, at the airport reference point, and nowhere else is the field',
      Object.keys(SATS).every(f => Object.keys(DA[f]).every(k => DA[f][k][0].field === true && DA[f][k][0].f === SATS[f]
        && DA[f][k][0].lat === globalThis.DD.AIRPORTS[f].lat && DA[f][k][0].lon === globalThis.DD.AIRPORTS[f].lon
        && DA[f][k].filter(p => p.field).length === 1)));
    assert('DUHCK1 is the field, GGREY at or above 4,000, DUHCK, MGHTY — the same on all three transitions inside 50 NM',
      Object.keys(SATS).every(f => ['LLUKY', 'SBRNA', 'STIER'].every(t =>
        DA[f]['DUHCK1.' + t].slice(1).map(p => p.f).join() === 'GGREY,DUHCK,MGHTY' && DA[f]['DUHCK1.' + t][1].climbAA === 4000)));
    Object.keys(SATS).forEach(f => Object.keys(DA[f]).forEach(k => DA[f][k].forEach(p => {
      if (p.field) return;
      const d = Math.sqrt(p.e*p.e + p.n*p.n);
      if (d > 50) fail('satellite SID within 50 NM', f + '/' + k + '/' + p.f + ' is ' + d.toFixed(1) + ' from MSP');
      const want = SID_DME[p.f] !== undefined ? SID_DME[p.f] : SAT_DME[p.f];
      if (Math.abs(d - want) > 1.0) fail('satellite SID fix distance', f + '/' + k + '/' + p.f + ' plots at ' + d.toFixed(1) + ', the reference says ' + want);
    })));
    ok('every satellite SID fix is within 50 NM of MSP and plots where the reference puts it');
    assert('the seven a satellite shares with MSP fly the same fixes after the first leg',
      Object.keys(SATS).every(f => keys.every(k => /^(HTDSH1|SNOWZ1)\./.test(k)
        || DA[f][k].slice(1).map(p => p.f).join() === DP[k].slice(1).map(p => p.f).join())));
    assert('HTDSH1 and SNOWZ1 are not at a satellite, so the picker never offers them there',
      Object.keys(SATS).every(f => Object.keys(DA[f]).every(k => !/^(HTDSH1|SNOWZ1)\./.test(k)))
      && globalThis.DD.sidKeysAt('KSTP').length === 18 && globalThis.DD.sidKeysAt('KMSP').length === 25
      && globalThis.DD.sidKeysAt('KMIC').length === 0 && globalThis.DD.sidKeysAt('KLVN').length === 0);
    assert('depTrackFor answers per field: a satellite its own, MSP never DUHCK1, and the runway does not move a satellite track',
      globalThis.DD.depTrackFor('DUHCK1.LLUKY', null, 'KSTP') === DA.KSTP['DUHCK1.LLUKY']
      && globalThis.DD.depTrackFor('DUHCK1.LLUKY', '14', 'KSTP') === DA.KSTP['DUHCK1.LLUKY']
      && globalThis.DD.depTrackFor('DUHCK1.LLUKY', null, 'KMSP') === null
      && globalThis.DD.depTrackFor('DUHCK1.LLUKY', null) === null
      && globalThis.DD.depTrackFor('BITEZ1.DKOTA', null, 'KANE') === DA.KANE['BITEZ1.DKOTA']
      && globalThis.DD.depTrackFor('BITEZ1.DKOTA', null, 'KANE') !== DP['BITEZ1.DKOTA']
      && globalThis.DD.depTrackFor('BITEZ1.DKOTA', null, 'KMIC') === null);
    {
      const sd = globalThis.DD.sidDrawGroups(globalThis.DD.satOnlySidItems());
      assert('DUHCK1 off the three satellites is one drawn track — all three transitions, all three fields (owner, 2026-10-22)',
        globalThis.DD.satOnlySidItems().length === 9 && sd.length === 1
        && sd[0].fields.join() === 'ANE,FCM,STP' && sd[0].keys.map(k => k.split('.')[1]).join() === 'LLUKY,SBRNA,STIER',
        sd.map(g => g.keys.join('/') + '@' + g.fields.join('/')).join('|'));
      /* a tracked satellite departure beside an MSP one on the same SID shares the drawn track */
      const mixed = globalThis.DD.sidDrawGroups(['BITEZ1.DKOTA', { key: 'BITEZ1.DKOTA', route: globalThis.DD.DEPS_AT.KSTP['BITEZ1.DKOTA'] }]);
      assert('and an MSP and a satellite departure on one SID are one track that leaves from both',
        mixed.length === 1 && mixed[0].fields.join() === 'MSP,STP', mixed.map(g => g.fields.join('/')).join('|'));
    }
    {
      const sa = globalThis.DD.mkAc({ cs: 'SAT1', type: 'C172', role: 'departure', sid: 'DUHCK1.STIER', dep: 'KANE', fromStart: 3, alt: 3000, ias: 180 });
      assert('an aircraft built off Anoka is on the ANE track, files DUHCK1.STIER, and calls Approach',
        sa.route === DA.KANE['DUHCK1.STIER'] && sa.route[0].f === 'ANE' && sa.filed === 'DUHCK1.STIER'
        && globalThis.DD.depCall(sa) === 'Minneapolis Approach'
        && globalThis.DD.depCall({ dep: 'KMSP' }) === 'Minneapolis Departure');
    }
    assert('the SID is said with its number as a word, and nothing else is invented',
      globalThis.DD.sidSpoken('BITEZ1.DKOTA') === 'BITEZ ONE' && globalThis.DD.sidSpoken('KBREW1.KEETN') === 'KBREW ONE');
    assert('transitions that share a drawn track are one group with every transition on it',
      globalThis.DD.sidDrawGroups(keys).some(g => g.sid === 'TOTTZ1' && g.keys.map(k => k.split('.')[1]).join() === 'ALO,FOOLS,OANNA,OHHMY,ZZIPR')
      && globalThis.DD.sidDrawGroups(keys).some(g => g.sid === 'BITEZ1' && g.keys.map(k => k.split('.')[1]).join() === 'DKOTA,LEINY'));
    /* SID colours — owner request 2026-10-22: SIDs that leave in a similar direction
       or share a lateral path get DIFFERENT colours (a first cut did the opposite).
       A conflict is derived here from the fix data, not typed: two SIDs that share a
       mapped fix, or whose last mapped fixes leave within 30 degrees of each other. */
    {
      const D = globalThis.DD, sids = Object.keys(D.SID_SET);
      const trackOf = sid => sid === 'DUHCK1' ? Object.keys(DA.KSTP).filter(k => k.startsWith('DUHCK1.')).map(k => DA.KSTP[k])
                                              : keys.filter(k => k.startsWith(sid + '.')).map(k => DP[k]);
      const exits = sid => trackOf(sid).map(r => { const p = r[r.length - 1]; return (Math.atan2(p.e, p.n) * 180 / Math.PI + 360) % 360; });
      const fixesOf = sid => new Set([].concat(...trackOf(sid).map(r => r.slice(1).map(p => p.f))));
      const angd = (a, b) => { const d = Math.abs(a - b); return d > 180 ? 360 - d : d; };
      const conflicts = [];
      for (let i = 0; i < sids.length; i++) for (let j = i + 1; j < sids.length; j++) {
        const a = sids[i], b = sids[j];
        const share = [...fixesOf(a)].some(f => fixesOf(b).has(f));
        const close = exits(a).some(x => exits(b).some(y => angd(x, y) <= 30));
        if (share || close) conflicts.push([a, b]);
      }
      assert('the conflict rule finds the eight pairs the colours were designed around',
        conflicts.map(c => c.join('+')).sort().join() === 'BITEZ1+KBREW1,BUNYN1+NRTHN1,DUHCK1+SNOWZ1,HTDSH1+SNUPE1,HTDSH1+TOTTZ1,HTDSH1+ZMBRO1,SNUPE1+ZMBRO1,TOTTZ1+ZMBRO1',
        conflicts.map(c => c.join('+')).join());
      assert('every SID has a hue, and no two SIDs that conflict share one',
        sids.every(s => /^#[0-9A-F]{6}$/i.test(D.SID_HUES[s])) && conflicts.every(([a, b]) => D.SID_HUES[a] !== D.SID_HUES[b]),
        conflicts.filter(([a, b]) => D.SID_HUES[a] === D.SID_HUES[b]).map(c => c.join('+')).join());
      assert('only eight hues serve ten SIDs: two are reused, each by a pair that does not conflict, none the STAR green, amber or red',
        new Set(Object.values(D.SID_HUES)).size === 8 && Object.keys(D.SID_HUES).length === 10
        && Object.values(D.SID_HUES).every(h => !['#4FE0A0', '#E8A23D', '#E8604D'].includes(h.toUpperCase()))
        && D.SID_HUES.BITEZ1 === D.SID_HUES.ZMBRO1 && D.SID_HUES.KBREW1 === D.SID_HUES.SNUPE1);
      const fg = D.sidDrawGroups(keys.concat(D.satOnlySidItems()));
      assert('each drawn track is stroked in its own SID colour',
        fg.every(g => D.sidTrackSvg(g).includes('stroke="' + D.SID_HUES[g.sid] + '"')));
      assert('two SIDs never share a drawn track, even where they share every fix',
        fg.every(g => g.keys.every(k => k.split('.')[0] === g.sid)));
      /* the line from the airport to the start of the SID is not drawn (owner,
         2026-10-22) — it is the uncoded stand-in leg. The one exception is the
         coded Runway 17 segment at MSP: field to RUBRB, then a short stub on the
         heading held after it, which is the course on the coded vector leg. */
      const polys = svg => (svg.match(/<polyline [^>]*>/g) || []).map(t => ({
        pts: t.match(/points="([^"]+)"/)[1].split(' ').map(p => p.split(',').map(Number)), dash: t.match(/stroke-dasharray="([^"]+)"/)[1] }));
      const near = (p, q) => Math.abs(p[0] - q.x) < 0.06 && Math.abs(p[1] - q.y) < 0.06;
      {
        const r = DP['BITEZ1.DKOTA'], g0 = D.sidDrawGroups(['BITEZ1.DKOTA'])[0], pl = polys(D.sidTrackSvg(g0));
        assert('a track is drawn from its first SID fix, not from the airport',
          pl.length === 1 && pl[0].dash === '3 3' && pl[0].pts.length === r.length - 1 && near(pl[0].pts[0], r[1]) && !near(pl[0].pts[0], r[0]));
        const sr = DA.KSTP['DUHCK1.LLUKY'], sg = D.sidDrawGroups([{ key: 'DUHCK1.LLUKY', route: sr }])[0], sp = polys(D.sidTrackSvg(sg));
        assert('and a satellite track the same, from GGREY and not from St. Paul',
          sp.length === 1 && sp[0].pts.length === sr.length - 1 && near(sp[0].pts[0], sr[1]));
      }
      {
        const r = D17['HTDSH1.ALO'], g1 = D.sidDrawGroups([{ key: 'HTDSH1.ALO', route: r }])[0], pl = polys(D.sidTrackSvg(g1));
        const seg = pl.filter(p => p.dash === '1 3'), trk = pl.filter(p => p.dash === '3 3');
        assert('off 17 the coded segment is drawn field to RUBRB, then a stub, and the track starts at ITZME',
          seg.length === 1 && seg[0].pts.length === 3 && near(seg[0].pts[0], r[0]) && near(seg[0].pts[1], r[1])
          && trk.length === 1 && near(trk[0].pts[0], r[2]) && trk[0].pts.length === r.length - 2);
        const scale = Math.hypot(r[1].x - r[0].x, r[1].y - r[0].y) / Math.hypot(r[1].e - r[0].e, r[1].n - r[0].n);
        const sx = seg[0].pts[2][0] - r[1].x, sy = seg[0].pts[2][1] - r[1].y;
        const brg = (Math.atan2(sx, -sy) * 180 / Math.PI + 360) % 360, len = Math.hypot(sx, sy) / scale;
        assert('the stub leaves RUBRB on 215.0 — the course on the coded vector leg — for two miles, and is not a leg to the join fix',
          D.RW17_HDG.course === 215 && Math.abs(brg - 215) < 0.5 && Math.abs(len - 2) < 0.1 && !near(seg[0].pts[2], r[2]), brg.toFixed(1) + '/' + len.toFixed(2));
        const all = polys(D.sidRw17Svg(1)).filter(p => p.dash === '1 3');
        assert('"all SIDs" draws the same segment and stub, once for each of the two SIDs, never to the join fix',
          all.length === 2 && all.every(p => p.pts.length === 3 && near(p.pts[0], r[0]) && near(p.pts[1], r[1]) && Math.abs(p.pts[2][0] - seg[0].pts[2][0]) < 0.06));
        assert('the aircraft still flies the stand-in leg — only the drawing changed',
          r[0].field === true && r[1].f === 'RUBRB' && r[2].f === 'ITZME' && r.length > 3);
      }
      /* two SIDs on one leg are drawn side by side, not one over the other — owner,
         2026-10-22. HTDSH1 and TOTTZ1 share HTDSH, TOTTZ and CORDY (FOOLS is past the 50 NM limit); HTDSH1's BRIBE
         and ZMBRO1 share JEDET to ZMBRO. */
      {
        const pg = D.sidDrawGroups(['HTDSH1.ALO', 'TOTTZ1.ALO', 'HTDSH1.BRIBE', 'ZMBRO1.BRIBE']);
        const gOf = (sid, fix) => pg.filter(g => g.sid === sid && g.drawn.some(p => p.f === fix))[0];
        const at = (g, f) => g.pts[g.drawn.findIndex(p => p.f === f)], raw = (g, f) => g.drawn.find(p => p.f === f);
        const lat = (g, f) => Math.hypot(at(g, f).x - raw(g, f).x, at(g, f).y - raw(g, f).y);
        const hA = gOf('HTDSH1', 'CORDY'), tA = gOf('TOTTZ1', 'CORDY'), hB = gOf('HTDSH1', 'ZMBRO'), zB = gOf('ZMBRO1', 'ZMBRO');
        assert('the two SIDs on a shared leg are one lane width apart, each half a lane either side of the leg',
          Math.abs(Math.hypot(at(hA, 'CORDY').x - at(tA, 'CORDY').x, at(hA, 'CORDY').y - at(tA, 'CORDY').y) - D.SID_LANE) < 0.01
          && Math.abs(lat(hA, 'CORDY') - D.SID_LANE / 2) < 0.01 && Math.abs(lat(tA, 'CORDY') - D.SID_LANE / 2) < 0.01
          && Math.abs(Math.hypot(at(hB, 'ZMBRO').x - at(zB, 'ZMBRO').x, at(hB, 'ZMBRO').y - at(zB, 'ZMBRO').y) - D.SID_LANE) < 0.01);
        assert('and HTDSH1 keeps the same side along the whole shared leg',
          (() => { const side = f => Math.sign((at(hA, f).x - at(tA, f).x) * (raw(hA, 'CORDY').y - raw(hA, 'HTDSH').y) - (at(hA, f).y - at(tA, f).y) * (raw(hA, 'CORDY').x - raw(hA, 'HTDSH').x));
                   return side('TOTTZ') === side('CORDY') && side('CORDY') !== 0; })());
        assert('the lead-in to the shared leg tapers rather than jumping: ITZME is untouched, HTDSH moves half as far',
          lat(hA, 'ITZME') === 0 && Math.abs(lat(hA, 'HTDSH') - D.SID_LANE / 4) < 0.01);
        assert('a SID on a leg nobody else flies is not moved — BITEZ1, and DUHCK1 off the satellites',
          D.sidDrawGroups(keys.concat(D.satOnlySidItems())).filter(g => ['BITEZ1', 'BUNYN1', 'DUHCK1', 'KBREW1', 'NRTHN1', 'SNOWZ1', 'SNUPE1'].includes(g.sid))
            .every(g => g.pts.every((p, i) => Math.abs(p.x - g.drawn[i].x) < 1e-9 && Math.abs(p.y - g.drawn[i].y) < 1e-9)));
        assert('two transitions of one SID on one leg are not pushed apart',
          (() => { const b = D.sidDrawGroups(['BITEZ1.DKOTA', 'BITEZ1.SMERF']); return b.length === 2 && b.every(g => g.pts.every((p, i) => p.x === g.drawn[i].x && p.y === g.drawn[i].y)); })());
      }
      const leg = D.sidLegendSvg(fg, 14, 554);
      assert('the key names each SID on the scope once, in SID order, in one row along the bottom — and nothing for an empty scope',
        Object.keys(D.SID_SET).every(s => leg.includes('>' + s + '<') && (leg.match(new RegExp('>' + s + '<', 'g')) || []).length === 1)
        && D.sidLegendSvg([], 14, 554) === '' && !leg.includes('EXIT DIRECTION')
        && (leg.match(/<rect /g) || []).length === 10 && new Set((leg.match(/ y="([\d.]+)" width="10"/g) || [])).size === 1);
    }
  }
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

  /* The 2026-10-29 set's gate letters are TABLED — owner, 2026-10-14: not known
     yet. The retired set's (WLSTN E, COULT D, ZMBRO N, RST R, ORSKY and SCHEP O,
     KBREW F, LEINY and SMERF none) were derived from bearings and confirmed on the
     owner's chart; nothing here derives the new ones. */
  const SG = globalThis.DD.SID_GATE;
  assert('every SID carries a gate record, keyed by SID rather than transition',
    Object.keys(SG).join() === Object.keys(globalThis.DD.SID_SET).join());
  assert('and every gate is tabled — null, never derived',
    Object.values(SG).every(g => g.gate === null && g.fix === null && g.tabled === true));
  assert('so no departure gets a scratchpad gate, whatever its altitude',
    Object.keys(globalThis.DD.DEPS).every(k => globalThis.DD.scratchpadFor(k, 11000) === null
      && globalThis.DD.scratchpadFor(k) === null));
  assert('a gate lookup reads the SID, not the transition',
    globalThis.DD.gateForSid('BITEZ1.DKOTA') === null && SG.BITEZ1 !== undefined);

  /* The scratchpad FORMS are still M98 7110.26A's and still tested — on a gate
     record set up for the test and taken away again, so no SID is given one.
     The order's example is B12; the old chart's was E11. */
  {
    const keep = SG.BITEZ1;
    SG.BITEZ1 = {gate:'E', fix:'EAU'};
    assert('form (a): gate letter and the two-digit altitude, zero-padded',
      globalThis.DD.scratchpadFor('BITEZ1.DKOTA', 11000) === 'E11'
      && globalThis.DD.scratchpadFor('BITEZ1.DKOTA', 9000) === 'E09');
    /* With no altitude the order's form (b) applies — the THREE-LETTER gate. A
       bare letter would be one character and CRC will not take it. */
    assert('form (b): the three-letter gate with no altitude, never a bare letter',
      globalThis.DD.scratchpadFor('BITEZ1.SMERF') === 'EAU');
    assert('both forms are entries CRC can take',
      globalThis.DD.scratchpadValid(globalThis.DD.scratchpadFor('BITEZ1.DKOTA', 11000))
      && globalThis.DD.scratchpadValid(globalThis.DD.scratchpadFor('BITEZ1.DKOTA')));
    SG.BITEZ1 = keep;
  }
  assert('and the record is tabled again afterwards', globalThis.DD.gateForSid('BITEZ1.DKOTA') === null);
  assert('scratchpadValid rejects a bare gate letter', !globalThis.DD.scratchpadValid('R'));
  assert('scratchpadValid rejects an over-long entry', !globalThis.DD.scratchpadValid('ABCDE'));

  /* ============ 3a. The set goes live on 2026-10-29 — issue #61 ============
     The deck carries the CIFP 261029 set EARLY (owner, 2026-10-14), so until the
     date the banner says the network is still on the retired set; from the date
     the set is simply current and the banner is gone. The note at the picker
     stays either side, because the gates are tabled either side. */
  const SC = globalThis.DD.SID_CHANGE;
  assert('the change carries its date, its cycle, its issue and its source',
    SC.effective === '2026-10-29' && SC.cycle === 'CIFP 261029' && SC.issue === 61 && /owner, 2026-10-14/.test(SC.src));
  assert('the retired set is recorded — twelve at MSP, the same seven at each satellite',
    SC.retired.KMSP.length === 12 && SC.retired.KSTP.join() === 'COULT7,KBREW2,ORSKY3,RST1,SCHEP1,WLSTN7,ZMBRO7'
    && SC.retired.KANE === SC.retired.KFCM && SC.retired.KANE === SC.retired.KSTP);
  assert('the deck carries exactly the new MSP set plus the satellites’ DUHCK1, and none of the retired names',
    globalThis.DD.sidsAtMsp().join() === globalThis.DD.SID_FIELDS.KMSP.join()
    && globalThis.DD.sidsCarried().slice().sort().join() === globalThis.DD.SID_FIELDS.KMSP.concat('DUHCK1').sort().join()
    && globalThis.DD.SID_RETIRED_KEYS.every(k => globalThis.DD.DEPS[k] === undefined && globalThis.DD.DEPS_AT.KSTP[k] === undefined));
  assert('a retired name is known as retired, and a current one is not',
    globalThis.DD.sidRetired('WLSTN') && globalThis.DD.sidRetired('KBREW') && !globalThis.DD.sidRetired('BITEZ1.DKOTA'));
  assert('early the day before, live on the day',
    globalThis.DD.sidChangeState('2026-10-28') === 'early'
    && globalThis.DD.sidChangeState('2026-10-29') === 'live'
    && globalThis.DD.sidChangeState('2027-01-01') === 'live');
  const scEarly = globalThis.DD.sidChangeHtml('2026-10-28').replace(/<[^>]+>/g, ' ');
  assert('before the date the banner names both sets, the date and the issue',
    scEarly.includes('These are the SIDs from 2026-10-29') && scEarly.includes('Issue #61')
    && globalThis.DD.sidsCarried().every(s => scEarly.includes(s))
    && ['COULT7', 'WLSTN7', 'ZMBRO7'].every(s => scEarly.includes(s)) && !scEarly.includes('HSTIN6'));
  assert('from the date there is no banner — the set is simply current',
    globalThis.DD.sidChangeHtml('2026-10-29') === '');
  assert('the picker line says when, then just that the gates are tabled',
    globalThis.DD.sidChangeShort('2026-10-28') === 'live on 2026-10-29 · gate letters not known yet'
    && globalThis.DD.sidChangeShort('2026-10-29') === 'gate letters not known yet');

  /* The ILS category on the MSP runway records, ARINC 424 5.80. 0 is a
     localizer with NO glide slope — 4, 17 and 22 have no ILS, which the CIFP
     manifest says independently (L04, L17, L22; no I04, I17, I22). The deck's
     comment read "0 = CAT I" until 2026-10-14; the values were always right,
     and this pins them so nobody "fixes" them to match the old comment. */
  const RW = globalThis.DD.RUNWAYS;
  assert('4, 17 and 22 are localizer only; 30R CAT I; 30L CAT II; 12L, 12R and 35 CAT III',
    ['04', '17', '22'].every(r => RW[r].cat === 0) && RW['30R'].cat === 1 && RW['30L'].cat === 2
    && ['12L', '12R', '35'].every(r => RW[r].cat === 3));

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
  /* COUNT ROUTES, NOT POLYLINES. The RST boundary segment is a polyline too and
     it is drawn in every layer mode including "off", because it is airspace
     rather than a route — so a raw <polyline> count is one higher than the
     number of tracks and "off" is 1, not 0. These five assertions counted raw
     polylines and were all off by one; that was invisible until the harness was
     first executed on 2026-09-07. Ladders are green, SID tracks are the dashed
     amber ones, so each is counted by the stroke the renderer actually gives it. */
  const scope   = () => el('dd-scopebox').innerHTML;
  const polys   = () => (scope().match(/<polyline/g) || []).length;
  const ladders = () => (scope().match(/<polyline[^>]*stroke="var\(--green\)"/g) || []).length;
  const sidTrks = () => (scope().match(/<polyline[^>]*stroke-dasharray="3 3"/g) || []).length;
  globalThis.ddLayers('tracked'); const lTracked = ladders(), sTracked = sidTrks();
  globalThis.ddLayers('stars');   const lStars = ladders();
  globalThis.ddLayers('sids');    const lSidsL = ladders(), lSidsS = sidTrks();
  globalThis.ddLayers('both');    const lBothL = ladders(), lBothS = sidTrks();
  globalThis.ddLayers('off');     const lOffL = ladders(), lOffAll = polys();
  assert('tracked draws only the ladders in use, and no SID track', lTracked === 3 && sTracked === 0,
    lTracked + '/' + sTracked);
  assert('all STARs draws the six MSP ladders, the three satellite STARs the engine flies and GOPHER ONE', lStars === 10, lStars);
  /* Fourteen tracks, not twenty-five: transitions that share a mapped track inside
     80 NM are drawn once (sidDrawGroups) — it was nine, one per SID, before the
     2026-10-29 set came in. */
  /* Seventeen with issue #67: the fourteen MSP tracks, and DUHCK1 from each of the
     three satellite fields that code it — the seven SIDs a satellite shares with MSP
     are not drawn a second time from three more starting points. */
  const nSidTrk = globalThis.DD.sidDrawGroups(Object.keys(globalThis.DD.DEPS).concat(globalThis.DD.satOnlySidItems())).length;
  assert('all SIDs adds every distinct SID track without hiding the tracked ladders',
    lSidsL === 3 && lSidsS === nSidTrk && nSidTrk === 15
    && globalThis.DD.sidDrawGroups(Object.keys(globalThis.DD.DEPS)).length === 14, lSidsL + '/' + lSidsS);
  assert('all SIDs and STARs draws everything', lBothL === 10 && lBothS === nSidTrk, lBothL + '/' + lBothS);
  assert('off draws no route geometry at all', lOffL === 0 && sidTrks() === 0, lOffL);
  /* Under "off" this used to leave exactly one polyline, the RST boundary. Issue
     #60 (5d995f6, owner 2026-09-21) took that line off the scope and kept the
     boundary itself — RST_BOUNDARY and neighbourAt still resolve, and the RST
     section below still asserts them — so nothing route-shaped or boundary-
     shaped is drawn now. The harness failed here from 5d995f6 until 2026-10-14. */
  assert('and "off" now draws no polyline at all, the RST line included (issue #60)',
    lOffAll === 0, lOffAll);
  /* SID names and transitions are NOT drawn on the scope (owner, 2026-10-22: the
     key says which colour is which SID, so the labels were redundant). The tracks,
     the Runway 17 stub, its RUBRB caption and the key stay; the transitions are in the
     Direct-to fixes list. There is no names toggle any more. */
  {
    globalThis.ddLayers('both');
    const svg = scope();
    assert('no SID name or transition is written on the scope with every SID up',
      !svg.includes('BITEZ1 DKOTA') && !svg.includes('TOTTZ1 ALO') && !svg.includes('DUHCK1 LLUKY') && !svg.includes('SNOWZ1 ISTIQ')
      && !/>[A-Z]{4,5}\d [A-Z]{3,5}[\/ <]/.test(svg.replace(/<text[^>]*>(?:[A-Z]{4,5}\d)<\/text>/g, '')));
    assert('the key, the tracks and the RUBRB caption are still drawn',
      svg.includes('>HTDSH1<') && svg.includes('fill="#E6D36A"') && sidTrks() > 0 && svg.includes('RUBRB · off 17'));
    assert('and the labeller and the toggle are gone',
      globalThis.DD.sidLabelSvg === undefined && globalThis.DD.sidNames === undefined && globalThis.ddSidNames === undefined);
    globalThis.ddLayers('tracked');
  }
  /* The 25 DME circle is gone from the scope (owner, 2026-10-22: not needed). The
     release itself is untouched: DEP_RELEASE is still 25 / 11,000 and the 4.c
     grading and the strip countdown are asserted elsewhere. */
  {
    globalThis.ddLayers('both');
    const ringSvg = scope();
    assert('no 25 DME circle or caption is drawn with every SID up',
      !ringSvg.includes('>25 DME<') && !/<circle[^>]*stroke-dasharray="2 5"/.test(ringSvg) && sidTrks() > 0);
    assert('and the release is still 25 NM or 11,000', globalThis.DD.DEP_RELEASE.dme === 25 && globalThis.DD.DEP_RELEASE.alt === 11000);
    globalThis.ddLayers('tracked');
  }
  /* An open question the deck shows — which SID is preferred off 17 (owner,
     2026-10-22; claude_M98_MD_Gap_Analysis.md Part 6 item 7). */
  {
    const q = globalThis.DD.SID17_OPEN;
    assert('the off-17 question names HTDSH1 as the owner’s expectation, says it is not a published rule, and says it is open',
      typeof q === 'string' && q.includes('HTDSH1') && /owner/.test(q) && /not a published rule/.test(q) && /Open until the updated SOP and LOA/.test(q), q);
    assert('and the deck prefers neither SID — both are generated and offered',
      globalThis.DD.sidKeysAt('KMSP').some(k => k.startsWith('HTDSH1.')) && globalThis.DD.sidKeysAt('KMSP').some(k => k.startsWith('SNOWZ1.')));
  }
  /* The direct-to list — owner request 2026-10-22: the fixes a departure can be
     cleared direct to and still be within ZMP-M98 LOA 4.f (60 NM of the MSP DME).
     Read off SID_SET and SID_FIX, hidden until its button is pressed. */
  {
    const D = globalThis.DD, dl = D.directFixes(), row = s => dl.rows.filter(r => r.sid === s)[0];
    const names = r => r.trans.map(t => t.names.join('/') + ':' + (t.fixes.map(x => x.f).join(',') || 'none')).join(' | ');
    assert('the limit is the LOA 4.f join limit, 60 NM', dl.limit.nm === 60 && /LOA 4\.f/.test(dl.limit.src));
    assert('every SID the deck carries is listed, DUHCK1 among them and coded at the satellites only',
      dl.rows.map(r => r.sid).join() === Object.keys(D.SID_SET).join() && row('DUHCK1').codedAt === 'ANE, FCM and STP only'
      && row('HTDSH1').codedAt === 'MSP only' && row('BITEZ1').codedAt === 'MSP and the satellites');
    assert('no fix listed is farther than 60 NM from MSP, and the three that are come back as past the limit',
      dl.rows.every(r => r.common.concat(...r.trans.map(t => t.fixes)).every(x => x.nm <= 60))
      && dl.past.map(x => x.f).join() === 'HSTIN,KBREW,FOOLS' && dl.past.every(x => x.nm > 60));
    assert('transitions that share their in-limit fixes are one line: HTDSH1 four on TOTTZ and CORDY, BRIBE apart',
      names(row('HTDSH1')) === 'ALO/OANNA/OHHMY/ZZIPR:TOTTZ,CORDY | BRIBE:JEDET,ZMBRO'
      && names(row('TOTTZ1')) === 'ALO/FOOLS/OANNA/OHHMY/ZZIPR:CORDY');
    assert('a transition with nothing inside 60 NM says so rather than vanishing — KBREW1 KEETN, ZMBRO1 BRIBE',
      names(row('KBREW1')) === 'KEETN:none' && names(row('ZMBRO1')) === 'BRIBE:none' && row('KBREW1').common.map(x => x.f).join() === 'HRBEK,HOMUR');
    assert('the first fix carries its at-or-above crossing, and the Runway 17 segment names RUBRB',
      row('HTDSH1').common[0].f === 'ITZME' && row('HTDSH1').common[0].aa === 3500 && row('BITEZ1').common[0].aa === 4000
      && row('DUHCK1').common[0].aa === 4000 && row('HTDSH1').rwy[0].f === 'RUBRB' && row('BUNYN1').rwy === null);
    assert('only CORDY is on the Rochester side of the boundary',
      dl.rows.every(r => r.common.concat(...r.trans.map(t => t.fixes)).filter(x => x.rst).every(x => x.f === 'CORDY'))
      && row('HTDSH1').trans[0].fixes.filter(x => x.rst).length === 1);
    const dh = D.directFixesHtml();
    assert('the panel states the rule, that the LOA names no fixes, the release and the 169.5 off 17',
      ['LOA 4.f', '60 NM', 'LOA 4.c', 'technique, not a published requirement', 'heading 169.5', 'DUHCK1', 'not a direct target'].every(s => dh.includes(s)));
    /* the same fixes ringed and named on the scope while the button is on */
    {
      globalThis.ddLayers('sids');
      const listed = new Set(); dl.rows.forEach(r => r.common.concat(...r.trans.map(t => t.fixes), r.rwy || []).forEach(x => listed.add(x.f)));
      const pts = D.directFixPoints();
      assert('one point per listed fix, each once, sorted nearest first, and the list is non-trivial',
        pts.length === listed.size && listed.size > 30 && pts.every(q => listed.has(q.f)) && pts.every((q, i) => i === 0 || pts[i - 1].nm <= q.nm), pts.length + '/' + listed.size);
      const offSvg = scope();
      globalThis.ddDirectList(true);
      const onSvg = scope(), rings = (onSvg.match(/<circle[^>]*r="2\.8"[^>]*stroke-width="1\.2"/g) || []).length;
      assert('with the button on, every listed fix is ringed and named on the scope',
        rings === listed.size && [...listed].every(f => onSvg.includes('>' + f + '</text>')), rings + '/' + listed.size);
      assert('fixes past 60 NM are not shown, HHCEE (53, past the drawn tracks) is, and CORDY carries RST',
        ['FOOLS', 'KBREW', 'HSTIN'].every(f => !onSvg.includes('>' + f + '</text>')) && onSvg.includes('>HHCEE</text>') && onSvg.includes('>RST</text>'));
      assert('a fix one SID uses takes its colour; a shared one is neutral — GGREY is DUHCK1 cyan, HTDSH neutral',
        pts.filter(q => q.f === 'GGREY')[0].sids.join() === 'DUHCK1' && pts.filter(q => q.f === 'HTDSH')[0].sids.length > 1
        && new RegExp('stroke="' + D.SID_HUES.DUHCK1 + '"[^>]*/><text[^>]*>GGREY<').test(onSvg) && /stroke="#E7EDE9"[^>]*\/><text[^>]*>HTDSH</.test(onSvg));
      assert('and names do not sit on top of one another',
        (() => { const bx = [...onSvg.matchAll(/<text x="([\d.]+)" y="([\d.]+)" fill="(?:#[0-9A-Fa-f]{6})" font-family="IBM Plex Mono" font-size="9">([A-Z]+)<\/text>/g)].map(m => ({ x: +m[1], y: +m[2], w: m[3].length * 5.7 }));
                 return bx.length >= listed.size && bx.every((a, i) => bx.every((b, j) => i >= j || !(a.x < b.x + b.w && a.x + a.w > b.x && Math.abs(a.y - b.y) < 9))); })());
      globalThis.ddDirectList(false);
      assert('off again, none of them is drawn', !scope().includes('>HHCEE</text>') && !scope().includes('>GGREY</text>') && scope().length === offSvg.length);
      globalThis.ddLayers('tracked');
    }
    assert('it is hidden until asked for, and the button toggles it',
      D.directList() === false && (globalThis.ddDirectList(), D.directList() === true) && (globalThis.ddDirectList(), D.directList() === false));
  }
  /* With every SID up, the Runway 17 segment HTDSH1 and SNOWZ1 code is drawn
     too — field, RUBRB, first fix — finer than a track and named once. */
  {
    const seg17 = () => (scope().match(/<polyline[^>]*stroke-dasharray="1 3"/g) || []).length;
    globalThis.ddLayers('sids');
    const s17 = seg17(), named = scope().includes('RUBRB · off 17');
    globalThis.ddLayers('tracked');
    assert('all SIDs also draws the two Runway 17 segments, once each, named at RUBRB',
      s17 === 2 && named && seg17() === 0, s17 + '/' + named);
  }
  globalThis.ddLayers('tracked');

  /* ============ 3c-b. What the scope actually DRAWS — issue #16 ============
     Everything above this asserts the data the scope is drawn FROM. Nothing
     asserted the drawing itself until 2026-09-07, which is how the fixAt crash
     of 2026-09-04 reached a real page: no assertion touched that path. These
     read scopeSvg's own output, matching on fix names, stroke colours and text
     nodes rather than on coordinates, which would be brittle. */
  {
    const texts = () => (scope().match(/<text[^>]*>([^<]*)<\/text>/g) || [])
                          .map(t => t.replace(/<[^>]*>/g, ''));
    const ladderPts = () => (scope().match(/<polyline points="[^"]*" fill="none" stroke="var\(--green\)"/g) || [])
                          .map(m => m.match(/points="([^"]*)"/)[1]);

    globalThis.ddLoad('resume10r');
    globalThis.ddLayers('tracked');

    /* Data block, STARS FDB layout — claude_CRC_Platform_Reference.md. Line 1
       is the callsign and NOTHING ELSE; wake moved off it on 2026-09-07
       (issue #17) and sits on line 2 hard against the ground speed. */
    assert('line 1 of the data block is the callsign alone',
      texts().indexOf('DAL158') >= 0 && !texts().some(t => /^DAL158[ ]/.test(t)),
      texts().filter(t => t.indexOf('DAL158') === 0).join(' / '));
    assert('a heavy carries H immediately after the ground speed on line 2',
      texts().some(t => /^\d+ \d+H A339/.test(t)),
      texts().filter(t => /A339/.test(t)).join(' / '));
    assert('a non-heavy carries nothing there, which is the legacy scheme blank',
      texts().some(t => /^\d+ \d+ B738/.test(t)),
      texts().filter(t => /B738/.test(t)).join(' / '));
    assert('and line 2 is altitude, ground speed, wake, type — in that order',
      texts().some(t => /^\d+ \d+H? [A-Z0-9]{3,4}/.test(t)));

    /* Every gate label drawn corresponds to a gate actually in ROUTES. */
    globalThis.ddLayers('stars');
    /* THE LABEL IS THE LADDER'S FIRST FIX, WHICH IS NOT ALWAYS THE GATE NAME.
       MUSCL's 12L ladder as published begins at BAYKS — its transfer-of-
       communications fix — so the scope reads BAYKS there and never says
       MUSCL. That is the data, not a rendering bug, and it is what a
       controller looking at the scope actually sees. */
    assert('every ladder in the loaded flow is labelled at its first fix',
      Object.keys(globalThis.DD.ROUTES).every(g => texts().indexOf(globalThis.DD.ROUTES[g][0].f) >= 0),
      Object.keys(globalThis.DD.ROUTES).filter(g => texts().indexOf(globalThis.DD.ROUTES[g][0].f) < 0).join(','));
    assert('and MUSCL is labelled BAYKS, because that is where its ladder starts',
      globalThis.DD.ROUTES.MUSCL[0].f === 'BAYKS' && texts().indexOf('BAYKS') >= 0
      && texts().indexOf('MUSCL') < 0,
      globalThis.DD.ROUTES.MUSCL[0].f);
    assert('and nothing is labelled for a gate the loaded flow does not carry',
      ['NITZR','BLUEM','TORGY','KKILR','MUSCL','BAINY']
        .filter(g => !globalThis.DD.ROUTES[g] && texts().indexOf(g) >= 0).length === 0);

    /* The polylines follow setFlow. A 30s frame draws 30s tracks — the whole
       point of the flow work, and nothing asserted it. */
    /* setFlow rebuilds ROUTES but does not repaint — the scope is redrawn by
       render(), so read the DOM only after something has caused one. Without
       the redraw both samples come back identical and the assertion passes or
       fails on stale markup rather than on the flow. */
    const pts12 = ladderPts();
    globalThis.DD.setFlow('30');
    globalThis.ddLayers('stars');
    const pts30 = ladderPts();
    assert('both flows draw the six MSP ladders plus the four satellite ones, which do not follow the flow',
      pts12.length === 10 && pts30.length === 10 && pts12.filter(p => pts30.includes(p)).length >= 4,
      pts12.length + '/' + pts30.length);
    assert('and the lines on the scope are different lines',
      pts12.join('|') !== pts30.join('|'));
    assert('the drawn ladder is the loaded ladder, not a stale one',
      (() => { const r = globalThis.DD.ROUTES.NITZR, last = r[r.length - 1];
               return ladderPts().some(p => p.split(' ').pop() === last.x.toFixed(1) + ',' + last.y.toFixed(1)); })());

    /* A gate with no ladder in the current flow RENDERS THE GAP rather than
       throwing. This is the regression that already happened once. */
    globalThis.DD.setFlow('4');
    globalThis.ddLayers('stars');
    assert('an uncarried configuration draws no MSP ladder — only the four satellite ones, which do not follow the flow — and does not throw',
      ladderPts().length === 4 && typeof scope() === 'string', ladderPts().length);
    assert('and the aircraft still on the scope keep their own tracks',
      globalThis.DD.sim.ac.every(a => a.role !== 'arrival' || !!a.route));
    globalThis.DD.setFlow('12');
    globalThis.ddLayers('tracked');

    /* The builder preview draws the same geometry from the same data. */
    globalThis.ddbNew();
    globalThis.ddbSync();
    const prev = el('ddb-preview').innerHTML;
    assert('the builder preview renders and says it shares the scope geometry',
      prev.indexOf('SAME GEOMETRY AS THE LIVE SCOPE') >= 0);
    assert('and the preview draws no wake, which is a stated difference from the scope',
      !/\d+ \d+H /.test(prev.replace(/<[^>]*>/g, ' ')));
  }

  /* ============ 3c-b2. The far-gate transfer of communications — issue #24 ====
     M98 7110.26A 4-5b(1): a far-gate crossover is handed to the appropriate
     Feeder and communication transferred "as soon as practicable but not later
     than 15 NM from MSP". THE DATUM IS THE MSP DME, not the threshold — the
     order names the same number again as a range ring in 4-5b(2). Graded
     against `posthandoff`, which already carries the 4.c release deadline of
     exactly this shape, so no standing item is invented (invariant 4). */
  {
    assert('the far-gate deadline is 15 NM from MSP, and it carries its paragraph',
      globalThis.DD.FARGATE_XFER.dme === 15
      && globalThis.DD.FARGATE_XFER.src.indexOf('4-5b(1)') >= 0,
      JSON.stringify(globalThis.DD.FARGATE_XFER));

    /* WHICH CROSSOVER IS FAR IS A PROPERTY OF THE FLOW, NOT OF THE GATE. On a
       12s the far gates are NITZR, BLUEM, KKILR and MUSCL, so the far-gate
       crossovers are NITZR and BLUEM to 12L and MUSCL to 12R — KKILR to 12R is
       carved out by 4-5 and is not counted as one. TORGY to 12L crosses the
       localizer too, but TORGY is NEAR on a 12s, so it is the 9,000-and-a-
       heading rule instead. Issue #24's body named TORGY; that is the near
       case, and asserting both is what keeps the distinction visible. */
    globalThis.DD.setFlow('12');
    assert('NITZR to 12L is the far-gate case the rule is about',
      globalThis.DD.crossoverFor('NITZR','12L','12').type === 'far'
      && globalThis.DD.crossoverFor('NITZR','12R','12').type === 'none',
      globalThis.DD.crossoverFor('NITZR','12L','12').type);
    assert('TORGY to 12L crosses the localizer but is NEAR, so it is a different rule',
      globalThis.DD.crossoverFor('TORGY','12L','12').type === 'near',
      globalThis.DD.crossoverFor('TORGY','12L','12').type);
    assert('and KKILR to 12R is carved out of the far-gate rule by 4-5 itself',
      globalThis.DD.crossoverFor('KKILR','12R','12').type === 'none'
      && /not counted as a far-gate crossover/.test(globalThis.DD.crossoverFor('KKILR','12R','12').note||''),
      globalThis.DD.crossoverFor('KKILR','12R','12').note || '(no note)');
    assert('and a far-gate crossover goes to a Feeder, not to Arrival',
      ['H','I'].indexOf(globalThis.DD.receiverFor(
        globalThis.DD.mkAc({cs:'X1', gate:'NITZR', rwy:'12L', alt:9000, ias:250, dtgEnd:20})).pos) >= 0,
      globalThis.DD.receiverFor(
        globalThis.DD.mkAc({cs:'X1', gate:'NITZR', rwy:'12L', alt:9000, ias:250, dtgEnd:20})).pos);

    /* Fly one inside the ring three ways: switched, flashed only, neither. */
    const ringRun = (setup) => {
      globalThis.ddLoad('resume10r');
      globalThis.DD.sim.ac.length = 0;
      const a = globalThis.DD.mkAc({cs:'FAR1', type:'B738', gate:'NITZR', rwy:'12L',
        alt:8000, ias:250, spdMode:'published', ckdIn:true, altim:true, dtgEnd:2});
      a.onFreq = true;
      setup(a);
      globalThis.DD.sim.ac.push(a);
      const before = globalThis.DD.sim.feed.length;
      globalThis.ddRate(1);
      for (let i = 0; i < 40 && !a.farChecked; i++) tickFn();
      return { a, said: globalThis.DD.sim.feed.slice(0, globalThis.DD.sim.feed.length - before)
                          .map(e => String(e.html).replace(/<[^>]*>/g, ' ')).join(' ') };
    };

    let r = ringRun(a => { a.flashed = 'H'; a.switched = true; });
    assert('a far-gate crossover switched before the ring is graded good',
      r.a.farChecked && /made 4-5b\(1\)/.test(r.said), r.said.slice(0, 160));

    r = ringRun(a => { a.flashed = 'H'; });
    assert('flashed but not switched at 15 NM is flagged, and says the flash does not stop the clock',
      /flashed but not switched/.test(r.said) && /does not stop the clock/.test(r.said),
      r.said.slice(0, 200));

    r = ringRun(() => {});
    assert('neither flashed nor switched at 15 NM is critical',
      /no flash and no switch/.test(r.said) && /control for turns/.test(r.said),
      r.said.slice(0, 200));
    assert('and it names the Feeder that owns it, not Arrival',
      /South Feeder|North Feeder/.test(r.said), r.said.slice(0, 200));

    /* every one of the three tags the standing item the tool already has */
    assert('the far-gate check is tagged to post-handoff discipline',
      globalThis.DD.sim.feed.some(e => e.item === 'posthandoff'),
      globalThis.DD.sim.feed.map(e => e.item).join(','));

    /* the ring is drawn only when there is something to measure against */
    globalThis.ddLayers('tracked');
    assert('the 15 NM ring is on the scope while a far-gate crossover is airborne',
      el('dd-scopebox').innerHTML.indexOf('15 NM COMMS') >= 0);
    globalThis.ddLoad('resume10r');
    globalThis.DD.sim.ac.forEach(a => { a.rwy = null; });
    globalThis.ddLayers('tracked');
    assert('and it is not drawn when there is nothing to measure',
      el('dd-scopebox').innerHTML.indexOf('15 NM COMMS') < 0);

    /* a near-gate crossover is a different rule and must not borrow this one —
       BAINY to 12R is the order's own worked example of one */
    assert('a near-gate crossover is not graded against the 15 NM ring',
      globalThis.DD.crossoverFor('BAINY','12R','12').type === 'near');
    globalThis.DD.setFlow('12');
  }

  /* ============ 3c-c. Live re-pathing — issue #14 ============
     The rule, owner's call 2026-09-07: KEEP THE POSITION, RE-DERIVE THE MILES
     TO GO. Assert both halves separately, plus the two ways it must refuse. */
  {
    globalThis.ddLoad('freshpush');
    const arr = () => globalThis.DD.sim.ac.filter(a => a.role === 'arrival');
    const posOf = a => { const r = a.route; let i = r.length - 1;
      for (let k = 1; k < r.length; k++) if (a.dist <= r[k].cum) { i = k; break; }
      const d0 = r[i-1].cum, d1 = r[i].cum, t = (d1 === d0) ? 0 : (a.dist - d0) / (d1 - d0);
      return { e: r[i-1].e + (r[i].e - r[i-1].e) * t, n: r[i-1].n + (r[i].n - r[i-1].n) * t }; };

    arr().forEach(a => { a.dist = a.route.total * 0.55; });
    const before = arr().map(a => ({ cs: a.cs, p: posOf(a), total: a.route.total,
                                     end: a.route[a.route.length - 1].f }));
    globalThis.DD.setFlow('30');
    const after = arr().map(a => ({ cs: a.cs, p: posOf(a), total: a.route.total,
                                    end: a.route[a.route.length - 1].f }));

    assert('a flow change re-paths every airborne arrival onto the new ladder',
      before.every((b, i) => b.end !== after[i].end || b.total === after[i].total),
      before.map((b,i) => b.end + '->' + after[i].end).join(' '));
    assert('and the 30s totals are the published ones, so the swap is real',
      Math.round(globalThis.DD.ROUTES.KKILR.total * 10) / 10 === 25.8
      && Math.round(globalThis.DD.ROUTES.BAINY.total * 10) / 10 === 55.5,
      globalThis.DD.ROUTES.KKILR.total.toFixed(1) + '/' + globalThis.DD.ROUTES.BAINY.total.toFixed(1));
    /* THE POSITION IS KEPT. The target may step across by the gap between the
       two published tracks — that is reported, not hidden — but it must never
       be flung down the new ladder the way preserving dtg would. */
    assert('every re-pathed target holds its position to within the gap between the two tracks',
      before.every((b, i) => Math.hypot(after[i].p.e - b.p.e, after[i].p.n - b.p.n) < 8),
      before.map((b,i) => b.cs + ' ' + Math.hypot(after[i].p.e - b.p.e, after[i].p.n - b.p.n).toFixed(1)).join(' '));
    assert('and the miles to go are re-derived rather than carried across',
      arr().every(a => Math.abs((a.route.total - a.dist)) <= a.route.total + 0.01));
    mustContain('the re-path says what it cost', 'holds its position and picks up the new ladder');

    /* A RUNWAY ASSIGNMENT DOES NOT MOVE THE TRACK — issue #55, owner
       2026-09-09. It says what the aircraft is expecting to land on; the track
       is the transition ZMP gave it. This is where #14's machinery used to be
       wired, and it has moved to the transition verb below. */
    globalThis.DD.setFlow('12');
    globalThis.ddLoad('resume10r');
    const nitzr = globalThis.DD.sim.ac.filter(a => a.gate === 'NITZR')[0];
    const nWas = nitzr.route[nitzr.route.length - 1].f, nWasDist = nitzr.dist;
    assert('an arrival starts on the transition Table 2 gives its gate',
      nitzr.trans === globalThis.DD.transitionFor('12', 'NITZR') && nitzr.trans === '12R',
      nitzr.trans);
    globalThis.ddSel(nitzr.cs);
    say(nitzr.cs + ' expect runway 12L');
    assert('expecting the other runway leaves the track exactly where it was',
      nitzr.route[nitzr.route.length - 1].f === nWas && nitzr.dist === nWasDist
      && nitzr.trans === '12R' && nitzr.rwy === '12L',
      nWas + '->' + nitzr.route[nitzr.route.length - 1].f + ' trans=' + nitzr.trans);
    mustContain('and the log says it stays on the track ZMP gave it',
      'a runway assignment does not re-route it');

    /* THE TRANSITION VERB IS WHAT MOVES IT, and only before the split fix. */
    globalThis.ddLoad('resume10r');
    const n2 = globalThis.DD.sim.ac.filter(a => a.gate === 'NITZR')[0];
    globalThis.ddSel(n2.cs);
    say(n2.cs + ' via the 12L transition');
    assert('a transition change re-paths — GREAK/TIETN becomes CMMOE/FSCOT',
      n2.trans === '12L' && n2.route[n2.route.length - 1].f === 'FSCOT',
      n2.trans + ' ' + n2.route[n2.route.length - 1].f);
    mustContain('and it reads back as a transition, not as a runway',
      'via the one two left transition');

    /* The split fix is derived from the two published ladders, and a near gate
       has none because it publishes ONE ladder for both parallels. */
    assert('TORGY and BAINY split on the 30s at HDEEE and PRRPL',
      globalThis.DD.splitFix('TORGY','30L','30R') === 'HDEEE'
      && globalThis.DD.splitFix('BAINY','30L','30R') === 'PRRPL',
      globalThis.DD.splitFix('TORGY','30L','30R') + '/' + globalThis.DD.splitFix('BAINY','30L','30R'));
    assert('a near gate has no split fix at all, because it has one ladder',
      globalThis.DD.splitFix('TORGY','12L','12R') === null
      && globalThis.DD.splitFix('NITZR','30L','30R') === null);
    assert('and near/far matches that exactly, in both flows',
      ['TORGY','BAINY'].every(g => globalThis.DD.splitFix(g,'12L','12R') === null
                                && globalThis.DD.splitFix(g,'30L','30R') !== null)
      && ['NITZR','BLUEM','KKILR','MUSCL'].every(g => globalThis.DD.splitFix(g,'30L','30R') === null
                                && globalThis.DD.splitFix(g,'12L','12R') !== null));

    /* Past the split fix the track is left alone rather than stepped across. */
    /* ddLoad restores the drill's own flow, so the 30s goes on AFTER it. */
    globalThis.ddLoad('freshpush');
    globalThis.DD.setFlow('30');
    const t30 = globalThis.DD.sim.ac.filter(a => a.gate === 'TORGY')[0];
    const hd = t30.route.filter(p => p.f === 'HDEEE')[0];
    t30.dist = hd.cum + 3;
    const t30Was = t30.route[t30.route.length - 1].f;
    globalThis.ddSel(t30.cs);
    say(t30.cs + ' via the 30R transition');
    assert('past HDEEE the transition change does not move the track',
      t30.route[t30.route.length - 1].f === t30Was && t30.trans !== '30R',
      t30Was + '->' + t30.route[t30.route.length - 1].f);
    mustContain('and it says which fix it is past and why', 'transitions part company');
    globalThis.DD.setFlow('12');

    /* IT NEVER INVENTS A TRACK. */
    globalThis.ddLoad('freshpush');
    const held = globalThis.DD.sim.ac.filter(a => a.role === 'arrival')
                   .map(a => a.route[a.route.length - 1].f);
    globalThis.DD.setFlow('4');
    assert('a configuration nothing resolves re-paths nobody',
      globalThis.DD.sim.ac.filter(a => a.role === 'arrival')
        .map(a => a.route[a.route.length - 1].f).join(',') === held.join(','),
      held.join(','));
    mustContain('and says why rather than borrowing another flow', 'has no row for');

    /* A RE-CONFIGURATION CLEARS A RUNWAY IT DOES NOT LAND. */
    globalThis.DD.setFlow('12');
    globalThis.ddLoad('freshpush');
    globalThis.DD.sim.ac.filter(a => a.role === 'arrival').forEach(a => { a.rwy = '12R'; });
    globalThis.DD.setFlow('17-22');
    assert('a 17-22 clears a 12R assignment, because 12R is a departure runway there',
      globalThis.DD.sim.ac.filter(a => a.role === 'arrival').every(a => a.rwy === null));
    assert('and the landing runways come from the Table 2 row itself',
      globalThis.DD.assignableRwys('17-22').slice().sort().join(',') === '17,22'
      && globalThis.DD.assignableRwys('12').slice().sort().join(',') === '12L,12R'
      && globalThis.DD.assignableRwys('4') === null
      && globalThis.DD.assignableRwys('30/12').slice().sort().join(',') === '30L,30R',
      globalThis.DD.assignableRwys('17-22').join(','));
    mustContain('and it says the assignments have to be re-issued', 'Re-issue them');
    globalThis.DD.setFlow('12');
  }

  /* TWO fixes on the NITZR/BLUEM shared trunk carry a different restriction
     depending on which arrival reached them, and they are the same exception
     twice: ELLKO and SAVVG both step 1,000 ft lower off BLUEM. ELLKO was
     flattened to 10,000 on both until 2026-09-06, when a machine comparison
     against CIFP 260903 caught it — NITZR46 codes +11000 and BLUEM56 +10000 on
     every runway transition, exactly as SAVVG is coded 10,000 and 9,000. The
     assertion exists so the flattening cannot come back. */
  {
    const at = (gate, rwy, fix) => {
      const lad = globalThis.DD.ladderFor('12', gate, rwy) || [];
      const p = lad.filter(q => q.f === fix)[0];
      return p ? (p.aa != null ? p.aa : p.at) : null;
    };
    assert('ELLKO crosses 1,000 ft higher off NITZR than off BLUEM',
      at('NITZR','12R','ELLKO') === 11000 && at('BLUEM','12R','ELLKO') === 10000
      && at('NITZR','12L','ELLKO') === 11000 && at('BLUEM','12L','ELLKO') === 10000,
      JSON.stringify([at('NITZR','12R','ELLKO'), at('BLUEM','12R','ELLKO'),
                      at('NITZR','12L','ELLKO'), at('BLUEM','12L','ELLKO')]));
    assert('and SAVVG does the same, which is the pattern ELLKO was missing',
      at('NITZR','12R','SAVVG') === 10000 && at('BLUEM','12R','SAVVG') === 9000,
      JSON.stringify([at('NITZR','12R','SAVVG'), at('BLUEM','12R','SAVVG')]));
    /* the legacy shared tail resolves both per gate rather than carrying one */
    const tf = g => globalThis.DD.trunkFor(g).filter(p => p.f === 'ELLKO')[0];
    assert('the legacy trunk sets ELLKO per gate too, not once for both',
      tf('NITZR').aa === 11000 && tf('BLUEM').aa === 10000,
      JSON.stringify([tf('NITZR').aa, tf('BLUEM').aa]));
  }

  /* AANAH on the NITZR 30s ladder follows CIFP, by the owner's ruling of
     2026-09-06 ("Go with CIFP for AANAH", issue #22; applied 2026-10-26).
     CIFP 260903, 261001 and 261029 code NITZR46 RW30B AANAH "+ 09000" with no
     speed. The plate-derived reference said cross at 10,000 at 250, and the
     deck flew that for seven weeks with a comment telling the next reader not
     to change it. The assertion pins the settled reading in all three parts:
     the value, the kind of restriction, and the absence of a speed. */
  {
    const aanah = rwy => ((globalThis.DD.ladderFor('30', 'NITZR', rwy) || []).filter(q => q.f === 'AANAH')[0]) || {};
    ['30L', '30R'].forEach(rwy => {
      const p = aanah(rwy);
      assert('AANAH on the NITZR ' + rwy + ' ladder is at or above 9,000 with no speed (CIFP, owner ruling 2026-09-06)',
        p.aa === 9000 && p.at == null && p.spd == null, JSON.stringify(p));
    });
    assert('and the rest of that ladder is untouched: WBSTR still crosses 8,000 at 250',
      ((globalThis.DD.ladderFor('30', 'NITZR', '30L') || []).filter(q => q.f === 'WBSTR')[0] || {}).at === 8000
      && ((globalThis.DD.ladderFor('30', 'NITZR', '30L') || []).filter(q => q.f === 'WBSTR')[0] || {}).spd === 250);
  }

  /* ============ 3d. Flight rules and route ============ */
  /* An arrival files the fix sequence and no procedure name; a departure files
     its SID as a flight plan writes it, because CIFP 261029 names the revision. */
  assert('an arrival files the fix sequence, a departure its SID and transition as filed',
    globalThis.DD.routeTextFor({role:'arrival', gate:'NITZR'}) === 'NITZR WRSAW DAHRL GDNEE ELLKO SAVVG GREAK TIETN'
    && globalThis.DD.routeTextFor({role:'departure', sid:'NRTHN1.TTOWN'}) === 'NRTHN1.TTOWN'
    && globalThis.DD.routeTextFor({role:'departure', sid:'WLSTN'}) === '',
    globalThis.DD.routeTextFor({role:'departure', sid:'NRTHN1.TTOWN'}));
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
  /* The boundary is SimAware's three shared vertices as of 2026-09-23 (#59),
     and the owner's superseded radial/DME pairs are kept beside them. Both are
     asserted: the live value, and that the prior one has not been quietly
     dropped. They agree to 0.9 deg and 1.1 NM, which is the check that matters
     if either is ever re-pulled. */
  assert('the RST boundary is SimAware\u2019s three shared vertices',
    JSON.stringify(globalThis.DD.RST_BOUNDARY) === '[[184.8,37.6],[157.8,40.9],[148.1,38.9]]',
    JSON.stringify(globalThis.DD.RST_BOUNDARY));
  assert('and the superseded owner-supplied points are still recorded',
    JSON.stringify(globalThis.DD.RST_BOUNDARY_PRIOR) === '[[185,38],[158,41],[149,40]]',
    JSON.stringify(globalThis.DD.RST_BOUNDARY_PRIOR));
  assert('the arc spans the same three radials',
    globalThis.DD.RST_ARC[0] === 148.1 && globalThis.DD.RST_ARC[1] === 184.8,
    JSON.stringify(globalThis.DD.RST_ARC));
  assert('RST owns 9,000 and below inside the arc',
    globalThis.DD.neighbourAt(158, 6500).pos === 'RST'
    && globalThis.DD.neighbourAt(158, 9000).pos === 'RST');
  assert('Center owns above 9,000 on the same bearing',
    globalThis.DD.neighbourAt(158, 9500).pos === 'ZMP'
    && globalThis.DD.neighbourAt(158, 12000).pos === 'ZMP');
  /* The arc has run 148.1 to 184.8 since dd5a7da — SimAware's shared vertices,
     owner 2026-09-23. Under the owner's earlier points it ran 149 to 185, so a
     bearing of exactly 185 used to resolve Rochester and now resolves Center:
     the one edge effect that move had, reported at the time and missed here, so
     the harness failed on this line from dd5a7da until 2026-10-14. */
  assert('the arc ends where the boundary points end',
    globalThis.DD.neighbourAt(148.1, 7000).pos === 'RST'
    && globalThis.DD.neighbourAt(184.8, 7000).pos === 'RST'
    && globalThis.DD.neighbourAt(148, 7000).pos === 'ZMP'
    && globalThis.DD.neighbourAt(185, 7000).pos === 'ZMP');
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
  /* Which departures leave through that arc. Until 2026-10-29 it was the RST SID
     alone; in the CIFP 261029 set it is every track that runs down through CORDY
     to FOOLS — TOTTZ1 and four of HTDSH1's five transitions. HTDSH1's BRIBE
     transition turns off at HTDSH for JEDET and leaves east of the arc. */
  const lowRst = globalThis.DD.mkAc({cs:'D1', type:'B738', role:'departure', sid:'TOTTZ1.ALO', fromStart:5, alt:6000, ias:250});
  const highRst = globalThis.DD.mkAc({cs:'D2', type:'B738', role:'departure', sid:'TOTTZ1.ALO', fromStart:5, alt:12000, ias:280});
  assert('a low departure through the arc goes to Rochester and a high one to Center',
    globalThis.DD.receiverFor(lowRst).pos === 'RST' && globalThis.DD.receiverFor(highRst).pos === 'ZMP',
    globalThis.DD.receiverFor(lowRst).pos + '/' + globalThis.DD.receiverFor(highRst).pos);
  const viaArc = Object.keys(globalThis.DD.DEPS).filter(k => {
    const p = globalThis.DD.DEPS[k][globalThis.DD.DEPS[k].length - 1];
    return globalThis.DD.neighbourAt((Math.atan2(p.e, p.n) * 180 / Math.PI + 360) % 360, 6000).pos === 'RST';
  }).join(',');
  assert('exactly the tracks that run down to FOOLS leave through the RST arc', viaArc ===
    'HTDSH1.ALO,HTDSH1.OANNA,HTDSH1.OHHMY,HTDSH1.ZZIPR,TOTTZ1.ALO,TOTTZ1.FOOLS,TOTTZ1.OANNA,TOTTZ1.OHHMY,TOTTZ1.ZZIPR', viaArc);

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
    radar:'departure', sid:'SNUPE1.DLL', dep:'KMSP', depRwy:'12R', alt:3000, ias:210, fromStart:3, squawk:'4231'});
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
  /* Issue #12. The box already offered only the states the rules allow, but
     normRadar handed an illegal-but-known state straight back, so picking
     "flight following" on a VFR strip and switching it to IFR left the row
     DISPLAYING established while the strip was STORED as following — and the
     export carried the stored one. */
  assert('the radar state can never be one these flight rules forbid',
    globalThis.DD.normRadar('following','IFR','arrival') === 'popup'
    && globalThis.DD.normRadar('popup','VFR','arrival') === 'following'
    && globalThis.DD.normRadar('departure','IFR','arrival') === 'established',
    [globalThis.DD.normRadar('following','IFR','arrival'),
     globalThis.DD.normRadar('popup','VFR','arrival'),
     globalThis.DD.normRadar('departure','IFR','arrival')].join(','));
  /* An IFR departure has NO no-service state — it is off a tower, so it
     already carries a code and a clearance — which is why the replacement is
     taken from the legal set rather than named. */
  assert('and a job with no no-service state falls back to its own default',
    globalThis.DD.normRadar('following','IFR','departure') === 'departure'
    && globalThis.DD.normRadar('popup','IFR','departure') === 'departure',
    [globalThis.DD.normRadar('following','IFR','departure'),
     globalThis.DD.normRadar('popup','IFR','departure')].join(','));
  /* the exhaustive check is the one that matters: every state, every job,
     both flight rules, must land somewhere the box can actually display */
  assert('and what it settles on means the same thing it did before the flip',
    ['arrival','overflight','departure'].every(role =>
      ['established','departure','popup','following','none'].every(st =>
        ['IFR','VFR'].every(rules =>
          globalThis.DD.radarStatesFor(role, rules)
            .indexOf(globalThis.DD.normRadar(st, rules, role)) >= 0))),
    'some role/rules/state triple still normalises to an illegal state');
  assert('a state that is already legal is left alone',
    globalThis.DD.normRadar('popup','IFR','arrival') === 'popup'
    && globalThis.DD.normRadar('following','VFR','arrival') === 'following'
    && globalThis.DD.normRadar('departure','IFR','departure') === 'departure');

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
  /* THE OFFER IS THE STARS PLUS THE NON-STAR DIRECT ENTRIES, not the STARs
     alone. This assertion listed only the STARs and predates SAT_DIRECT (the
     ZMP-M98 LOA 3g and 4.g(14) routings); it failed the first time the harness
     was executed, on 2026-09-07. Each field's list is the agreement's own:
     BITLR direct GEP serves STP, ANE and FCM (3g6); the east-field entry serves
     STP (4.g(14)); RGK, Sectors 08/09 and Sector 10 serve the southern and
     western fields (3g7-3g9). Getting this wrong in the other direction —
     offering a routing at a field the agreement does not give it — is the
     failure that matters, so the lists are exact rather than a subset test. */
  assert('the arrivals offered for a field are exactly the ones that serve it',
    globalThis.DD.arrivalsFor('KSTP').join(',') === 'GEP,AGUDE,ENCEE,BITLR,EASTFLD'
    && globalThis.DD.arrivalsFor('KFCM').join(',') === 'GEP,AGUDE,ENCEE,TWOLF,BITLR,RGK,SECT0809,SECT10',
    globalThis.DD.arrivalsFor('KSTP').join(','));
  assert('and MIC is offered no direct routing, because no paragraph gives it one',
    globalThis.DD.arrivalsFor('KMIC').join(',') === 'GEP,AGUDE,ENCEE',
    globalThis.DD.arrivalsFor('KMIC').join(','));
  assert('MSP is offered its six gates plus the two conventional arrivals, and no satellite routing',
    globalThis.DD.arrivalsFor('KMSP').join(',') === 'NITZR,BLUEM,TORGY,KKILR,MUSCL,BAINY,KASPR,GEP',
    globalThis.DD.arrivalsFor('KMSP').join(','));
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
  /* The GEP VOR where CIFP puts it: N45 08 44.47 W093 22 23.45, the CIFP 261029
     VHF navaid record. Until 2026-10-29 this was checked against the KBREW SID,
     which ran through GEP; KBREW1 does not, so it is checked at the source. */
  assert('the GEP VOR plots where CIFP puts it',
    Math.abs(globalThis.DD.SAT_ROUTES.AGUDE.slice(-1)[0].lat - 45.14569) < 0.001
    && Math.abs(globalThis.DD.SAT_ROUTES.AGUDE.slice(-1)[0].lon - -93.37318) < 0.001);

  /* ---- the satellite STARs against CIFP 261029, 2026-10-22 ----
     Decoded from the EA waypoint records and the GEP VOR record; the STAR records
     at KANE, KFCM, KMIC, KSTP and KLVN code AGUDE6, ENCEE3, TWOLF4 and GEP1 with
     the same legs at all five fields. WOOOD (ENCEE) and LYNKS (TWOLF) were missing
     from the deck and the reference until this check. */
  {
    const CIFP_SAT = {
      AGUDE: [45.12936, -92.39194], STILS: [45.13439, -92.64478], WHISK: [45.13988, -92.96214], GEP: [45.14569, -93.37318],
      ENCEE: [44.58672, -95.43330], WOOOD: [44.69134, -94.93819], CASNS: [44.77143, -94.55086], MLHOF: [44.82295, -94.29768],
      RIXIE: [44.85477, -94.13946], MAYER: [44.91799, -93.97474], FUDGE: [45.06758, -93.58106],
      TWOLF: [43.31663, -93.54833], KGEEE: [43.74904, -93.50791], LYNKS: [44.11488, -93.47325], TRGET: [44.23127, -93.46213], KEWTY: [44.64694, -93.42204],
      GOLLF: [45.75364, -93.69950], OLLEE: [45.53552, -93.58152], SAUGR: [45.34846, -93.48117], VYKES: [45.03667, -93.31417] };
    const SEQ = { AGUDE: 'AGUDE,STILS,WHISK,GEP', ENCEE: 'ENCEE,WOOOD,CASNS,MLHOF,RIXIE,MAYER,FUDGE,GEP',
      TWOLF: 'TWOLF,KGEEE,LYNKS,TRGET,KEWTY', GEP: 'GOLLF,OLLEE,SAUGR,GEP,VYKES' };
    const all = Object.assign({}, globalThis.DD.SAT_ROUTES, globalThis.DD.SAT_DRAWN);
    assert('each satellite STAR carries the fixes CIFP 261029 codes, in order — WOOOD and LYNKS included',
      Object.keys(SEQ).every(k => all[k].map(p => p.f).join() === SEQ[k]), Object.keys(SEQ).map(k => all[k].map(p => p.f).join()).join(' | '));
    const kmOff = (p, c) => Math.hypot((p.lat - c[0]) * 60, (p.lon - c[1]) * 60 * Math.cos(p.lat * Math.PI / 180));
    assert('and every one of them is within a few hundredths of a mile of its CIFP record',
      Object.keys(all).every(k => all[k].every(p => kmOff(p, CIFP_SAT[p.f]) < 0.03)),
      Object.keys(all).map(k => all[k].map(p => p.f + ':' + kmOff(p, CIFP_SAT[p.f]).toFixed(3)).join(' ')).join(' | '));
    /* AGUDE and RIXIE carry no altitude in CIFP, so their 8,000 jet / 6,000 and 7,000
       turboprop values are LOA Table 4's alone. TRGET is coded "between 8,000 and
       7,000" and the deck holds the Table 4 7,000 (the reference says the plate shows
       the window); KEWTY 5,000 is coded and agrees. */
    assert('the crossings are unchanged — TRGET 7,000 and the rest from LOA Table 4, KEWTY 5,000 agreeing with CIFP',
      globalThis.DD.SAT_ROUTES.ENCEE.filter(p => p.at !== undefined).map(p => p.f).join() === 'RIXIE'
      && globalThis.DD.SAT_ROUTES.TWOLF.filter(p => p.at !== undefined).map(p => p.f).join() === 'TRGET,KEWTY'
      && globalThis.DD.SAT_ROUTES.TWOLF.filter(p => p.f === 'KEWTY')[0].at === 5000
      && globalThis.DD.SAT_ROUTES.AGUDE.filter(p => p.at !== undefined).map(p => p.f).join() === 'AGUDE');
    assert('GOPHER ONE is drawn and carries no crossing, and it is not a flown procedure',
      globalThis.DD.SAT_DRAWN.GEP.every(p => p.at === undefined && p.atProp === undefined)
      && globalThis.DD.SAT_ROUTES.GEP === undefined && globalThis.DD.ARRIVALS.GEP.flies === false);
    /* drawn: all STARs puts the satellite ladders and GOPHER ONE on the scope */
    globalThis.ddLayers('stars');
    const svg = scope();
    assert('all STARs draws the satellite ladders — each of their first fixes is a labelled dot on the scope',
      ['AGUDE', 'ENCEE', 'TWOLF', 'GOLLF'].every(f => svg.includes('>' + f + '<')) && (svg.match(/>GOLLF</g) || []).length === 1 && (svg.match(/>BAINY</g) || []).length === 1,
      ['AGUDE', 'ENCEE', 'TWOLF', 'GOLLF', 'BAINY'].map(f => f + ':' + (svg.match(new RegExp('>' + f + '<', 'g')) || []).length).join());
    const yOf = f => Number((svg.match(new RegExp('y="([\\d.]+)"[^>]*>' + f + '<')) || [])[1]);
    assert('BAINY and GOLLF are one point, so their labels are stacked and do not overprint',
      Math.abs(yOf('GOLLF') - yOf('BAINY')) >= 10, yOf('BAINY') + '/' + yOf('GOLLF'));
    globalThis.ddLayers('tracked');
  }

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

  /* Issue #11 — a strip is placed by the fix it is running to and the distance
     still to run, which is how it reads off a scope. `dtg` stays the stored
     number so the generator, the validator, the scope and the export are all
     untouched; these assert the round trip and that the fix list can only ever
     name a fix on the arrival actually selected. */
  {
    const gates = ['NITZR','BLUEM','TORGY','KKILR','MUSCL','BAINY'];
    assert('every arrival offers only the fixes on its own ladder',
      gates.every(g => {
        const on = globalThis.ddb.fixesOn(g);
        const route = globalThis.DD.ROUTES[g].map(p => p.f);
        return on.length > 0 && on.every(f => route.indexOf(f) >= 0);
      }),
      gates.map(g => g + ':' + globalThis.ddb.fixesOn(g).length).join(' '));
    assert('a fix that is not on the arrival resolves to nothing',
      globalThis.ddb.cumOf('NITZR', 'KRUGG') === null
      && globalThis.ddb.dtgFrom('NITZR', 'KRUGG', 5) === null);
    /* NM to go = (ladder total - the fix's cumulative distance) + miles to run */
    assert('the fix and the miles to run give back the same distance to go',
      gates.every(g => {
        const r = globalThis.DD.ROUTES[g];
        return globalThis.ddb.fixesOn(g).every(f => {
          const cum = globalThis.ddb.cumOf(g, f);
          return Math.abs(globalThis.ddb.dtgFrom(g, f, 5) - ((r.total - cum) + 5)) < 0.06;
        });
      }));
    assert('and placing a distance back on the ladder round-trips to the same fix',
      gates.every(g => globalThis.ddb.fixesOn(g).every(f => {
        const dtg = globalThis.ddb.dtgFrom(g, f, 0);
        const back = globalThis.ddb.placeFrom(g, dtg);
        return back && back.fix === f && Math.abs(back.nm) < 0.06;
      })));
    /* a drill saved before this carries only dtg, and changing the arrival
       must not leave a fix behind that is not on the new one */
    {
      const strip = {role:'arrival', gate:'NITZR', dtg:20};
      globalThis.ddb.syncPlace(strip);
      assert('a strip carrying only a distance is re-placed onto a named fix',
        globalThis.DD.ROUTES.NITZR.map(p => p.f).indexOf(strip.dtgFix) >= 0
        && Math.abs(globalThis.ddb.dtgFrom('NITZR', strip.dtgFix, strip.dtgNm) - 20) < 0.06,
        JSON.stringify(strip));
      strip.gate = 'TORGY';
      globalThis.ddb.syncPlace(strip);
      assert('and switching the arrival re-places it on the new ladder',
        globalThis.DD.ROUTES.TORGY.map(p => p.f).indexOf(strip.dtgFix) >= 0,
        JSON.stringify(strip));
    }
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
    /* Issue #13. The real broadcast advertises one approach clause per runway,
       and the parser stopped at the first one — a full 30s read as 30L alone,
       took the subset branch, and told the trainee something was out of
       service. Every assertion here is against text a real MSP D-ATIS carried
       on 2026-09-04, or against the shared-clause form the same field uses.
       Keep the LNDG line OUT of these: the old suite always supplied one, which
       is why nothing failed while the approach branch was half-broken. */
    {
      const multi = globalThis.ddb.parseDatis(
        'MSP ARR INFO K 1753Z. 01010KT 8SM OVC014 27/22 A2990 (TWO NINER NINER ZERO) RMK AO2 ' +
        'PK WND 33026/1707 SLP120 T02720222 10289 20222 51016. SIMULTANEOUS DEPENDENT, ' +
        'RNAV ZULU RWY 30L APCH IN USE, ILS RWY 30R APCH IN USE. NOTICE TO AIRMEN. ' +
        'GS RWY 30L OTS, RWYS 12R AND 12L INNER MARKER OTS.\n\n' +
        'MSP DEP INFO X 1753Z. 01010KT 8SM OVC014 A2990. DEPTG RWY 30L, 30R. NOTICE TO AIRMEN.');
      assert('one approach clause per runway reads every runway, not just the first',
        multi.land.join(',') === '30L,30R', JSON.stringify(multi.land));
      assert('and that is a whole 30s, with nothing reported out of service',
        multi.cfg === '30' && !multi.partial, JSON.stringify([multi.cfg, multi.partial]));
      assert('each runway is said back with the approach advertised to it',
        multi.apch.length === 2 && multi.apch[0].apch === 'RNAV ZULU' && multi.apch[0].rwys.join(',') === '30L'
        && multi.apch[1].apch === 'ILS' && multi.apch[1].rwys.join(',') === '30R', JSON.stringify(multi.apch));
      assert('a runway named only in the notices is still never in use',
        multi.land.indexOf('12R') < 0 && multi.land.indexOf('12L') < 0, JSON.stringify(multi.land));
      /* the other half of the grammar: one clause, several runways, and the
         comma inside it separates runways rather than approaches */
      const shared = globalThis.ddb.parseDatis(
        'KMSP INFO B. 15012KT 10SM SCT040 A3001. SIMUL ILS RWY 12L, 12R APCHS IN USE. DEPTG RWY 12L, 12R.');
      assert('a continued runway list inside one clause stays whole',
        shared.land.join(',') === '12L,12R' && shared.cfg === '12' && !shared.partial, JSON.stringify(shared.land));
      assert('and the plural spellings all read — APCH, APCHS, APCHES, APPROACH, APPROACHES',
        globalThis.ddb.approachRunways('ILS RWY 12L APCH IN USE.').join(',') === '12L'
        && globalThis.ddb.approachRunways('ILS RWY 12L, ILS RWY 12R APCHS IN USE.').join(',') === '12L,12R'
        && globalThis.ddb.approachRunways('ILS RWY 12L AND VISUAL RWY 12R APCHES IN USE.').join(',') === '12L,12R'
        && globalThis.ddb.approachRunways('ILS RWY 30L APPROACH IN USE.').join(',') === '30L'
        && globalThis.ddb.approachRunways('ILS RWY 30L, RNAV RWY 30R APPROACHES IN USE.').join(',') === '30L,30R');
      /* the runway set is taken at sentence level and the clause split only
         labels the approaches, so an unfamiliar phrasing cannot drop a runway */
      assert('the runway set does not depend on the clause grammar',
        globalThis.ddb.approachRunways('SIMULTANEOUS DEPENDENT, RNAV ZULU RWY 30L APCH IN USE, ILS RWY 30R APCH IN USE.')
          .join(',') === '30L,30R');
      /* a runway only ever comes off a RWY or RUNWAY keyword, so nothing in the
         observation or the remarks can be read as one */
      assert('the observation and the remarks never yield a runway',
        globalThis.ddb.parseDatis(
          'KMSP INFO K 1753Z 01010KT 8SM OVC014 27/22 A2990 RMK AO2 PK WND 33026/1707 SLP120 ' +
          'T02720222 ILS RWY 30L APCH IN USE, ILS RWY 30R APCH IN USE').land.join(',') === '30L,30R');
      /* three approaches, three runways — the CRO configuration */
      assert('three clauses give a 30-35 rather than a narrowed 30s',
        globalThis.ddb.parseDatis(
          'KMSP INFO D. 34015KT 3SM OVC018 A2970. RNAV ZULU RWY 30L APCH IN USE, ILS RWY 30R APCH IN USE, ' +
          'VISUAL RWY 35 APCH IN USE. DEPTG RWY 30L, 30R.').cfg === '30-35');
      /* and a genuinely narrowed flow must still take the subset branch */
      assert('one runway advertised on its own is still called a subset',
        globalThis.ddb.parseDatis(
          'KMSP INFO K. 01010KT 8SM OVC014 A2990. ILS RWY 30L APCH IN USE. DEPTG RWY 30L, 30R.').partial === true);
      assert('landing the 30s and departing them is a 30s, not the noise default',
        globalThis.ddb.parseDatis(
          'KMSP INFO N. 30005KT 10SM CLR A2995. LNDG RWY 30L, 30R. DEPTG RWY 30L, 30R.').cfg === '30');
    }
    /* Issue #13, second round. The live broadcast of 2026-09-04 1953Z, pulled
       verbatim from atis.info, writes the departure list as
       "DEPARTING RWY 30L, RWY 30R" — the RWY keyword REPEATED on each item,
       not "DEPTG RWYS 30L, 30R". A list that stopped at the first comma read
       one runway out of two, and on a 12-17 it dropped the 17 and reported a
       plain 12s: the same wrong-flow failure one clause further along. */
    {
      const arr = 'MSP ARR INFO A 1953Z. 03007G18KT 10SM FEW017 29/22 A2990 (TWO NINER NINER ZERO) ' +
        'RMK AO2 SLP119 T02890217. VISUAL RWY 30L APCH IN USE, VISUAL RWY 30R APCH IN USE. ' +
        'NOTICE TO AIRMEN. TWY R4. R5. R6, CLOSED. TWY R BTWN R4 AND R6 CLSD. ' +
        'GS RWY 30L OTS, RWYS 12R AND 12L INNER MARKER OTS. ...ADVS YOU HAVE INFO A.';
      const dep = 'MSP DEP INFO N 1953Z. 03007G18KT 10SM FEW017 29/22 A2990 (TWO NINER NINER ZERO) ' +
        'RMK AO2 SLP119 T02890217. DEPARTING RWY 30L, RWY 30R. NOTICE TO AIRMEN. ' +
        'TWY R4. R5. R6, CLOSED. ...ADVS YOU HAVE INFO N.';
      const now = globalThis.ddb.parseDatis(globalThis.ddb.datisJoined({datisArr:arr, datisDep:dep}));
      assert('the live broadcast lands 30L and 30R',
        now.land.join(',') === '30L,30R', JSON.stringify(now.land));
      assert('and departs both — a repeated RWY keyword does not end the list',
        now.dep.join(',') === '30L,30R', JSON.stringify(now.dep));
      assert('so it is a whole 30s with nothing reported out of service',
        now.cfg === '30' && !now.partial, JSON.stringify([now.cfg, now.partial]));
      assert('and the closures after the notices are still not runways in use',
        now.land.indexOf('12R') < 0 && now.land.indexOf('12L') < 0 && now.dep.indexOf('12R') < 0,
        JSON.stringify([now.land, now.dep]));
      assert('the whole observation still reads off the live text',
        now.atis === 'A' && now.atisDep === 'N' && now.wind === '030/7G18'
        && now.vis === 10 && now.altim === '2990' && now.missed.length === 0, JSON.stringify(now));
      /* the configuration this actually threatened */
      assert('a repeated keyword no longer turns a 12-17 into a plain 12s',
        globalThis.ddb.parseDatis(
          'KMSP INFO B. 15012KT 10SM SCT040 A3001. ILS RWY 12L APCH IN USE, ILS RWY 12R APCH IN USE.\n\n' +
          'KMSP DEP INFO C. 15012KT 10SM SCT040 A3001. DEPARTING RWY 12L, RWY 12R, RWY 17.').cfg === '12-17');
      assert('both list forms read, repeated keyword or not, comma or AND',
        globalThis.ddb.rwysAfter('DEPARTING RWY 30L, RWY 30R.', 'DEPART(?:ING)?|DEPTG').join(',') === '30L,30R'
        && globalThis.ddb.rwysAfter('DEPARTING RWY 30L AND RWY 30R.', 'DEPART(?:ING)?|DEPTG').join(',') === '30L,30R'
        && globalThis.ddb.rwysAfter('DEPTG RWY 12L, 12R, 17.', 'DEPART(?:ING)?|DEPTG').join(',') === '12L,12R,17'
        && globalThis.ddb.rwysAfter('DEPARTING RUNWAYS 30L AND 30R.', 'DEPART(?:ING)?|DEPTG').join(',') === '30L,30R');
      assert('a repeated keyword inside one approach clause keeps that clause whole',
        JSON.stringify(globalThis.ddb.approachesInUse('SIMUL ILS RWY 30L, RWY 30R APCHS IN USE.'))
          === '[{"rwys":["30L","30R"],"apch":"SIMUL ILS"}]',
        JSON.stringify(globalThis.ddb.approachesInUse('SIMUL ILS RWY 30L, RWY 30R APCHS IN USE.')));
      /* THE PARSE WINDOW — read to the notices and never past them. The FAA
         redefined NOTAM as "notice to air missions" and D-ATIS text is
         migrating a field at a time, so both headings have to cut. */
      assert('the parse window ends at the notices, under either heading',
        globalThis.ddb.datisClean('ILS RWY 30L APCH IN USE. NOTICE TO AIRMEN. RWY 12R CLSD.').indexOf('12R') < 0
        && globalThis.ddb.datisClean('ILS RWY 30L APCH IN USE. NOTICE TO AIR MISSIONS. RWY 12R CLSD.').indexOf('12R') < 0
        && globalThis.ddb.datisClean('ILS RWY 30L APCH IN USE. NOTAMS. RWY 12R CLSD.').indexOf('12R') < 0);
      assert('an air-missions broadcast does not read its own closures as the flow',
        globalThis.ddb.parseDatis(
          'KMSP INFO A. 03007KT 10SM FEW017 A2990. VISUAL RWY 30L APCH IN USE, VISUAL RWY 30R APCH IN USE. ' +
          'NOTICE TO AIR MISSIONS. GS RWY 30L OTS, RWYS 12R AND 12L INNER MARKER OTS.').land.join(',') === '30L,30R');
    }
    /* THE OTHER HALF OF THE PARSE WINDOW — issue #18. The cut above stays the
       whole rule for the flow; what the cut discards is now read separately, as
       closures, and never reaches land, dep or cfg.
       VERBATIM FROM A LIVE PULL — datis.clowd.io/api/all, 2026-09-21 0853Z, by
       the recipe in claude_DATIS_Field_Survey.md §1. MSP had four runways shut
       and two inner markers out on the two runways it was landing, which is
       exactly the pair of cases that must not be confused with each other. */
    {
      const arr = 'MSP ARR INFO K 0853Z. 06008KT 10SM BKN160 11/08 A3024 (THREE ZERO TWO FOUR) ' +
        'RMK AO2 SLP240 T01110078 52007. VISUAL RWY 12R APCH IN USE, VISUAL RWY 12L APCH IN USE. ' +
        'FINAL APCH, OVER NOISE SENSITIVE AREA. NOTICE TO AIRMEN. RWYS 4, 22 CLSD, RWYS 17, 35 CLSD. ' +
        'TWY R4. R5. R6, CLOSED. TWY R BTWN R4 AND R6 CLSD. TWY Y CLSD. TWY Z CLSD. 17 DEICE PAD CLSD. ' +
        'RWYS 12R AND 12L INNER MARKER OTS. CTN, BIRDS NEAR MSP. READ BACK HS AND ALT. ' +
        '...ADVS YOU HAVE INFO K.';
      const dep = 'MSP DEP INFO X 0853Z. 06008KT 10SM BKN160 11/08 A3024 RMK AO2 SLP240 T01110078 52007. ' +
        'DEPARTING RWY 12L, RWY 12R. NOTICE TO AIRMEN. RWYS 4, 22 CLSD, RWYS 17, 35 CLSD. ' +
        'TWY R4. R5. R6, CLOSED. TWY Y CLSD. ...ADVS YOU HAVE INFO X.';
      const live = globalThis.ddb.parseDatis(globalThis.ddb.datisJoined({datisArr:arr, datisDep:dep}));
      assert('the live 2026-09-21 broadcast still reads a whole 12s',
        live.land.slice().sort().join(',') === '12L,12R' && live.cfg === '12' && !live.partial,
        JSON.stringify([live.land, live.cfg, live.partial]));
      assert('the four runways named as closed are read as closed',
        live.closed.join(',') === '4,22,17,35', JSON.stringify(live.closed));
      assert('an inner marker out is NOT a closed runway',
        live.ots.length === 1 && live.ots[0].what === 'INNER MARKER'
        && live.ots[0].rwys.join(',') === '12R,12L', JSON.stringify(live.ots));
      assert('a split broadcast repeating its notices is not counted twice',
        live.ots.length === 1 && live.closed.length === 4);
      assert('no closed runway is also advertised in use', live.clash.length === 0);
      assert('none of the notice text reaches the runways in use',
        live.land.indexOf('4') < 0 && live.land.indexOf('17') < 0 && live.dep.indexOf('35') < 0,
        JSON.stringify([live.land, live.dep]));
      assert('the notice text is carried verbatim rather than summarised',
        live.notices.indexOf('RWYS 12R AND 12L INNER MARKER OTS') >= 0);
      /* the 2026-09-04 broadcast, where the item name sat AHEAD of the runway */
      assert('an item named ahead of the runway is still an item, not a closure',
        JSON.stringify(globalThis.ddb.datisClosures(
          'KMSP INFO A. VISUAL RWY 30L APCH IN USE. NOTICE TO AIRMEN. ' +
          'GS RWY 30L OTS, RWYS 12R AND 12L INNER MARKER OTS.').ots)
          === '[{"rwys":["30L"],"what":"GS"},{"rwys":["12R","12L"],"what":"INNER MARKER"}]',
        JSON.stringify(globalThis.ddb.datisClosures(
          'X. NOTICE TO AIRMEN. GS RWY 30L OTS, RWYS 12R AND 12L INNER MARKER OTS.').ots));
      /* THE REFUSALS. A label this cannot read is left alone rather than guessed
         at — each of these would otherwise report a runway shut that is open. */
      assert('an unreadable lead never falls through to "runway closed"',
        globalThis.ddb.datisClosures('X. NOTICE TO AIRMEN. DME PORTION OF ILS RWY 9L OTS.').closed.length === 0);
      assert('a spelled-out runway list is refused, not half-read',
        globalThis.ddb.datisClosures('X. NOTICE TO AIRMEN. RWY 1 6 LEFT 3 4 RIGHT CLOSED.').closed.length === 0);
      assert('MSP’s taxiway notices close no runway',
        globalThis.ddb.datisClosures(
          'X. NOTICE TO AIRMEN. TWY R4. R5. R6, CLOSED. TWY R BTWN R4 AND R6 CLSD.').closed.length === 0);
      assert('a runway pair written with a slash is read as both',
        globalThis.ddb.datisClosures('X. NOTICE TO AIRMEN. RWY 11/29 CLSD.').closed.join(',') === '11,29');
      assert('a broadcast with no notices asserts nothing at all',
        globalThis.ddb.datisClosures(
          'KMSP INFO B. SIMUL ILS RWY 12L, 12R APCHS IN USE. DEPTG RWY 12L, 12R.').closed.length === 0);
      /* and the contradiction is stated, not resolved */
      const stale = globalThis.ddb.parseDatis(
        'KMSP INFO A. 03007KT 10SM FEW017 A2990. VISUAL RWY 30L APCH IN USE. ' +
        'NOTICE TO AIRMEN. RWY 30L CLSD.');
      assert('a runway both advertised and closed is reported as the clash it is',
        stale.land.join(',') === '30L' && stale.closed.join(',') === '30L'
        && stale.clash.join(',') === '30L', JSON.stringify(stale.clash));
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

  /* The field a departure's track starts on is not a fix on its SID. The navaid
     list this replaced (MSP, GEP, FGT) went with the retired set, whose SIDs began
     on those VORs; none of the 261029 set does. */
  assert('the only marked point on a departure track is the field it starts at',
    globalThis.DD.DEP_VORS === undefined
    && Object.keys(globalThis.DD.DEPS).every(k => globalThis.DD.DEPS[k][0].field === true
       && globalThis.DD.DEPS[k].slice(1).every(p => !p.field && !p.vor)));

  /* ============ 4. Position setup ============ */
  assert('all eleven SOP 2-1 positions are present', globalThis.ddb.POSITIONS.length === 11, globalThis.ddb.POSITIONS.length);
  assert('the base seat is South Feeder', globalThis.ddb.seatIds().join(',') === 'H', globalThis.ddb.seatIds().join(','));  /* state.pos.seat became state.pos.seatS (a set) when working two positions at once landed; this read the old single-seat string and had never been run */
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
  /* THE BOUNCE IS A SIDE TEST, NOT AN IS-IT-OPEN TEST. Under the single
     controller everything folds to H, and H is SOUTH Feeder — so "flash south"
     names the side that actually owns DAL589 and is accepted. It is "flash
     north" that bounces. This pair asserted the opposite and named H by its
     letter rather than by the name the deck logs; both failed the first time
     the harness was executed, on 2026-09-07. */
  say('DAL589 flash north');
  mustContain('flashing the side that does not own it bounces', 'bounces the flash');
  say('DAL589 flash south');
  mustContain('and the side that does own it is accepted', 'South Feeder takes the flash');
  say('DAL589 flash');
  mustContain('a bare flash goes to whoever owns it', 'South Feeder takes the flash');
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
  /* ---- Midnight operations — issue #20 ----
     ZMP-M98 LOA 5.a(4) puts everything entering M98 on one frequency, 124.7,
     and vNAS names that seat: MSP_E_APP carries a second position record
     called "Midnight" on 124.7, on the same TCP as Flying Cloud Satellite. So
     the regime moves the BASE of the combining chain from H to E — the only
     thing in the tool that does — and E answers on 124.7, not its daytime
     134.7. STANDING stays empty: this is a frame, not a training item. */
  assert('the daytime chain bottoms out on South Feeder',
    globalThis.ddb.baseId() === 'H' && globalThis.ddb.midnightOn() === false);
  globalThis.ddbPreset('midnight');
  assert('midnight moves the base of the combining chain to E',
    globalThis.ddb.midnightOn() && globalThis.ddb.baseId() === 'E');
  assert('and every position folds there rather than to H',
    ['D','R','L','I','H','N','S','J','E','G','K']
      .every(id => globalThis.ddb.ownerOf(id).id === 'E'),
    ['D','R','L','I','H','N','S','J','E','G','K']
      .map(id => id + '->' + globalThis.ddb.ownerOf(id).id).join(' '));
  assert('E answers on 124.7 overnight and 134.7 by day',
    globalThis.ddb.frqOf(globalThis.ddb.POSITIONS.filter(p => p.id === 'E')[0]) === '124.7',
    globalThis.ddb.frqOf(globalThis.ddb.POSITIONS.filter(p => p.id === 'E')[0]));
  assert('both runways come back on that one frequency',
    globalThis.DD.RECEIVER['12R'].pos === 'E' && globalThis.DD.RECEIVER['12R'].frq === '124.7'
    && globalThis.DD.RECEIVER['12L'].pos === 'E' && globalThis.DD.RECEIVER['12L'].frq === '124.7',
    JSON.stringify(globalThis.DD.RECEIVER));
  assert('and so do the feeders and the satellite seats',
    ['I','H'].every(p => globalThis.DD.FEEDER_POS[p].frq === '124.7')
    && ['E','G','K'].every(p => globalThis.DD.SAT_POS[p].frq === '124.7'));
  assert('the seat carries both names the sources give it',
    globalThis.ddb.seatLabel() === 'Midnight — Flying Cloud Satellite (E · 124.7)',
    globalThis.ddb.seatLabel());
  assert('the regime is two chain edges and a frequency, held as data',
    globalThis.ddb.MIDNIGHT.base === 'E' && globalThis.ddb.MIDNIGHT.frq === '124.7'
    && globalThis.ddb.MIDNIGHT.into.H === 'E' && globalThis.ddb.MIDNIGHT.into.E === null);
  assert('the LOA paragraph it comes from is carried, not paraphrased into a number',
    globalThis.ddb.MIDNIGHT.zmp.length === 4 && globalThis.ddb.MIDNIGHT.m98.length === 3
    && globalThis.ddb.MIDNIGHT.window.indexOf('2230') === 0);
  assert('coverage says plainly what the engine flies from the midnight seat',
    globalThis.ddb.coverageFor('E').k === 'flag'
    && globalThis.ddb.coverageFor('E').t.indexOf('satellite fields are still not modelled') >= 0);
  globalThis.ddbPreset('standard');
  assert('and coming off the regime puts the base back on H',
    globalThis.ddb.baseId() === 'H' && globalThis.ddb.midnightOn() === false
    && globalThis.ddb.frqOf(globalThis.ddb.POSITIONS.filter(p => p.id === 'E')[0]) === '134.7'
    && globalThis.DD.RECEIVER['12R'].pos === 'S');

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
            /* 2026-10-27: `count` became the TOTAL, with arrivals, departures and overflights
               as shares of it. The extras that used to ride on top of `count` arrivals are now
               in the total, and `arrivals: c` keeps every drill here the one it always was. */
            const extraDep = sd % 3, extraOvf = sd === 77 ? 1 : 0;
            const g = globalThis.ddb.gen({ seed: sd, focus: f, mixGates: mx, pressure: p,
                                          count: c + extraDep + extraOvf, arrivals: c,
                                          deps: extraDep, overflights: extraOvf });
            const gv = globalThis.ddb.validate(g);
            if (gv.errors.length) fail('generated ' + f + '/' + p + '/' + mx.join('-') + '/' + c + '/' + sd, gv.errors.join(' | '));
            const wantN = c + extraDep + extraOvf;
            if (g.ac.length !== wantN) fail('generated strip count', f + '/' + c + ' wanted ' + wantN + ' gave ' + g.ac.length);
            g.ac.forEach(a => {
              if (a.rules === 'IFR' && !String(a.route || '').trim())
                fail('generated IFR strip without a route', a.cs + ' on ' + f + '/' + sd);
              if ((a.role || 'arrival') !== 'arrival') return;
              if (a.alt < globalThis.DD.FLOORS[a.gate]) fail('generated start above the gate floor', a.cs + ' ' + a.alt + ' at ' + a.gate);
            });
          }
  ok('every generated drill validates and starts at or above its gate floor (' + combos + ' combinations)');

  /* ============ 4a. The generator's mix — 2026-10-27 ============
     Strips is the TOTAL. Arrivals, departures and overflights are shares of it and
     never come to more; arrivals left unset take the rest. Until this date `count`
     was the arrival count, capped at six, with up to three departures and one
     overflight riding on top — so a "six strip" drill could carry ten flights. */
  {
    const G = globalThis.ddb, roleOf = a => a.role || 'arrival';
    const tally = d => ({ a: d.ac.filter(x => roleOf(x) === 'arrival').length,
                          d: d.ac.filter(x => roleOf(x) === 'departure').length,
                          o: d.ac.filter(x => roleOf(x) === 'overflight').length });
    const tallyStr = t => t.a + '/' + t.d + '/' + t.o;
    const uniqueCs = d => new Set(d.ac.map(a => a.cs)).size === d.ac.length;

    const exact = G.gen({ seed: 11, count: 12, arrivals: 7, deps: 3, overflights: 2 });
    assert('a drill carries exactly the arrivals, departures and overflights it was asked for',
      exact.ac.length === 12 && tallyStr(tally(exact)) === '7/3/2', tallyStr(tally(exact)) + ' of ' + exact.ac.length);
    assert('and it validates clean', G.validate(exact).errors.length === 0, G.validate(exact).errors.join(' | '));
    assert('arrivals left unset take whatever the other two leave',
      tallyStr(tally(G.gen({ seed: 12, count: 9, deps: 2, overflights: 1 }))) === '6/2/1');
    assert('with nothing else asked, every strip is an arrival, as the old default was',
      tallyStr(tally(G.gen({ seed: 13, count: 3 }))) === '3/0/0');

    let fuzz = 0, over = 0;
    for (const count of [1, 2, 5, 12])
      for (const arrivals of [undefined, 0, 1, 4, 9, 50])
        for (const deps of [0, 1, 3, 8])
          for (const overflights of [0, 2, 9]) {
            fuzz++;
            const d = G.gen({ seed: fuzz, count, arrivals, deps, overflights });
            const m = G.genMix({ count, arrivals, deps, overflights });
            const t = tally(d);
            if (d.ac.length > count) over++, fail('flights exceed the strip count', count + '/' + arrivals + '/' + deps + '/' + overflights + ' gave ' + d.ac.length);
            if (m.flights !== d.ac.length || m.arrivals !== t.a || m.deps !== t.d || m.overflights !== t.o)
              fail('genMix disagrees with what gen built', JSON.stringify(m) + ' vs ' + tallyStr(t));
            if (arrivals !== undefined && t.a > arrivals) fail('more arrivals than asked', arrivals + ' gave ' + t.a);
            if (t.d > deps || t.o > overflights) fail('more departures or overflights than asked', deps + '/' + overflights + ' gave ' + t.d + '/' + t.o);
          }
    ok('flights never exceed the strip count, and no share ever exceeds what was asked (' + fuzz + ' combinations)');

    const cut1 = G.genMix({ count: 5, arrivals: 9, deps: 9, overflights: 9 });
    const cut2 = G.genMix({ count: 5, arrivals: 2, deps: 9, overflights: 9 });
    const cut3 = G.genMix({ count: 4, deps: 9, overflights: 9 });
    assert('when the asks overrun the total they are cut, arrivals last',
      cut1.arrivals === 5 && cut1.deps === 0 && cut1.overflights === 0
      && cut2.arrivals === 2 && cut2.deps === 3 && cut2.overflights === 0
      && cut3.arrivals === 0 && cut3.deps === 4 && cut3.overflights === 0
      && cut1.cut && cut2.cut && cut3.cut, JSON.stringify([cut1, cut2, cut3]));
    assert('a mix that fits is not reported as cut', G.genMix({ count: 10, arrivals: 4, deps: 3, overflights: 2 }).cut === false);

    /* the old ceiling of six arrivals, three departures and one overflight is gone */
    const big = G.gen({ seed: 21, count: 30, focus: 'free', pressure: 'routine' });
    assert('thirty arrivals are generated, not six', tally(big).a === 30 && big.ac.length === 30, big.ac.length);
    assert('and they validate clean with no repeated callsign', G.validate(big).errors.length === 0 && uniqueCs(big), G.validate(big).errors.join(' | '));
    const crowd = G.gen({ seed: 22, count: 20, arrivals: 0, deps: 10, overflights: 10, pressure: 'saturated' });
    assert('ten departures and ten overflights, with no arrival at all',
      tallyStr(tally(crowd)) === '0/10/10', tallyStr(tally(crowd)));
    assert('and they validate clean with no repeated callsign — an overflight registration included',
      G.validate(crowd).errors.length === 0 && uniqueCs(crowd), G.validate(crowd).errors.join(' | '));
    const depStrips = crowd.ac.filter(a => a.role === 'departure'), early = Math.max.apply(null, depStrips.slice(0, 3).map(a => a.spawnAt));
    assert('departures past the third are released after the ones before them, not inside the same minute',
      depStrips.slice(3).every(a => a.spawnAt > early) && depStrips.slice(3).every((a, i, all) => i === 0 || a.spawnAt > all[i - 1].spawnAt),
      depStrips.map(a => a.spawnAt).join(','));
    let regs = 0;
    for (let sd = 1; sd <= 30; sd++) if (!uniqueCs(G.gen({ seed: sd, count: 40, arrivals: 0, overflights: 40 }))) regs++;
    assert('forty overflights never repeat a registration, across thirty seeds', regs === 0, regs + ' seeds repeated one');

    /* THE CAP IS FIFTY, owner 2026-10-27: past that it is more load than one controller works and
       a second would have to open. It is one constant, held by the generator, by "add a strip"
       and by validate, so a hand-built or imported drill cannot get past it either. It was a
       sanity ceiling of 200 for a few hours that day, until the owner named the real figure. */
    assert('the cap is fifty strips', G.STRIP_MAX === 50, G.STRIP_MAX);
    assert('a count far past the cap is held to it', G.genMix({ count: 999999 }).total === G.STRIP_MAX, G.genMix({ count: 999999 }).total);
    assert('a drill generated past it carries the cap and no more',
      G.gen({ seed: 23, count: 10 * G.STRIP_MAX, deps: 5 }).ac.length === G.STRIP_MAX);
    const atCap = G.gen({ seed: 25, count: G.STRIP_MAX, arrivals: 30, deps: 12, overflights: 8, pressure: 'saturated' });
    assert('exactly fifty strips is a drill, and it validates clean with no repeated callsign',
      atCap.ac.length === 50 && tallyStr(tally(atCap)) === '30/12/8' && G.validate(atCap).errors.length === 0 && uniqueCs(atCap),
      tallyStr(tally(atCap)) + ' ' + G.validate(atCap).errors.join(' | '));
    /* a drill built by hand, or imported, is held to it as well — validate is what refuses it */
    const tooMany = JSON.parse(JSON.stringify(atCap));
    tooMany.ac.push(Object.assign({}, tooMany.ac[0], { cs: 'DAL9999' }));
    const overErr = G.validate(tooMany).errors;
    assert('a drill with fifty-one strips is refused, saying why',
      overErr.some(e => e.includes('at most 50 strips') && e.includes('another would have to open') && e.includes('51')), overErr.join(' | '));
    assert('and refusing it does not hide the other checks — the same drill with one fewer is clean',
      G.validate(atCap).errors.length === 0);
    assert('a hand-built drill well over the cap is refused the same way',
      G.validate(Object.assign(JSON.parse(JSON.stringify(atCap)), { ac: Array.from({ length: 120 }, (_, i) => Object.assign({}, atCap.ac[0], { cs: 'DAL' + (1000 + i) })) }))
        .errors.some(e => e.includes('at most 50 strips') && e.includes('120')));
    assert('a count of zero or less is one strip, not none', G.genMix({ count: 0 }).total === 1 && G.genMix({ count: -4 }).total === 1);
    assert('text where a number should be falls back to the default of three',
      G.genMix({ count: 'abc' }).total === 3 && G.genMix({ count: '' }).total === 3);

    /* asking for nothing builds nothing — and the drill is refused for it, not padded */
    const none = G.gen({ seed: 24, count: 4, arrivals: 0, deps: 0, overflights: 0 });
    assert('arrivals, departures and overflights all at zero builds no strips',
      none.ac.length === 0 && G.validate(none).errors.some(e => e.includes('at least one strip')), none.ac.length);

    assert('the same seed and the same mix rebuild the same drill',
      JSON.stringify(G.gen({ seed: 31, count: 14, arrivals: 8, deps: 4, overflights: 2 }).ac)
        === JSON.stringify(G.gen({ seed: 31, count: 14, arrivals: 8, deps: 4, overflights: 2 }).ac));
    assert('the brief says what is in the drill, by kind',
      exact.brief.includes('12 strips — 7 arrivals, 3 departures, 2 overflights'), exact.brief);
    assert('and a single strip is singular',
      G.gen({ seed: 32, count: 1 }).brief.includes('1 strip — 1 arrival,'), G.gen({ seed: 32, count: 1 }).brief);
  }

  /* ============ 4b. General mode — a kind of push in place of a training focus — 2026-10-27 ============
     The Generate panel's "Drill for" switch. Training issues is the focus and gates dropdowns as
     they were. General swaps the focus for a kind of push, which only says which traffic
     dominates (nothing is weighted, so the drill is always `free`), and locks the gates to the
     seat. The shares behind each push are the generator's own design, not a document's. */
  {
    const G = globalThis.ddb, roleOf = a => a.role || 'arrival';
    const tallyStr = d => ['arrival', 'departure', 'overflight'].map(r => d.ac.filter(a => roleOf(a) === r).length).join('/');
    const KEYS = 'msp-arrival-heavy,msp-arrival-light,msp-departure-heavy,msp-departure-light,'
               + 'sat-arrival-heavy,sat-arrival-light,sat-departure-heavy,sat-departure-light,'
               + 'departure,arrival,all-departure,all-arrival,mixed';
    assert('thirteen kinds of push are offered, in the owner\'s order', Object.keys(G.PUSH).join() === KEYS, Object.keys(G.PUSH).join());

    /* heavy and light are traffic volume: they set the Strips and Pressure boxes, and the three
       generic pushes leave those boxes alone. The numbers are the generator's design. */
    const vol = k => (G.PUSH[k].count == null ? '-' : G.PUSH[k].count + ' ' + G.PUSH[k].pressure);
    assert('heavy is thirty strips under saturated pressure and light is eight under routine, for MSP and the satellites',
      Object.keys(G.PUSH).filter(k => /-heavy$/.test(k)).every(k => vol(k) === '30 saturated')
      && Object.keys(G.PUSH).filter(k => /-light$/.test(k)).every(k => vol(k) === '8 routine'),
      Object.keys(G.PUSH).map(k => k + '=' + vol(k)).join(' '));
    assert('departure only, arrival only (either kind) and mixed leave Strips and Pressure as they were',
      ['departure', 'arrival', 'all-departure', 'all-arrival', 'mixed'].every(k => vol(k) === '-'));
    assert('a heavy push is no bigger than one controller works', Object.keys(G.PUSH).every(k => (G.PUSH[k].count || 0) <= G.STRIP_MAX));

    let badSplit = 0;
    const dominant = k => (/departure/.test(k) ? 'deps' : 'arrivals');
    for (const k of Object.keys(G.PUSH))
      for (let n = 1; n <= 50; n++) {
        const m = G.pushMix(k, n), sum = m.arrivals + m.deps + m.overflights, top = m[dominant(k)];
        if (sum !== n) { badSplit++; fail('a push split does not add up to the strips', k + ' ' + n + ' gave ' + sum); }
        if (top < m.arrivals || top < m.deps || top < m.overflights) { badSplit++; fail('the stream a push is about is not the largest', k + ' ' + n + ' gave ' + JSON.stringify(m)); }
      }
    ok('every push splits every total from 1 to 50 exactly, and the stream it is about is never the smaller one (' + (13 * 50) + ' splits)');

    const asStr = m => m.arrivals + '/' + m.deps + '/' + m.overflights;
    assert('ten strips split the way each push says',
      asStr(G.pushMix('mixed', 10)) === '5/4/1' && asStr(G.pushMix('arrival', 10)) === '10/0/0'
      && asStr(G.pushMix('departure', 10)) === '0/10/0'
      && asStr(G.pushMix('msp-arrival-heavy', 10)) === '8/1/1' && asStr(G.pushMix('sat-departure-light', 10)) === '1/8/1',
      ['mixed', 'arrival', 'departure', 'msp-arrival-heavy', 'sat-departure-light'].map(k => asStr(G.pushMix(k, 10))).join(' '));
    assert('arrival only and departure only carry nothing else, at any size, in either kind',
      [1, 7, 30, 50].every(n => ['', 'all-'].every(p => asStr(G.pushMix(p + 'arrival', n)) === n + '/0/0' && asStr(G.pushMix(p + 'departure', n)) === '0/' + n + '/0')));
    assert('a single strip goes to the stream the push is about',
      asStr(G.pushMix('mixed', 1)) === '1/0/0' && asStr(G.pushMix('arrival', 1)) === '1/0/0'
      && asStr(G.pushMix('departure', 1)) === '0/1/0' && asStr(G.pushMix('msp-departure-light', 1)) === '0/1/0'
      && asStr(G.pushMix('sat-arrival-heavy', 1)) === '1/0/0');
    assert('a split past the cap is held to it, and an unknown push is a mixed one',
      (m => m.arrivals + m.deps + m.overflights)(G.pushMix('arrival', 999)) === G.STRIP_MAX
      && asStr(G.pushMix('nonsense', 10)) === asStr(G.pushMix('mixed', 10)));
    assert('the old overflight push is gone', G.PUSH.overflight === undefined);

    const split = G.pushMix('msp-departure-light', 8);
    const pd = G.gen({ seed: 41, push: 'msp-departure-light', focus: 'sep', pressure: 'routine', count: 8, arrivals: split.arrivals, deps: split.deps, overflights: split.overflights });
    assert('a push drill is named and briefed by the push', pd.name === 'Built — MSP light departure push · seed 41'
      && pd.brief.includes('Mostly outbound from MSP') && pd.brief.includes('Generated at routine pressure, 8 strips'), pd.name + ' | ' + pd.brief);
    assert('and it is never weighted, whatever focus came with it', pd.focus === 'free' && pd.push === 'msp-departure-light' && pd.id === 'u41-msp-departure-light', pd.focus + ' ' + pd.push + ' ' + pd.id);
    assert('and it carries the split it was given, and validates clean',
      tallyStr(pd) === '1/6/1' && G.validate(pd).errors.length === 0, tallyStr(pd) + ' ' + G.validate(pd).errors.join(' | '));
    assert('the same seed and push rebuild the same drill',
      JSON.stringify(G.gen({ seed: 41, push: 'msp-departure-light', count: 8, arrivals: 1, deps: 6, overflights: 1 }).ac)
        === JSON.stringify(G.gen({ seed: 41, push: 'msp-departure-light', count: 8, arrivals: 1, deps: 6, overflights: 1 }).ac));
    assert('an MSP push (heavy or light) is MSP traffic only: the six gates, and no strip off or into a satellite',
      pd.ac.filter(a => roleOf(a) === 'arrival').every(a => globalThis.DD.ROUTES[a.gate] && !a.dest)
      && pd.ac.filter(a => roleOf(a) === 'departure').every(a => !a.dep));
    assert('arrival only is arrivals and nothing else',
      (d => tallyStr(d) === '12/0/0' && G.validate(d).errors.length === 0)(G.gen({ seed: 9, push: 'arrival', count: 12, arrivals: 12, deps: 0, overflights: 0 })));

    /* Departure only and arrival only come in two kinds (owner, 2026-10-27): the MSP one, which never
       touches a satellite, and a whole-facility one, which is MSP's traffic and the satellites' together,
       FACILITY_SAT_SHARE in every hundred going to the satellites. */
    {
      const D = globalThis.DD, SATP = ['AGUDE', 'ENCEE', 'TWOLF'], SATD = Object.keys(D.DEPS_AT);
      const isSatArr = a => roleOf(a) === 'arrival' && SATP.includes(a.gate), isSatDep = a => roleOf(a) === 'departure' && !!a.dep && a.dep !== 'KMSP';
      const mk = (k, n, seed) => { const m = G.pushMix(k, n); return G.gen({ seed: seed || 9, push: k, count: n, arrivals: m.arrivals, deps: m.deps, overflights: m.overflights }); };
      assert('the MSP kind of arrival only and departure only never touches a satellite',
        mk('arrival', 30).ac.every(a => D.ROUTES[a.gate] && !a.dest) && mk('departure', 30).ac.every(a => roleOf(a) === 'departure' && !a.dep));

      const fa = mk('all-arrival', 20, 41), fd = mk('all-departure', 10, 41);
      assert('the share going to the satellites is thirty in a hundred, and one strip is always MSP\'s',
        [1, 2, 3, 8, 10, 20, 30, 50].map(n => mk('all-arrival', n).ac.filter(isSatArr).length).join() === '0,1,1,2,3,6,9,15',
        [1, 2, 3, 8, 10, 20, 30, 50].map(n => mk('all-arrival', n).ac.filter(isSatArr).length).join());
      assert('a whole-facility arrival drill is MSP on the six gates and the satellites on their own STARs, nothing else',
        fa.ac.length === 20 && tallyStr(fa) === '20/0/0' && fa.ac.filter(isSatArr).length === 6
        && fa.ac.filter(a => !isSatArr(a)).length === 14 && fa.ac.filter(a => !isSatArr(a)).every(a => D.ROUTES[a.gate] && !a.dest)
        && fa.ac.filter(isSatArr).every(a => a.dest !== 'KMSP' && D.arrivalServes(a.gate, a.dest)),
        tallyStr(fa) + ' ' + fa.ac.filter(isSatArr).length + ' satellite');
      assert('a whole-facility departure drill is MSP\'s SIDs and the satellites\' own, spread through the list',
        fd.ac.length === 10 && tallyStr(fd) === '0/10/0' && fd.ac.filter(isSatDep).length === 3
        && fd.ac.filter(isSatDep).every(a => SATD.includes(a.dep) && D.sidKeysAt(a.dep).includes(a.sid) && a.from === D.towerHandoffFor(a.dep).name)
        && fd.ac.filter(a => !isSatDep(a)).every(a => !a.dep)
        && fd.ac.findIndex(isSatDep) < 5 && fd.ac.findIndex(a => !isSatDep(a)) < 3,
        fd.ac.map(a => isSatDep(a) ? 'S' : 'M').join(''));
      assert('both validate clean and carry their own names',
        G.validate(fa).errors.length === 0 && G.validate(fd).errors.length === 0
        && fa.name === 'Built — Arrival only, whole facility · seed 41' && fd.name === 'Built — Departure only, whole facility · seed 41'
        && fa.id === 'u41-all-arrival' && mk('arrival', 5, 41).name === 'Built — Arrival only, MSP · seed 41',
        G.validate(fa).errors.concat(G.validate(fd).errors).join(' | ') + ' ' + fa.name);
      assert('the same seed rebuilds the same whole-facility drill',
        JSON.stringify(mk('all-arrival', 20, 41).ac) === JSON.stringify(fa.ac) && JSON.stringify(mk('all-arrival', 20, 42).ac) !== JSON.stringify(fa.ac));
      assert('the satellites\' strips are spread over as long as MSP\'s, not all in the opening minutes',
        (last => last(fa.ac.filter(isSatArr)) >= 0.6 * last(fa.ac.filter(a => !isSatArr(a))))(l => Math.max(...l.map(a => a.spawnAt))),
        'last spawn, satellite ' + Math.max(...fa.ac.filter(isSatArr).map(a => a.spawnAt)) + ' vs MSP ' + Math.max(...fa.ac.filter(a => !isSatArr(a)).map(a => a.spawnAt)));
    }

    /* Satellite pushes — the satellite STARs in, the satellite fields' own SIDs out. The engine flies
       AGUDE, ENCEE and TWOLF and the DUHCK1-led tracks off ANE, FCM and STP; the direct routings
       need an entry the reference set does not carry, and MIC and Airlake code no SID, so none of
       those may ever be generated. */
    {
      const D = globalThis.DD, SATP = ['AGUDE', 'ENCEE', 'TWOLF'], SATD = Object.keys(D.DEPS_AT);
      const sp = G.pushMix('sat-arrival-heavy', 30);
      const sd = G.gen({ seed: 41, push: 'sat-arrival-heavy', pressure: 'saturated', count: 30, arrivals: sp.arrivals, deps: sp.deps, overflights: sp.overflights });
      const sArr = sd.ac.filter(a => roleOf(a) === 'arrival'), sDep = sd.ac.filter(a => roleOf(a) === 'departure');
      assert('a satellite push is named by the push and carries 30 strips split 23/4/3',
        sd.name === 'Built — Satellite heavy arrival push · seed 41' && sd.ac.length === 30 && tallyStr(sd) === '23/4/3', sd.name + ' ' + sd.ac.length + ' ' + tallyStr(sd));
      assert('every satellite arrival is on a satellite STAR that serves its field, and never on an MSP gate',
        sArr.length === 23 && sArr.every(a => SATP.includes(a.gate) && a.dest !== 'KMSP' && D.arrivalServes(a.gate, a.dest) && !D.ROUTES[a.gate]),
        sArr.map(a => a.gate + '>' + a.dest).join(' '));
      assert('all three satellite STARs turn up, and the fields they serve',
        SATP.every(g => sArr.some(a => a.gate === g)) && new Set(sArr.map(a => a.dest)).size >= 3, [...new Set(sArr.map(a => a.gate + '>' + a.dest))].join(' '));
      assert('TWOLF only ever goes to the southern satellites',
        sArr.filter(a => a.gate === 'TWOLF').every(a => ['KFCM', 'KLVN'].includes(a.dest)));
      assert('every satellite departure leaves a field that codes a SID, on a SID that field codes',
        sDep.length === 4 && sDep.every(a => SATD.includes(a.dep) && D.sidKeysAt(a.dep).includes(a.sid) && !!D.depTrackFor(a.sid, a.depRwy, a.dep)),
        sDep.map(a => a.dep + ':' + a.sid).join(' '));
      assert('a satellite departure is handed off by its own tower, not MSP\'s',
        sDep.every(a => a.from === D.towerHandoffFor(a.dep).name));
      assert('satellite traffic is corporate jets and turboprops with a registration, and the engine is on the strip',
        sd.ac.every(a => /^N[0-9A-Z]{2,5}$/.test(a.cs) && D.wakeOf(a.type).known && !D.wakeOf(a.type).heavy)
        && sArr.every(a => a.engine === 'jet' || a.engine === 'turboprop')
        && sArr.some(a => a.engine === 'jet') && sArr.some(a => a.engine === 'turboprop'));
      assert('the callsigns are all different', new Set(sd.ac.map(a => a.cs)).size === sd.ac.length);
      assert('and the drill validates clean — nothing the reference data would refuse',
        G.validate(sd).errors.length === 0, G.validate(sd).errors.join(' | '));
      {
        const wv = G.validate(sd).warnings, flds = [...new Set(sArr.map(a => a.dest))];
        assert('the note about a satellite field is made once per field, not once per strip',
          flds.length >= 3 && flds.every(f => wv.filter(w => w.includes(' is landing ' + f + ', which is ')).length === 1)
          && [...new Set(sDep.map(a => a.dep))].every(f => wv.filter(w => w.includes(' departs ' + f + ', which is ')).length === 1),
          wv.length + ' warnings, ' + flds.join());
      }

      /* a satellite strip must be one the engine can actually build and fly */
      const built = G.toScenario(sd).ac().map(o => D.mkAc(o));
      assert('every satellite arrival builds on its own ladder, not the MSP fallback',
        built.filter(a => a.role === 'arrival').every(a => a.route === D.SAT_ROUTES[a.gate] && a.route.length >= 2 && a.dest !== 'KMSP'));
      assert('and the receiver is the satellite seat that owns the field',
        built.filter(a => a.role === 'arrival').every(a => { const r = D.receiverFor(a); return !!r && !!r.frq && r.why.indexOf(a.dest) >= 0; }));

      /* the mix is deterministic and a different seed is a different drill */
      const again = G.gen({ seed: 41, push: 'sat-arrival-heavy', pressure: 'saturated', count: 30, arrivals: sp.arrivals, deps: sp.deps, overflights: sp.overflights });
      assert('the same seed rebuilds the same satellite drill, and another seed does not',
        JSON.stringify(sd.ac) === JSON.stringify(again.ac)
        && JSON.stringify(sd.ac) !== JSON.stringify(G.gen({ seed: 42, push: 'sat-arrival-heavy', pressure: 'saturated', count: 30, arrivals: sp.arrivals, deps: sp.deps, overflights: sp.overflights }).ac));

      /* every kind of push, every pressure, many seeds: nothing the validator refuses */
      let bad = 0, drills = 0, strips = 0;
      for (const k of Object.keys(G.PUSH))
        for (const pr of ['routine', 'compressed', 'saturated'])
          for (let s = 1; s <= 25; s++) {
            const n = G.PUSH[k].count || 14, m = G.pushMix(k, n);
            const d = G.gen({ seed: s * 37 + k.length, push: k, pressure: pr, count: n, arrivals: m.arrivals, deps: m.deps, overflights: m.overflights });
            const v = G.validate(d); drills++; strips += d.ac.length;
            if (v.errors.length || d.ac.length !== n || d.ac.length > G.STRIP_MAX) { bad++; fail('a generated push drill is refused', k + ' ' + pr + ' seed ' + (s * 37 + k.length) + ': ' + (v.errors[0] || d.ac.length + ' strips')); }
          }
      if (!bad) ok('every kind of push at every pressure over 25 seeds validates clean and holds its size (' + drills + ' drills, ' + strips + ' strips)');

      /* and it flies: put the live satellite arrivals on the scope and run the clock */
      globalThis.ddLoad('resume10r');
      D.sim.ac.length = 0;
      const liveSat = built.filter(a => a.role === 'arrival' && a.ckdIn);
      liveSat.forEach(a => { a.onFreq = true; D.sim.ac.push(a); });
      const d0 = liveSat.map(a => a.dist);
      let threw = null;
      try { globalThis.ddRate(1); for (let i = 0; i < 60; i++) tickFn(); } catch (e) { threw = e; }
      assert('satellite arrivals fly a minute of clock without an error, and move along their ladders',
        !threw && liveSat.length >= 1 && liveSat.every((a, i) => a.dist > d0[i]), threw ? String(threw && threw.stack || threw) : liveSat.map((a, i) => a.gate + ' ' + d0[i].toFixed(1) + '>' + a.dist.toFixed(1)).join(' '));
      D.sim.ac.length = 0;

      /* a satellite departure push is the other way round */
      const dp = G.pushMix('sat-departure-light', 8);
      const sdd = G.gen({ seed: 5, push: 'sat-departure-light', pressure: 'routine', count: 8, arrivals: dp.arrivals, deps: dp.deps, overflights: dp.overflights });
      assert('a light satellite departure push is eight strips, mostly outbound from the satellite fields',
        sdd.ac.length === 8 && tallyStr(sdd) === '1/6/1'
        && sdd.ac.filter(a => roleOf(a) === 'departure').every(a => SATD.includes(a.dep))
        && sdd.ac.filter(a => roleOf(a) === 'arrival').every(a => SATP.includes(a.gate)), tallyStr(sdd));
    }

    const fd = G.gen({ seed: 41, focus: 'floors', count: 4 });
    assert('a focus drill is untouched by all of this — named by its focus, no push on it',
      fd.name.includes('Floors cited aloud') && fd.focus === 'floors' && fd.push === undefined && fd.id === 'u41-floors', fd.name + ' ' + fd.id);
    assert('an unknown push is ignored, so the focus still applies',
      (d => d.focus === 'floors' && d.name.includes('Floors cited aloud'))(G.gen({ seed: 41, push: 'nonsense', focus: 'floors', count: 4 })));

    const gg = G.generalGates();
    assert('General mode draws on the gates the seat owns, or all six when it owns none',
      gg.length >= 1 && gg.every(x => Object.keys(globalThis.DD.ROUTES).includes(x)), gg.join());
  }

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
  assert('unknown gate rejected', joined.includes('not an arrival in the reference set'), joined);  /* the message became "not an arrival in the reference set" when arrivals-by-field landed; the old needle was "not a gate" and had never been run */
  assert('duplicate callsign rejected', joined.includes('duplicate callsign'), joined);
  /* THE HEAVY-JET RULE BINDS THE TRANSITION AND IS A FLAG, NOT A REFUSAL.
     LOA 5.b(c): "Heavy Jet arrivals must be assigned the Runway 12R/30L
     TRANSITION" — so a heavy on the 12R transition told to expect 12L is not
     in breach of it, and the exception is legitimate two ways that the tool
     cannot see: M98 asked the aircraft whether it could accept the other one,
     or ZMP assigned it and coordinated, or advised M98 before the handoff
     (owner, 2026-09-09). It used to be a hard error on the LANDING RUNWAY,
     which refused a legal strip and enforced the wrong field. Issue #55. */
  {
    const hv = (trans, rwy) => globalThis.ddb.validate({ name:'h', cfg:'12',
      ac:[{cs:'HVY1', type:'A339', gate:'NITZR', route:routeOn('NITZR'), trans:trans,
           rwy:rwy, dtg:20, alt:11000, ias:250, mode:'published', ckdIn:true}] });
    assert('a heavy on the 12R transition expecting 12L is not refused',
      hv('12R','12L').errors.length === 0
      && !hv('12R','12L').warnings.some(w => /heavy jets take/.test(w)),
      hv('12R','12L').errors.join(' | '));
    assert('a heavy ON the 12L transition is flagged, not refused, and says why it could be legitimate',
      hv('12L','12L').errors.length === 0
      && hv('12L','12L').warnings.some(w => /heavy jets take the 12R\/30L/.test(w)
                                         && /asked the aircraft/.test(w)
                                         && /coordinated/.test(w)),
      hv('12L','12L').warnings.join(' | ').slice(0, 220));
    assert('and it cites the paragraph rather than only the table',
      hv('12L','12L').warnings.some(w => /5\.b\(c\)/.test(w)));
  }

  /* the configuration has to follow the weather, not the other way round */
  const cro = globalThis.ddb.validate({ name: 'cro', cfg: '30-35', ceil: 1800, vis: 6,
    ac: [{ cs: 'DAL1', type: 'B738', gate: 'NITZR', dtg: 12, alt: 9000, ias: 250, mode: 'published', ckdIn: true }] });
  assert('CRO below its 2,200 ceiling rejected (LOA 7.i)', cro.errors.some(e => e.includes('2,200')), cro.errors.join(' | '));
  const c1722 = globalThis.ddb.validate({ name: '1722', cfg: '17-22', ceil: 1200, vis: 5,
    ac: [{ cs: 'DAL1', type: 'B738', gate: 'NITZR', dtg: 12, alt: 9000, ias: 250, mode: 'published', ckdIn: true }] });
  assert('17-22 below its 1,400 ceiling rejected (SOP 7-1 / LOA 11)', c1722.errors.some(e => e.includes('1,400')), c1722.errors.join(' | '));

  /* ============ The SID a departure strip names — issue #61 ============ */
  {
    const dv = o => globalThis.ddb.validate({ name: 'sid', cfg: '12', ceil: 5000, vis: 10,
      ac: [Object.assign({ cs: 'DAL10', type: 'B738', role: 'departure', rules: 'IFR', radar: 'established',
        dep: 'KMSP', fromStart: 4, alt: 5000, ias: 250, route: '' }, o)] });
    const retired = dv({ sid: 'COULT' });
    assert('a retired SID is refused, and the refusal names the set that replaced it',
      retired.errors.some(e => e.includes('COULT went with the SID set that ends on 2026-10-29') && e.includes('BITEZ1')),
      retired.errors.join(' | '));
    assert('a name that was never a SID is refused differently',
      dv({ sid: 'NOSUCH1.FIX' }).errors.some(e => e.includes('is not a SID this deck carries')));
    /* HTDSH1 and SNOWZ1 are valid off every runway (owner, 2026-10-18). The
       fixture is a bare strip, so other rules fire on it too; only what the SID
       rules say is under test here. */
    const sidSays = v => v.errors.concat(v.warnings).filter(x => /SID|Runway 17|RUBRB/.test(x));
    const off12 = dv({ sid: 'HTDSH1.ALO', depRwy: '12R' }), off17 = dv({ sid: 'SNOWZ1.ISTIQ', depRwy: '17' });
    assert('HTDSH1 off 12R and SNOWZ1 off 17 are both ordinary — nothing said about the SID',
      sidSays(off12).length === 0 && sidSays(off17).length === 0,
      sidSays(off12).concat(sidSays(off17)).join(' | '));
    const plain = dv({ sid: 'BITEZ1.DKOTA', depRwy: '30L' });
    assert('an ordinary SID from any runway raises nothing about the SID',
      !plain.errors.concat(plain.warnings).some(x => /SID|Runway 17/.test(x)), plain.errors.concat(plain.warnings).join(' | '));
    /* The 60 NM join-limit warning (ZMP-M98 LOA 4.f) can no longer be reached from the
       builder: tracks are drawn only to 50 NM (owner, 2026-10-22), so a start more than
       about 50 NM along one is refused as past the end of the track — and says why. */
    assert('a start past the end of a track is refused, naming the 50 NM the tracks are drawn to',
      dv({ sid: 'HTDSH1.ALO', depRwy: '17', fromStart: 65 }).errors.some(e => e.includes('past the end of the HTDSH1.ALO track') && e.includes('drawn only to 50 NM')));
    /* satellite departures fly — issue #67. Only the SID rules are under test; the
       fixture is a bare strip, so other rules fire on it too. */
    const sat = dv({ sid: 'DUHCK1.LLUKY', dep: 'KSTP', depRwy: '14' });
    assert('DUHCK1 off St. Paul is an ordinary departure — nothing said against the SID or the field',
      !sat.errors.some(e => /SID|coded at|engine flies|inventory/.test(e)), sat.errors.join(' | '));
    assert('and it says whose field it is, and that 4.c is the MSP DME whatever field it left',
      sat.warnings.some(w => w.includes('KSTP') && w.includes('SOP 6-2') && w.includes('names no field')), sat.warnings.join(' | '));
    const satWrong = dv({ sid: 'HTDSH1.ALO', dep: 'KFCM' });
    assert('HTDSH1 off Flying Cloud is refused by name, and the refusal lists the eight FCM does have',
      satWrong.errors.some(e => e.includes('HTDSH1 is not coded at KFCM') && e.includes('DUHCK1') && !e.includes('HTDSH1,')), satWrong.errors.join(' | '));
    const mspDuhck = dv({ sid: 'DUHCK1.LLUKY', dep: 'KMSP' });
    assert('DUHCK1 off MSP is refused: MSP does not code it',
      mspDuhck.errors.some(e => e.includes('DUHCK1 is not coded at KMSP') && !e.includes('DUHCK1,') ), mspDuhck.errors.join(' | '));
    const mic = dv({ sid: 'BITEZ1.DKOTA', dep: 'KMIC' });
    assert('Crystal has no SID, and the refusal says its IFR departures are radar-vectored',
      mic.errors.some(e => e.includes('KMIC has no SID') && e.includes('radar-vectored')), mic.errors.join(' | '));
    const lvn = dv({ sid: 'BITEZ1.DKOTA', dep: 'KLVN', depRwy: '30' });
    assert('Airlake has no runway inventory, so a runway there is refused rather than throwing',
      lvn.errors.some(e => e.includes('inventory is not in the reference set')), lvn.errors.join(' | '));
    assert('a satellite departure’s join and release are measured from the MSP DME, not along the track',
      dv({ sid: 'BITEZ1.DKOTA', dep: 'KANE', depRwy: '9', fromStart: 4 }).warnings.every(w => !w.includes('release point') && !w.includes('join limit'))
      && dv({ sid: 'DUHCK1.LLUKY', dep: 'KSTP', depRwy: '14', fromStart: 40 }).warnings.some(w => w.includes('DME from MSP') && w.includes('release point')));
    /* MSP1 (MSP9 until 2026-10-29) — issue #77. MSP ATCT 7110.26G 3-2-4.b-c and 6-3-1.a.4; not in CIFP 261029.
       It is a departure with no coded legs, so it lives beside DEPS and not in it, and
       what is flown is the order's initial track as a straight stand-in line. */
    {
      const D = globalThis.DD, M = D.MSP1, M9 = D.MSP1_DEPS;
      assert('MSP1 carries the order’s seven initial fixes on its three tracks, for 30L and 30R only',
        Object.keys(M.fixes).join() === 'FAR,BRNRD,DLH,HYR,EAU,GRB,DLL'
        && M.fixes.FAR === 320 && ['BRNRD', 'DLH', 'HYR', 'EAU', 'GRB'].every(f => M.fixes[f] === 340) && M.fixes.DLL === 360
        && M.rwys.join() === '30L,30R' && M.say === 'Minneapolis One' && /7110\.26G 3-2-4/.test(M.src) && /not in CIFP/.test(M.src),
        JSON.stringify(M.fixes));
      assert('MSP1 is not a coded SID: out of SID_SET, DEPS, the field lists and every SID colour',
        Object.keys(D.DEPS).every(k => D.sidOf(k) !== 'MSP1') && !D.SID_SET.MSP1 && !D.SID_FIELDS.KMSP.includes('MSP1')
        && D.sidKeysAt('KMSP').length === 25 && Object.keys(D.SID_HUES).indexOf('MSP1') < 0);
      assert('the picker offers MSP1 at MSP after the 25, and at no satellite',
        D.depKeysAt('KMSP').length === 32 && D.depKeysAt().length === 32 && D.depKeysAt('KMSP').slice(25).every(k => D.isMsp1(k))
        && D.depKeysAt('KSTP').length === 18 && D.depKeysAt('KMIC').length === 0 && D.depKeysAt('KSTP').every(k => !D.isMsp1(k)));
      assert('each MSP1 track starts at the field and runs straight out on the order’s track to the 50 NM the SIDs are drawn to',
        Object.keys(M9).length === 7 && Object.keys(M9).every(k => {
          const t = M9[k], p = t[1], brg = (Math.atan2(p.e, p.n) * 180 / Math.PI + 360) % 360;
          const off = Math.abs(brg - t.msp1.trk) % 360;      /* a 360 track measures as bearing 0 */
          return t.length === 2 && t[0].field === true && t[0].f === 'MSP' && Math.min(off, 360 - off) < 0.3
            && Math.abs(Math.hypot(p.e, p.n) - D.SID_MAP.nm) < 0.3 && t.vec === true && t.msp1.trk === M.fixes[t.msp1.fix];
        }));
      assert('depTrackFor finds it at MSP off any runway, never at a satellite',
        D.depTrackFor('MSP1.FAR', '30L') === M9['MSP1.FAR'] && D.depTrackFor('MSP1.DLL', null, 'KMSP') === M9['MSP1.DLL']
        && D.depTrackFor('MSP1.FAR', null, 'KSTP') === null && D.depTrackFor('MSP1.NOSUCH', '30L') === null);
      assert('it is said as the order says it, files the first fix and no procedure name, and takes no gate or scratchpad',
        D.sidSpoken('MSP1.GRB') === 'Minneapolis One' && D.routeTextFor({ role: 'departure', sid: 'MSP1.DLL' }) === 'DLL'
        && D.routeTextFor({ role: 'departure', sid: 'MSP1.FAR' }) === 'FAR' && D.scratchpadFor('MSP1.GRB', 11000) === null
        && D.scratchpadFor('MSP1.GRB') === null);
      const m9 = D.mkAc({ cs: 'DAL9', type: 'B738', role: 'departure', sid: 'MSP1.GRB', dep: 'KMSP', depRwy: '30L', fromStart: 3, alt: 3000, ias: 210 });
      assert('an aircraft built on MSP1 is on the stand-in line and files the fix',
        m9.route === M9['MSP1.GRB'] && m9.filed === 'GRB' && D.depCall(m9) === 'Minneapolis Departure');
      assert('and the drawn SID groups never take it, so it is not coloured as a SID',
        D.sidDrawGroups(['MSP1.GRB', 'MSP1.FAR']).length === 0 && D.sidDrawGroups(['MSP1.GRB', 'BITEZ1.DKOTA']).length === 1);
      /* validation — only the MSP1 rules are under test; the fixture is a bare strip */
      const m9says = v => v.errors.concat(v.warnings).filter(x => /MSP1|Minneapolis One/.test(x));
      const okFar = dv({ sid: 'MSP1.FAR', depRwy: '30L' }), ok30r = dv({ sid: 'MSP1.DLL', depRwy: '30R' });
      assert('MSP1 off 30L and 30R raises nothing about MSP1',
        m9says(okFar).length === 0 && m9says(ok30r).length === 0, m9says(okFar).concat(m9says(ok30r)).join(' | '));
      const off12m = dv({ sid: 'MSP1.FAR', depRwy: '12R' });
      assert('MSP1 off any other runway is refused, naming 30L and 30R and the paragraph',
        off12m.errors.some(e => e.includes('30L and 30R only') && e.includes('6-3-1.a.4') && e.includes('12R')), off12m.errors.join(' | '));
      assert('no runway stated is a warning and not an error',
        m9says(dv({ sid: 'MSP1.FAR' })).length > 0 && !dv({ sid: 'MSP1.FAR' }).errors.some(e => /MSP1/.test(e))
        && dv({ sid: 'MSP1.FAR' }).warnings.some(w => w.includes('MSP1') && w.includes('30L and 30R')),
        dv({ sid: 'MSP1.FAR' }).errors.concat(dv({ sid: 'MSP1.FAR' }).warnings).join(' | '));
      const prop9 = dv({ sid: 'MSP1.GRB', depRwy: '30L', engine: 'turboprop' });
      assert('a turboprop on MSP1 is a warning that it is a turbojet departure, not an error',
        prop9.warnings.some(w => w.includes('turbojet departure') && w.includes('turboprop')) && !prop9.errors.some(e => /MSP1/.test(e)),
        prop9.errors.concat(prop9.warnings).join(' | '));
      const noFix = dv({ sid: 'MSP1.XYZ', depRwy: '30L' }), sat9 = dv({ sid: 'MSP1.FAR', dep: 'KSTP', depRwy: '14' });
      assert('an initial fix the deck does not carry is refused and the seven are listed',
        noFix.errors.some(e => e.includes('not a Minneapolis One initial fix') && e.includes('FAR, BRNRD, DLH, HYR, EAU, GRB, DLL') && e.includes('6-3-1.a.4')),
        noFix.errors.join(' | '));
      assert('MSP1 off a satellite is refused as MSP’s departure',
        sat9.errors.some(e => e.includes('MSP1.FAR') && e.includes('is MSP’s departure, not')), sat9.errors.join(' | '));
      /* MSP9 became MSP1 on 2026-10-29 (vZMP PBN Phase II briefing p.3; FAA Not_In_CIFP 2609/2610 list
         KMSP MSP9, 2611 lists KMSP MSP1). A drill saved on the old name is refused and told so. */
      const old9 = dv({ sid: 'MSP9.FAR', depRwy: '30L' });
      assert('MSP9 is retired by name, no MSP9 key is carried, and a stored MSP9 strip is refused with MSP1 named',
        D.sidRetired('MSP9') && D.sidRetired('MSP9.FAR') && !D.sidRetired('MSP1.FAR') && !D.sidRetired('BITEZ1.DKOTA')
        && Object.keys(M9).every(k => k.indexOf('MSP1.') === 0) && D.depTrackFor('MSP9.FAR', '30L') === null
        && old9.errors.some(e => e.includes('MSP9.FAR') && e.includes('MSP9 is MSP1 from 2026-10-29')),
        old9.errors.join(' | '));
    }
    /* the generator draws from all nine now, HTDSH1 and SNOWZ1 included */
    {
      const picked = {};
      for (let seed = 1; seed <= 40; seed++)
        globalThis.ddb.gen({ seed: seed, focus: 'free', pressure: 'routine', count: 6, arrivals: 2, deps: 4 })
          .ac.filter(a => a.role === 'departure').forEach(a => { picked[globalThis.DD.sidOf(a.sid)] = 1; });
      assert('the generator draws on all nine SIDs, the two with a Runway 17 segment among them',
        Object.keys(picked).sort().join() === globalThis.DD.SID_FIELDS.KMSP.slice().sort().join(), Object.keys(picked).sort().join());
    }
    /* HTDSH on a 30s/17 — vZMP PBN Phase II briefing p.12 and p.16. A briefing, not an
       order: the generator follows it, the validator WARNS, nothing is refused, and every
       other configuration is untouched. */
    {
      const D = globalThis.DD, dep = c => {
        const out = [];
        for (let seed = 1; seed <= 60; seed++) {
          const g = globalThis.ddb.gen({ seed: seed, cfg: c, focus: 'free', pressure: 'routine', count: 6, arrivals: 2, deps: 4 });
          g.ac.filter(a => a.role === 'departure' && (a.dep || 'KMSP') === 'KMSP').forEach(a => out.push(D.sidOf(a.sid)));
        }
        return out;
      };
      assert('the 30-17 swap is data: ZMBRO1 and TOTTZ1 become HTDSH1, at MSP, citing the briefing pages',
        D.SID_SWAP['30-17'] && D.SID_SWAP['30-17'].to === 'HTDSH1' && D.SID_SWAP['30-17'].from.join() === 'ZMBRO1,TOTTZ1'
        && D.SID_SWAP['30-17'].field === 'KMSP' && /p\.12 and p\.16/.test(D.SID_SWAP['30-17'].src)
        && /not an order/.test(D.SID_SWAP['30-17'].src) && Object.keys(D.SID_SWAP).join() === '30-17',
        JSON.stringify(D.SID_SWAP));
      assert('sidSwapFor answers for the two SIDs at MSP in 30-17, by SID and not by transition, and for nothing else',
        !!D.sidSwapFor('30-17', 'ZMBRO1.BRIBE', 'KMSP') && !!D.sidSwapFor('30-17', 'TOTTZ1.FOOLS')
        && !D.sidSwapFor('30-17', 'HTDSH1.ALO') && !D.sidSwapFor('30-17', 'BITEZ1.DKOTA') && !D.sidSwapFor('30-17', 'SNOWZ1.ISTIQ')
        && !D.sidSwapFor('30-17', 'ZMBRO1.BRIBE', 'KSTP') && !D.sidSwapFor('30', 'ZMBRO1.BRIBE') && !D.sidSwapFor('12', 'TOTTZ1.FOOLS')
        && !D.sidSwapFor('12-17', 'ZMBRO1.BRIBE') && !D.sidSwapFor('17-22', 'TOTTZ1.FOOLS'));
      const in3017 = dep('30-17'), elsewhere = dep('12');
      assert('the generator never draws ZMBRO1 or TOTTZ1 at MSP in a 30s/17, and still draws HTDSH1',
        in3017.length > 20 && in3017.indexOf('ZMBRO1') < 0 && in3017.indexOf('TOTTZ1') < 0 && in3017.indexOf('HTDSH1') >= 0,
        in3017.length + ' departures; ' + Array.from(new Set(in3017)).sort().join());
      assert('and in a 12 configuration it still draws both, so the rule is not a global removal',
        elsewhere.indexOf('ZMBRO1') >= 0 && elsewhere.indexOf('TOTTZ1') >= 0, Array.from(new Set(elsewhere)).sort().join());
      const sv = (cfg, sid) => globalThis.ddb.validate({ name: 'swap', cfg: cfg, ceil: 5000, vis: 10,
        ac: [{ cs: 'DAL10', type: 'B738', role: 'departure', rules: 'IFR', radar: 'established',
               dep: 'KMSP', fromStart: 4, alt: 5000, ias: 250, route: '', sid: sid, depRwy: '30L' }] });
      const swapSays = v => v.warnings.filter(w => /HTDSH1/.test(w) && /30s\/17/.test(w));
      const a17 = sv('30-17', 'ZMBRO1.BRIBE'), b17 = sv('30-17', 'TOTTZ1.FOOLS');
      assert('a ZMBRO1 or TOTTZ1 strip in 30-17 is warned, citing the briefing, and not refused',
        swapSays(a17).length === 1 && swapSays(b17).length === 1 && /p\.12 and p\.16/.test(swapSays(a17)[0])
        && /Reminder, not a judgement/.test(swapSays(a17)[0])
        && !a17.errors.some(e => /HTDSH|swap/i.test(e)) && !b17.errors.some(e => /HTDSH|swap/i.test(e)),
        swapSays(a17).join(' | ') + ' || ' + a17.errors.join(' | '));
      assert('the same strips in 12, 30 and 12-17 draw no warning, and HTDSH1 and BITEZ1 in 30-17 draw none',
        ['12', '30', '12-17'].every(c => swapSays(sv(c, 'ZMBRO1.BRIBE')).length === 0 && swapSays(sv(c, 'TOTTZ1.FOOLS')).length === 0)
        && swapSays(sv('30-17', 'HTDSH1.ALO')).length === 0 && swapSays(sv('30-17', 'BITEZ1.DKOTA')).length === 0);
      assert('a satellite departure on a ZMBRO1-named SID is left alone in 30-17 (the swap is MSP only)',
        globalThis.ddb.validate({ name: 'sat', cfg: '30-17', ceil: 5000, vis: 10,
          ac: [{ cs: 'DAL11', type: 'B738', role: 'departure', rules: 'IFR', radar: 'established',
                 dep: 'KSTP', fromStart: 4, alt: 5000, ias: 250, route: '', sid: 'ZMBRO1.BRIBE', depRwy: '14' }] })
          .warnings.filter(w => /flown as HTDSH1/.test(w)).length === 0);
      assert('sidSwapNote reads for 30-17 and is empty elsewhere; SID17_OPEN now points at the briefing but keeps its caveats',
        /HTDSH1 replaces ZMBRO1 and TOTTZ1 at MSP/.test(D.sidSwapNote('30-17')) && D.sidSwapNote('12') === ''
        && /briefing/.test(D.SID17_OPEN) && /not a published rule/.test(D.SID17_OPEN) && /Open until the updated SOP and LOA/.test(D.SID17_OPEN),
        D.SID17_OPEN);
    }
    /* a stored drill naming a retired SID is not flown — and is not put on an arrival ladder */
    globalThis.DD.SCENARIOS.push({id:'oldsid', name:'Old SID', frame:'test', altim:'2980', brief:'',
      ac:() => [
        {cs:'DAL11', type:'B738', role:'departure', sid:'WLSTN', fromStart:4, alt:5000, ias:250, ckdIn:true},
        {cs:'DAL22', type:'B738', role:'departure', sid:'BITEZ1.DKOTA', fromStart:4, alt:5000, ias:250, ckdIn:true}
      ]});
    globalThis.ddLoad('oldsid');
    assert('a departure on a retired SID is left out of the drill rather than flown on something else',
      globalThis.DD.sim.ac.map(a => a.cs).join() === 'DAL22');
    mustContain('and the feed says why', 'went with the SID set that ends on 2026-10-29');
  }

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

  /* a start that opens inside the trunk check is a warning, not an error.
     The two strips carry a filed route because an IFR strip without one is a
     hard error now — this fixture predated that rule and produced two errors
     of its own, which is what the assertion was tripping on when the harness
     was first executed on 2026-09-07. Taking the route from routeTextFor
     rather than typing it keeps the fixture honest as the ladders change. */
  v = globalThis.ddb.validate({
    name: 'trunk', cfg: '12', ac: [
      { cs: 'DAL1', type: 'B738', gate: 'NITZR', route: routeOn('NITZR'), dtg: 12, alt: 9000, ias: 250, mode: 'published', ckdIn: true },
      { cs: 'DAL2', type: 'B738', gate: 'BLUEM', route: routeOn('BLUEM'), dtg: 13, alt: 9000, ias: 250, mode: 'published', ckdIn: true }
    ]
  });
  assert('co-altitude opening warns without blocking',
    v.errors.length === 0 && v.warnings.some(w => w.includes('loss of separation')),
    'errors: [' + v.errors.join(' | ') + '] warnings: ' + v.warnings.join(' | '));

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
      {cs:'DAL512', type:'B738', role:'departure', sid:'NRTHN1.TTOWN', fromStart:3, alt:5000, ias:250, ckdIn:true},
      {cs:'SCX880', type:'B738', role:'departure', sid:'BITEZ1.SMERF', fromStart:3, alt:5000, ias:250, ckdIn:true},
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
  /* the same release off a satellite field — issue #67. The datum is the MSP DME
     whichever field the aircraft left (4.c says "departing aircraft" and names no
     field), and the engine flies the track from the field. */
  {
    const s9 = globalThis.DD.mkAc({ cs: 'SAT9', type: 'C172', role: 'departure', sid: 'DUHCK1.LLUKY', dep: 'KSTP',
      depRwy: '14', fromStart: 2, alt: 4000, ias: 250, ckdIn: true });
    const d0 = globalThis.DD.dmeOf(s9);
    globalThis.DD.sim.ac.push(s9);
    for (let i = 0; i < 200; i++) tickFn();
    assert('a departure off St. Paul flies its own track and is graded on the 25 DME release like any other',
      d0 > 4 && d0 < 15 && s9.route[0].f === 'STP' && s9.relChecked === true && globalThis.DD.dmeOf(s9) >= 25,
      d0.toFixed(1) + ' ' + s9.relChecked);
    globalThis.DD.sim.ac.splice(globalThis.DD.sim.ac.indexOf(s9), 1);
  }
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
      {cs:'DAL100', type:'B738', role:'departure', sid:'TOTTZ1.ALO', fromStart:5, alt:6000,  ias:250, ckdIn:true},
      {cs:'DAL200', type:'B738', role:'departure', sid:'TOTTZ1.ALO', fromStart:5, alt:12000, ias:280, ckdIn:true}
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
      {cs:'DAL400', type:'B738', role:'departure', sid:'TOTTZ1.ALO', fromStart:5, alt:6000, ias:250, ckdIn:true},
      {cs:'DAL500', type:'B738', role:'departure', sid:'TOTTZ1.ALO', fromStart:5, alt:7000, ias:250, ckdIn:true}
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
      radar:'departure', sid:'SNUPE1.DLL', dep:'KMSP', depRwy:'12R', alt:3000, ias:210, fromStart:3});
    dep.onFreq = true; dep.ckdIn = true; dep.squawk = '4231';
    globalThis.DD.sim.ac.push(dep);
    const vfr = globalThis.DD.mkAc({cs:'N11AB', type:'C172', role:'overflight', rules:'VFR',
      radar:'following', entry:{r:140,d:30}, exit:{r:320,d:30}, alt:4500, ias:110});
    vfr.onFreq = true; vfr.ckdIn = true;
    globalThis.DD.sim.ac.push(vfr);

    say('DAL77 radar contact');
    mustContain('one off the tower gets radar contact, not a redundancy note', 'this is the identification it was owed');
    assert('and it is identified afterwards', dep.identified === true);

    /* Direct to the field it just left is flagged and not read back; the flag
       names where the SID really begins. (Until 2026-10-29 this was the navaid
       at the head of the SID; the 261029 set has none.) */
    say('DAL77 proceed direct MSP');
    mustContain('direct to the field a departure just left is flagged', 'is the field');
    mustContain('and the flag says where the SID begins', 'which begins at PNUTZ');
    say('DAL77 proceed direct SNUPE');
    mustContain('direct to a fix further along the SID is read back honestly', 'does not re-path an aircraft');

    /* MSP1 (issue #77): the field is not a fix on it either, and the flag names the
       track it is flown on and the fix it is filed to, not a SID that has no legs */
    const m9d = globalThis.DD.mkAc({cs:'DAL78', type:'B738', role:'departure', rules:'IFR',
      radar:'departure', sid:'MSP1.GRB', dep:'KMSP', depRwy:'30L', alt:3000, ias:210, fromStart:3});
    m9d.onFreq = true; m9d.ckdIn = true; m9d.squawk = '4232';
    globalThis.DD.sim.ac.push(m9d);
    say('DAL78 radar contact');
    say('DAL78 proceed direct MSP');
    mustContain('direct to the field on an MSP1 departure names MSP1 and its initial track and fix',
      'Minneapolis One departure, which is flown on an initial track of 340 toward GRB');
    mustContain('and asks for a fix on the route rather than on a SID', 'Give it a fix on the route');
    globalThis.DD.sim.ac.splice(globalThis.DD.sim.ac.indexOf(m9d), 1);

    say('N11AB radar contact');
    mustContain('flight following without a code is refused', 'nothing to be in radar contact with');
    say('N11AB squawk 0234');
    say('N11AB radar contact');
    mustContain('a code then an identification picks up flight following', 'flight following established');
  }


  assert('VFR against an IFR field is flagged',
    vfrImc.warnings.some(w => w.indexOf('is VFR and the field is IFR') >= 0), vfrImc.warnings.join(' | '));
  assert('every generated IFR strip carries a route',
    globalThis.ddb.gen({seed:5150, focus:'free', pressure:'routine', count:6, arrivals:3, deps:2, overflights:1})
      .ac.every(a => a.rules !== 'IFR' || String(a.route || '').trim().length > 0));

  /* THESE TWO BELONG TO THE `mixed` DRILL, and they had drifted away from it:
     the radar-states block above empties sim.ac and pushes two aircraft of its
     own, so sim.ac[2] was undefined by the time they ran and the harness threw
     rather than failing. Found on 2026-09-07, the first time it was executed.
     Reload the drill they are about them rather than trusting an index left
     over from four sections earlier. */
  globalThis.ddLoad('mixed');
  globalThis.ddSel('SCX880');
  say('SCX880 climb and maintain 11000');
  globalThis.ddRate(4);
  for (let i = 0; i < 60; i++) tickFn();
  assert('an overflight holds the speed it filed rather than accelerating',
    Math.round(globalThis.DD.sim.ac[2].ias) === 120, globalThis.DD.sim.ac[2].ias);
  assert('a departure only climbs when it is told to',
    globalThis.DD.sim.ac[1].alt > 5000 && globalThis.DD.sim.ac[0].alt === 5000,
    globalThis.DD.sim.ac[1].alt + '/' + globalThis.DD.sim.ac[0].alt);

  /* ============ 4a-r. The runway on the strip decides the track — issue #55 ===
     ZMP-M98 LOA 5.b(b): "ZMP 'Descend Via' phraseology must include a runway
     transition. ZMP will NORMALLY assign runway transitions as depicted in
     Table 2." NORMALLY — so Table 2 is the default and not a constraint, and an
     aircraft can arrive on any transition its gate publishes. Four things were
     wrong, all of them the flow work of 2026-09-04 not reaching a caller. */
  {
    const endOf = r => r ? r[r.length - 1].f : null;

    /* 1. THE ROUTE LOOKUP. A runway on the strip beats the Table 2 default. */
    globalThis.DD.setFlow('30');
    assert('Table 2 gives TORGY 30L on a 30s, and that is what an unassigned strip flies',
      globalThis.DD.transitionFor('30', 'TORGY') === '30L'
      && endOf(globalThis.DD.routeFor({gate: 'TORGY'})) === 'LEDRZ',
      endOf(globalThis.DD.routeFor({gate: 'TORGY'})));
    assert('and a strip GIVEN the 30R transition flies the 30R ladder instead',
      endOf(globalThis.DD.routeFor({gate: 'TORGY', trans: '30R'})) === 'OSMOH',
      endOf(globalThis.DD.routeFor({gate: 'TORGY', trans: '30R'})));
    assert('an aircraft built on that transition is on it from the first tick',
      endOf(globalThis.DD.mkAc({cs:'R1', type:'B738', gate:'TORGY', trans:'30R',
        alt:11000, ias:250, dtgEnd:20}).route) === 'OSMOH');
    /* THE LANDING RUNWAY DOES NOT TOUCH THE TRACK — issue #55. */
    assert('and the LANDING runway does not, on its own, change the ladder at all',
      endOf(globalThis.DD.routeFor({gate: 'TORGY', rwy: '30R'})) === 'LEDRZ'
      && endOf(globalThis.DD.mkAc({cs:'R1b', type:'B738', gate:'TORGY', rwy:'30R',
           alt:11000, ias:250, dtgEnd:20}).route) === 'LEDRZ',
      endOf(globalThis.DD.routeFor({gate: 'TORGY', rwy: '30R'})));
    assert('an aircraft on the 30L transition expecting 30R carries both, separately',
      (a => a.trans === '30L' && a.rwy === '30R')(globalThis.DD.mkAc({cs:'R1c',
        type:'B738', gate:'TORGY', rwy:'30R', alt:11000, ias:250, dtgEnd:20})));
    assert('the shared ROUTES object is not mutated for one strip',
      endOf(globalThis.DD.ROUTES.TORGY) === 'LEDRZ');

    /* 2. THE RECEIVER. Near and far go to DIFFERENT KINDS OF POSITION — 4-5
       sends near to an Arrival and far to that side's Feeder — so resolving
       the class against the wrong flow sends the aircraft to the wrong desk. */
    /* The receiver follows the LANDING RUNWAY — 4-2 splits the ACDA on the
       localizer and 4-5's crossover is the gate's side against the runway's —
       while the track follows the transition. Both at once, on one aircraft. */
    const rTorgy30R = globalThis.DD.receiverFor(globalThis.DD.mkAc({cs:'R2', gate:'TORGY',
      rwy:'30R', alt:11000, ias:250, dtgEnd:20}));
    assert('TORGY expecting 30R on a 30s is a FAR-gate crossover and goes to a Feeder',
      rTorgy30R.cross === 'far' && ['H','I'].indexOf(rTorgy30R.pos) >= 0,
      rTorgy30R.cross + '/' + rTorgy30R.pos);
    assert('and with no runway assigned the receiver follows Table 2 for the flow, not 12R',
      globalThis.DD.receiverFor(globalThis.DD.mkAc({cs:'R3', gate:'TORGY',
        alt:11000, ias:250, dtgEnd:20})).why.indexOf('30L') >= 0,
      globalThis.DD.receiverFor(globalThis.DD.mkAc({cs:'R4', gate:'TORGY',
        alt:11000, ias:250, dtgEnd:20})).why);
    globalThis.DD.setFlow('12');
    const rTorgy12L = globalThis.DD.receiverFor(globalThis.DD.mkAc({cs:'R5', gate:'TORGY',
      rwy:'12L', alt:9000, ias:250, dtgEnd:20}));
    assert('the same gate to 12L on a 12s is NEAR and goes to an Arrival — the class is the flow',
      rTorgy12L.cross === 'near' && ['N','S'].indexOf(rTorgy12L.pos) >= 0,
      rTorgy12L.cross + '/' + rTorgy12L.pos);

    /* 3. VALIDATION. The check is the gate's published transitions, not the two
       RECEIVER keys — which had been refusing every runway but 12L and 12R in
       every configuration, Table 2's own NITZR 22 on a 17-22 included. */
    const vRwy = (gate, rwy, cfg) => globalThis.ddb.validate({ name:'r', cfg:cfg,
      ac:[{cs:'D1', type:'B738', gate:gate, route:routeOn(gate), rwy:rwy, dtg:20,
           alt:11000, ias:250, mode:'published', ckdIn:true}] });
    const vTrans = (gate, trans, cfg) => globalThis.ddb.validate({ name:'r', cfg:cfg,
      ac:[{cs:'D1', type:'B738', gate:gate, route:routeOn(gate), trans:trans, dtg:20,
           alt:11000, ias:250, mode:'published', ckdIn:true}] });
    assert('a published transition is accepted in its own flow',
      vRwy('TORGY','30R','30').errors.filter(e => /transition to/.test(e)).length === 0
      && vRwy('NITZR','22','17-22').errors.filter(e => /transition to/.test(e)).length === 0);
    assert('and one the gate does not publish is refused, with the list and its source',
      /no published transition to 35/.test(vRwy('TORGY','35','30-35').errors.join(' '))
      && /claude_MSP_STAR_Reference/.test(vRwy('TORGY','35','30-35').errors.join(' ')),
      vRwy('TORGY','35','30-35').errors.join(' | '));

    /* 4. THE DEVIATION IS A WARNING, NOT AN ERROR, because 5.b(b) says
       "normally" — and it says which of the two things the strip is. */
    const dev = vTrans('TORGY','30R','30');
    assert('a TRANSITION other than Table 2 warns rather than blocking, and cites 5.b(b)',
      dev.errors.filter(e => /transition/.test(e)).length === 0
      && dev.warnings.some(w => /5\.b\(b\)/.test(w) && /normally/.test(w)),
      dev.warnings.join(' | ').slice(0, 200));
    assert('and it names the crossover class the flow actually gives it',
      dev.warnings.some(w => /far-gate case/.test(w)),
      dev.warnings.join(' | ').slice(0, 200));
    assert('while a strip on the Table 2 transition says nothing at all',
      vTrans('TORGY','30L','30').warnings.every(w => !/Table 2 assigns/.test(w)));
    /* A transition and a landing runway that disagree is ORDINARY, and the note
       says so rather than warning about it as though it were a mistake. */
    const mix = globalThis.ddb.validate({ name:'m', cfg:'30',
      ac:[{cs:'D2', type:'B738', gate:'TORGY', route:routeOn('TORGY'), trans:'30L',
           rwy:'30R', dtg:20, alt:11000, ias:250, mode:'published', ckdIn:true}] });
    assert('flying one transition and expecting the other parallel is allowed and explained',
      mix.errors.length === 0
      && mix.warnings.some(w => /ordinary crossover, not a mistake/.test(w) && /HDEEE/.test(w)),
      mix.warnings.join(' | ').slice(0, 220));

    /* 5. THE SCOPE DRAWS THE LADDER THE AIRCRAFT IS ON, not the Table 2 one. */
    globalThis.DD.setFlow('30');
    globalThis.ddLoad('resume10r');
    globalThis.DD.sim.ac.length = 0;
    const drawn = globalThis.DD.mkAc({cs:'R6', type:'B738', gate:'TORGY', trans:'30R',
      alt:11000, ias:250, dtgEnd:20, ckdIn:true});
    drawn.onFreq = true;
    globalThis.DD.sim.ac.push(drawn);
    globalThis.ddLayers('tracked');
    const pts = (el('dd-scopebox').innerHTML.match(/<polyline points="([^"]*)" fill="none" stroke="var\(--green\)"/g) || [])
      .map(m => m.match(/points="([^"]*)"/)[1]);
    const last = drawn.route[drawn.route.length - 1];
    assert('the tracked ladder drawn is the one the aircraft is flying',
      pts.length === 1 && pts[0].split(' ').pop() === last.x.toFixed(1) + ',' + last.y.toFixed(1),
      pts.length + ' / ' + (pts[0] || '').split(' ').pop());
    globalThis.DD.setFlow('12');
  }

  /* ============ 4b-v. Vectoring — issue #26 ============
     The first thing in this engine that takes an aircraft OFF its route.
     Position becomes the primary state and the route becomes one of two ways
     of advancing it; `nav` says which is in force. Joining a final is the
     approach clearance, and that is section 4b-vi — this one is the vector. */
  {
    globalThis.DD.setFlow('12');
    globalThis.ddLoad('resume10r');
    const ac = () => globalThis.DD.sim.ac.filter(x => x.cs === 'DAL589')[0];

    assert('an aircraft starts on its route, not on a heading',
      ac().nav === 'route' && globalThis.DD.onVector(ac()) === false);
    const startAlt = ac().alt, startDist = ac().dist;

    globalThis.ddSel('DAL589');
    say('DAL589 turn left heading 310');
    const a = ac();
    assert('a vector takes it off the route and seeds the turn from its own track',
      a.nav === 'heading' && a.hdgTo === 310 && a.turnDir === 'L'
      && Math.abs(a.hdg - globalThis.DD.trackAt(a)) < 0.001,
      JSON.stringify({nav:a.nav, hdgTo:a.hdgTo, dir:a.turnDir, hdg:a.hdg}));
    assert('and the position does not jump when it comes off',
      a.e != null && a.n != null && Math.abs(a.dist - startDist) < 0.001);
    mustContain('the readback says the heading digit by digit', 'left heading three one zero');
    mustContain('and the tool says the descend-via ends with it', 'The descend-via ends with it');

    /* THE TURN IS A STANDARD RATE TURN AND IT GOES THE WAY IT WAS TOLD. */
    assert('a standard rate turn is three degrees a second',
      globalThis.DD.TURN_RATE === 3);
    assert('turnStep goes the short way when no direction is given',
      globalThis.DD.turnStep(350, 10, null, 1) === 353
      && globalThis.DD.turnStep(10, 350, null, 1) === 7,
      globalThis.DD.turnStep(350, 10, null, 1) + '/' + globalThis.DD.turnStep(10, 350, null, 1));
    assert('and the long way when the direction says so',
      globalThis.DD.turnStep(10, 350, 'R', 1) === 13
      && globalThis.DD.turnStep(350, 10, 'L', 1) === 347,
      globalThis.DD.turnStep(10, 350, 'R', 1) + '/' + globalThis.DD.turnStep(350, 10, 'L', 1));
    assert('a turn that has arrived stops exactly on the heading',
      globalThis.DD.turnStep(309, 310, null, 1) === 310);

    /* Fly it. It turns at rate, it moves, and it does NOT descend. */
    const hdg0 = a.hdg;
    globalThis.ddRate(1);
    for (let i = 0; i < 8; i++) tickFn();
    assert('it turns at the standard rate, in the direction it was given',
      Math.abs(((((a.hdg - hdg0) + 540) % 360) - 180) - (-24)) < 0.6,
      hdg0 + ' -> ' + a.hdg);
    assert('and it is flying, not sitting still',
      Math.abs(a.e) + Math.abs(a.n) > 0);
    assert('A VECTORED ARRIVAL HOLDS ITS ALTITUDE — the published crossings belong to the procedure',
      a.alt === startAlt, startAlt + ' -> ' + a.alt);
    assert('and no published speed applies off the procedure',
      globalThis.DD.pubSpeedAt(a) === null);
    assert('its distance along the ladder is frozen, because it is not on the ladder',
      Math.abs(a.dist - startDist) < 0.001);

    for (let i = 0; i < 90; i++) tickFn();
    assert('the turn completes and the direction is released',
      Math.round(a.hdg) === 310 && a.turnDir === null, a.hdg + '/' + a.turnDir);

    /* "fly present heading" freezes whatever it is making good. */
    say('DAL589 fly present heading');
    assert('fly present heading holds what it has',
      a.hdgTo === a.hdg, a.hdgTo + '/' + a.hdg);
    mustContain('and reads back as itself', 'fly present heading');

    /* The strip stops quoting a distance along a route it is not flying. */
    globalThis.ddSel('DAL589');
    assert('the strip says it is vectored and gives the heading and the DME',
      /vectored off/.test(el('dd-strips').innerHTML)
      && /heading 310/.test(el('dd-strips').innerHTML)
      && !/NM to go/.test(el('dd-strips').innerHTML.split('SCX8127')[0]),
      el('dd-strips').innerHTML.replace(/<[^>]*>/g, ' ').slice(0, 200));

    /* A nonsense heading is refused rather than flown. */
    const wasTo = a.hdgTo;
    say('DAL589 turn right heading 420');
    assert('a heading outside 001-360 is refused and the aircraft keeps what it had',
      a.hdgTo === wasTo, a.hdgTo + '/' + wasTo);

    /* THE BOUNDARY. Vectoring is the first thing that can put an aircraft
       outside M98, so the ring became a containment test rather than a
       drawing — and one ray cast now serves both it and the dispersal area. */
    assert('the M98 ring contains the field and not a point well outside it',
      globalThis.DD.inM98(0, 0) === true && globalThis.DD.inM98(0, 80) === false);
    assert('and the shared ray cast still answers for the dispersal area',
      typeof globalThis.DD.inPoly === 'function');
    const far = ac();
    far.e = 0; far.n = 70; far.outNoted = false; far.hdg = 0; far.hdgTo = 0;
    tickFn();
    assert('an aircraft vectored out of M98 is called, once, and named as critical',
      far.outNoted === true && feedText().indexOf('vectored outside the M98 boundary') >= 0,
      feedText().slice(-200));

    /* THE ROUTE-FIX CHECKS DO NOT FIRE FOR AN AIRCRAFT THAT LEFT THE ROUTE.
       The SAVVG default assigns 12R to anything that crosses it with no runway
       — off the ladder there is no crossing to observe, and firing anyway
       would put a runway on a strip on the strength of a fix it never passed. */
    globalThis.ddLoad('resume10r');
    const sv = globalThis.DD.sim.ac.filter(x => x.cs === 'DAL589')[0];
    sv.rwy = null; sv.savvgWarned = false;
    const savvgCum = sv.route.filter(p => p.f === 'SAVVG')[0].cum;
    globalThis.ddSel('DAL589');
    say('DAL589 fly heading 270');
    sv.dist = savvgCum + 2;          /* past it on the ladder, but not on the ladder */
    const feedWas = globalThis.DD.sim.feed.length;
    globalThis.ddRate(1);
    for (let i = 0; i < 5; i++) tickFn();
    assert('a vectored aircraft does not trip the SAVVG runway default',
      sv.savvgWarned === false && sv.rwy === null
      && !globalThis.DD.sim.feed.slice(0, globalThis.DD.sim.feed.length - feedWas)
            .some(e => /crossed SAVVG/.test(String(e.html))),
      sv.rwy + '/' + sv.savvgWarned);
    /* and it still does when the aircraft is on the ladder */
    globalThis.ddLoad('resume10r');
    const sv2 = globalThis.DD.sim.ac.filter(x => x.cs === 'DAL589')[0];
    sv2.rwy = null; sv2.savvgWarned = false; sv2.dist = savvgCum + 2;
    globalThis.ddRate(1); tickFn();
    assert('and on the ladder it still does, so the guard did not just disable it',
      sv2.savvgWarned === true && sv2.rwy === '12R', sv2.rwy + '/' + sv2.savvgWarned);
    globalThis.DD.setFlow('12');
  }

  /* ============ 4b-vi. An approach clearance names an approach the runway has ============
     CIFP 260903 codes no ILS to 4, 17 or 22 and nothing RNAV to 17 — the
     IN_CIFP.txt manifest, identical in 261001 and 261029, transcribed in
     claude_MSP_Runway_Reference.md section 4. Until 2026-10-14 "cleared ILS
     runway 17 approach" was read back and flown. The crew now queries it,
     nothing is flown, and the flag names the cycle. */
  {
    const D = globalThis.DD;
    const kinds = D.APPROACHES.KMSP.reduce((o, id) => { o[id[0]] = (o[id[0]] || 0) + 1; return o; }, {});
    assert('MSP carries the 26 approaches CIFP codes: 6 ILS, 8 localizer, 7 RNAV (GPS), 5 RNAV (RNP)',
      D.APPROACHES.KMSP.length === 26 && kinds.I === 6 && kinds.L === 8 && kinds.R === 7 && kinds.H === 5,
      JSON.stringify(kinds));
    assert('the list is stamped with its cycle', /^CIFP 260903\b/.test(D.APCH_SRC) && D.APCH_CYCLE === 'CIFP 260903');
    assert('there is no ILS to 4, 17 or 22, and there is one to the other five ends',
      ['4', '17', '22'].every(r => D.approachExists('KMSP', r, 'ILS') === false)
      && ['12L', '12R', '30L', '30R', '35'].every(r => D.approachExists('KMSP', r, 'ILS') === true));
    /* Two record types, one answer: the coded procedures and the localizer
       equipment's ILS category, which the harness already pins. */
    assert('the coded ILS procedures agree with the localizer records\' category at all eight ends',
      Object.keys(D.RUNWAYS).every(r => D.approachExists('KMSP', r, 'ILS') === (D.RUNWAYS[r].cat > 0)),
      Object.keys(D.RUNWAYS).map(r => r + ':' + D.approachExists('KMSP', r, 'ILS') + '/' + D.RUNWAYS[r].cat).join(' '));
    assert('every MSP runway publishes a localizer approach',
      Object.keys(D.RUNWAYS).every(r => D.approachExists('KMSP', r, 'localizer') === true));
    assert('17 has no RNAV approach of either kind, and the other seven ends have one',
      D.approachExists('KMSP', '17', 'RNAV') === false
      && Object.keys(D.RUNWAYS).filter(r => r !== '17').every(r => D.approachExists('KMSP', r, 'RNAV') === true));
    assert('a visual needs no coded procedure and is never refused for want of one',
      Object.keys(D.RUNWAYS).every(r => D.approachExists('KMSP', r, 'visual') === true));
    assert('a field with no list answers unknown, never no',
      D.approachExists('KFCM', '10R', 'ILS') === null && D.approachesTo('KSTP', '14') === null);
    /* The deck names runway 4 '4'; CIFP writes '04'. */
    assert('the deck\'s runway 4 finds CIFP\'s 04, for the course and for the approaches',
      D.rwyKey('4') === '04' && D.rwyKey('12L') === '12L'
      && D.finalCourse('4') && D.finalCourse('4').crs === D.finalCourse('04').crs
      && D.approachesTo('KMSP', '4').map(p => p.id).join() === 'L04,R04',
      JSON.stringify(D.finalCourse('4')));

    const fresh = () => {
      globalThis.ddLoad('resume10r');
      globalThis.ddSel('DAL589');
      return D.sim.ac.filter(x => x.cs === 'DAL589')[0];
    };

    /* REFUSED: the crew queries, nothing is flown, the flag names the cycle. */
    let a = fresh();
    const rwy0 = a.rwy;
    say('DAL589 cleared ILS runway 17 approach');
    mustContain('cleared an ILS to 17, the crew says unable rather than reading it back',
      'unable, no ILS to runway one seven, DAL589');
    assert('and nothing is flown — no approach, still on the arrival, the landing runway unchanged',
      !a.appr && a.nav === 'route' && a.rwy === rwy0,
      JSON.stringify({appr: a.appr, nav: a.nav, rwy: a.rwy}));
    assert('the clearance is never read back',
      feedText().indexOf('cleared ILS runway one seven approach') < 0);
    const ref = D.sim.feed.filter(e => /and there is none/.test(String(e.html)))[0];
    assert('the refusal is a flag tagged turnon, naming the cycle, the localizer it has and why there is no ILS',
      ref && ref.kind === 'flag' && ref.item === 'turnon'
      && /CIFP 260903/.test(ref.html) && /localizer L17 and nothing else/.test(ref.html)
      && /I-TJZ has no glide slope/.test(ref.html),
      ref && String(ref.html).replace(/<[^>]+>/g, ''));
    globalThis.ddRate(1);
    for (let i = 0; i < 5; i++) tickFn();
    assert('and it keeps flying the arrival rather than turning on',
      !a.appr && a.nav === 'route', a.nav);

    a = fresh();
    say('DAL589 cleared ILS runway one seven approach');
    assert('the spoken runway is refused the same way', !a.appr && a.nav === 'route'
      && feedText().indexOf('unable, no ILS to runway one seven') >= 0);

    a = fresh();
    say('DAL589 cleared ILS runway 4 approach');
    assert('an ILS to 4 is refused and says what 4 does have',
      !a.appr && feedText().indexOf('unable, no ILS to runway four') >= 0
      && feedText().indexOf('localizer L04 and RNAV (GPS) R04') >= 0, feedText().slice(0, 400));

    a = fresh();
    say('DAL589 cleared RNAV runway 17 approach');
    assert('an RNAV approach to 17 is refused and not flown',
      !a.appr && a.nav === 'route' && feedText().indexOf('unable, no RNAV approach to runway one seven') >= 0,
      feedText().slice(0, 300));

    /* An approach already cleared stands when a refused one follows. */
    a = fresh();
    say('DAL589 cleared ILS runway 12L approach');
    say('DAL589 cleared ILS runway 17 approach');
    assert('a refused clearance leaves the one it already had',
      a.appr && a.appr.rwy === '12L' && a.appr.kind === 'ILS' && a.rwy === '12L', JSON.stringify(a.appr));

    /* ACCEPTED: what the runway publishes is read back and flown. */
    a = fresh();
    say('DAL589 cleared ILS runway 12L approach');
    mustContain('an ILS to 12L is read back', 'cleared ILS runway one two left approach, DAL589');
    assert('and flown — cleared, off the arrival, landing 12L',
      a.appr && a.appr.rwy === '12L' && a.appr.kind === 'ILS' && a.nav === 'heading' && a.rwy === '12L',
      JSON.stringify(a.appr));

    a = fresh();
    say('DAL589 cleared RNAV runway 35 approach');
    assert('an RNAV approach to 35 is accepted and flown',
      a.appr && a.appr.rwy === '35' && a.appr.kind === 'RNAV' && a.nav === 'heading'
      && feedText().indexOf('unable') < 0, JSON.stringify(a.appr));

    a = fresh();
    say('DAL589 cleared localizer runway 17 approach');
    assert('a localizer approach to 17 is accepted and flown on I-TJZ\'s course',
      a.appr && a.appr.rwy === '17' && a.appr.kind === 'localizer' && a.nav === 'heading'
      && feedText().indexOf('course 169.5') >= 0 && feedText().indexOf('unable') < 0,
      JSON.stringify(a.appr));

    /* A visual to every runway MSP has, runway 4 included — until 2026-10-14
       that one was refused as "no final approach course carried". */
    const visualMiss = globalThis.DD.runwaysAt('KMSP').filter(r => {
      const v = fresh();
      say('DAL589 cleared visual approach runway ' + r);
      return !(v.appr && v.appr.rwy === r && v.appr.kind === 'visual' && v.nav === 'heading'
        && feedText().indexOf('unable') < 0 && feedText().indexOf('no final approach course carried') < 0);
    });
    assert('a visual is accepted and flown to all eight MSP runways',
      globalThis.DD.runwaysAt('KMSP').length === 8 && visualMiss.length === 0, visualMiss.join(','));
    globalThis.ddRate(0);
    globalThis.DD.setFlow('12');
  }

  /* ============ 4c. Scripted landline events — issue #25 ============
     Every catalogue entry is a paragraph of M98 7110.26A Chapter 3, and the
     distinction the catalogue exists to teach is 3-2's own: a P-ACP is look
     and go and owes nothing back, a standard point-out is a request. Nothing
     here is graded against a standing item, and that is asserted rather than
     assumed — none of M98's five covers landline work (invariant 4). */
  {
    const B = globalThis.ddb;
    assert('every landline entry carries the paragraph it comes from and why it matters',
      B.LANDLINE.length >= 5
      && B.LANDLINE.every(L => /SOP 3-/.test(L.src) && L.why && L.why.length > 40 && L.label),
      B.LANDLINE.filter(L => !/SOP 3-/.test(L.src)).map(L => L.id).join(','));
    assert('a P-ACP and a standard point-out are different kinds, because 3-2 makes them different',
      B.landlineById('pacp-feeder').kind === 'pacp'
      && B.landlineById('pointout').kind === 'pointout');
    assert('and each names the positions that may originate it',
      B.landlineById('pacp-dep').from.join(',') === 'D,R,L'
      && B.landlineById('pacp-sat').from.join(',') === 'E,G,K'
      && B.landlineById('pacp-feeder').from.join(',') === 'I,H',
      B.landlineById('pacp-dep').from.join(','));

    /* The one case 3-2 gates on a configuration is gated here too. */
    assert('the Area F P-ACP is offered on a 30-17 and nowhere else',
      B.landlineFor('30-17').some(L => L.id === 'pacp-arr-areaf')
      && !B.landlineFor('12').some(L => L.id === 'pacp-arr-areaf'),
      B.landlineFor('12').map(L => L.id).join(','));

    /* Validation refuses what the order does not authorise. */
    const evDrill = (ev, cfg) => B.validate({ name:'ll', cfg:cfg||'12',
      ac:[{cs:'DAL1', type:'B738', gate:'NITZR', route:routeOn('NITZR'), dtg:12, alt:9000,
           ias:250, mode:'published', ckdIn:true}], events:[ev] });
    let ev = evDrill({at:60, id:'pacp-arr-areaf', from:'N', cs:'DAL1'}, '12');
    assert('the Area F P-ACP is refused in a configuration 3-2 does not name',
      ev.errors.join(' ').indexOf('authorized on 30-17 only') >= 0, ev.errors.join(' | '));
    ev = evDrill({at:60, id:'pacp-feeder', from:'D', cs:'DAL1'});
    assert('a position that does not originate an entry is refused, and the paragraph is named',
      ev.errors.join(' ').indexOf('not a position that originates') >= 0
      && ev.errors.join(' ').indexOf('SOP 3-2') >= 0, ev.errors.join(' | '));
    ev = evDrill({at:60, id:'nonesuch', from:'D', cs:'DAL1'});
    assert('an entry that is not in the catalogue is refused',
      ev.errors.join(' ').indexOf('not in the landline catalogue') >= 0, ev.errors.join(' | '));
    ev = evDrill({at:60, id:'pointout', from:'R', cs:'ZZZ9'});
    assert('a call about an aircraft that is not in the drill warns rather than blocks',
      ev.errors.length === 0 && ev.warnings.join(' ').indexOf('nothing on the scope to look at') >= 0,
      ev.warnings.join(' | '));

    /* Fly one. A standard point-out rings, is answered, and the clock is kept
       apart from the aircraft response-time median. */
    const llDrill = { id:'u-ll', name:'landline', cfg:'12', wind:'150/9', ceil:5000, vis:10,
      atis:'J', altim:'2980', seat:B.seatLabel(), towers:'satellite towers open', open:'',
      brief:'', focus:'free', seed:null, rate:1, hot:false,
      speci:{on:false, at:180, ceil:1800, vis:3, wind:'150/12', cfg:''},
      events:[{at:2, id:'pointout', from:'R', cs:'DAL1'}],
      ac:[{cs:'DAL1', type:'B738', gate:'NITZR', route:routeOn('NITZR'), dtg:12, alt:9000,
           ias:250, mode:'published', ckdIn:true, altim:true}] };
    assert('a drill with a landline event validates', B.validate(llDrill).errors.length === 0,
      B.validate(llDrill).errors.join(' | '));
    B.publish(llDrill);
    assert('the events ride on the scenario too, so a pasted entry is a whole drill',
      (globalThis.DD.SCENARIOS.filter(x => x.id === 'u-ll')[0].events || []).length === 1);

    B.runDrill(llDrill);
    globalThis.ddRate(1);
    for (let i = 0; i < 4; i++) tickFn();
    assert('the point-out rings and says who is calling and about what',
      feedText().indexOf('point out, DAL1') >= 0, feedText().slice(-300));
    assert('and it says an answer is owed', feedText().indexOf('They are waiting on you') >= 0);
    const openCall = B.landlineOpen();
    assert('the call is open until it is answered', !!openCall && openCall.answered === false,
      JSON.stringify(openCall));

    for (let i = 0; i < 3; i++) tickFn();
    say('approved');
    assert('answering closes it', B.landlineOpen().answered === true);
    mustContain('the other controller acknowledges', 'thank you');
    mustContain('and the answer is timed', 'Landline answered in');
    mustContain('and the tool says the content is not graded', 'Content is not graded');
    assert('the lag is recorded under its own kind, not as an aircraft acknowledgement',
      B.timing.events.some(e => e.kind === 'landline')
      && B.timing.events.filter(e => e.kind === 'landline').every(e => e.lag >= 0),
      B.timing.events.map(e => e.kind).join(','));

    /* INVARIANT 4, ASSERTED: no landline line is tagged to a standing item. */
    assert('no landline log call is tagged to a standing item',
      globalThis.DD.sim.feed.filter(e => /landline|point out|LANDLINE/i.test(String(e.html)))
        .every(e => !e.item),
      globalThis.DD.sim.feed.filter(e => /landline/i.test(String(e.html)) && e.item)
        .map(e => e.item).join(','));

    /* A P-ACP is look and go: it rings, it is in the scan, nothing is owed. */
    const pacpDrill = JSON.parse(JSON.stringify(llDrill));
    pacpDrill.id = 'u-ll2';
    pacpDrill.events = [{at:2, id:'pacp-feeder', from:'I', cs:'DAL1'}];
    B.publish(pacpDrill); B.runDrill(pacpDrill);
    globalThis.ddRate(1);
    for (let i = 0; i < 4; i++) tickFn();
    assert('a P-ACP owes nothing back and the tool says so',
      B.landlineOpen().answered === true
      && feedText().indexOf('Nothing is owed back') >= 0, feedText().slice(-260));
    mustContain('and it still lands in the scan', 'in your scan');
  }

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
