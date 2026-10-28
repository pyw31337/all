// 17 · 3D panel explode: curved wall of beveled glass plates + orbiting glass shards; hover lifts plates toward camera, click blows the wall apart in Z then re-seals
import * as M from './mech.js'; import * as U from './hud.js'; import { world, Parts, glass, THREE, NAVY, INK, ORANGE } from './g3d.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
let W, wall, shards, frame, PJ = [], T0 = performance.now();
const S = M.stage(S => { const R = S.R; if (!W) build(S); W.size(R.x + R.w * (S.mob ? .5 : .6), R.y + R.h * .5, Math.min(R.w, R.h) * (S.mob ? .4 : .32)); });
function build(S) { W = world(S); const mob = W.Q.mob, cols = mob ? 9 : 13, rows = mob ? 7 : 9, G = W.G, sz = 2.2 / cols, it = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const x = -1.1 + sz * (c + .5), y = sz * rows / 2 - sz * (r + .5), z = -x * x * .22;
    it.push({ h: [x, y, z], r: [0, Math.atan(x * .44), 0], s: [sz * .9, sz * .9, .045], c: Math.random() < .18 ? NAVY : Math.random() < .5 ? new THREE.Color('#C9D4EE') : new THREE.Color('#E8EDF8'), k: M.rnd(.03, .06) }); }
  const pick = [[1, 1], [1, cols - 3], [Math.floor(rows / 2), 2], [Math.floor(rows / 2), cols - 2], [rows - 2, 3], [rows - 2, cols - 4]]; PJ = pick.map(([r, c]) => r * cols + c); PJ.forEach(i => { it[i].c = NAVY; it[i].s[2] = .09; });
  wall = new Parts(G, new RoundedBoxGeometry(1, 1, 1, 2, .12), glass({ solid: true }), it);
  shards = new Parts(G, new THREE.TetrahedronGeometry(1, 0), glass({ a: .12, f: .85 }), Array.from({ length: Math.round(420 * W.Q.n) }, () => { const t = M.rnd(0, 6.283), r = M.rnd(1.25, 1.7); return { h: [Math.cos(t) * r, Math.sin(t) * r * .8, M.rnd(-.9, .2)], r: [M.rnd(0, 6), M.rnd(0, 6), M.rnd(0, 6)], s: [1, 1, 1].map(() => M.rnd(.02, .07)), t, rr: r }; }));
  shards.it.forEach((o, i) => { o.t = Math.atan2(o.h.y / .8, o.h.x); o.rr = Math.hypot(o.h.x, o.h.y / .8); });
  frame = new Parts(G, new THREE.BoxGeometry(1, 1, 1), glass({ a: .25, f: .6 }), [[0, sz * rows / 2 + .08, 2.3, .012], [0, -sz * rows / 2 - .08, 2.3, .012], [-1.2, 0, .012, sz * rows + .1], [1.2, 0, .012, sz * rows + .1]].map(([x, y, w, h]) => ({ h: [x, y, -x * x * .22], s: [w, h, .01] }))); }
S.onDown = () => { const n = performance.now(); wall.explode(n, -1.5, 1.9); shards.explode(n, 0, 1.4); frame.explode(n, 0, 1); };
const sc = {}, tgt = new THREE.Vector3();
M.loop(now => { const ctx = S.ctx, t = (now - T0) / 1000; ctx.clearRect(0, 0, S.W, S.H); M.bg(S);
  const c = M.cursor(S, now, t => [.56 + .32 * Math.cos(t * .4), .5 + .3 * Math.sin(t * .63)]), rev = U.boot(S, t, ['PANEL ARRAY · 3D', `PLATES ${wall.it.length} · SHARDS ${shards.it.length}`, 'SEAL · OK']);
  W.G.rotation.y += ((c.x / S.W - .7) * .6 - W.G.rotation.y) * .05; W.G.rotation.x += ((c.y / S.H - .5) * .35 - W.G.rotation.x) * .05;
  const m = W.local(c.x, c.y); wall.push(m, .32, 1.4, now); shards.push(m, .3, .5, now);
  wall.update(now); frame.update(now); shards.update(now, 1, (o, i, out) => { const a = o.t + t * .08 * (i % 2 ? 1 : -.7); return out.set(Math.cos(a) * o.rr, Math.sin(a) * o.rr * .8, o.h.z); });
  let best = -1, bd = (S.mob ? 40 : 56) ** 2; PJ.forEach((pi, i) => { W.screen(wall.it[pi].p, sc); const d = (sc.x - c.x) ** 2 + (sc.y - c.y) ** 2; if (d < bd) { bd = d; best = i; } });
  PJ.forEach((pi, i) => { const o = wall.it[pi]; o.lock = i === best ? 1 : 0; if (i === best) o.v.z += (.35 - (o.p.z - o.h.z)) * .02; });
  W.render(now);
  if (rev >= 1) PJ.forEach((pi, i) => { const o = wall.it[pi]; W.screen(o.p, sc); const hot = i === best, right = sc.x > W.ax; ctx.globalAlpha = hot ? 1 : .6; if (hot) U.brackets(ctx, sc.x, sc.y, 13, 1);
    U.callout(ctx, sc.x, sc.y, sc.x + (right ? 1 : -1) * (S.mob ? 24 : 44), sc.y - 20, hot ? [U.PN[i], `PNL-${String(pi).padStart(3, '0')} · Z ${(o.p.z - o.h.z).toFixed(2)} · D ${W.dist(o.p).toFixed(2)}`] : [`P-0${i + 1}`], M.cl((t - 2.4 - i * .15) / 1.2), hot); ctx.globalAlpha = 1; });
  U.rulers(S, c, now); ctx.fillStyle = U.nav(.55); ctx.font = U.mono(8.5); ctx.textAlign = 'left'; const sp = wall.spread();
  ctx.fillText(`ARRAY ${sp < .01 ? 'SEALED' : 'OPEN'} · Δ ${Math.sqrt(sp).toFixed(3)} · ${W.Q.dof ? 'DOF' : 'NO-DOF'}`, S.R.x, S.R.y + S.R.h + 26);
});
S.start();
