// 15 · 3D assembly + node graph: emblem built from extruded tiles & ring plates; 3D node clusters dock onto the ring; click = Z-depth explode
import * as M from './mech.js'; import * as U from './hud.js'; import { world, Parts, glass, calendarItems, ringItems, lines, THREE, NAVY, INK, ORANGE } from './g3d.js';
let W, P = [], hubs = [], nodes, links, T0 = performance.now(), boom = -1e9;
const S = M.stage(S => { const R = S.R; if (!W) build(S); W.size(R.x + R.w * (S.mob ? .5 : .62), R.y + R.h * .5, Math.min(R.w, R.h) * (S.mob ? .34 : .31)); });
function build(S) { W = world(S); const q = W.Q.n, G = W.G, box = new THREE.BoxGeometry(1, 1, 1);
  P.push(new Parts(G, box, glass({ solid: true }), calendarItems(q)));
  P.push(new Parts(G, box, glass({ a: .2, f: .7 }), [...ringItems(Math.round(96 * Math.max(q, .5)), 1.02, 0, .06, .035, .78), ...ringItems(Math.round(180 * Math.max(q, .5)), .9, -.06, .02, .02, .35).map((o, i) => (i % 10 === 0 && (o.s[1] = .05), o))]));
  P.push(new Parts(G, new THREE.BoxGeometry(1, 1, 1), glass({ a: .08, f: .6 }), Array.from({ length: Math.round(48 * Math.max(q, .5)) }, (_, i) => { const t = i / 48 * 6.283; return { h: [Math.cos(t) * 1.18, Math.sin(t) * 1.18, .12], r: [0, 0, t], s: [.1, .03, .14] }; })));
  hubs = U.PN.map((n, i) => { const t = .524 + i / 6 * 6.283; return new THREE.Vector3(Math.cos(t) * 1.38, Math.sin(t) * 1.38, .05); });
  const N = Math.round(360 * q), it = []; for (let i = 0; i < N; i++) { const h = i % 6, a = Math.random() * 6.283, b = Math.acos(M.rnd(-1, 1)), rr = M.rnd(.05, .22); const o = hubs[h];
    it.push({ h: [o.x + Math.sin(b) * Math.cos(a) * rr, o.y + Math.sin(b) * Math.sin(a) * rr, o.z + Math.cos(b) * rr], s: [.018, .018, .018].map(v => v * M.rnd(.7, 1.6)), tag: h, c: Math.random() < .2 ? NAVY : new THREE.Color('#5B74B8'), k: M.rnd(.02, .045) }); }
  for (let i = 0; i < 6; i++) it.push({ h: hubs[i].toArray(), s: [.05, .05, .05], tag: i, c: INK, hub: 1 });
  nodes = new Parts(G, new THREE.IcosahedronGeometry(1, 0), glass({ solid: true }), it); nodes.it.forEach((o, i) => o.hub = i >= N); P.push(nodes);
  links = lines(G, N); }
S.onDown = () => { boom = performance.now(); P.forEach(p => p.explode(boom, 0, 1.2)); };
const tv = new THREE.Vector3(), sc = {};
M.loop(now => { const ctx = S.ctx, t = (now - T0) / 1000; ctx.clearRect(0, 0, S.W, S.H); M.bg(S);
  const c = M.cursor(S, now, t => [.56 + .3 * Math.cos(t * .5), .5 + .28 * Math.sin(t * .8)]), rev = U.boot(S, t, ['ASSEMBLY · 3D', 'DEPTH Z ±14 · PERSPECTIVE 35°', W.Q.dof ? 'DOF · ON' : 'DOF · OFF (MOBILE)']);
  const m = W.local(c.x, c.y); W.G.rotation.y += ((c.x / S.W - .7) * .5 - W.G.rotation.y) * .04; W.G.rotation.x += ((c.y / S.H - .5) * .3 - W.G.rotation.x) * .04;
  // phase: nodes orbit hubs while scattered; after 3.5s dock toward ring (radius 1.2)
  const dock = M.cl((t - 3.5) / 2) * (now - boom > 2500 ? 1 : 0);
  P.forEach(p => p.push(m, .28, 1, now)); P.forEach(p => p !== nodes && p.update(now));
  nodes.update(now, 1, (o, i, out) => { if (o.hub) return o.h; const hb = hubs[o.tag]; out.copy(o.h).sub(hb).multiplyScalar(1 - dock * .55); out.add(hb).multiplyScalar(1 - dock * .1); return out; });
  // links node->hub
  const a = links.geometry.attributes.position.array; let k = 0; const N = nodes.it.length - 6; for (let i = 0; i < N; i++) { const o = nodes.it[i], h = nodes.it[N + o.tag].p; a[k++] = o.p.x; a[k++] = o.p.y; a[k++] = o.p.z; a[k++] = h.x; a[k++] = h.y; a[k++] = h.z; } links.geometry.attributes.position.needsUpdate = true;
  // hover hub -> lock
  let best = -1, bd = (S.mob ? 50 : 70) ** 2; for (let i = 0; i < 6; i++) { W.screen(nodes.it[N + i].p, sc); const d = (sc.x - c.x) ** 2 + (sc.y - c.y) ** 2; if (d < bd) { bd = d; best = i; } }
  nodes.it.forEach(o => o.lock = o.tag === best && o.hub ? 1 : 0);
  W.render(now);
  if (rev >= 1) for (let i = 0; i < 6; i++) { const o = nodes.it[N + i]; W.screen(o.p, sc); const hot = i === best, right = sc.x > W.ax; ctx.globalAlpha = hot ? 1 : .55;
    if (hot) U.brackets(ctx, sc.x, sc.y, 12, 1);
    U.callout(ctx, sc.x, sc.y, sc.x + (right ? 1 : -1) * (S.mob ? 26 : 46), sc.y - 22, hot ? [U.PN[i], `P-0${i + 1} · Z ${(sc.z).toFixed(2)} · D ${W.dist(o.p).toFixed(2)}`] : [`P-0${i + 1} ${U.PN[i]}`], M.cl((t - 2.5 - i * .15) / 1.2), hot); ctx.globalAlpha = 1; }
  U.rulers(S, c, now); ctx.fillStyle = U.nav(.55); ctx.font = U.mono(8.5); ctx.textAlign = 'left';
  ctx.fillText(`PHASE ${dock > .5 ? '3/3 · DOCKED' : '2/3 · CLUSTERED'} · NODES ${N} · PARTS ${P.reduce((s, p) => s + p.it.length, 0)} · ${W.Q.dof ? 'DOF' : 'NO-DOF'}`, S.R.x, S.R.y + S.R.h + 26);
});
S.start();
