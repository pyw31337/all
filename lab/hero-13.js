// 13 · Holographic assembly: hero-8 emblem inside a HUD frame, boot scan, segmented arcs, callouts to the six projects
import * as M from './mech.js'; import * as U from './hud.js'; import { emblem } from './emblem.js';
const E = emblem({ z: .3, noStatus: 1, noReticle: 1 }); let T0, re = 0;
const S = M.stage(S => { E.build(S); T0 = performance.now(); re = T0; }); S.onDown = () => { E.explode(); re = performance.now() + 900; };
M.loop(now => {
  const ctx = S.ctx, t = (now - T0) / 1000, C = E.C, R = S.R; ctx.clearRect(0, 0, S.W, S.H); M.bg(S);
  const c = M.cursor(S, now); U.boot(S, t, ['HOLO · ASSEMBLY', 'EMBLEM / CALENDAR · DATA', 'LINK P-01…P-06']);
  // HUD frame (corner brackets around stage)
  ctx.strokeStyle = U.nav(.45); ctx.lineWidth = 1; const b = 22; ctx.beginPath(); for (const [x, y, sx, sy] of [[R.x, R.y, 1, 1], [R.x + R.w, R.y, -1, 1], [R.x + R.w, R.y + R.h, -1, -1], [R.x, R.y + R.h, 1, -1]]) { ctx.moveTo(x, y + sy * b); ctx.lineTo(x, y); ctx.lineTo(x + sx * b, y); } ctx.stroke();
  const g = M.cl(t / 1.6); U.arcs(ctx, C.cx, C.cy, C.Z * 1.12 * g, 6, t * .25, .3, .5, 1.6); U.arcs(ctx, C.cx, C.cy, C.Z * 1.2 * g, 48, -t * .1, .5, .3, .8); U.tickRing(ctx, C.cx, C.cy, C.Z * 1.3 * g, 120, t * .02, .35);
  // segmented gauge (assembly ratio)
  const ok = E.update(S, now, c); ctx.strokeStyle = U.orange(.85); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(C.cx, C.cy, C.Z * 1.36, -1.57, -1.57 + 6.283 * ok * .25); ctx.stroke();
  ctx.fillStyle = U.nav(.7); ctx.font = U.mono(8.5); ctx.textAlign = 'left'; ctx.fillText(`ASM ${String(Math.round(ok * 100)).padStart(3, '0')}%`, C.cx + 6, C.cy - C.Z * 1.36 - 6);
  // callouts from ring anchors to labels on both sides
  const pc = M.cl((now - re) / 1000 - 1.2);
  U.PN.forEach((nm, i) => { const side = i < 3 ? -1 : 1, row = i % 3, a = side < 0 ? Math.PI + (row - 1) * .55 : (row - 1) * .55, ax = C.cx + Math.cos(a) * C.Z * 1.2, ay = C.cy + Math.sin(a) * C.Z * 1.2;
    const lx = side < 0 ? Math.max(R.x - (S.mob ? 0 : 10), C.cx - C.Z * 1.75) : Math.min(R.x + R.w, C.cx + C.Z * 1.75), ly = ay;
    const hov = Math.hypot(c.x - ax, c.y - ay) < 40 || Math.hypot(c.x - lx, c.y - ly) < 50, p = M.cl(pc * 1.2 - i * .12);
    ctx.fillStyle = hov ? '#FF8A1F' : '#1F3A8A'; ctx.beginPath(); ctx.arc(ax, ay, 2.6, 0, 7); ctx.fill(); if (hov) U.brackets(ctx, ax, ay, 9, 1);
    if (!S.mob) U.callout(ctx, ax, ay, lx, ly, [nm, `P-0${i + 1} · NODE ${String((a * 57.3 + 360) % 360 | 0).padStart(3, '0')}`], p, hov); });
  U.rulers(S, c.idle ? { x: -1e4 } : c, now);
  ctx.fillStyle = U.nav(.6); ctx.font = U.mono(9); ctx.textAlign = 'left'; ctx.fillText(`PARTS ${E.F.length} · CLICK = DISASSEMBLE`, R.x, R.y + R.h + 26);
});
S.start();
