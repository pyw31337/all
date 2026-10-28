import { ICONS, LABELS, RM } from './icons.js';
const MODE = document.body.dataset.mode; // align | near | flow
const cv = document.querySelector('#stage'), ctx = cv.getContext('2d');
const K = ['calendar', 'tent', 'cctv', 'ticket', 'dropper', 'scissors'];
const VAL = [5, 3, 4, 6, 2, 4];               // records per project (visual only)
const HOME = [[.3, .35], [.72, .22], [.88, .6], [.52, .7], [.18, .75], [.6, .42]];
const PATH = Object.fromEntries(K.map(k => [k, new Path2D(ICONS[k])]));
const STAGES = ['기록', '데이터', '인사이트', '비지니스'];
let W, H, R, dpr, mob, hubs = [], recs = [], mx = -1, my = -1, act = -1e9, f = 0;
const lerp = (a, b, t) => a + (b - a) * t, ease = t => t < .5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2, cl = v => Math.max(0, Math.min(1, v));
const build = () => {
  dpr = Math.min(2, devicePixelRatio || 1); W = innerWidth; H = innerHeight; mob = W < 768;
  cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + 'px'; cv.style.height = H + 'px'; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  R = mob ? { x: W * .07, y: H * .07, w: W * .86, h: H * .32 } : { x: W * .55, y: H * .14, w: W * .4, h: H * .72 };
  const r = mob ? 18 : 26;
  hubs = K.map((k, i) => ({ k, i, hx: R.x + HOME[i][0] * R.w, hy: R.y + HOME[i][1] * R.h, r, ph: i * 1.7 }));
  recs = []; hubs.forEach(h => { h.x = h.hx; h.y = h.hy; for (let j = 0; j < VAL[h.i]; j++) recs.push({ h, j, a: Math.random() * 6.3, d: h.r + 14 + Math.random() * 22, ph: Math.random() * 6.3, x: h.hx, y: h.hy }); });
};
build(); addEventListener('resize', build);
addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; act = performance.now(); }, { passive: true });
addEventListener('pointerdown', e => { mx = e.clientX; my = e.clientY; act = performance.now(); });
document.addEventListener('pointerleave', () => { act = -1e9; });
// target layouts
const colX = i => R.x + R.w * (.1 + i * .16), base = () => R.y + R.h * .86, unit = () => R.h * (mob ? .1 : .085);
const organic = (n, t) => n.h ? [n.h.x + Math.cos(n.a + t * .4) * n.d, n.h.y + Math.sin(n.a + t * .4) * n.d] : [n.hx + Math.cos(t * .7 + n.ph) * 10, n.hy + Math.sin(t * .9 + n.ph) * 10];
const bars = n => n.h ? [colX(n.h.i), base() - unit() * (n.j + 1) - 6] : [colX(n.i), base() + n.r + 12];
const grid = n => n.h ? [R.x + R.w * (.12 + n.j * .1), R.y + R.h * (.12 + n.h.i * .12)] : [R.x + R.w * .04, R.y + R.h * (.12 + n.i * .12)];
const trend = n => { const tops = [2, 3, 3.6, 4.6, 5.4, 6.4]; if (n.h) { const i = n.h.i; return [colX(i) + (n.j - VAL[i] / 2) * 3, base() - unit() * tops[i] - 6]; } return [colX(n.i), base() - unit() * tops[n.i] - 40]; };
const frame = now => {
  const t = now / 1000, idle = now - act > 2600; ctx.clearRect(0, 0, W, H);
  let cx = mx, cy = my;
  if (idle) { const s = (Math.sin(t * .55) + 1) / 2; cx = R.x + R.w * (MODE === 'near' ? .5 + .45 * Math.cos(t * .45) : s); cy = R.y + R.h * (MODE === 'near' ? .55 + .3 * Math.sin(t * .7) : .5); }
  const all = [...hubs, ...recs];
  // progress
  if (MODE === 'align') { const tgt = mob ? cl((cx - R.x) / R.w) : cl((cx - W * .35) / (W * .55)); f += (ease(tgt) - f) * .06; }
  if (MODE === 'flow') { const tgt = mob ? cl((cx - R.x) / R.w) * 3 : cl((cx - W * .4) / (W * .52)) * 3; f += (tgt - f) * .05; }
  hubs.forEach(h => { const [ox, oy] = organic(h, t); h.ox = ox; h.oy = oy; });
  all.forEach(n => {
    let tx, ty, a = 0; if (n.h) { n.ox = n.h.ox + Math.cos(n.a + t * .4) * n.d; n.oy = n.h.oy + Math.sin(n.a + t * .4) * n.d; }
    const [ox, oy] = [n.ox, n.oy];
    if (MODE === 'align') { a = f; const [bx, by] = bars(n); tx = lerp(ox, bx, a); ty = lerp(oy, by, a); }
    else if (MODE === 'near') { const d = Math.hypot(cx - (n.h ? n.h.hx : n.hx), cy - (n.h ? n.h.hy : n.hy)); a = ease(cl(1.25 - d / (mob ? 200 : 320))); n.al = (n.al || 0) + (a - (n.al || 0)) * .08; a = n.al;
      const [bx, by] = bars(n); tx = lerp(ox, bx, a); ty = lerp(oy, by, a); }
    else { const s = Math.min(2.999, Math.max(0, f)), k = Math.floor(s), fr = ease(s - k); const L = [p => [p.ox, p.oy], grid, bars, trend]; const [x0, y0] = L[k](n), [x1, y1] = L[k + 1](n); tx = lerp(x0, x1, fr); ty = lerp(y0, y1, fr); a = s / 3; }
    n.x = n.h || !n.hx ? lerp(n.x, tx, .16) : lerp(n.x, tx, .16); n.y = lerp(n.y, ty, .16); n.a2 = a;
  });
  // organic links (fade as order rises)
  recs.forEach(n => { const o = 1 - n.a2; if (o < .02) return; ctx.strokeStyle = `rgba(31,58,138,${.22 * o})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(n.h.x, n.h.y); ctx.lineTo(n.x, n.y); ctx.stroke(); });
  for (let i = 0; i < hubs.length; i++) { const a = hubs[i], b = hubs[(i + 1) % hubs.length], o = 1 - Math.max(a.a2, b.a2); if (o < .02) continue; ctx.strokeStyle = `rgba(31,58,138,${.3 * o})`; ctx.setLineDash([4, 6]); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); } ctx.setLineDash([]);
  // axis + order guides
  const ord = MODE === 'near' ? Math.max(...hubs.map(h => h.a2)) : MODE === 'flow' ? cl(f - 1) : f;
  if (ord > .02) { ctx.strokeStyle = `rgba(17,20,24,${.35 * ord})`; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(R.x, base()); ctx.lineTo(R.x + R.w, base()); ctx.stroke();
    for (let g = 1; g <= 6; g++) { ctx.strokeStyle = `rgba(17,20,24,${.06 * ord})`; ctx.beginPath(); ctx.moveTo(R.x, base() - unit() * g - 6); ctx.lineTo(R.x + R.w, base() - unit() * g - 6); ctx.stroke(); } }
  // orange line across column tops
  const line = MODE === 'flow' ? cl(f - 2) : MODE === 'align' ? cl(f * 1.4 - .4) : 0;
  if (line > .01) { const tops = hubs.map(h => { const rs = recs.filter(r => r.h === h); return rs.reduce((m, r) => r.y < m.y ? r : m, rs[0]); });
    ctx.strokeStyle = '#FF8A1F'; ctx.lineWidth = 2.4; ctx.lineCap = 'round'; ctx.beginPath(); const n = Math.max(1, Math.floor(line * (tops.length - 1) + 1));
    tops.slice(0, n + 1).forEach((p, i) => i ? ctx.lineTo(p.x, p.y - 12) : ctx.moveTo(p.x, p.y - 12)); ctx.stroke(); }
  // records
  recs.forEach(n => { const o = n.a2; ctx.fillStyle = o > .6 ? '#1F3A8A' : `rgba(31,58,138,${.45 + .4 * o})`; const s = 4 + 4 * o; ctx.beginPath(); if (o > .3) ctx.roundRect(n.x - s * 1.6, n.y - s * .8, s * 3.2, s * 1.6, 3); else ctx.arc(n.x, n.y, 4, 0, 7); ctx.fill(); });
  // hubs
  hubs.forEach(n => { ctx.save(); ctx.translate(n.x, n.y); const on = n.a2 > .5; ctx.fillStyle = on ? '#1F3A8A' : '#fff'; ctx.strokeStyle = '#1F3A8A'; ctx.lineWidth = 1.6; ctx.shadowColor = 'rgba(31,58,138,.18)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 6; ctx.beginPath(); ctx.arc(0, 0, n.r, 0, 7); ctx.fill(); ctx.shadowColor = 'transparent'; ctx.stroke();
    const s = n.r * 1.05 / 24; ctx.translate(-12 * s, -12 * s); ctx.scale(s, s); ctx.lineWidth = 1.5 / s * .9; ctx.lineCap = ctx.lineJoin = 'round'; ctx.strokeStyle = on ? '#fff' : '#1F3A8A'; ctx.stroke(PATH[n.k]); ctx.restore();
    ctx.fillStyle = '#3a3f48'; ctx.font = `700 ${mob ? 10 : 12}px "Pretendard Variable", sans-serif`; ctx.textAlign = 'center'; ctx.fillText(LABELS[n.k], n.x, n.y + n.r + 16); });
  // stage rail (flow)
  if (MODE === 'flow') { const y = R.y + R.h + (mob ? 26 : 40); ctx.strokeStyle = '#E4E7EC'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(R.x, y); ctx.lineTo(R.x + R.w, y); ctx.stroke();
    ctx.strokeStyle = '#1F3A8A'; ctx.beginPath(); ctx.moveTo(R.x, y); ctx.lineTo(R.x + R.w * f / 3, y); ctx.stroke();
    STAGES.forEach((s, i) => { const x = R.x + R.w * i / 3, on = f >= i - .5; ctx.fillStyle = on ? (i === 3 ? '#FF8A1F' : '#1F3A8A') : '#C9CED6'; ctx.beginPath(); ctx.arc(x, y, 6, 0, 7); ctx.fill(); ctx.fillStyle = on ? '#111418' : '#8a919c'; ctx.font = `700 ${mob ? 11 : 13}px "Pretendard Variable", sans-serif`; ctx.textAlign = i === 0 ? 'left' : i === 3 ? 'right' : 'center'; ctx.fillText(s, x, y + 24); }); }
  if (!RM) requestAnimationFrame(frame);
};
requestAnimationFrame(frame);
