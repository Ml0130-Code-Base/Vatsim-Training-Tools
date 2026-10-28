#!/usr/bin/env node
/* Headless smoke test for sdf-drill-deck.html.
   Covers the deck (data spine), the builder + notebook, the published procedures
   block, the flight-strips block, the route-draw block, the D-ATIS block, the fly
   block and the drill builder.
   Usage: node smoke-test.mjs [path-to-html]   (default: sdf-drill-deck.html)
   Exits nonzero on any exception or failed assertion.

   NO NODE ON THE OWNER'S MACHINE (root CLAUDE.md section 12). Run it in the browser
   with smoke-test-browser.html in this folder: serve the folder over HTTP, open the
   page, press run. A check that passes there is the same check. */
import fs from 'node:fs';

const path = process.argv[2] || 'sdf-drill-deck.html';
const html = fs.readFileSync(path, 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
/* every script in the page is an extension block, in dependency order:
   deck, builder + notebook, published procedures, flight strips, route draw, D-ATIS, fly block, drill builder.
   THIS COUNT IS A GUARD, NOT A FORMALITY: update it in the same commit that adds a block. */
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

  const N = globalThis.SDF;
  assert('deck exports window.SDF', !!N);
  assert('builder exports window.sdfb', !!globalThis.sdfb);
  assert('strip block exports window.strip', !!globalThis.strip);
  const B = globalThis.sdfb;

  /* ============ 1. Positions ============ */
  const keys = N.POS_ORDER;
  const tower = keys.filter(k => N.POS[k].kind !== 'child' && N.POS[k].kind !== 'other');
  assert('12 SOP positions are present', tower.length === 12, 'got ' + tower.length);
  assert('every position key is unique', new Set(keys).size === keys.length);
  assert('every vNAS callsign is unique', new Set(keys.map(k => N.POS[k].cs)).size === keys.length);
  assert('every SOP frequency is in the 118-137 band',
    keys.every(k => N.POS[k].f == null || (parseFloat(N.POS[k].f) >= 118 && parseFloat(N.POS[k].f) <= 137)));
  assert('every vNAS frequency is in the 118-137 band',
    keys.every(k => N.POS[k].vf == null || (parseFloat(N.POS[k].vf) >= 118 && parseFloat(N.POS[k].vf) <= 137)));
  assert('every frequency carries a source: SOP, vNAS, or both',
    keys.every(k => N.POS[k].f != null || N.POS[k].vf != null));
  /* No two seats of the same facility share a SOP frequency, except where the order itself does. */
  const sopFreqs = tower.map(k => N.POS[k].f).filter(Boolean);
  assert('SOP frequencies are unique within the facility', new Set(sopFreqs).size === sopFreqs.length);

  /* The consolidation hierarchy: every edge agrees with the vNAS TCP parent, there is no cycle,
     and every chain ends. */
  for (const k of keys) {
    const p = N.POS[k];
    if (p.into) {
      assert('into target exists: ' + k + ' -> ' + p.into, !!N.POS[p.into]);
      assert('into agrees with the vNAS TCP parent: ' + k, p.parent && N.POS[p.into].tcp.slice(-1) === p.parent);
    }
    const chain = N.chainOf(k);
    assert('chain ends without a cycle: ' + k, chain.length <= keys.length && !chain.slice(0, -1).includes(chain[chain.length - 1]));
  }
  /* ownerOf and answerFor never return a position that is closed, and never loop. */
  const none = {};
  for (const k of keys) assert('with nobody open ' + k + ' resolves to nobody', N.ownerOf(k, none) === null);
  const all = {}; keys.forEach(k => { all[k] = true; });
  for (const k of keys) assert('with everybody open ' + k + ' is its own owner', N.ownerOf(k, all) === k);
  const a0 = N.answerFor(tower.find(k => N.POS[k].kind === 'radar'), none);
  assert('a closed radar chain says it leaves the TRACON and names no fall-back', a0.kind === 'center' && !a0.key);

  /* The two sources are told apart: truncation is not a disagreement. */
  assert('freqStatus: a channel the SOP truncates is not a conflict',
    N.freqStatus({f:'128.17', vf:'128.175'}) === 'truncated');
  assert('freqStatus: a real mismatch is a conflict', N.freqStatus({f:'127.17', vf:'120.400'}) === 'conflict');
  assert('freqStatus: equal channels agree', N.freqStatus({f:'124.95', vf:'124.950'}) === 'agree');
  assert('idStatus: a matching sector letter agrees', N.idStatus({sid:'E', tcp:'1E'}) === 'agree');
  assert('idStatus: a different sector letter is a conflict', N.idStatus({sid:'T', tcp:'1X'}) === 'conflict');

  /* ============ 2. Spoken forms ============ */
  assert('a frequency is spoken digit by digit with "point"', N.spokenFreq('128.175') === 'one two eight point one seven five');
  assert('a trailing zero is kept: 121.10', N.fmtFreq('121.100') === '121.10' && N.spokenFreq('121.100') === 'one two one point one zero');
  assert('a runway is spoken without a leading zero', N.spokenRwy('5L') === 'five left' && N.spokenRwy('32') === 'three two');
  assert('center is spoken', N.spokenRwy('36C') === 'three six center');

  /* ============ 3. Runways from CIFP, never invented ============ */
  const prim = N.primary();
  assert('the primary field carries a runway inventory', prim.rwys && prim.rwys.length > 0);
  assert('every runway has a length, width, bearing', prim.rwys.every(r => r.len > 1000 && r.w >= 75 && r.brg >= 0 && r.brg <= 360));
  assert('a field with no CIFP runway record is null, not guessed',
    N.FIELD_ORDER.filter(f => !N.FIELDS[f].rwys).every(f => N.runwaysAt(f) === null));
  assert('every field records its source', N.FIELD_ORDER.every(f => !!N.FIELDS[f].src));
  /* Wind arithmetic: a wind straight down a runway is all headwind and no crosswind. */
  const r0 = prim.rwys[0], w0 = N.windComponents(r0.brg, r0.brg, 20);
  assert('wind straight down the runway is a pure headwind', w0.head === 20 && w0.cross === 0);
  const w1 = N.windComponents(r0.brg, (r0.brg + 90) % 360, 10);
  assert('a wind 90 degrees off is a pure crosswind', w1.head === 0 && w1.cross === 10 && w1.side === 'right');
  const w2 = N.windComponents(r0.brg, (r0.brg + 180) % 360, 10);
  assert('a wind from behind is a tailwind', w2.head === -10);
  assert('configsByWind orders but does not choose',
    N.configsByWind(r0.brg, 15).length === N.CONFIGS.length);
  assert('every configuration names runways that exist at the primary field',
    N.CONFIGS.every(c => (c.land || []).concat(c.dep || []).every(r => !!N.runway(prim.icao, r))), 'a configuration names a runway CIFP does not have');

  /* ============ 4. Honesty guards ============ */
  assert('STANDING is empty - no SDF OJT session has been flown', N.STANDING.length === 0);
  assert('PRIOR is empty - no SDF drill is on record', B.PRIOR.length === 0);
  assert('the ledger is empty and single-tier', B.hist().length === 0);
  assert('no SECTOR geometry is carried: no per-sector shape, split or flow boundary on the namespace',
    !('BOUNDARY' in N) && !('POLYGON' in N) && !('SECTORS_GEO' in N) && !('SPLITS' in N) && !('FLOWS_GEO' in N));
  assert('sector and flow boundaries are recorded as empty, not hidden', N.slotState('boundaries') === 'empty' && N.slotState('flowairspace') === 'empty');
  assert('the lateral outline is recorded as partial, never verified', N.slotState('footprint') === 'partial');
  /* ---- the SimAware lateral footprint ---- */
  const FP = N.FOOTPRINT;
  assert('the footprint is one ring of at least three [lat, lon] vertices, closing vertex dropped',
    FP.rings.length === 1 && FP.rings[0].length === FP.vertices && FP.vertices >= 3
    && JSON.stringify(FP.rings[0][0]) !== JSON.stringify(FP.rings[0][FP.vertices - 1]));
  assert('the footprint is LATERAL ONLY: no altitude, ceiling, floor or stratum property',
    ['alt','altitude','altitudes','ceiling','floor','strata','stratum','lid'].every(k => !(k in FP)));
  assert('every vertex is inside the ZID region and inside its own bounding box',
    FP.rings[0].every(p => p[0] > 36 && p[0] < 42 && p[1] > -90 && p[1] < -82
      && p[0] <= FP.bbox.n && p[0] >= FP.bbox.s && p[1] <= FP.bbox.e && p[1] >= FP.bbox.w));
  assert('the area is the size of a TRACON, not a sliver', FP.areaSqNm > 2000 && FP.areaSqNm < 12000, String(FP.areaSqNm));
  assert('the provenance is pinned and the licence position is stated',
    /cf9feb3/.test(FP.src) && /0ff2b54/.test(FP.src) && /no licence/i.test(FP.licence) && /two miles/.test(FP.tolerance) && /Below the SOP/.test(FP.rank));
  assert('the primary field is inside the outline and well clear of the edge',
    N.inFootprint(prim.ll[0], prim.ll[1]) === true && N.edgeNm(prim.ll[0], prim.ll[1]) > 10);
  assert('a point in Chicago is outside', N.inFootprint(41.98, -87.9) === false);
  assert('a point in Memphis is outside', N.inFootprint(35.04, -89.98) === false);
  assert('every field with a CIFP coordinate is tested, and every one is inside', N.containment().length === N.FIELD_ORDER.filter(f => N.FIELDS[f].ll).length && N.containment().every(c => c.inside === true));
  assert('a field with no coordinate is not tested and is not guessed', N.FIELD_ORDER.filter(f => !N.FIELDS[f].ll).every(f => !N.containment().some(c => c.icao === f)));
  assert('marginal means inside the two-mile tolerance of the edge', N.containment().every(c => c.marginal === (c.edgeNm < N.FP_TOL_NM)));
  assert('every slot has a state and a source',
    N.SLOTS.every(s => ['verified','partial','empty'].includes(s.state) && !!s.src));
  assert('slot ids are unique', new Set(N.SLOTS.map(s => s.id)).size === N.SLOTS.length);
  assert('every open question carries its reason', N.OPENQ.length > 0 && N.OPENQ.every(q => !!q.q && !!q.why));
  assert('every conflict carries both sides', N.CONFLICTS.every(c => !!c.a && !!c.b && !!c.title));
  assert('every unread picture names where it lives', N.UNREAD.length > 0 && N.UNREAD.every(g => g.what && g.where));
  assert('every table and rule cites its source',
    N.TABLES.concat(N.RULES).every(x => typeof x.src === 'string' && x.src.length > 0));
  assert('every table row has as many cells as columns', N.TABLES.every(t => t.rows.every(r => r.length === t.cols.length)));
  assert('table and rule ids are unique', new Set(N.TABLES.concat(N.RULES).map(x => x.id)).size === N.TABLES.length + N.RULES.length);
  assert('every reference group has content',
    N.GROUPS.every(g => N.TABLES.concat(N.RULES).some(x => x.g === g.id)));
  assert('every table and rule belongs to a declared group',
    N.TABLES.concat(N.RULES).every(x => N.GROUPS.some(g => g.id === x.g)));
  assert('the note rail anchors every table and every slot',
    N.tableHtml(N.TABLES[0]).indexOf('data-note="ref.' + N.TABLES[0].id + '"') >= 0);
  assert('no literal closing script tag in the data', JSON.stringify([N.TABLES, N.RULES, N.POS]).indexOf('</script') < 0);
  assert('the storage key carries no status word', !/skeleton|draft|test|beta/i.test(B.KEY) && B.KEY === 'sdf-drill-deck-v1');
  assert('the page switcher is named for the tool', typeof globalThis['sdfPage'] === 'function');
  assert('three pages', B.PAGES.length === 3 && B.PAGES.map(p => p.id).join() === 'setup,fly,notes');

  /* ============ 5. The vNAS second source ============ */
  const V = N.VNAS;
  assert('the vNAS record is stamped', /^\d{4}-\d\d-\d\dT/.test(V.asOf));
  assert('the ZID NAS ID is I', V.nasId === 'I');
  assert('the ZAU NAS ID is G', V.artccNas.ZAU === 'G');
  assert('the Field E format is OneLetterAndSubset', V.fieldE && V.fieldE.format === 'OneLetterAndSubset' && /^[A-Z]$/.test(V.fieldE.char));
  assert('handoff numbers are unique', new Set(Object.values(V.handoffNumbers)).size === Object.keys(V.handoffNumbers).length);
  assert('every restriction names an owner and a requester', V.restrictions.every(r => r.owner && r.requester));
  assert('every scratchpad rule has a pattern and a template', V.scratchpadRules.every(r => r.pattern && r.template));
  assert('the C collision is stated and is inert unless ZOB is a neighbour',
    V.neighbors.includes('ZOB') || /inert/.test(V.cCollision));
  assert('a bare sector letter inside the TRACON', N.idIntra(tower.find(k => N.POS[k].tcp)) === N.POS[tower.find(k => N.POS[k].tcp)].tcp.slice(1));
  assert('a ZID sector is C plus two digits', N.idZid('34') === 'C34' && N.idZid('4') === null);
  assert('a non-host ARTCC is its NAS ID plus two digits', N.idArtcc('G', '35') === 'G35');
  assert('the delta is the delta', N.DELTA === 'Δ');
  assert('outbound handoffs are derived from the record and name ZID', N.outboundHandoffs().some(o => o.to === 'ZID'));
  assert('every ZID sector this deck names exists in the record with a frequency',
    V.zidSectors.length > 0 && V.zidSectors.every(s => s.name && /^\d{3}\.\d{3}$/.test(s.freq)));

  /* ============ 6. Published procedures (CIFP 261001) ============ */
  const P = N;
  assert('the CIFP cycle is stamped', P.CIFP_CYCLE === '261001');
  assert('PFIX, STARS and SIDS are keyed by airport', typeof P.STARS === 'object' && typeof P.SIDS === 'object');
  let legs = 0, named = 0;
  for (const tbl of [P.STARS, P.SIDS]) {
    for (const apt of Object.keys(tbl)) {
      for (const id of Object.keys(tbl[apt])) {
        const p = tbl[apt][id];
        for (const seg of [p.common, ...Object.values(p.trans || {}), ...Object.values(p.rwy || {})]) {
          for (const g of (seg || [])) {
            legs++;
            if (g.f) { named++; if (!P.fixLL(g.f)) fail('unresolved fix', apt + ' ' + id + ' ' + g.f); }
            if (g.vec && g.f) fail('vector leg carries a fix', apt + ' ' + id + ' ' + g.f);
            if (g.at != null && (g.at < 0 || g.at > 60000)) fail('altitude out of range', apt + ' ' + id + ' ' + g.f);
          }
        }
      }
    }
  }
  assert('every named fix resolves to coordinates', legs > 0 && named > 0);
  assert('every coordinate is in the ZID region', Object.values(P.PFIX).every(c => c[0] > 33 && c[0] < 43 && c[1] < -78 && c[1] > -92), 'a fix is outside Indiana, Kentucky and Ohio');
  const sp = P.stripProcs('STAR'), sd = P.stripProcs('SID');
  assert('every arrival is marked flown by the fly block, and each declares its track', Object.values(sp).every(v => v.flies === true && v.track === true && v.serves.length > 0));
  assert('every departure is marked flown by the fly block, and each declares its track', Object.values(sd).every(v => v.flies === true && v.track === true && v.from.length > 0));
  assert('every field a procedure serves is a field this facility works',
    Object.values(sp).every(v => v.serves.every(a => !!N.FIELDS[a])) && Object.values(sd).every(v => v.from.every(a => !!N.FIELDS[a])));

  /* ============ 7. The strip contract ============ */
  const F = globalThis.STRIP_FACILITY;
  assert('the strip contract names this facility', F.id === 'SDF' && F.prefix === 'sdfst');
  assert('the strip airports are exactly the fields this facility works',
    Object.keys(F.airports).join() === N.FIELD_ORDER.join());
  assert('a field with no runway list is null in the contract', N.FIELD_ORDER.every(f => (F.airports[f].rwys === null) === (N.FIELDS[f].rwys === null)));
  assert('a stored strip is checked: a foreign field is refused by name',
    globalThis.strip.checkStrip({role:'arrival', cs:'X1', dest:'KORD', gate:''}, 'x').some(e => /does not work/.test(e)));
  /* The ceiling on a drill (owner, 2026-10-27): the master block holds it, the deck's add and drop call it. */
  {
    const add = globalThis[F.prefix + 'Add'], drop = globalThis[F.prefix + 'Drop'], at = globalThis[F.prefix + 'RowAt'];
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

  /* ============ 8. Facility-specific facts, written by hand ============ */
  /* SDF: one disagreement - Bowman Local */
  const T = id => N.TABLES.find(t => t.id === id);
  assert('exactly one value disagrees, and it is the Bowman Local STARS ID',
    N.positionConflicts().length === 1 && N.positionConflicts()[0].k === 'LOU_TWR' && N.positionConflicts()[0].what === 'STARS ID');
  assert('both Bowman values are carried: SOP U and vNAS 1Z', N.POS.LOU_TWR.sid === 'U' && N.POS.LOU_TWR.tcp === '1Z');
  assert('Bowman Local is not a seat', N.POS.LOU_TWR.seat === false);
  assert('DR2 is printed 123.67 and is 123.675', N.POS.DR2.f === '123.67' && N.POS.DR2.vf === '123.675' && N.POS.DR2.sid === 'B');
  assert('AR1 folds into DR1; LCW into LCE', N.chainOf('AR1').join() === 'AR1,DR1' && N.chainOf('LCW').join() === 'LCW,LCE');
  assert('with DR1 closed every radar seat reaches nobody', ['AR1','AR2','DR2','FR1','FR2'].every(k => N.ownerOf(k, {}) === null));
  assert('SDF runways', N.runwaysAt('KSDF').join(' ') === '11 17L 17R 29 35L 35R', N.runwaysAt('KSDF').join(' '));
  const byId = {}; prim.rwys.forEach(r => { byId[r.id] = r; });
  assert('runway 29 has a localizer only; 11 has no ILS record', /localizer only/.test(byId['29'].ils) && byId['11'].ils === '');
  assert('17R is 11887 ft with an 846 ft displaced threshold', byId['17R'].len === 11887 && byId['17R'].disp === 846);
  assert('magnetic variation is west 5 degrees', N.FAC.magvar === 'west 5.0 degrees');
  assert('12 fields are carried', N.FIELD_ORDER.length === 12);
  /* procedures */
  assert('KSDF SIDs', N.procsAt('KSDF', 'SID').join() === 'EEVAA1,GTGON1,HIDEY1,LLIZY1,LOKRD1,RDHSE1,SPILR1');
  assert('KSDF STARs', N.procsAt('KSDF', 'STAR').join() === 'DLAMP8,JMONY2,LEDDL1,MBELL5');
  assert('KLOU has three STARs and no SID', N.procsAt('KLOU', 'STAR').join() === 'JMONY2,LEDDL1,MBELL5' && N.procsAt('KLOU', 'SID').length === 0);
  assert('every procedure is RNAV', ['SID','STAR'].every(k => N.procsAt('KSDF', k).every(p => N.procOf('KSDF', p).rnav === true)));
  /* the SOP's initial-waypoint table, against CIFP: an independent second source */
  let checked = 0;
  for (const row of T('lc.initial').rows) {
    const rw = 'RW' + row[0].padStart(2, '0'), sidList = row[1] === 'All' ? null : row[1].split(', ');
    for (const sid of N.procsAt('KSDF', 'SID')) {
      if (sidList && sidList.indexOf(sid.replace(/\d+$/, '')) < 0) continue;
      const seg = N.procOf('KSDF', sid).rwy[rw];
      const first = seg.find(g => g.f);
      assert('CIFP agrees: ' + sid + ' off ' + row[0] + ' starts at ' + row[2], first && first.f === row[2], first && first.f);
      checked++;
    }
  }
  assert('all thirty-five runway/SID pairs were compared', checked === 35, String(checked));
  /* handoff IDs */
  assert('ERAM addresses DR1 with S1D', N.idFromZid('DR1') === 'S1D');
  assert('the SDF handoff numbers are CVG 1, LEX 2, EVV 3, HUF 4, IND 5', Object.keys(N.VNAS.handoffNumbers).sort().map(k => k + N.VNAS.handoffNumbers[k]).join() === 'CVG1,EVV3,HUF4,IND5,LEX2');
  const ob = N.outboundHandoffs();
  assert('departures reach ZID 18, 19, 21 and 17', ['C18','C19','C21','C17'].every(c => ob.some(o => o.ids.indexOf(c) >= 0)));
  assert('SDF reaches IND on delta 5', ob.some(o => o.to === 'IND' && o.ids.every(i => i.charAt(0) === 'Δ' && i.charAt(1) === '5')));
  /* tables */
  assert('the departure heading tables are three, one per flow', ['lc.heading.n','lc.heading.s','lc.heading.w'].every(id => !!T(id)));
  assert('north flow: 35R takes runway heading as the non-SID jet heading', T('lc.heading.n').rows.filter(r => r[0] === '35R').every(r => r[3] === 'RH'));
  assert('south flow: the 17L non-SID jet heading is 170 on every group', T('lc.heading.s').rows.filter(r => r[0] === '17L').every(r => r[3] === '170'));
  assert('runway 11 intersection rows are five and runway 29 five', T('lc.intx').rows.filter(r => r[0] === '11').length === 5 && T('lc.intx').rows.filter(r => r[0] === '29').length === 5);
  assert('the SOP scratchpad table is the vNAS rule set, row for row',
    T('app.scratch.rnav').rows.length === 7 && T('app.scratch.rnav').rows.every(r => N.VNAS.scratchpadRules.some(v => v.pattern === r[0] && v.template === r[1]) && N.VNAS.scratchpadRules.some(v => v.pattern === r[2] && v.template === r[3])));
  assert('the DR2 hand assignment is stated in the frequency table note', /manually assigned 123\.67/.test(T('cd.freq').note));
  assert('GTGON, HIDEY, LLIZY and RDHSE are 35L and 17R', T('gc.rwy').rows[0][0] === 'GTGON, HIDEY, LLIZY, RDHSE' && T('gc.rwy').rows[0][1] === '35L' && T('gc.rwy').rows[0][2] === '17R');
  assert('conflicts listed', N.CONFLICTS.map(c => c.id).join() === 'lou-id,gcw-label,freq-precision,dr2-freq,rdhse-lokrd,sdf-transitions');
  /* the SimAware footprint, SDF */
  assert('the SDF footprint has 24 vertices and is named by SimAware', N.FOOTPRINT.vertices === 24 && N.FOOTPRINT.id === 'SDF');
  assert('the fields within the two-mile tolerance of the edge are exactly: KBFR,KSER,KIMS', N.containment().filter(c => c.marginal).map(c => c.icao).join() === 'KBFR,KSER,KIMS', N.containment().filter(c => c.marginal).map(c => c.icao + ' ' + c.edgeNm).join());


  /* ============ 9. Route draw (block 5) ============
     The M98 "Routes drawn" layers on the lateral-footprint plot. plan() is pure, so what would be drawn is
     asserted here without a browser; the SVG itself is checked by driving the page. */
  const RD = N.routeDraw;
  assert('the route-draw block exports routeDraw on the deck namespace', !!RD && typeof RD.plan === 'function' && typeof RD.set === 'function');
  assert('the layer modes are the M98 ones, by id and in order', RD.LAYER_MODES.map(m => m.id).join() === 'tracked,stars,sids,both,off');
  assert('the default mode is tracked, and its label does not claim traffic this deck does not have', RD.layers() === 'tracked' && !/traffic/i.test(RD.LAYER_MODES[0].label));
  assert('the contract names this facility, and the layer function exists', RD.FACILITY.id === 'SDF' && RD.prefix === 'sdfrd' && typeof globalThis['sdfrdLayers'] === 'function');
  assert('the deck exposes its plot projection and the viewer exposes its selection', typeof N.fpProject === 'function' && typeof N.fpFrame === 'function' && typeof N.openProc === 'function');
  const fr = N.fpFrame();
  assert('the projection puts every footprint vertex inside its own plot',
    N.FOOTPRINT.rings[0].every(v => { const q = N.fpProject(v[0], v[1]); return q[0] >= 0 && q[0] <= fr.W && q[1] >= 0 && q[1] <= fr.H; }));
  /* the harness never renders the procedures viewer (no DOM to mount into), so open it the way a click does: through the pick function the route-draw block wraps */
  globalThis['sdfpPick']('kind', 'STAR');
  assert('the viewer has a procedure open once it is asked for a STAR', !!N.openProc().proc && N.openProc().kind === 'STAR');
  const pOff = RD.plan('off'), pStars = RD.plan('stars'), pSids = RD.plan('sids'), pBoth = RD.plan('both'), pTr = RD.plan('tracked');
  assert('off draws nothing at all, the open procedure included', pOff.stars.length === 0 && pOff.sids.length === 0 && pOff.open === null);
  assert('all STARs draws STARs and no SID', pStars.stars.length > 0 && pStars.sids.length === 0);
  assert('all SIDs draws SIDs and no STAR', pSids.sids.length > 0 && pSids.stars.length === 0);
  assert('both draws exactly the two sets', pBoth.stars.length === pStars.stars.length && pBoth.sids.length === pSids.sids.length);
  assert('tracked draws no list, only the open procedure', pTr.stars.length === 0 && pTr.sids.length === 0 && !!pTr.open);
  assert('the open procedure is drawn in every mode but off, as M98 never hides the track under what you are working', [pStars, pSids, pBoth].every(x => !!x.open));
  const runsOf = pl => [].concat(pl.stars, pl.sids).reduce((a, t) => a.concat(t.runs), []);
  const allRuns = runsOf(pBoth);
  assert('every drawn run has two or more points, each in the ZID region',
    allRuns.length > 0 && allRuns.every(r => r.length >= 2 && r.every(c => c[0] > 33 && c[0] < 43 && c[1] < -78 && c[1] > -92)));
  assert('every drawn point is a fix in the procedure table, at that table\'s own coordinates',
    allRuns.every(r => r.every(c => N.PFIX[c[2]] && N.PFIX[c[2]][0] === c[0] && N.PFIX[c[2]][1] === c[1])));
  const keyOf = t => t.kind + '|' + t.id + '|' + t.runs.map(r => r.map(c => c[2]).join('>')).join('/');
  const keys9 = pBoth.stars.concat(pBoth.sids).map(keyOf);
  assert('no two tracks are the same run of fixes (a procedure at several fields is drawn once)', new Set(keys9).size === keys9.length);
  const op = N.openProc(), legs9 = N.trackTo(op.apt, op.proc, op.entry, op.rwy).filter(g => g.f && !g.vec && N.PFIX[g.f]).map(g => g.f).filter((f, i, a) => i === 0 || f !== a[i - 1]);
  assert('the open track is the viewer\'s own track, in order, and no fix is added to it', pTr.open.runs.reduce((a, r) => a.concat(r.map(c => c[2])), []).join() === legs9.join());
  assert('the open track is of the kind the viewer has open', pTr.open.kind === op.kind && pTr.open.id === op.proc && pTr.open.apt === op.apt);
  RD.set('off');
  assert('setting a mode takes effect, and a mode that does not exist is ignored', RD.layers() === 'off' && (RD.set('nonsense'), RD.layers() === 'off'));
  RD.set('tracked');
  assert('the default is restored', RD.layers() === 'tracked');

  /* ============ 10. D-ATIS, the frame API and routes trimmed to the flow (block 6) ============
     Fixtures are the live FAA D-ATIS broadcasts pulled from atis.info on 2026-10-20, verbatim. The
     parser's failure mode is a confident wrong answer, so the only reliable test material is a live
     pull. Every vATIS preset the deck carries is read too, and must read back as the runways it names. */
  const DA = N.datis;
  assert('the D-ATIS block exports datis on the deck namespace', !!DA && typeof DA.read === 'function' && typeof DA.match === 'function');
  assert('the D-ATIS contract names this facility and its one field', DA.FACILITY.id === 'SDF' && DA.FIELDS.length === 1 && DA.FIELDS[0].id === N.FAC.primary && DA.FIELDS[0].datis === true);
  const live10 = 'SDF ATIS INFO G 0956Z. 00000KT 10SM SCT200 09/06 A3034 (THREE ZERO THREE FOUR) RMK AO2 SLP273 T00890061. VISUAL APCH RWY 17L AND 17R. SIMUL APCHS IN USE. NSE SENSI RWY 17R ARRS AVBL ONLY FOR OPR NCT. SIMUL DEPARTURES IN USE. NOTICE TO AIRMEN. TWY K CLSD, TWY N CLSD BTN TWY, L AND TWY K, TWY F CLSD BTN TWY, C AND TWY F3, TWY B CLSD BTN RWY, 29 AND TWY B5, TWY B6 CLSD BTN RWY, 35L AND TWY C, TWY D BTWN APCH END RWY 17L AND TWY D7 CLSD. TWY A6 NONMOVEMENT AREA. TWY D CLOSED NORTH OF TWY D7, RWY 17L DEPARTURES EXPECT INTERSECTION D7, DISTANCE AVAILABLE 7700 FEET. BACK TAXI AVAILABLE UPON REQUEST. ...ADVS YOU HAVE INFO G.';
  const rd = DA.read(live10), mt = DA.match(rd, N.CONFIGS);
  assert('the live broadcast reads the runways in use', JSON.stringify(rd.land) === JSON.stringify(['17L','17R']) && JSON.stringify(rd.dep) === JSON.stringify([]), JSON.stringify([rd.land, rd.dep]));
  assert('the live broadcast reads the information letter', rd.info === 'G');
  assert('exactly one configuration fits, and it is the right one', mt.kind === 'one' && mt.configs[0].id === '17', mt.kind + ' ' + mt.configs.map(c => c.id));
  assert('closed runways are shown and never reach the flow', rd.closed.every(r => rd.land.indexOf(r) < 0 && rd.dep.indexOf(r) < 0));
  const eq10 = (a, b) => a.slice().sort().join() === b.slice().sort().join();
  const vf = (N.VATIS && N.VATIS.flows) || [];
  assert('the deck carries vATIS presets to test against', vf.length > 0);
  for (const fl of vf) {
    const o = DA.read(fl.text), L = (fl.land || '').split(/\s+/).filter(Boolean), D = (fl.dep || '').split(/\s+/).filter(Boolean);
    assert('vATIS ' + fl.station + ' ' + fl.preset + ' reads back as the runways it names',
      (fl.land ? eq10(L, o.land) : o.land.length === 0) && (fl.dep ? eq10(D, o.dep) : o.dep.length === 0), JSON.stringify([fl.land, fl.dep, o.land, o.dep]));
  }
  assert('an empty box reads as nothing and a broadcast with no runway matches nothing', DA.read('') === null && DA.match(DA.read('WIND CALM'), N.CONFIGS).kind === 'nothing');
  assert('a runway no configuration lands matches none, and none is applied', DA.match({land:['1'], dep:[]}, N.CONFIGS).kind === 'none');
  assert('what the broadcast settled: a calm wind sets zero, a configuration only when exactly one fits',
    DA.settled({wind:'calm', cat:'VFR', ceil:12000, vis:10}, {kind:'one', configs:[N.CONFIGS[0]]}).config === N.CONFIGS[0].id
    && DA.settled({wind:'calm', cat:'VFR', ceil:12000, vis:10}, {kind:'many', configs:N.CONFIGS}).config === undefined
    && DA.settled({wind:'VRB/3', cat:'VFR', ceil:12000, vis:10}, {kind:'none', configs:[]}).wdir === undefined);

  /* the builder's frame API */
  const BL = globalThis['sdfb'];
  let seen10 = 0; BL.onFrame(() => { seen10++; });
  const cfgIds = N.CONFIGS.map(c => c.id);
  BL.setFrame({config:cfgIds[1], wdir:270, wkt:12, cat:'IFR'});
  assert('setFrame sets the configuration, wind and category, and tells whoever follows the frame',
    BL.config().id === cfgIds[1] && BL.state().wdir === '270' && BL.state().wkt === '12' && BL.state().cat === 'IFR' && seen10 === 1);
  BL.setFrame({config:'no-such-configuration', cat:'NOPE'});
  assert('setFrame refuses an unknown configuration and an unknown category', BL.config().id === cfgIds[1] && BL.state().cat === 'IFR');

  /* routes trimmed to the flow */
  const prim10 = N.FAC.primary, num10 = k => parseInt(String(k).replace(/\D/g, ''), 10), let10 = k => (/[LRCB]$/.exec(String(k)) || [''])[0];
  const fits10 = (key, list) => list.some(r => num10(r) === num10(key) && (let10(key) === 'B' || !let10(key) || !let10(r) || let10(key) === let10(r)));
  for (const c of N.CONFIGS) {
    BL.setFrame({config:c.id});
    const pl = N.routeDraw.plan('both');
    assert(c.id + ': the plan follows the builder\'s configuration', !!pl.flow && pl.flow.name === c.name && pl.flow.airport === prim10);
    const own = (list, kind) => list.filter(t => t.apt === prim10 && /^rwy:/.test(t.part));
    const okS = own(pl.stars, 'STAR').every(t => fits10(t.part.slice(4), c.land)), okD = own(pl.sids, 'SID').every(t => fits10(t.part.slice(4), c.dep));
    assert(c.id + ': every runway transition drawn at ' + prim10 + ' serves a runway the configuration lands (STAR) or departs (SID)', okS && okD);
    assert(c.id + ': trimming removed something', pl.trimmed.segs + pl.trimmed.procs > 0, JSON.stringify(pl.trimmed));
  }
  BL.setFrame({config:cfgIds[0]});
  const tOn = N.routeDraw.plan('both'); N.routeDraw.setTrim(false); const tOff = N.routeDraw.plan('both');
  assert('turning the trim off draws every runway transition, and more than the trimmed plan',
    tOff.flow === null && tOff.stars.length + tOff.sids.length > tOn.stars.length + tOn.sids.length);
  N.routeDraw.setTrim(true);
  assert('the trim is back on', N.routeDraw.trim() === true && N.routeDraw.plan('both').flow !== null);
  assert('fields other than the primary are not trimmed, and the plan says which', tOn.untrimmed.every(a => a !== prim10) && (tOn.untrimmed.length > 0 || Object.keys(N.STARS).concat(Object.keys(N.SIDS)).every(a => a === prim10)));
  BL.setFrame({config:cfgIds[0]});

  /* ============ 11. The fly block and the drill builder (blocks 7 and 8) ============
     The aircraft fly the facility's own published tracks, straight between fixes, and the only
     numbers they carry are the ones the procedures block does. These checks hold that line: no
     coordinate is added, nothing that cannot be flown is flown without saying why, the generator is
     deterministic and builds only strips the strip block accepts, and an untouched drill never flags
     a published crossing the engine itself should have met. */
  const FL = globalThis.fly, DR = globalThis.drill, ST11 = globalThis.strip, FF = globalThis.FLY_FACILITY;
  assert('the fly block exports window.fly and the drill block window.drill', !!FL && typeof FL.load === 'function' && typeof FL.transmit === 'function' && !!DR && typeof DR.generate === 'function');
  assert('the fly contract names this facility and the deck carries procedures to fly', FF.id === N.FAC.id && FL.haveProcs === true);
  assert('the drill contract names this facility and its own storage key, never the builder\'s', globalThis.DRILL_FACILITY.id === N.FAC.id && DR.KEY !== B.KEY && !/skeleton|shell|tier/i.test(DR.KEY), DR.KEY + ' / ' + B.KEY);
  assert('blocks 7 and 8 carry no network call - the D-ATIS fetch stays the only one', ![blocks[6], blocks[7]].some(b => /\bfetch\s*\(|XMLHttpRequest|WebSocket|EventSource|sendBeacon/.test(b)));
  assert('no standing item exists for the fly block to score against', N.STANDING.length === 0);

  /* every published procedure the deck carries builds a line out of its own coordinates, or is refused by name */
  let builtS = 0, builtD = 0, refused11 = 0; const bad11 = [];
  for (const apt of ST11.airportsHere()) {
    for (const kind of ['STAR', 'SID']) {
      const tab = (kind === 'SID' ? N.SIDS : N.STARS)[apt] || {};
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
          const ll = N.PFIX[p.fix], q = ll ? FL.xy(ll) : null;
          if (!q || Math.abs(q.x - p.x) > 1e-9 || Math.abs(q.y - p.y) > 1e-9) bad11.push(apt + ' ' + id + ': ' + p.fix + ' is not at the procedure table\'s own coordinate');
        }
        if (Math.abs(T.total - T.pts[T.pts.length - 1].cum) > 1e-9) bad11.push(apt + ' ' + id + ': total is not the last fix');
      }
    }
  }
  assert('every track is built from the procedure table\'s own coordinates, in order, and a refusal says why', bad11.length === 0, bad11.slice(0, 3).join('; '));
  assert('at least one STAR and one SID builds a track, so the player has something to fly', builtS > 0 && builtD > 0, builtS + ' STARs, ' + builtD + ' SIDs, ' + refused11 + ' refused');

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
  if (!N.POS[B.state().seat]) B.state().seat = N.POS_ORDER.filter(k => N.POS[k].kind === 'radar')[0];
  const pos11 = FF.positions(), me = pos11.find(p => p.self), tw = pos11.find(p => p.kind === 'twr' && p.open && !p.self);
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
    typeof DF.configs === 'function' && DF.configs().length > 0 && DF.configs().every(c => typeof c.id === 'string' && c.id && typeof c.name === 'string' && c.name)  && DF.configs().every((c, i) => c.id === N.CONFIGS[i].id));
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
  assert('no event is graded: STANDING is still empty and no event text claims a standing item', N.STANDING.length === 0 && !FL.sim.feed.some(f => /Special observation|on the landline/.test(f.html) && /standing item|graded|score/i.test(f.html)));

  /* the start positions are the player's own scope, drawn from strips that are not yet flying */
  const pvStrips = DR.generate(4, 5, 'both').strips;
  const pvAc = FL.sim.ac.length, pvFeed = FL.sim.feed.length;
  const pv = FL.preview(pvStrips);
  assert('the preview draws one target per flyable strip and names each strip it cannot draw', pv.count > 0 && pv.count + pv.skipped.length === pvStrips.length, pv.count + ' + ' + pv.skipped.length + ' of ' + pvStrips.length);
  assert('the preview is the live scope\'s own svg, relabelled, with nothing clickable in it', /<svg/.test(pv.svg) && /aria-label="Start positions"/.test(pv.svg) && !/Live scope/.test(pv.svg) && !/ onclick=/.test(pv.svg));
  assert('drawing the preview leaves the loaded drill and its feed alone', FL.sim.ac.length === pvAc && FL.sim.feed.length === pvFeed && FL.sim.events.length === 3);
  const pv0 = FL.preview([]);
  assert('with no strips there is nothing to draw and the preview says so', pv0.count === 0 && pv0.svg === '' && pv0.skipped.length === 0);

  console.log('\nSMOKE PASS — ' + checks + ' checks');
} catch (e) {
  console.error('FAIL: threw —', e && e.stack ? e.stack : e);
  process.exit(1);
}
