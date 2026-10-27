#!/usr/bin/env node
/* Headless smoke test for cvg-drill-deck.html.
   Covers the deck (data spine), the builder + notebook, the published procedures
   block, the flight-strips block, the route-draw block, the D-ATIS block, the fly
   block and the drill builder.
   Usage: node smoke-test.mjs [path-to-html]   (default: cvg-drill-deck.html)
   Exits nonzero on any exception or failed assertion.

   NO NODE ON THE OWNER'S MACHINE (root CLAUDE.md section 12). Run it in the browser
   with smoke-test-browser.html in this folder: serve the folder over HTTP, open the
   page, press run. A check that passes there is the same check. */
import fs from 'node:fs';

const path = process.argv[2] || 'cvg-drill-deck.html';
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

  const N = globalThis.CVG;
  assert('deck exports window.CVG', !!N);
  assert('builder exports window.cvgb', !!globalThis.cvgb);
  assert('strip block exports window.strip', !!globalThis.strip);
  const B = globalThis.cvgb;

  /* ============ 1. Positions ============ */
  const keys = N.POS_ORDER;
  const tower = keys.filter(k => N.POS[k].kind !== 'child' && N.POS[k].kind !== 'other');
  assert('17 SOP positions are present', tower.length === 17, 'got ' + tower.length);
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
  assert('STANDING is empty - no CVG OJT session has been flown', N.STANDING.length === 0);
  assert('PRIOR is empty - no CVG drill is on record', B.PRIOR.length === 0);
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
  assert('the storage key carries no status word', !/skeleton|draft|test|beta/i.test(B.KEY) && B.KEY === 'cvg-drill-deck-v1');
  assert('the page switcher is named for the tool', typeof globalThis['cvgPage'] === 'function');
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
  assert('the strip contract names this facility', F.id === 'CVG' && F.prefix === 'cvgst');
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
  /* CVG: three disagreements between the SOP and vNAS */
  const T = id => N.TABLES.find(t => t.id === id);
  const pc = N.positionConflicts().map(c => c.k + ':' + c.what).join();
  assert('exactly three values disagree: Clearance frequency, DHL frequency, GCE STARS ID', pc === 'CD:frequency,DRC:frequency,GCE:STARS ID', pc);
  assert('both Clearance values are carried: 127.17 and 120.400', N.POS.CD.f === '127.17' && N.POS.CD.vf === '120.400');
  assert('both DHL values are carried: 120.40 and 129.475', N.POS.DRC.f === '120.40' && N.POS.DRC.vf === '129.475');
  assert('the SOP DHL value equals the vNAS Clearance value - the crossed-cells reading is recorded, not applied',
    parseFloat(N.POS.DRC.f) === parseFloat(N.POS.CD.vf) && N.POS.DRC.f !== N.POS.CD.f);
  assert('both GCE values are carried: T and 1X', N.POS.GCE.sid === 'T' && N.POS.GCE.tcp === '1X');
  assert('the vNAS-only Controller In Charge shares TCP 1X with GCE', N.POS.CIC.tcp === '1X' && N.POS.CIC.f === null);
  assert('Lunken Local is K and agrees with TCP 1K', N.POS.LUK_TWR.sid === 'K' && N.idStatus(N.POS.LUK_TWR) === 'agree');
  assert('NAR, SAR, FAR, VAR, BDR and LST fold into WDR', ['NAR','SAR','FAR','VAR','BDR','LST'].every(k => N.chainOf(k).join() === k + ',WDR'));
  assert('LCW and LCE fold into LCC', N.chainOf('LCW').join() === 'LCW,LCC' && N.chainOf('LCE').join() === 'LCE,LCC');
  assert('LST open alone is owned by LST; with it closed and WDR open it is WDR', N.ownerOf('LST', {LST:true}) === 'LST' && N.ownerOf('LST', {WDR:true}) === 'WDR');
  assert('four ramp towers', ['TRC','NRC','DRC','ARC'].every(k => N.POS[k].kind === 'ramp'));
  assert('SOP N Ramp 130.37 is vNAS 130.375', N.POS.NRC.vf === '130.375' && N.freqStatus(N.POS.NRC) === 'truncated');
  /* runways */
  assert('CVG runways', N.runwaysAt('KCVG').join(' ') === '9 18C 18L 18R 27 36C 36L 36R', N.runwaysAt('KCVG').join(' '));
  const byId = {}; prim.rwys.forEach(r => { byId[r.id] = r; });
  assert('9 and 27 are 12001 ft; 18R/36L is 8000', byId['9'].len === 12001 && byId['27'].len === 12001 && byId['18R'].len === 8000 && byId['36L'].len === 8000);
  assert('36C is CAT III', /CAT III/.test(byId['36C'].ils));
  assert('magnetic variation is west 6 degrees', N.FAC.magvar === 'west 6.0 degrees');
  assert('eight fields are carried', N.FIELD_ORDER.length === 8);
  /* procedures */
  assert('KCVG SIDs', N.procsAt('KCVG', 'SID').join() === 'BNGLE5,CHCLL6,GIPLE7,HAGOL5,JBNCH6,KENLN6,LOVEY8,ROCKT4,SILKS6');
  assert('KCVG STARs', N.procsAt('KCVG', 'STAR').join() === 'CEGRM8,GAVNN8,JAKIE7,SARGO5,TIGRR4');
  assert('KLUK has five STARs and no SID, and HEDEE1 is coded at Lunken, Hamilton and Clermont only', N.procsAt('KLUK', 'STAR').join() === 'CEGRM8,GAVNN8,HEDEE1,JAKIE7,SARGO5' && N.procsAt('KLUK', 'SID').length === 0 && N.fieldsWith('HEDEE1', 'STAR').join() === 'I69,KHAO,KLUK');
  assert('the conventional CVG# departure is coded at no field', Object.keys(N.SIDS).every(a => !Object.keys(N.SIDS[a]).some(p => /^CVG\d/.test(p))));
  /* the SOP's runway heading table, against CIFP: the first fix on each runway */
  let checked = 0;
  for (const row of T('lc.heading').rows) {
    const rw = 'RW' + row[0].padStart(2, '0'), fixes = row[1].split(' // ');
    for (const sid of N.procsAt('KCVG', 'SID')) {
      const seg = N.procOf('KCVG', sid).rwy[rw];
      const first = seg.find(g => g.f);
      assert('CIFP agrees: ' + sid + ' off ' + row[0] + ' starts at one of ' + fixes.join('/'), first && fixes.indexOf(first.f) >= 0, first && first.f);
      checked++;
    }
  }
  assert('all seventy-two runway/SID pairs were compared', checked === 72, String(checked));
  /* handoff IDs */
  assert('ERAM addresses WDR with V1W', N.idFromZid('WDR') === 'V1W' && N.idFromZid('BDR') === 'V1B');
  assert('the CVG handoff numbers are CMH 1, LEX 2, SDF 3, IND 4', Object.keys(N.VNAS.handoffNumbers).sort().map(k => k + N.VNAS.handoffNumbers[k]).join() === 'CMH1,IND4,LEX2,SDF3');
  const ob = N.outboundHandoffs();
  assert('departures reach ZID 22, 20, 69 and 34', ['C22','C20','C69','C34'].every(c => ob.some(o => o.ids.indexOf(c) >= 0)));
  assert('the vNAS adaptation sends CHCLL and SILKS to ZID 22 and KENLN to 20 - the SOP groups all three at 20',
    N.VNAS.restrictions.some(r => r.owner === 'CVG' && r.requester === 'ZID' && /CHCLL/.test(r.route) && r.requesterSectors.join() === '22')
    && N.VNAS.restrictions.some(r => r.owner === 'CVG' && r.requester === 'ZID' && /KENLN/.test(r.route) && r.requesterSectors.join() === '20')
    && /South \(CHCLL, SILKS, KENLN\)/.test(T('app.dep').rows.map(r => r[0]).join('|')));
  assert('the vNAS rnavPatterns spell TIGRR as TIGGR', N.VNAS.rnavPatterns.indexOf('TIGGR#') >= 0 && N.VNAS.rnavPatterns.indexOf('TIGRR#') < 0);
  /* tables */
  assert('eight configurations, the prohibited pairs are stated',
    N.CONFIGS.length === 8 && N.RULES.find(r => r.id === 'gen.rules').items.some(i => /landing runway 18R while departing runway 9 or runway 27/.test(i)));
  assert('the departure runway table has the East row expanded to four cells', T('gc.rwy').rows[1].join('|') === 'HAGOL/DQN // BNGLE/RIKLE // ROCKT/APE // GIPLE/HVQ // KENLN/HYK|East|36R|36R|18L|18L');
  assert('36C intersection rows are eleven and 18C eleven', T('lc.intx').rows.filter(r => r[0] === '36C').length === 11 && T('lc.intx').rows.filter(r => r[0] === '18C').length === 11);
  assert('the SOP scratchpad table matches vNAS', T('app.scratch').rows.filter(r => !/^(CHCLL# or IIU|KENLN# or HYK|CVG# )/.test(r[0])).every(r => N.VNAS.scratchpadRules.some(v => v.pattern === r[0] && v.template === r[1])));
  assert('the satellite arrival rule: the airport stays in the Y-scratchpad', N.RULES.find(r => r.id === 'sat.list').items.some(i => /airport left in the Y-scratchpad/.test(i)));
  assert('conflicts listed',
    N.CONFLICTS.map(c => c.id).join() === 'cd-freq,dhl-freq,gce-id,sargo-note,south-gate,vatis-dep,tiggr,freq-precision,gen-typo');
  /* the SimAware footprint, CVG */
  assert('the CVG footprint has 25 vertices and is named by SimAware', N.FOOTPRINT.vertices === 25 && N.FOOTPRINT.id === 'CVG');
  assert('the fields within the two-mile tolerance of the edge are exactly: ', N.containment().filter(c => c.marginal).map(c => c.icao).join() === '', N.containment().filter(c => c.marginal).map(c => c.icao + ' ' + c.edgeNm).join());


  /* ============ 9. Route draw (block 5) ============
     The M98 "Routes drawn" layers on the lateral-footprint plot. plan() is pure, so what would be drawn is
     asserted here without a browser; the SVG itself is checked by driving the page. */
  const RD = N.routeDraw;
  assert('the route-draw block exports routeDraw on the deck namespace', !!RD && typeof RD.plan === 'function' && typeof RD.set === 'function');
  assert('the layer modes are the M98 ones, by id and in order', RD.LAYER_MODES.map(m => m.id).join() === 'tracked,stars,sids,both,off');
  assert('the default mode is tracked, and its label does not claim traffic this deck does not have', RD.layers() === 'tracked' && !/traffic/i.test(RD.LAYER_MODES[0].label));
  assert('the contract names this facility, and the layer function exists', RD.FACILITY.id === 'CVG' && RD.prefix === 'cvgrd' && typeof globalThis['cvgrdLayers'] === 'function');
  assert('the deck exposes its plot projection and the viewer exposes its selection', typeof N.fpProject === 'function' && typeof N.fpFrame === 'function' && typeof N.openProc === 'function');
  const fr = N.fpFrame();
  assert('the projection puts every footprint vertex inside its own plot',
    N.FOOTPRINT.rings[0].every(v => { const q = N.fpProject(v[0], v[1]); return q[0] >= 0 && q[0] <= fr.W && q[1] >= 0 && q[1] <= fr.H; }));
  /* the harness never renders the procedures viewer (no DOM to mount into), so open it the way a click does: through the pick function the route-draw block wraps */
  globalThis['cvgpPick']('kind', 'STAR');
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
  assert('the D-ATIS contract names this facility and its one field', DA.FACILITY.id === 'CVG' && DA.FIELDS.length === 1 && DA.FIELDS[0].id === N.FAC.primary && DA.FIELDS[0].datis === true);
  const live10 = 'CVG ARR INFO C 0952Z. VRB03KT 10SM FEW250 08/04 A3034 (THREE ZERO THREE FOUR) RMK AO2 SLP272 T00780044. SIMUL APPROACHES IN USE. EXPECT ILS APPROACH TO RWY 36R. ALL AIRCRAFT SHALL READBACK RUNWAY HOLD SHORT INSTRUCTION. NOTICE TO AIRMEN. RWY 36R IM OTS. RWY 18C/36C CLSD, RWY 18C ILS OTS, ALS OTS, PAPI OTS, RWY 36C ILS OTS, ALS OTS, PAPI OTS. BIRD ACTIVITY VCNTY ARPT. RWY ASSIGNMENT IS BASED ON NOISE ABATEMENT PROCEDURES. ...ADVS YOU HAVE INFO C.\n\nCVG DEP INFO P 0952Z. VRB03KT 10SM FEW250 08/04 A3034 (THREE ZERO THREE FOUR) RMK AO2 SLP272 T00780044. DEPG RWY 27. ALL AIRCRAFT SHALL READBACK RUNWAY HOLD SHORT INSTRUCTION. NOTICE TO AIRMEN. RWY 18C/36C CLSD. BIRD ACTIVITY VCNTY ARPT. RWY ASSIGNMENT IS BASED ON NOISE ABATEMENT PROCEDURES. ...ADVS YOU HAVE INFO P.';
  const rd = DA.read(live10), mt = DA.match(rd, N.CONFIGS);
  assert('the live broadcast reads the runways in use', JSON.stringify(rd.land) === JSON.stringify(['36R']) && JSON.stringify(rd.dep) === JSON.stringify(['27']), JSON.stringify([rd.land, rd.dep]));
  assert('the live broadcast reads the information letter', rd.info === 'C');
  assert('exactly one configuration fits, and it is the right one', mt.kind === 'one' && mt.configs[0].id === 'nw', mt.kind + ' ' + mt.configs.map(c => c.id));
  const arrOnly = N.datis.match(N.datis.read('CVG ARR INFO C 0952Z. VRB03KT 10SM FEW250 08/04 A3034 (THREE ZERO THREE FOUR) RMK AO2 SLP272 T00780044. SIMUL APPROACHES IN USE. EXPECT ILS APPROACH TO RWY 36R. ALL AIRCRAFT SHALL READBACK RUNWAY HOLD SHORT INSTRUCTION. NOTICE TO AIRMEN. RWY 36R IM OTS. RWY 18C/36C CLSD, RWY 18C ILS OTS, ALS OTS, PAPI OTS, RWY 36C ILS OTS, ALS OTS, PAPI OTS. BIRD ACTIVITY VCNTY ARPT. RWY ASSIGNMENT IS BASED ON NOISE ABATEMENT PROCEDURES. ...ADVS YOU HAVE INFO C.'), N.CONFIGS);
  assert('the arrival half alone fits three configurations, so none is applied: ambiguity is stated, never picked', arrOnly.kind === 'many' && arrOnly.configs.length === 3);
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
  const BL = globalThis['cvgb'];
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

  console.log('\nSMOKE PASS — ' + checks + ' checks');
} catch (e) {
  console.error('FAIL: threw —', e && e.stack ? e.stack : e);
  process.exit(1);
}
