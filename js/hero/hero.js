// Main hero (from lab 11) · Assembly + living graph: emblem (hero-8) with 360 nodes that scatter → cluster per project → dock onto the ring
import * as M from './mech.js'; import * as U from './hud.js'; import { emblem } from './emblem.js';
const E = emblem({ z: .33, noStatus: 1 }); let N = [], p = 0, boom = 0;
const S = M.stage(S => { E.build(S); const R = S.R, n = Math.round(360 * S.q); N = [];
  for (let i = 0; i < n; i++) N.push({ i, m: i % 6, hub: i < 6, x: R.x + Math.random() * R.w, y: R.y + Math.random() * R.h, vx: 0, vy: 0, hx: R.x + Math.random() * R.w, hy: R.y + Math.random() * R.h, ph: Math.random() * 6.3, lit: 0, k: (i / 6) | 0 }); });
S.onDown = () => { E.explode(); const C = E.C; N.forEach(o => { const a = Math.atan2(o.y - C.cy, o.x - C.cx); o.vx += Math.cos(a) * M.rnd(8, 24); o.vy += Math.sin(a) * M.rnd(8, 24); }); boom = performance.now(); };
const tick = now => {
  const ctx = S.ctx, t = now / 1000, R = S.R, C = E.C; ctx.clearRect(0, 0, S.W, S.H); M.bg(S);
  const c = M.cursor(S, now, t => [.5 + .48 * Math.sin(t * .3), .5 + .32 * Math.cos(t * .8)]);
  if (M.RM) { c.x = c.y = -1e4; }
  const tg = M.RM ? 2 : S.mob ? M.cl((c.x - R.x) / R.w) * 2 : M.cl((c.x - S.W * .36) / (S.W * .58)) * 2; p += (tg - p) * .04; const k = Math.min(1, Math.floor(p)), fr = M.easeIO(M.cl(p - k));
  const per = Math.ceil(N.length / 6), hubR = C.Z * 1.32; let best = null, bd = 1e9;
  for (const o of N) {
    const ang = o.m / 6 * 6.283 - 1.57 + t * .03, hx = C.cx + Math.cos(ang) * hubR, hy = C.cy + Math.sin(ang) * hubR;
    const g = 2.39996 * o.k, rr = Math.sqrt(o.k) * (S.mob ? 2.4 : 3.6), A0 = [o.hx + Math.cos(t * .5 + o.ph) * 12, o.hy + Math.sin(t * .6 + o.ph) * 12];
    const A1 = o.hub ? [hx, hy] : [hx + Math.cos(g + t * .1) * rr, hy + Math.sin(g + t * .1) * rr];
    const ra = (o.i / N.length) * 6.283 + t * .05, A2 = o.hub ? [C.cx + Math.cos(ang) * C.Z * 1.18, C.cy + Math.sin(ang) * C.Z * 1.18] : [C.cx + Math.cos(ra) * C.Z * (1.06 + (o.i % 3) * .035), C.cy + Math.sin(ra) * C.Z * (1.06 + (o.i % 3) * .035)];
    const a = k ? A1 : A0, b = k ? A2 : A1, tx = a[0] + (b[0] - a[0]) * fr, ty = a[1] + (b[1] - a[1]) * fr; o.ax = hx; o.ay = hy;
    const dx = o.x - c.x, dy = o.y - c.y, d2 = dx * dx + dy * dy, rad = S.mob ? 50 : 90;
    if (d2 < rad * rad) { const d = Math.sqrt(d2) || 1, e = (1 - d / rad) ** 2; o.vx += dx / d * e * 1.3; o.vy += dy / d * e * 1.3; o.lit = Math.max(o.lit, e * 1.5); if (d2 < bd) { bd = d2; best = o; } }
    o.lit *= .94; const st = now - boom < 500 ? .01 : .05 + (o.i % 7) * .006; o.vx = (o.vx + (tx - o.x) * st) * .8; o.vy = (o.vy + (ty - o.y) * st) * .8; o.x += o.vx; o.y += o.vy;
  }
  // links: member→hub (phase 0–1), hub→emblem center spokes
  const hubs = N.slice(0, 6), la = .06 + .22 * (1 - Math.abs(p - 1)); ctx.strokeStyle = U.nav(la); ctx.lineWidth = .5; ctx.beginPath();
  for (const o of N) { if (o.hub) continue; const h = hubs[o.m]; if (Math.abs(o.x - h.x) + Math.abs(o.y - h.y) < 160) { ctx.moveTo(h.x, h.y); ctx.lineTo(o.x, o.y); } } ctx.stroke();
  ctx.strokeStyle = U.nav(.35); ctx.setLineDash([3, 4]); ctx.beginPath(); hubs.forEach(h => { ctx.moveTo(h.x, h.y); ctx.lineTo(C.cx + (h.x - C.cx) * .78, C.cy + (h.y - C.cy) * .78); }); ctx.stroke(); ctx.setLineDash([]);
  E.update(S, now, c);
  ctx.beginPath(); for (const o of N) if (!o.hub) { const r = (o.i % 5 ? 1.2 : 2) * (1 + o.lit); ctx.moveTo(o.x + r, o.y); ctx.arc(o.x, o.y, r, 0, 6.29); } ctx.fillStyle = U.nav(.6); ctx.fill();
  ctx.beginPath(); for (const o of N) if (o.lit > .4 && !o.hub) { ctx.moveTo(o.x + 3, o.y); ctx.arc(o.x, o.y, 3, 0, 6.29); } ctx.fillStyle = U.orange(.9); ctx.fill();
  hubs.forEach((h, i) => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#1F3A8A'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(h.x, h.y, 5, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = U.nav(.75); ctx.font = U.mono(8); const lf = h.x < C.cx - 8; ctx.textAlign = lf ? 'right' : 'left'; ctx.fillText(`P-0${i + 1} ${U.PN[i]}`, h.x + (lf ? -9 : 9), h.y - 7); });
  if (best) { const o = best; ctx.strokeStyle = '#FF8A1F'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(o.x, o.y, 9, 0, 7); ctx.moveTo(o.x - 16, o.y); ctx.lineTo(o.x - 11, o.y); ctx.moveTo(o.x + 11, o.y); ctx.lineTo(o.x + 16, o.y); ctx.moveTo(o.x, o.y - 16); ctx.lineTo(o.x, o.y - 11); ctx.stroke(); ctx.fillStyle = '#111418'; ctx.font = U.mono(9); ctx.textAlign = 'left'; ctx.fillText(`R-${String(o.i).padStart(4, '0')} · P-0${o.m + 1}`, o.x + 14, o.y - 10); }
  U.rulers(S, c.idle ? { x: -1e4 } : c, now);
  if (!S.mob) ctx.fillStyle = U.nav(.6), ctx.font = U.mono(9), ctx.textAlign = "left", ctx.fillText(`PHASE ${Math.round(p) + 1}/3 · ${['SCATTERED', 'CLUSTERED', 'DOCKED'][Math.round(p)]} · NODES ${N.length} · PARTS ${E.F.length}`, R.x, R.y + R.h + 28);
};
tick.S = S; S.start(); S.host.classList.add('has-canvas'); M.loop(tick);
