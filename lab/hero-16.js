// 16 · 3D holographic HUD: tilted radar floor of segmented rings, rotating sweep locks 6 targets, hologram emblem hovers above; click = Z explode + re-lock
import * as M from './mech.js'; import * as U from './hud.js'; import { world, Parts, glass, calendarItems, ringItems, lines, THREE, NAVY, INK, ORANGE } from './g3d.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
let W, H, E, rings = [], P = [], tg, sweep, beam, plates, T0 = performance.now();
const S = M.stage(S => { const R = S.R; if (!W) build(S); W.size(R.x + R.w * (S.mob ? .5 : .58), R.y + R.h * (S.mob ? .55 : .55), Math.min(R.w, R.h) * (S.mob ? .36 : .33)); });
function build(S) { W = world(S); const q = Math.max(W.Q.n, .5), G = W.G, box = new THREE.BoxGeometry(1, 1, 1);
  H = new THREE.Group(); H.rotation.x = -1.08; H.position.y = -.25; G.add(H);
  [[.62, 60, .45, .05], [.9, 120, .3, .025], [1.16, 36, .8, .05], [1.36, 200, .25, .02]].forEach(([r, n, gap, w], i) => { const g = new THREE.Group(); H.add(g); g.position.z = i * .03; g.sp = (i % 2 ? -1 : 1) * (.05 + i * .03);
    rings.push(g); P.push(new Parts(g, box, glass(i % 2 ? { a: .25, f: .6 } : { solid: true }), ringItems(Math.round(n * q), r, 0, .03, w, 1 - gap))); });
  P.push(new Parts(H, box, glass({ a: .3, f: .6 }), Array.from({ length: Math.round(360 * q) }, (_, i) => { const t = i / Math.round(360 * q) * 6.283; return { h: [Math.cos(t) * 1.5, Math.sin(t) * 1.5, 0], r: [0, 0, t], s: [i % 10 ? .03 : .09, .006, .01] }; })));
  sweep = new THREE.Mesh(new THREE.CircleGeometry(1.36, 40, 0, .55), new THREE.MeshBasicMaterial({ color: NAVY, transparent: true, opacity: .1, depthWrite: false, side: 2 })); sweep.position.z = .01; H.add(sweep);
  tg = new Parts(H, new THREE.OctahedronGeometry(1, 0), glass({ solid: true }), U.PN.map((_, i) => { const t = .5 + i * 1.047 + M.rnd(-.25, .25), r = M.rnd(.45, 1.25); return { h: [Math.cos(t) * r, Math.sin(t) * r, .06], s: [.045, .045, .07], c: INK }; })); P.push(tg);
  P.push(new Parts(H, new THREE.OctahedronGeometry(1, 0), glass({ a: .4, f: .5 }), Array.from({ length: Math.round(140 * q) }, () => { const t = M.rnd(0, 6.283), r = Math.sqrt(Math.random()) * 1.32; return { h: [Math.cos(t) * r, Math.sin(t) * r, .02], s: [.012, .012, .012] }; })));
  E = new THREE.Group(); E.position.set(0, .42, .35); E.scale.setScalar(.72); G.add(E);
  P.push(new Parts(E, box, glass({ a: .22, f: .9 }), calendarItems(q)));
  P.push(new Parts(E, box, glass({ a: .12, f: .7 }), ringItems(Math.round(64 * q), .72, -.05, .02, .02, .5)));
  beam = lines(G, 6);
  plates = new Parts(G, new RoundedBoxGeometry(1, 1, 1, 2, .08), glass({ a: .035, f: .35 }), S.mob ? [] : [[-1.12, 1.02], [1.12, 1.02]].map(([x, y]) => ({ h: [x, y, .1], r: [0, x < 0 ? .3 : -.3, 0], s: [.78, .34, .015] }))); P.push(plates); }
S.onDown = () => { const n = performance.now(); P.forEach(p => p.explode(n, 0, 1.3)); tg.it.forEach(o => o.lk = -1e9); };
const sc = {}, sc2 = {}, wrap = a => ((a % 6.283) + 6.283) % 6.283, v0 = new THREE.Vector3();
M.loop(now => { const ctx = S.ctx, t = (now - T0) / 1000; ctx.clearRect(0, 0, S.W, S.H); M.bg(S);
  const c = M.cursor(S, now, t => [.58 + .3 * Math.cos(t * .45), .55 + .25 * Math.sin(t * .7)]), rev = U.boot(S, t, ['HOLO · HUD v16', 'FLOOR TILT 62° · RINGS 4', 'SWEEP · ARMED']);
  W.G.rotation.y += ((c.x / S.W - .72) * .45 - W.G.rotation.y) * .04; rings.forEach(g => g.rotation.z += g.sp * .016); E.rotation.y = Math.sin(t * .6) * .35; E.position.y = .42 + Math.sin(t * 1.3) * .03;
  const sw = wrap(t * 1.1); sweep.rotation.z = sw - .55; sweep.visible = rev >= 1;
  P.forEach(p => p.push(W.local(c.x, c.y), .25, .6, now)); P.forEach(p => p.update(now));
  let best = -1, bd = (S.mob ? 44 : 60) ** 2;
  tg.it.forEach((o, i) => { o.lk ??= -1e9; const a = wrap(Math.atan2(o.p.y, o.p.x)); if (rev >= 1 && wrap(sw - a) < .08 && now - o.lk > 5200) o.lk = now;
    W.screen(o.p, sc, H); const d = (sc.x - c.x) ** 2 + (sc.y - c.y) ** 2; if (!c.idle && d < bd) { bd = d; best = i; } });
  tg.it.forEach((o, i) => o.lock = i === best || now - o.lk < 5000 ? 1 : 0);
  // beams from locked targets up to emblem
  const ba = beam.geometry.attributes.position.array; tg.it.forEach((o, i) => { v0.copy(o.p); H.localToWorld(v0); W.G.worldToLocal(v0); const on = o.lock; ba.set(on ? [v0.x, v0.y, v0.z, 0, E.position.y - .25, E.position.z] : [0, 0, 0, 0, 0, 0], i * 6); }); beam.geometry.attributes.position.needsUpdate = true;
  W.render(now);
  if (rev >= 1) tg.it.forEach((o, i) => { if (!o.lock) return; W.screen(o.p, sc, H); const man = i === best, lk = man ? 1 : M.cl((now - o.lk) / 500), out = man ? 1 : M.cl((5000 - (now - o.lk)) / 400); ctx.globalAlpha = out; U.brackets(ctx, sc.x, sc.y, 11, lk);
    const right = sc.x > W.ax - 20, az = (wrap(Math.atan2(o.p.y, o.p.x) + 1.57) * 57.3).toFixed(1); U.callout(ctx, sc.x, sc.y, sc.x + (right ? 1 : -1) * (S.mob ? 30 : 56), sc.y - 24, S.mob && !man ? [U.PN[i]] : [U.PN[i], `TGT-0${i + 1} · AZ ${az}° · RNG ${Math.hypot(o.p.x, o.p.y).toFixed(2)} · D ${W.dist(v0.copy(o.p).applyMatrix4(H.matrix)).toFixed(2)}`], man ? 1 : M.cl((now - o.lk) / 1400)); ctx.globalAlpha = 1; });
  // HUD plate telemetry (abstract codes, coordinates, today's date only)
  const d = new Date(), ds = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`, txt = [[`SYS · HOLO-16 · ${ds}`, `X ${String(c.x | 0).padStart(4, '0')} · Y ${String(c.y | 0).padStart(4, '0')}`], [`SWEEP ${(sw * 57.3).toFixed(0).padStart(3, '0')}°`, `LOCK ${tg.it.filter(o => o.lock).length}/6`]];
  plates.it.forEach((o, i) => { W.screen(o.p, sc); ctx.globalAlpha = M.cl(t - 2.6 - i * .2); ctx.textAlign = 'left'; ctx.fillStyle = U.nav(.55); ctx.font = U.mono(8); ctx.fillText(U.type(txt[i][0], (t - 2.6 - i * .2) * 1.5), sc.x - 46, sc.y - 4); ctx.fillStyle = '#111418'; ctx.font = U.mono(10); ctx.fillText(U.type(txt[i][1], (t - 2.9 - i * .2) * 1.5), sc.x - 46, sc.y + 10); ctx.globalAlpha = 1; });
  U.rulers(S, c, now); ctx.fillStyle = U.nav(.55); ctx.font = U.mono(8.5); ctx.textAlign = 'left'; ctx.fillText(`HOLO HUD · PARTS ${P.reduce((s, p) => s + p.it.length, 0)} · CLICK = DISASSEMBLE · ${W.Q.dof ? 'DOF' : 'NO-DOF'}`, S.R.x, S.R.y + S.R.h + 26);
});
S.start();
