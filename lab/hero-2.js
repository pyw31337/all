import { RM } from './icons.js';
const cv = document.querySelector('#stage'), ctx = cv.getContext('2d'), steps = document.querySelectorAll('.steps li');
let W, H, R, dpr, F = [], p = 0, tp = 0, last = performance.now(), mob;
const rnd = (a, b) => a + Math.random() * (b - a);
const DIG = '0123456789'.split('');
const build = () => {
  dpr = Math.min(2, devicePixelRatio || 1); W = innerWidth; H = innerHeight; mob = W < 768;
  cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + 'px'; cv.style.height = H + 'px'; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  R = mob ? { x: W * .06, y: H * .08, w: W * .88, h: H * .32 } : { x: W * .52, y: H * .16, w: W * .42, h: H * .66 };
  F = []; const bars = [3, 5, 4, 6, 8, 7, 10, 12], bw = R.w / 14, base = R.y + R.h * .92, cell = R.h * .055;
  bars.forEach((n, bi) => { for (let k = 0; k < n; k++) F.push({ k: k % 3 === 0 ? 'note' : k % 3 === 1 ? 'tick' : 'digit', tx: R.x + bw * (1 + bi * 1.6), ty: base - (k + 1) * cell, tw: bw, th: cell * .78, bar: bi }); });
  const pts = bars.map((n, bi) => [R.x + bw * (1.5 + bi * 1.6), base - (n + 1.6) * cell]);
  pts.forEach(([x, y], i) => F.push({ k: 'dot', tx: x, ty: y, tw: 9, th: 9, pt: i }));
  F.forEach((f, i) => { f.sx = rnd(R.x - R.w * .1, R.x + R.w * 1.05); f.sy = rnd(R.y - R.h * .05, R.y + R.h * 1.02); f.rot = rnd(-.8, .8); f.ph = rnd(0, 6.3); f.d = rnd(0, .35); f.dg = DIG[i % 10]; });
  F.pts = pts; F.base = base;
};
build(); addEventListener('resize', build);
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
let idle = 0, input = 0;
addEventListener('pointermove', e => { input = performance.now(); tp = Math.max(0, Math.min(1, (e.clientX / W - .15) / .7)); if (mob) tp = Math.max(0, Math.min(1, 1 - e.clientY / H * 1.3)); });
addEventListener('scroll', () => { input = performance.now(); tp = Math.min(1, scrollY / (H * .5)); }, { passive: true });
const frame = now => {
  const dt = Math.min(50, now - last); last = now;
  if (now - input > 3500) tp = (Math.sin(now / 2600) + 1) / 2; // idle autoplay
  p += (tp - p) * Math.min(1, dt / 260); if (RM) p = 1;
  ctx.clearRect(0, 0, W, H); const t = now / 1000;
  const pos = F.map(f => { const q = ease(Math.max(0, Math.min(1, (p - f.d) / (1 - .35)))); const dr = (1 - q) * 8;
    return [f.sx + (f.tx - f.sx) * q + Math.cos(t + f.ph) * dr, f.sy + (f.ty - f.sy) * q + Math.sin(t * 1.2 + f.ph) * dr, f.rot * (1 - q), q]; });
  // threads: scattered -> data
  const mid = Math.sin(Math.PI * Math.min(1, p * 1.4)); if (mid > .02) { ctx.strokeStyle = `rgba(31,58,138,${.18 * mid})`; ctx.lineWidth = 1; ctx.beginPath();
    for (let i = 0; i < pos.length; i++) for (let j = i + 1; j < Math.min(pos.length, i + 7); j++) { const a = pos[i], b = pos[j]; if (Math.hypot(a[0] - b[0], a[1] - b[1]) < 90) { ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); } } ctx.stroke(); }
  F.forEach((f, i) => { const [x, y, r, q] = pos[i]; ctx.save(); ctx.translate(x, y); ctx.rotate(r);
    const col = q > .95 ? (f.bar >= 6 ? '#1F3A8A' : '#4A64B8') : '#3b3f47';
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 1.3;
    const w = 26 + (f.tw - 26) * q, h = 16 + (f.th - 16) * q;
    if (f.k === 'dot') { ctx.globalAlpha = .4 + .6 * q; ctx.beginPath(); ctx.arc(0, 0, 3 + 2 * q, 0, 7); q > .9 ? (ctx.fillStyle = '#FF8A1F', ctx.fill()) : ctx.stroke(); }
    else if (q > .9) { ctx.globalAlpha = .85; ctx.fillRect(-w / 2, -h / 2, w, h); }
    else if (f.k === 'note') { ctx.globalAlpha = .7; ctx.strokeRect(-w / 2, -h / 2, w, h); ctx.beginPath(); ctx.moveTo(-w / 2 + 4, -2); ctx.lineTo(w / 2 - 6, -2); ctx.moveTo(-w / 2 + 4, 3); ctx.lineTo(w / 4, 3); ctx.stroke(); }
    else if (f.k === 'tick') { ctx.globalAlpha = .6; ctx.beginPath(); for (let k = 0; k < 4; k++) { ctx.moveTo(-8 + k * 5, -7); ctx.lineTo(-9 + k * 5, 7); } ctx.moveTo(-11, 4); ctx.lineTo(10, -4); ctx.stroke(); }
    else { ctx.globalAlpha = .75; ctx.font = '26px "Nanum Pen Script", cursive'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(f.dg, 0, 0); }
    ctx.restore(); });
  // insight line + axis
  const lp = Math.max(0, (p - .7) / .3); if (lp > 0) { ctx.globalAlpha = lp; ctx.strokeStyle = '#FF8A1F'; ctx.lineWidth = 2.4; ctx.lineJoin = 'round'; ctx.beginPath();
    const n = Math.max(1, Math.floor(lp * (F.pts.length - 1)) + 1); F.pts.slice(0, n + 1).forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke();
    ctx.strokeStyle = '#111418'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(R.x, F.base); ctx.lineTo(R.x + R.w, F.base); ctx.stroke();
    const [ex, ey] = F.pts[F.pts.length - 1]; ctx.fillStyle = '#1F3A8A'; ctx.font = `800 ${mob ? 26 : 40}px "Pretendard Variable", sans-serif`; ctx.textAlign = 'right'; ctx.fillText('Insight', ex + 8, ey - 22); ctx.globalAlpha = 1; }
  steps.forEach((s, i) => s.classList.toggle('on', p >= [0, .35, .8][i] && (i === 2 || p < [.35, .8][i])));
  if (!RM) requestAnimationFrame(frame);
};
requestAnimationFrame(frame);
