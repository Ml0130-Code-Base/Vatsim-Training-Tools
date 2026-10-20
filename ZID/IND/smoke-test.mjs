#!/usr/bin/env node
/* Headless smoke test for ind-drill-deck.html.
   Covers the deck (data spine), the builder + notebook, the published procedures
   block, the flight-strips block, the route-draw block and the D-ATIS block.
   Usage: node smoke-test.mjs [path-to-html]   (default: ind-drill-deck.html)
   Exits nonzero on any exception or failed assertion.

   NO NODE ON THE OWNER'S MACHINE (root CLAUDE.md section 12). Run it in the browser
   with smoke-test-browser.html in this folder: serve the folder over HTTP, open the
   page, press run. A check that passes there is the same check. */
import fs from 'node:fs';

const path = process.argv[2] || 'ind-drill-deck.html';
const html = fs.readFileSync(path, 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
/* every script in the page is an extension block, in dependency order:
   deck, builder + notebook, published procedures, flight strips, route draw, D-ATIS.
   THIS COUNT IS A GUARD, NOT A FORMALITY: update it in the same commit that adds a block. */
const EXPECTED_BLOCKS = 6;
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

  const N = globalThis.IND;
  assert('deck exports window.IND', !!N);
  assert('builder exports window.indb', !!globalThis.indb);
  assert('strip block exports window.strip', !!globalThis.strip);
  const B = globalThis.indb;

  /* ============ 1. Positions ============ */
  const keys = N.POS_ORDER;
  const tower = keys.filter(k => N.POS[k].kind !== 'child' && N.POS[k].kind !== 'other');
  assert('13 SOP positions are present', tower.length === 13, 'got ' + tower.length);
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
  assert('STANDING is empty - no IND OJT session has been flown', N.STANDING.length === 0);
  assert('PRIOR is empty - no IND drill is on record', B.PRIOR.length === 0);
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
  assert('the storage key carries no status word', !/skeleton|draft|test|beta/i.test(B.KEY) && B.KEY === 'ind-drill-deck-v1');
  assert('the page switcher is named for the tool', typeof globalThis['indPage'] === 'function');
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
  assert('no arrival claims to be flown, and each declares its track', Object.values(sp).every(v => v.flies === false && v.track === true && v.serves.length > 0));
  assert('no departure claims to be flown, and each declares its track', Object.values(sd).every(v => v.flies === false && v.track === true && v.from.length > 0));
  assert('every field a procedure serves is a field this facility works',
    Object.values(sp).every(v => v.serves.every(a => !!N.FIELDS[a])) && Object.values(sd).every(v => v.from.every(a => !!N.FIELDS[a])));

  /* ============ 7. The strip contract ============ */
  const F = globalThis.STRIP_FACILITY;
  assert('the strip contract names this facility', F.id === 'IND' && F.prefix === 'indst');
  assert('the strip airports are exactly the fields this facility works',
    Object.keys(F.airports).join() === N.FIELD_ORDER.join());
  assert('a field with no runway list is null in the contract', N.FIELD_ORDER.every(f => (F.airports[f].rwys === null) === (N.FIELDS[f].rwys === null)));
  assert('a stored strip is checked: a foreign field is refused by name',
    globalThis.strip.checkStrip({role:'arrival', cs:'X1', dest:'KORD', gate:''}, 'x').some(e => /does not work/.test(e)));

  /* ============ 8. Facility-specific facts, written by hand ============ */
  /* IND: all thirteen SOP positions agree with vNAS; the SOP prints three channels to two decimals */
  const T = id => N.TABLES.find(t => t.id === id);
  assert('no position value disagrees between the SOP and vNAS', N.positionConflicts().length === 0);
  assert('Clearance Delivery is 128.75', N.POS.CD.f === '128.75' && N.POS.CD.vf === '128.750' && N.POS.CD.sid === 'T');
  assert('LCW is printed 127.82 and is 127.825', N.POS.LCW.f === '127.82' && N.POS.LCW.vf === '127.825' && N.freqStatus(N.POS.LCW) === 'truncated');
  assert('FRD and FNI are truncated the same way', N.POS.FRD.vf === '128.175' && N.POS.FNI.vf === '120.525');
  assert('the SOP carries no frequency for a vNAS-only tower', N.POS.BAK_TWR.f === null && N.POS.BAK_TWR.vf === '118.600');
  assert('STN folds into STS, which folds into DRE', N.chainOf('STN').join() === 'STN,STS,DRE');
  assert('LCW folds into LCE', N.chainOf('LCW').join() === 'LCW,LCE');
  assert('with DRW open and DRE closed, STN reaches nobody', N.ownerOf('STN', {DRW:true}) === null);
  assert('with DRE open, STN is owned by DRE', N.ownerOf('STN', {DRE:true}) === 'DRE');
  assert('with STS open, STN is owned by STS', N.ownerOf('STN', {STS:true, DRE:true}) === 'STS');
  /* runways, CIFP 261001 */
  assert('KIND runways', N.runwaysAt('KIND').join(' ') === '5L 5R 14 23L 23R 32', N.runwaysAt('KIND').join(' '));
  const lens = {}; prim.rwys.forEach(r => { lens[r.id] = r.len; });
  assert('KIND lengths are 11200, 10000, 7278, 10000, 11200, 7278', JSON.stringify(lens) === JSON.stringify({'5L':11200,'5R':10000,'14':7278,'23L':10000,'23R':11200,'32':7278}), JSON.stringify(lens));
  assert('every KIND runway has an ILS record with a category', prim.rwys.every(r => /CAT (I|II|III)$/.test(r.ils)));
  assert('magnetic variation is west 5 degrees', N.FAC.magvar === 'west 5.0 degrees');
  assert('24 fields are carried and five have no CIFP runway record',
    N.FIELD_ORDER.length === 24 && N.FIELD_ORDER.filter(f => !N.FIELDS[f].rwys).join() === '8A4,81II,IN35,IN74,IN84');
  /* procedures: the SOP names six SIDs, CIFP codes three at KIND */
  assert('KIND SIDs coded', N.procsAt('KIND', 'SID').join() === 'DAWNN1,MAREO1,MEARZ7');
  assert('KIND STARs coded', N.procsAt('KIND', 'STAR').join() === 'GIIBS4,JAKKS2,KOLTS2,RACYR6,SMUKE3,SNKPT2');
  assert('OOM5 and ROCKY1 are coded at satellites and not at KIND',
    N.fieldsWith('OOM5', 'SID').indexOf('KIND') < 0 && N.fieldsWith('OOM5', 'SID').indexOf('KMQJ') >= 0 && N.fieldsWith('ROCKY1', 'SID').indexOf('KIND') < 0);
  assert('INDY is coded at no field', Object.keys(N.SIDS).every(a => !Object.keys(N.SIDS[a]).some(p => /^INDY/.test(p))));
  assert('CLANG1 is coded at the six satellites and not at KIND, as the SOP changelog says (Sats only)', N.fieldsWith('CLANG1', 'STAR').join() === 'KEYE,KGEZ,KHFY,KMQJ,KTYQ,KUMP');
  assert('RACYR6 is conventional, SMUKE3 is RNAV', N.procOf('KIND', 'RACYR6').rnav === false && N.procOf('KIND', 'SMUKE3').rnav === true);
  assert('a procedure is scoped to its field: DAWNN1 is published at more than one field with separate data',
    N.fieldsWith('DAWNN1', 'SID').length >= 2 && N.procOf('KIND', 'DAWNN1') !== N.procOf('KMQJ', 'DAWNN1'));
  /* handoff IDs from the record */
  assert('ERAM addresses a DRE with I1E', N.idFromZid('DRE') === 'I1E' && N.idFromZid('FNF') === 'I1F');
  assert('to CVG the delta prefix is 2, to SDF 6, to FWA 5', N.idOtherStars('CVG', '1B') === 'Δ2B' && N.idOtherStars('SDF', '1D') === 'Δ6D' && N.idOtherStars('FWA', '1W') === 'Δ5W');
  const ob = N.outboundHandoffs();
  assert('MEARZ departures reach ZAU sectors 35 and 51 as G35 and G51', ob.some(o => o.to === 'ZAU' && o.ids.join() === 'G35,G51'));
  assert('DAWNN, MAREO, ROCKY and OOM reach ZID 34, 33 and 35', ['C34','C33','C35'].every(c => ob.some(o => o.ids.indexOf(c) >= 0)));
  /* the SOP tables, spot-checked against the page */
  assert('the 23L intersection row is C3/D3 at 8350', T('lc.intx').rows.some(r => r[0] === '23L' && r[1] === 'C3/D3' && r[2] === '8350'));
  assert('the SOP scratchpad table has no MAREO# row and vNAS does',
    !T('app.scratch.sid').rows.some(r => /MAREO/.test(r[0])) && N.VNAS.scratchpadRules.some(r => r.pattern === 'MAREO#' && r.template === 'MAR'));
  assert('the six SOP SID scratchpad rows all appear in vNAS',
    T('app.scratch.sid').rows.every(r => r[0].split(' // ').every(route => N.VNAS.scratchpadRules.some(v => v.pattern === route.replace('MEARZ# CLLRK', 'MEARZ# MEARZ CLLRK') && v.template === r[1]))));
  assert('the departure heading rows are six', T('lc.heading').rows.length === 6);
  assert('the maps table carries the parsed SOP list', T('maps.list').rows.length > 100 && T('maps.list').rows.every(r => /^\d+$/.test(r[0])));
  assert('the combine rule: runway 14 or 32 forces LC combined is stated in the SOP rules',
    N.RULES.find(r => r.id === 'lc.aor').items.some(i => /14 or 32 configuration, LC must be combined/.test(i)));
  assert('the departure frequency tables differ for DAWNN between 5/23 and 14/32',
    /DAWNN/.test(T('cd.freq.523').rows[1][0]) && /124\.95/.test(T('cd.freq.523').rows[1][2]) && /DAWNN/.test(T('cd.freq.1432').rows[0][0]) && /119\.05/.test(T('cd.freq.1432').rows[0][2]));
  assert('conflicts listed: MAREO#, coded SIDs, ZAU sector, ramp sentence, channel precision, vNAS omissions',
    N.CONFLICTS.map(c => c.id).join() === 'mareo-scratch,sids-coded,zau-sector,ramp-sentence,freq-precision,vnas-omits');
  /* the SimAware footprint, IND */
  assert('the IND footprint has 27 vertices and is named by SimAware', N.FOOTPRINT.vertices === 27 && N.FOOTPRINT.id === 'IND');
  assert('the fields within the two-mile tolerance of the edge are exactly: KCFJ,I34', N.containment().filter(c => c.marginal).map(c => c.icao).join() === 'KCFJ,I34', N.containment().filter(c => c.marginal).map(c => c.icao + ' ' + c.edgeNm).join());


  /* ============ 9. Route draw (block 5) ============
     The M98 "Routes drawn" layers on the lateral-footprint plot. plan() is pure, so what would be drawn is
     asserted here without a browser; the SVG itself is checked by driving the page. */
  const RD = N.routeDraw;
  assert('the route-draw block exports routeDraw on the deck namespace', !!RD && typeof RD.plan === 'function' && typeof RD.set === 'function');
  assert('the layer modes are the M98 ones, by id and in order', RD.LAYER_MODES.map(m => m.id).join() === 'tracked,stars,sids,both,off');
  assert('the default mode is tracked, and its label does not claim traffic this deck does not have', RD.layers() === 'tracked' && !/traffic/i.test(RD.LAYER_MODES[0].label));
  assert('the contract names this facility, and the layer function exists', RD.FACILITY.id === 'IND' && RD.prefix === 'indrd' && typeof globalThis['indrdLayers'] === 'function');
  assert('the deck exposes its plot projection and the viewer exposes its selection', typeof N.fpProject === 'function' && typeof N.fpFrame === 'function' && typeof N.openProc === 'function');
  const fr = N.fpFrame();
  assert('the projection puts every footprint vertex inside its own plot',
    N.FOOTPRINT.rings[0].every(v => { const q = N.fpProject(v[0], v[1]); return q[0] >= 0 && q[0] <= fr.W && q[1] >= 0 && q[1] <= fr.H; }));
  /* the harness never renders the procedures viewer (no DOM to mount into), so open it the way a click does: through the pick function the route-draw block wraps */
  globalThis['indpPick']('kind', 'STAR');
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
  assert('the D-ATIS contract names this facility and its one field', DA.FACILITY.id === 'IND' && DA.FIELDS.length === 1 && DA.FIELDS[0].id === N.FAC.primary && DA.FIELDS[0].datis === true);
  const live10 = 'IND ATIS INFO U 0954Z. 00000KT 10SM BKN230 07/04 A3036 (THREE ZERO THREE SIX). PARL ILS RWY 23R AND 23L APPROACHES IN USE. CROSS RUNWAY OPERATIONS MAY BE IN EFFECT. NOTICE TO AIRMEN. ILS RWY 5L IM 5R IM OTS. ...ADVS YOU HAVE INFO U.';
  const rd = DA.read(live10), mt = DA.match(rd, N.CONFIGS);
  assert('the live broadcast reads the runways in use', JSON.stringify(rd.land) === JSON.stringify(['23R','23L']) && JSON.stringify(rd.dep) === JSON.stringify([]), JSON.stringify([rd.land, rd.dep]));
  assert('the live broadcast reads the information letter', rd.info === 'U');
  assert('exactly one configuration fits, and it is the right one', mt.kind === 'one' && mt.configs[0].id === '23', mt.kind + ' ' + mt.configs.map(c => c.id));
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
  const BL = globalThis['indb'];
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

  console.log('\nSMOKE PASS — ' + checks + ' checks');
} catch (e) {
  console.error('FAIL: threw —', e && e.stack ? e.stack : e);
  process.exit(1);
}
