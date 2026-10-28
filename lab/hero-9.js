// 9 · Living network: 600+ nodes, three scales, phases scattered → modules → chart machine; per-node hover
import * as M from './mech.js';
import { LABELS } from './icons.js';
const K = ['calendar', 'tent', 'cctv', 'ticket', 'dropper', 'scissors'], H = [6.2, 3.4, 4.6, 5.4, 2.6, 4];
let N = [], p = 0, hov = null;
const S = M.stage(build);
function build(S) {
  N = []; const R = S.R, n = Math.round(640 * S.q);
  for (let i = 0; i < n; i++) { const m = i % 6, sc = i < 24 ? 2 : i < 140 ? 1 : 0;
    N.push({ i, m, sc, x: R.x + Math.random() * R.w, y: R.y + Math.random() * R.h, vx: 0, vy: 0, hx: R.x + Math.random() * R.w, hy: R.y + Math.random() * R.h, ph: Math.random() * 6.3, lit: 0, k: 0 }); }
  const per = Array(6).fill(0); N.forEach(o => { o.k = per[o.m]++; }); N.per = per;
}
const mod = (o, t) => { const R = S.R, c = o.m % 3, r = o.m / 3 | 0, cx = R.x + R.w * (.18 + c * .32), cy = R.y + R.h * (.27 + r * .46), g = 2.39996 * o.k, rr = Math.sqrt(o.k) * (S.mob ? 2.3 : 3.6);
  const sp = t * .08 * (o.m % 2 ? 1 : -1); return [cx + Math.cos(g + sp) * rr, cy + Math.sin(g + sp) * rr]; };
const chart = o => { const R = S.R, base = R.y + R.h * .9, cw = R.w / 6, cols = S.mob ? 5 : 7, gap = S.mob ? 4.4 : 6, n = N.per[o.m], rows = Math.ceil(n / cols), hh = H[o.m] / 6.2;
  const col = o.k % cols, row = o.k / cols | 0, y = base - row * gap * hh * (R.h * .78) / (rows * gap); return [R.x + cw * (o.m + .5) + (col - (cols - 1) / 2) * gap, y]; };
M.loop((now) => {
  const ctx = S.ctx, t = now / 1000, R = S.R; ctx.clearRect(0, 0, S.W, S.H); M.bg(S);
  const c = M.cursor(S, now, t => [.5 + .48 * Math.sin(t * .32), .5 + .3 * Math.cos(t * .9)]);
  const target = S.mob ? M.cl((c.x - R.x) / R.w) * 2 : M.cl((c.x - S.W * .36) / (S.W * .58)) * 2; p += (target - p) * .045;
  const k = Math.min(1, Math.floor(p)), fr = M.easeIO(M.cl(p - k)); let best = null, bd = 900;
  for (const o of N) {
    const a0 = [o.hx + Math.cos(t * .5 + o.ph) * 14, o.hy + Math.sin(t * .6 + o.ph) * 14], a1 = mod(o, t), a2 = chart(o);
    const A = k === 0 ? a0 : a1, B = k === 0 ? a1 : a2, tx = A[0] + (B[0] - A[0]) * fr, ty = A[1] + (B[1] - A[1]) * fr;
    const dx = o.x - c.x, dy = o.y - c.y, d2 = dx * dx + dy * dy, rad = S.mob ? 50 : 90;
    if (d2 < rad * rad) { const d = Math.sqrt(d2) || 1, e = (1 - d / rad) ** 2; o.vx += dx / d * e * 1.4; o.vy += dy / d * e * 1.4; o.lit = Math.max(o.lit, e * 1.5); if (d2 < bd) { bd = d2; best = o; } }
    o.lit *= .94; const st = .06 + (o.i % 7) * .006; o.vx = (o.vx + (tx - o.x) * st) * .8; o.vy = (o.vy + (ty - o.y) * st) * .8; o.x += o.vx; o.y += o.vy;
  }
  hov = best;
  // links: within module chain (fade out in chart phase), ladder links in chart
  const la = p < 1 ? .1 + .25 * p : .35 * (2 - p);
  if (la > .01) { ctx.strokeStyle = `rgba(31,58,138,${la})`; ctx.lineWidth = .5; ctx.beginPath(); const byM = Array.from({ length: 6 }, () => []); N.forEach(o => byM[o.m].push(o));
    byM.forEach(a => { for (let i = 1; i < a.length; i++) { const b = a[i], q = a[Math.max(0, i - (i % 3 ? 1 : 3))]; if (Math.abs(b.x - q.x) + Math.abs(b.y - q.y) < 90) { ctx.moveTo(q.x, q.y); ctx.lineTo(b.x, b.y); } } }); ctx.stroke(); }
  // module frames (phase ~1)
  const fa = 1 - Math.abs(p - 1); if (fa > .05) { ctx.strokeStyle = `rgba(31,58,138,${.4 * fa})`; ctx.lineWidth = .8; ctx.fillStyle = `rgba(31,58,138,${.7 * fa})`; ctx.font = '8.5px ui-monospace,Menlo,monospace'; ctx.textAlign = 'left';
    for (let m = 0; m < 6; m++) { const [x, y] = mod({ m, k: 0 }, 0), s = S.mob ? 34 : 60, b = 8; ctx.beginPath();
      for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) { ctx.moveTo(x + sx * s, y + sy * s - sy * b); ctx.lineTo(x + sx * s, y + sy * s); ctx.lineTo(x + sx * s - sx * b, y + sy * s); } ctx.stroke();
      ctx.fillText(`M-0${m + 1}  ${LABELS[K[m]]}`, x - s, y - s - 6); } }
  // chart axis + trend (phase ~2)
  const ca = M.cl(p - 1); if (ca > .02) { const base = R.y + R.h * .9 + 6; ctx.strokeStyle = `rgba(17,20,24,${.5 * ca})`; ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(R.x, base); ctx.lineTo(R.x + R.w, base);
    for (let i = 0; i <= 60; i++) { const x = R.x + R.w * i / 60; ctx.moveTo(x, base); ctx.lineTo(x, base + (i % 10 ? 3 : 7)); } ctx.stroke();
    const tops = [0, 1, 2, 3, 4, 5].map(m => N.filter(o => o.m === m).reduce((a, b) => b.y < a.y ? b : a)); ctx.strokeStyle = `rgba(255,138,31,${ca})`; ctx.lineWidth = 1.4; ctx.beginPath();
    tops.forEach((o, i) => i ? ctx.lineTo(o.x, o.y - 10) : ctx.moveTo(o.x, o.y - 10)); ctx.stroke(); }
  // nodes by scale, batched
  for (const sc of [0, 1, 2]) { const r = [1.1, 1.9, 3.2][sc]; for (const lit of [0, 1]) { ctx.beginPath(); let any = 0;
    for (const o of N) { if (o.sc !== sc || (o.lit > .4) !== !!lit) continue; any = 1; const rr = r * (1 + o.lit * .9); ctx.moveTo(o.x + rr, o.y); ctx.arc(o.x, o.y, rr, 0, 6.29); }
    if (!any) continue; if (sc === 2) { ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = lit ? '#FF8A1F' : '#1F3A8A'; ctx.lineWidth = 1; ctx.stroke(); } else { ctx.fillStyle = lit ? 'rgba(74,100,184,.95)' : `rgba(31,58,138,${sc ? .7 : .38})`; ctx.fill(); } } }
  if (hov) { const o = hov; ctx.strokeStyle = '#FF8A1F'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(o.x, o.y, 9, 0, 7); ctx.moveTo(o.x - 16, o.y); ctx.lineTo(o.x - 11, o.y); ctx.moveTo(o.x + 11, o.y); ctx.lineTo(o.x + 16, o.y); ctx.stroke();
    ctx.fillStyle = '#111418'; ctx.font = '9px ui-monospace,Menlo,monospace'; ctx.textAlign = 'left'; ctx.fillText(`R-${String(o.i).padStart(4, '0')} · M-0${o.m + 1}`, o.x + 14, o.y - 10); }
  ctx.fillStyle = 'rgba(31,58,138,.6)'; ctx.font = '9px ui-monospace,Menlo,monospace'; ctx.textAlign = 'left';
  const ph = ['SCATTERED RECORDS', 'CLUSTERED MODULES', 'ALIGNED CHART'][Math.round(p)]; ctx.fillText(`PHASE ${Math.round(p) + 1}/3 · ${ph} · NODES ${N.length}`, R.x, R.y + R.h + 30);
});
S.start();
