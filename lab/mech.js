// Shared engine for hero 8–10: canvas stage, pointer (with idle ghost), path sampling, springs, batched drawing
export const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const NS = 'http://www.w3.org/2000/svg';
export const rnd = (a, b) => a + Math.random() * (b - a);
export const easeIO = t => t < .5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
export const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
export function stage(onBuild) {
  const cv = document.querySelector('#stage'), ctx = cv.getContext('2d'), S = { cv, ctx, bg: document.createElement('canvas') };
  const size = () => {
    S.dpr = Math.min(2, devicePixelRatio || 1); S.W = innerWidth; S.H = innerHeight; S.mob = S.W < 768;
    for (const c of [cv, S.bg]) { c.width = S.W * S.dpr; c.height = S.H * S.dpr; } cv.style.width = S.W + 'px'; cv.style.height = S.H + 'px';
    ctx.setTransform(S.dpr, 0, 0, S.dpr, 0, 0);
    S.R = S.mob ? { x: S.W * .06, y: S.H * .05, w: S.W * .88, h: S.H * .36 } : { x: S.W * .52, y: S.H * .12, w: S.W * .44, h: S.H * .76 };
    S.q = S.mob ? .4 : 1; drawBg(S); onBuild(S);
  };
  S.mx = -1e4; S.my = -1e4; S.act = -1e9;
  addEventListener('pointermove', e => { S.mx = e.clientX; S.my = e.clientY; S.act = performance.now(); }, { passive: true });
  addEventListener('pointerdown', e => { S.mx = e.clientX; S.my = e.clientY; S.act = performance.now(); S.onDown && S.onDown(e); });
  document.addEventListener('pointerleave', () => { S.act = -1e9; });
  let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(size, 150); });
  S.start = size; return S;
}
// pointer with ghost path when idle
export function cursor(S, now, path) {
  if (now - S.act < 2600) return { x: S.mx, y: S.my, idle: false };
  const t = now / 1000, R = S.R, [u, v] = path ? path(t) : [.5 + .38 * Math.cos(t * .42), .5 + .34 * Math.sin(t * .71)];
  return { x: R.x + R.w * u, y: R.y + R.h * v, idle: true };
}
function drawBg(S) {
  const c = S.bg.getContext('2d'), R = S.R; c.setTransform(S.dpr, 0, 0, S.dpr, 0, 0); c.clearRect(0, 0, S.W, S.H);
  const g = S.mob ? 14 : 18; c.fillStyle = 'rgba(31,58,138,.16)';
  for (let x = R.x; x <= R.x + R.w; x += g) for (let y = R.y; y <= R.y + R.h; y += g) c.fillRect(x - .5, y - .5, 1, 1);
  c.strokeStyle = 'rgba(31,58,138,.22)'; c.lineWidth = .7; c.beginPath();
  for (let x = R.x, i = 0; x <= R.x + R.w; x += g, i++) { const l = i % 5 ? 3 : 7; c.moveTo(x, R.y - 10); c.lineTo(x, R.y - 10 - l); c.moveTo(x, R.y + R.h + 10); c.lineTo(x, R.y + R.h + 10 + l); }
  for (let y = R.y, i = 0; y <= R.y + R.h; y += g, i++) { const l = i % 5 ? 3 : 7; c.moveTo(R.x + R.w + 10, y); c.lineTo(R.x + R.w + 10 + l, y); }
  c.stroke(); c.fillStyle = 'rgba(31,58,138,.4)'; c.font = '8px ui-monospace,Menlo,monospace';
  for (let x = R.x, i = 0; x <= R.x + R.w; x += g * 5, i++) c.fillText(String(i * 50).padStart(3, '0'), x + 2, R.y - 22);
}
export const bg = S => S.ctx.drawImage(S.bg, 0, 0, S.W, S.H);
export function sample(d, n, sc, ox, oy) {
  const svg = document.createElementNS(NS, 'svg'); svg.setAttribute('style', 'position:absolute;width:0;height:0;overflow:hidden');
  const p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); svg.append(p); document.body.append(svg);
  const L = p.getTotalLength(), out = [];
  for (let i = 0; i < n; i++) { const l = (i + .5) / n * L, a = p.getPointAtLength(l), b = p.getPointAtLength(Math.min(L, l + .25)), c0 = p.getPointAtLength(Math.max(0, l - .25));
    out.push({ x: ox + a.x * sc, y: oy + a.y * sc, a: Math.atan2(b.y - c0.y, b.x - c0.x) }); }
  svg.remove(); return out;
}
const wrapH = d => { d = (d + Math.PI / 2) % Math.PI; if (d < 0) d += Math.PI; return d - Math.PI / 2; };
export function spring(f, k = .085, d = .8) {
  f.vx = (f.vx + (f.tx - f.x) * k) * d; f.vy = (f.vy + (f.ty - f.y) * k) * d; f.va = (f.va + wrapH(f.ta - f.a) * k) * d;
  f.x += f.vx; f.y += f.vy; f.a += f.va;
}
export function poke(f, c, rad, pow) {
  const dx = f.x - c.x, dy = f.y - c.y, d2 = dx * dx + dy * dy; f.lit *= .93;
  if (d2 > rad * rad) return 0; const d = Math.sqrt(d2) || 1, e = (1 - d / rad) ** 2;
  f.vx += dx / d * e * pow; f.vy += dy / d * e * pow; f.va += e * .22 * (f.sg || 1); f.lit = Math.max(f.lit, e * 1.4); return e;
}
export function frag(o) { return Object.assign({ x: 0, y: 0, vx: 0, vy: 0, a: 0, va: 0, tx: 0, ty: 0, ta: 0, lit: 0, z: Math.random(), s: 1, kind: 0, l: 5, sg: Math.random() < .5 ? -1 : 1 }, o); }
// batched draw: kind 0 line, 1 tick (T-end), 3 panel (rotated square), 4 filled panel; 2 glyph (text, o.txt)
const COL = ['31,58,138', '74,100,184', '255,138,31'], AL = [.22, .5, .85], LW = [.6, .8, 1.1];
export function draw(S, F) {
  const ctx = S.ctx, B = Array.from({ length: 9 }, () => []), G = [], P = [];
  for (const f of F) { if (f.hide) continue; if (f.kind === 2) { G.push(f); continue; } if (f.kind === 4) { P.push(f); continue; }
    const c = f.hot ? 2 : f.lit > .7 ? 2 : f.lit > .18 ? 1 : 0; B[c * 3 + (f.z < .33 ? 0 : f.z < .7 ? 1 : 2)].push(f); }
  ctx.lineCap = 'round';
  B.forEach((arr, i) => { if (!arr.length) return; const c = i / 3 | 0, d = i % 3; ctx.strokeStyle = `rgba(${COL[c]},${c === 2 ? .95 : AL[d]})`; ctx.lineWidth = LW[d] + (c ? .2 : 0); ctx.beginPath();
    for (const f of arr) { const h = f.l * .5 * f.s, cx = Math.cos(f.a) * h, sy = Math.sin(f.a) * h;
      if (f.kind === 3) { ctx.moveTo(f.x - cx + sy, f.y - sy - cx); ctx.lineTo(f.x + cx + sy, f.y + sy - cx); ctx.lineTo(f.x + cx - sy, f.y + sy + cx); ctx.lineTo(f.x - cx - sy, f.y - sy + cx); ctx.closePath(); continue; }
      ctx.moveTo(f.x - cx, f.y - sy); ctx.lineTo(f.x + cx, f.y + sy);
      if (f.kind === 1) { const px = -sy * .4, py = cx * .4; ctx.moveTo(f.x + cx - px, f.y + sy - py); ctx.lineTo(f.x + cx + px, f.y + sy + py); } }
    ctx.stroke(); });
  for (const f of P) { const h = f.l * .5 * f.s; ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(f.a); ctx.fillStyle = f.hot || f.lit > .5 ? 'rgba(255,138,31,.9)' : `rgba(31,58,138,${.14 + f.z * .3})`; ctx.fillRect(-h, -h, h * 2, h * 2); ctx.restore(); }
  ctx.font = `500 ${S.mob ? 7 : 8.5}px ui-monospace,Menlo,monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  for (const f of G) { ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(f.a); ctx.globalAlpha = cl(f.s); ctx.fillStyle = f.lit > .4 ? '#FF8A1F' : `rgba(31,58,138,${.35 + f.z * .5})`; ctx.fillText(f.txt, 0, 0); ctx.restore(); }
  ctx.globalAlpha = 1;
}
export function reticle(S, c, rad, now) {
  if (c.x < -1e3) return; const ctx = S.ctx; ctx.save(); ctx.translate(c.x, c.y); ctx.strokeStyle = 'rgba(31,58,138,.35)'; ctx.lineWidth = .8;
  ctx.setLineDash([2, 4]); ctx.lineDashOffset = -now / 60; ctx.beginPath(); ctx.arc(0, 0, rad, 0, 7); ctx.stroke(); ctx.setLineDash([]);
  ctx.beginPath(); for (const [a, b] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) { ctx.moveTo(a * (rad + 4), b * (rad + 4)); ctx.lineTo(a * (rad + 12), b * (rad + 12)); } ctx.stroke();
  ctx.fillStyle = 'rgba(31,58,138,.6)'; ctx.font = '8px ui-monospace,Menlo,monospace'; ctx.textAlign = 'left'; ctx.fillText(`X ${c.x | 0}  Y ${c.y | 0}`, rad + 8, -rad - 4); ctx.restore();
}
export function loop(fn) { if (RM) { setTimeout(() => { const t0 = performance.now(); for (let i = 0; i < 400; i++) fn(t0 + i * 16, true); fn(t0 + 7000, false); }, 50); return; }
  const f = now => { fn(now, false); requestAnimationFrame(f); }; requestAnimationFrame(f); }
