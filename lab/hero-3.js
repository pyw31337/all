import { ICONS, LABELS, RM } from './icons.js';
const cv = document.querySelector('#stage'), ctx = cv.getContext('2d');
const K = ['calendar', 'tent', 'cctv', 'ticket', 'dropper', 'scissors', 'bars', 'line', 'pie'];
const HOME = [[.35, .4], [.7, .25], [.9, .55], [.55, .72], [.2, .78], [.85, .88], [.15, .2], [.5, .1], [.62, .45]];
const PATH = Object.fromEntries(K.map(k => [k, new Path2D(ICONS[k])]));
let W, H, R, dpr, N = [], mx = -1e4, my = -1e4, mob, last = 0, act = 0;
const build = () => {
  dpr = Math.min(2, devicePixelRatio || 1); W = innerWidth; H = innerHeight; mob = W < 768;
  cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + 'px'; cv.style.height = H + 'px'; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  R = mob ? { x: W * .08, y: H * .08, w: W * .84, h: H * .3 } : { x: W * .5, y: H * .12, w: W * .44, h: H * .76 };
  const big = mob ? 1 : 1.25;
  N = K.map((k, i) => ({ k, hx: R.x + HOME[i][0] * R.w, hy: R.y + HOME[i][1] * R.h, r: (i === 0 ? 44 : i < 3 ? 36 : 28) * big * (mob ? .8 : 1), ph: Math.random() * 6.3 }));
  N.forEach(n => { n.x = n.hx; n.y = n.hy; n.vx = n.vy = 0; });
  // data satellites
  N.forEach((n, i) => { for (let s = 0; s < 3; s++) N.push({ k: null, p: i, a: Math.random() * 6.3, r: 3 + Math.random() * 2, x: n.x, y: n.y, vx: 0, vy: 0, ph: Math.random() * 6.3 }); });
};
build(); addEventListener('resize', build);
addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; act = performance.now(); });
addEventListener('pointerdown', e => { mx = e.clientX; my = e.clientY; act = performance.now(); });
document.addEventListener('pointerleave', () => { mx = my = -1e4; });
const links = new Map();
const frame = now => {
  const t = now / 1000; ctx.clearRect(0, 0, W, H);
  const idle = now - act > 2600; let cx = mx, cy = my;
  if (idle) { cx = R.x + R.w * (.5 + .32 * Math.cos(t * .5)); cy = R.y + R.h * (.5 + .3 * Math.sin(t * .8)); } // ghost cursor when idle
  const hubs = N.filter(n => n.k);
  hubs.forEach((n, i) => {
    const d = Math.hypot(cx - n.x, cy - n.y), pull = d < 300 ? (1 - d / 300) : 0;
    const tx = n.hx + Math.cos(t * .7 + n.ph) * 10, ty = n.hy + Math.sin(t * .9 + n.ph) * 10;
    n.vx += (tx - n.x) * .012 + (cx - n.x) * .022 * pull; n.vy += (ty - n.y) * .012 + (cy - n.y) * .022 * pull;
    hubs.forEach(m => { if (m === n) return; const dx = n.x - m.x, dy = n.y - m.y, dd = Math.hypot(dx, dy) || 1, min = n.r + m.r + 18; if (dd < min) { n.vx += dx / dd * (min - dd) * .08; n.vy += dy / dd * (min - dd) * .08; } });
    n.vx *= .86; n.vy *= .86; n.x += n.vx; n.y += n.vy; n.pull = pull;
  });
  N.filter(n => !n.k).forEach(s => { const h = N[s.p]; s.a += .01 + h.pull * .03; const rr = h.r + 16 + 8 * Math.sin(t + s.ph); s.x += (h.x + Math.cos(s.a) * rr - s.x) * .15; s.y += (h.y + Math.sin(s.a) * rr - s.y) * .15; });
  // attach/detach links between hubs that are both pulled & close
  for (let i = 0; i < hubs.length; i++) for (let j = i + 1; j < hubs.length; j++) { const a = hubs[i], b = hubs[j], key = i * 20 + j, d = Math.hypot(a.x - b.x, a.y - b.y);
    const want = (d < (mob ? 150 : 230) && (a.pull > .15 || b.pull > .15)) || (j === i + 1 && i < 2); const v = links.get(key) || 0; const nv = Math.max(0, Math.min(1, v + (want ? .05 : -.03))); nv ? links.set(key, nv) : links.delete(key); }
  links.forEach((v, key) => { const a = hubs[Math.floor(key / 20)], b = hubs[key % 20]; ctx.strokeStyle = `rgba(31,58,138,${.55 * v})`; ctx.lineWidth = 1.2 + v; ctx.setLineDash(v < .99 ? [4, 5] : []); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(a.x + (b.x - a.x) * v, a.y + (b.y - a.y) * v); ctx.stroke(); }); ctx.setLineDash([]);
  if (!idle) hubs.forEach(n => { if (n.pull > .2) { ctx.strokeStyle = `rgba(255,138,31,${.5 * n.pull})`; ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(cx, cy); ctx.stroke(); } });
  N.filter(n => !n.k).forEach(s => { ctx.fillStyle = N[s.p].pull > .3 ? '#FF8A1F' : 'rgba(31,58,138,.45)'; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 7); ctx.fill(); });
  hubs.forEach((n, i) => { ctx.save(); ctx.translate(n.x, n.y); const on = n.pull > .3;
    ctx.fillStyle = on ? '#1F3A8A' : '#fff'; ctx.strokeStyle = '#1F3A8A'; ctx.lineWidth = 1.6; ctx.shadowColor = 'rgba(31,58,138,.18)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 8;
    ctx.beginPath(); ctx.arc(0, 0, n.r, 0, 7); ctx.fill(); ctx.shadowColor = 'transparent'; ctx.stroke();
    const s = n.r * 1.05 / 24; ctx.translate(-12 * s, -12 * s); ctx.scale(s, s); ctx.lineWidth = 1.6 / s * .9; ctx.lineCap = ctx.lineJoin = 'round'; ctx.strokeStyle = on ? '#fff' : '#1F3A8A'; ctx.stroke(PATH[n.k]); ctx.restore();
    ctx.fillStyle = '#3a3f48'; ctx.font = `700 ${mob ? 11 : 13}px "Pretendard Variable", sans-serif`; ctx.textAlign = 'center'; ctx.fillText(LABELS[n.k], n.x, n.y + n.r + 18); });
  if (!RM) requestAnimationFrame(frame);
};
requestAnimationFrame(frame);
