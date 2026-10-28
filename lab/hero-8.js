// 8 · Assembly: hundreds of mechanical fragments fly in and interlock into a calendar/data emblem
import { ICONS } from './icons.js';
import * as M from './mech.js';
let F = [], C = {}, T0 = 0, explodeAt = -1;
const S = M.stage(build);
function build(S) {
  F = []; const R = S.R, q = S.q, cx = R.x + R.w * (S.mob ? .5 : .56), cy = R.y + R.h / 2, Z = Math.min(R.w, R.h) * (S.mob ? .47 : .43); C = { cx, cy, Z };
  const add = (o, grp, order) => { const f = M.frag(o); f.grp = grp; f.order = order; const a = M.rnd(0, 6.3), d = M.rnd(.7, 1.3) * Math.max(S.W, S.H) * .6;
    f.x = cx + Math.cos(a) * d; f.y = cy + Math.sin(a) * d; f.a = M.rnd(0, 6.3); f.sx = f.x; f.sy = f.y; F.push(f); return f; };
  const polar = (r, th, grp, o) => add(Object.assign({ pr: r, pth: th }, o), grp, th / 6.3);
  // ring 0: outer dashed arc segments (tangent)
  const n0 = Math.round(150 * q + 40); for (let i = 0; i < n0; i++) { const th = i / n0 * 6.283; if (i % 25 > 21) continue; polar(Z * .97, th, 0, { l: 2 * Math.PI * Z * .97 / n0 * .72, tang: 1, z: .8 }); }
  // ring 1: radial ticks, major every 10
  const n1 = Math.round(180 * q + 60); for (let i = 0; i < n1; i++) { const th = i / n1 * 6.283, maj = i % 10 === 0; polar(Z * (maj ? .885 : .9), th, 1, { l: maj ? 11 : 4, kind: maj ? 1 : 0, rad: 1, z: maj ? .9 : .5 }); }
  // glyphs on ring 1
  for (let i = 0; i < 24; i++) polar(Z * .82, i / 24 * 6.283, 1, { kind: 2, txt: String(i).padStart(2, '0'), rad: 1, z: .6 });
  // ring 2: inner thin dashes
  const n2 = Math.round(110 * q + 30); for (let i = 0; i < n2; i++) polar(Z * .74, i / n2 * 6.283, 2, { l: 3, tang: 1, z: .3 });
  // crosshair dashes
  for (const k of [0, 1, 2, 3]) for (let j = 0; j < 8; j++) polar(Z * (1.03 + j * .035), k * Math.PI / 2, 3, { l: Z * .025, rad: 1, z: .7 });
  // calendar icon, multi-line (main + two offset rails)
  const sc = Z * 1.05 / 24, ox = cx - 12 * sc, oy = cy - 13 * sc; const P = M.sample(ICONS.calendar, Math.round(260 * q + 80), sc, ox, oy);
  P.forEach((p, i) => { const L = sc * .62; add({ tx0: p.x, ty0: p.y, ta: p.a, l: L, z: .95 }, 4, i / P.length);
    if (i % 2 === 0) for (const o of [-3, 3]) add({ tx0: p.x - Math.sin(p.a) * o, ty0: p.y + Math.cos(p.a) * o, ta: p.a, l: L * .7, z: .25 }, 4, i / P.length); });
  // date-cell panels inside body (7 x 3)
  for (let r = 0; r < 3; r++) for (let c = 0; c < 7; c++) { const x = ox + (4.4 + c * 2.2) * sc, y = oy + (12.4 + r * 2.6) * sc;
    add({ tx0: x, ty0: y, ta: 0, l: sc * 1.15, kind: (r * 7 + c) % 9 === 4 ? 4 : 3, hot: (r * 7 + c) === 11, z: .6 }, 5, (r * 7 + c) / 21); }
  // data strip under header: tiny bars
  for (let i = 0; i < 28; i++) { const h = 3 + Math.abs(Math.sin(i * 1.7)) * sc * 1.2; add({ tx0: ox + (3.6 + i * .6) * sc, ty0: oy + 8.2 * sc - h / 2, ta: Math.PI / 2, l: h, z: .7 }, 5, i / 28); }
  // free debris (never assembles; orbits)
  for (let i = 0; i < 140 * q + 30; i++) { const f = add({ l: M.rnd(2, 7), kind: Math.random() < .15 ? 2 : Math.random() < .2 ? 1 : 0, txt: (Math.random() * 99 | 0).toString().padStart(2, '0'), z: Math.random() * .4, dr: M.rnd(1.08, 1.5), dth: M.rnd(0, 6.3), dsp: M.rnd(-.06, .06) }, 9, 1); }
  T0 = performance.now();
}
S.onDown = () => { explodeAt = performance.now(); };
const ORDER = [0, .35, .6, .2, .9, 1.25, 0, 0, 0, 0];
const stepRot = (t, per, ang) => { const k = Math.floor(t / per), fr = M.cl((t / per - k) * 2.2); return (k + M.easeIO(fr)) * ang; };
M.loop((now) => {
  const ctx = S.ctx, t = (now - T0) / 1000, c = M.cursor(S, now); ctx.clearRect(0, 0, S.W, S.H); M.bg(S);
  if (explodeAt > 0 && now - explodeAt < 30) { F.forEach(f => { if (f.grp === 9) return; const a = Math.atan2(f.y - C.cy, f.x - C.cx); f.vx += Math.cos(a) * M.rnd(6, 22); f.vy += Math.sin(a) * M.rnd(6, 22); f.va += M.rnd(-.6, .6); f.locked = 0; f.hold = now + M.rnd(300, 900); }); explodeAt = -1; }
  const rot = [stepRot(t, 2.6, Math.PI / 12), -stepRot(t + 1.3, 3.2, Math.PI / 18), t * .06, 0];
  for (const f of F) {
    const start = 0.25 + ORDER[f.grp] + f.order * .55;
    if (f.grp === 9) { f.dth += f.dsp * .02; f.tx = C.cx + Math.cos(f.dth) * C.Z * f.dr; f.ty = C.cy + Math.sin(f.dth) * C.Z * f.dr * .8; f.ta = f.dth + 1.57; }
    else if (f.pr != null) { const th = f.pth + rot[f.grp]; f.tx = C.cx + Math.cos(th) * f.pr; f.ty = C.cy + Math.sin(th) * f.pr; f.ta = f.tang ? th + Math.PI / 2 : f.rad ? th : 0; if (f.kind === 2) f.ta = th + Math.PI / 2; }
    else { f.tx = f.tx0; f.ty = f.ty0; }
    const live = t > start && !(f.hold && now < f.hold);
    if (!live) { f.x += f.vx; f.y += f.vy; f.vx *= .96; f.vy *= .96; f.a += f.va; f.va *= .96; f.s = .6; continue; }
    f.s += (1 - f.s) * .1; M.poke(f, c, S.mob ? 60 : 110, 1.6); M.spring(f, f.grp === 9 ? .02 : .075, .8);
    if (!f.locked && Math.abs(f.tx - f.x) + Math.abs(f.ty - f.y) < 1.5) { f.locked = 1; f.lit = Math.max(f.lit, .55); }
  }
  M.draw(S, F); if (!c.idle) M.reticle(S, c, S.mob ? 60 : 110, now);
  // status readout
  const ok = F.filter(f => f.locked).length; ctx.fillStyle = 'rgba(31,58,138,.55)'; ctx.font = '9px ui-monospace,Menlo,monospace'; ctx.textAlign = 'left';
  ctx.fillText(`ASSEMBLY ${String(Math.round(ok / F.length * 100)).padStart(3, '0')}%  ·  PARTS ${F.length}`, S.R.x, S.R.y + S.R.h + 26);
});
S.start();
