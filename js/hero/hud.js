// HUD primitives for hero 11–14 (thin navy lines, orange only for locks)
import * as M from './mech.js?v=20261028-17';
import { LABELS } from './icons.js?v=20261028-17';
export const PK = ['calendar', 'tent', 'cctv', 'ticket', 'dropper', 'scissors'];
export const PN = PK.map(k => LABELS[k]);
const NAV = a => `rgba(31,58,138,${a})`, OR = a => `rgba(255,138,31,${a})`, MONO = s => `${s}px ui-monospace,Menlo,monospace`;
export const type = (s, p) => s.slice(0, Math.max(0, Math.round(s.length * M.cl(p))));
export function rulers(S, c, now) {
  const ctx = S.ctx, W = S.W, H = S.H, m = 12, g = S.mob ? 12 : 16; ctx.strokeStyle = NAV(.28); ctx.lineWidth = .7; ctx.beginPath();
  for (let x = m, i = 0; x < W - m; x += g, i++) { const l = i % 10 === 0 ? 9 : i % 5 === 0 ? 6 : 3; ctx.moveTo(x, m); ctx.lineTo(x, m + l); ctx.moveTo(x, H - m); ctx.lineTo(x, H - m - l); }
  for (let y = m, i = 0; y < H - m; y += g, i++) { const l = i % 10 === 0 ? 9 : i % 5 === 0 ? 6 : 3; ctx.moveTo(m, y); ctx.lineTo(m + l, y); ctx.moveTo(W - m, y); ctx.lineTo(W - m - l, y); }
  ctx.stroke(); ctx.fillStyle = NAV(.45); ctx.font = MONO(7.5); ctx.textAlign = 'left';
  for (let x = m, i = 0; x < W - m; x += g * 10, i++) ctx.fillText(String(i * 10).padStart(3, '0'), x + 2, m + 18);
  if (c.x > -1e3) { ctx.fillStyle = OR(.9); for (const [x, y, dx, dy] of [[c.x, m + 11, 0, 1], [c.x, H - m - 11, 0, -1], [m + 11, c.y, 1, 0], [W - m - 11, c.y, -1, 0]]) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 4 * dy - 4 * dx, y - 4 * dx - 4 * dy); ctx.lineTo(x + 4 * dy - 4 * dx, y + 4 * dx - 4 * dy); ctx.fill(); }
    ctx.fillStyle = NAV(.7); ctx.font = MONO(8); ctx.fillText(`X ${String(c.x | 0).padStart(4, '0')}`, c.x + 6, H - m - 16); ctx.fillText(`Y ${String(c.y | 0).padStart(4, '0')}`, W - m - 58, c.y - 5);
    ctx.strokeStyle = NAV(.08); ctx.setLineDash([2, 5]); ctx.beginPath(); ctx.moveTo(c.x, m + 12); ctx.lineTo(c.x, H - m - 12); ctx.moveTo(m + 12, c.y); ctx.lineTo(W - m - 12, c.y); ctx.stroke(); ctx.setLineDash([]); }
}
export function arcs(ctx, x, y, r, n, rot, gap = .35, a = .45, w = 1.2) { ctx.strokeStyle = NAV(a); ctx.lineWidth = w; const s = Math.PI * 2 / n; ctx.beginPath(); for (let i = 0; i < n; i++) { const a0 = rot + i * s; ctx.moveTo(x + Math.cos(a0) * r, y + Math.sin(a0) * r); ctx.arc(x, y, r, a0, a0 + s * (1 - gap)); } ctx.stroke(); }
export function tickRing(ctx, x, y, r, n, rot, a = .4, lab) { ctx.strokeStyle = NAV(a); ctx.lineWidth = .7; ctx.beginPath(); for (let i = 0; i < n; i++) { const t = rot + i / n * Math.PI * 2, l = i % 10 === 0 ? 8 : i % 5 === 0 ? 5 : 2.5; ctx.moveTo(x + Math.cos(t) * r, y + Math.sin(t) * r); ctx.lineTo(x + Math.cos(t) * (r - l), y + Math.sin(t) * (r - l)); } ctx.stroke();
  if (lab) { ctx.fillStyle = NAV(.5); ctx.font = MONO(7.5); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; for (let d = 0; d < 360; d += 30) { const t = rot + d / 180 * Math.PI - Math.PI / 2; ctx.fillText(String(d).padStart(3, '0'), x + Math.cos(t) * (r + 10), y + Math.sin(t) * (r + 10)); } ctx.textBaseline = 'alphabetic'; } }
export function brackets(ctx, x, y, s, p, hot = true) { const e = 1 - (1 - M.cl(p)) ** 3, d = s * (2.2 - 1.2 * e), b = s * .45; ctx.strokeStyle = hot ? OR(.95 * e + .05) : NAV(.6 * e); ctx.lineWidth = 1.2; ctx.beginPath();
  for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) { ctx.moveTo(x + sx * d, y + sy * (d - b)); ctx.lineTo(x + sx * d, y + sy * d); ctx.lineTo(x + sx * (d - b), y + sy * d); } ctx.stroke(); }
export function callout(ctx, x, y, lx, ly, lines, p, hot = true) { const p1 = M.cl(p * 3), p2 = M.cl(p * 3 - 1), ex = x + (lx - x) * .45; ctx.strokeStyle = hot ? OR(.8) : NAV(.5); ctx.lineWidth = .9; ctx.beginPath(); ctx.moveTo(x, y);
  const mx = x + (ex - x) * p1, my = y + (ly - y) * p1; ctx.lineTo(mx, my); if (p1 >= 1) ctx.lineTo(ex + (lx - ex) * p2, ly); ctx.stroke(); if (p2 < 1) return;
  let right = lx >= x; const Wc = ctx.canvas.width / (ctx.getTransform().a || 1); let mw = 0; lines.forEach((s, i) => { ctx.font = i === 0 ? `700 12px "Pretendard Variable",sans-serif` : MONO(8.5); mw = Math.max(mw, ctx.measureText(s).width); }); if (right && lx + 6 + mw > Wc - 8) right = false; else if (!right && lx - 6 - mw < 8) right = true; ctx.textAlign = right ? 'left' : 'right'; const tx = Math.max(8, Math.min(Wc - 8, lx + (right ? 6 : -6))), pt = M.cl(p * 3 - 2);
  lines.forEach((s, i) => { ctx.fillStyle = i === 0 ? '#111418' : NAV(.7); ctx.font = i === 0 ? `700 ${12}px "Pretendard Variable",sans-serif` : MONO(8.5); ctx.fillText(type(s, pt * 1.4 - i * .2), tx, ly + 4 + i * 14 - (lines.length > 1 ? 4 : 0)); }); }
export function boot(S, t, lines = []) { // t seconds since load; returns reveal 0..1
  const ctx = S.ctx, p = M.cl(t / 1.4); if (p >= 1 && t > 3.2) return 1; const y = S.H * p;
  if (p < 1) { const g = ctx.createLinearGradient(0, y - 60, 0, y); g.addColorStop(0, NAV(0)); g.addColorStop(1, NAV(.08)); ctx.fillStyle = g; ctx.fillRect(S.R.x - 20, y - 60, S.R.w + 40, 60); ctx.strokeStyle = NAV(.5); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(S.R.x - 20, y); ctx.lineTo(S.R.x + S.R.w + 20, y); ctx.stroke(); }
  ctx.fillStyle = NAV(.6 * M.cl(3.2 - t)); ctx.font = MONO(8.5); ctx.textAlign = 'left'; lines.forEach((s, i) => ctx.fillText(type(s, (t - .2 - i * .35) * 2.2), S.R.x, S.R.y + 14 + i * 13)); return p; }
export const nav = NAV, orange = OR, mono = MONO;
