// 10 · Morph: thousands of line fragments rebuild calendar → tent → CCTV → ticket with panel-flip sweeps; cursor warps a lens
import { ICONS, LABELS } from './icons.js';
import * as M from './mech.js';
const K = ['calendar', 'tent', 'cctv', 'ticket']; let F = [], T = [], cur = 0, nextAt = 0, cx, cy;
const S = M.stage(build);
function targets(k, n, R) { const Z = Math.min(R.w, R.h) * .86, sc = Z / 24, ox = cx - 12 * sc, oy = cy - 12 * sc, main = Math.round(n * .62), out = [];
  const P = M.sample(ICONS[k], main, sc, ox, oy); P.forEach((p, i) => { const o = (i % 3 - 1) * 2.4; out.push({ x: p.x - Math.sin(p.a) * o, y: p.y + Math.cos(p.a) * o, a: p.a, l: sc * .42, kind: 0 }); });
  const Q = M.sample(ICONS[k], n - main, sc, ox, oy); Q.forEach((p, i) => { const o = (i % 2 ? 1 : -1) * M.rnd(7, 16); out.push({ x: p.x - Math.sin(p.a) * o, y: p.y + Math.cos(p.a) * o, a: p.a + Math.PI / 2, l: M.rnd(2, 5), kind: i % 11 === 0 ? 1 : 0, far: 1 }); });
  return out.sort((a, b) => Math.atan2(a.y - cy, a.x - cx) - Math.atan2(b.y - cy, b.x - cx)); }
function build(S) { const R = S.R; cx = R.x + R.w / 2; cy = R.y + R.h * .47; const n = Math.round(2200 * S.q + 300);
  T = K.map(k => targets(k, n, R)); F = T[0].map(t => M.frag({ x: t.x + M.rnd(-300, 300), y: t.y + M.rnd(-300, 300), a: M.rnd(0, 6), l: t.l, kind: t.kind, z: t.far ? M.rnd(0, .3) : M.rnd(.4, 1), sw: 0 }));
  cur = 0; assign(0, performance.now()); nextAt = performance.now() + 4200; }
function assign(k, now) { const R = S.R; T[k].forEach((t, i) => { const f = F[i]; f.nt = t; f.sw = now + ((t.x - R.x) / R.w) * 700 + M.rnd(0, 160); }); }
M.loop((now) => {
  const ctx = S.ctx, R = S.R; ctx.clearRect(0, 0, S.W, S.H); M.bg(S);
  if (now > nextAt) { cur = (cur + 1) % K.length; assign(cur, now); nextAt = now + 4200; }
  const c = M.cursor(S, now), lens = S.mob ? 70 : 130;
  for (const f of F) {
    const dt = now - f.sw; if (f.nt && dt > 0) { f.tx = f.nt.x; f.ty = f.nt.y; f.ta = f.nt.a; f.l += (f.nt.l - f.l) * .2; f.kind = f.nt.kind; }
    f.s = dt > 0 && dt < 520 ? Math.abs(Math.cos(dt / 520 * Math.PI)) * .9 + .1 : 1; // panel flip
    if (dt > 0 && dt < 260) f.lit = Math.max(f.lit, .3);
    M.spring(f, .07, .79);
    const dx = f.x - c.x, dy = f.y - c.y, d = Math.hypot(dx, dy); f.lit *= .92; f.wx = 0; f.wy = 0;
    if (d < lens) { const e = Math.sin((1 - d / lens) * Math.PI / 2), push = e * 26; f.wx = dx / (d || 1) * push; f.wy = dy / (d || 1) * push; f.lit = Math.max(f.lit, e); f.a += e * .05 * f.sg; }
  }
  const view = F.map(f => (f.ox = f.x, f.oy = f.y, f.x += f.wx, f.y += f.wy, f)); M.draw(S, view); F.forEach(f => { f.x = f.ox; f.y = f.oy; });
  if (!c.idle) M.reticle(S, c, lens, now);
  // rail
  const y = R.y + R.h + 22; ctx.font = '9px ui-monospace,Menlo,monospace'; ctx.textAlign = 'left';
  K.forEach((k, i) => { const x = R.x + i * R.w / 4; ctx.fillStyle = i === cur ? '#111418' : 'rgba(31,58,138,.45)'; ctx.fillText(`${String(i + 1).padStart(2, '0')} ${LABELS[k]}`, x, y);
    ctx.fillStyle = i === cur ? '#FF8A1F' : 'rgba(31,58,138,.18)'; ctx.fillRect(x, y + 8, R.w / 4 - 12, 1.5); });
  ctx.fillStyle = '#FF8A1F'; ctx.fillRect(R.x + cur * R.w / 4, y + 8, (R.w / 4 - 12) * M.cl(1 - (nextAt - now) / 4200), 1.5);
  ctx.fillStyle = 'rgba(31,58,138,.55)'; ctx.fillText(`FRAGMENTS ${F.length}`, R.x + R.w - 110, R.y - 6);
});
S.start();
