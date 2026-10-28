// 14 · Cursor as targeting reticle: scans a node field, reveals IDs, locks projects with info panels
import * as M from './mech.js'; import * as U from './hud.js';
let N = [], T0, boom = -1, lockT = new Map();
const S = M.stage(S => { const R = S.R, n = Math.round(420 * S.q); N = []; T0 = performance.now();
  const P = [[.2, .25], [.75, .2], [.5, .5], [.85, .7], [.25, .78], [.62, .85]];
  for (let i = 0; i < n; i++) { const pj = i < 6, hx = R.x + R.w * (pj ? P[i][0] : Math.random()), hy = R.y + R.h * (pj ? P[i][1] : Math.random()); N.push({ i, pj, hx, hy, x: hx, y: hy, vx: 0, vy: 0, ph: Math.random() * 6.3, lit: 0 }); }
  // neighbour links (nearest 2)
  N.forEach(o => { o.nb = N.filter(q => q !== o).map(q => [q, (q.hx - o.hx) ** 2 + (q.hy - o.hy) ** 2]).sort((a, b) => a[1] - b[1]).slice(0, 2).map(a => a[0]); }); });
S.onDown = () => { boom = performance.now(); lockT.clear(); N.forEach(o => { const a = M.rnd(0, 6.3); o.vx += Math.cos(a) * M.rnd(6, 22); o.vy += Math.sin(a) * M.rnd(6, 22); }); };
M.loop(now => {
  const ctx = S.ctx, t = (now - T0) / 1000, R = S.R; ctx.clearRect(0, 0, S.W, S.H); M.bg(S); U.boot(S, t, ['SCAN · READY', 'FIELD NODES · ' + N.length, 'MOVE TO TARGET']);
  const pj = N.slice(0, 6), seq = (now / 2600 | 0) % 6, nxt = (seq + 1) % 6, fr = M.easeIO(M.cl((now % 2600) / 2600 * 1.6 - .6));
  const c = M.cursor(S, now, () => [((pj[seq].hx + (pj[nxt].hx - pj[seq].hx) * fr) - R.x) / R.w, ((pj[seq].hy + (pj[nxt].hy - pj[seq].hy) * fr) - R.y) / R.h]);
  const RAD = S.mob ? 64 : 100; let inside = [];
  for (const o of N) { const tx = o.hx + Math.cos(t * .4 + o.ph) * 6, ty = o.hy + Math.sin(t * .5 + o.ph) * 6, st = now - boom < 400 ? .004 : .05; o.vx = (o.vx + (tx - o.x) * st) * .85; o.vy = (o.vy + (ty - o.y) * st) * .85; o.x += o.vx; o.y += o.vy;
    const d = Math.hypot(o.x - c.x, o.y - c.y); o.d = d; o.lit = d < RAD ? Math.max(o.lit, 1 - d / RAD) : o.lit * .93; if (d < RAD) inside.push(o); }
  ctx.strokeStyle = U.nav(.13); ctx.lineWidth = .5; ctx.beginPath(); for (const o of N) for (const q of o.nb) { ctx.moveTo(o.x, o.y); ctx.lineTo(q.x, q.y); } ctx.stroke();
  ctx.strokeStyle = U.nav(.5); ctx.beginPath(); for (const o of inside) for (const q of o.nb) { ctx.moveTo(o.x, o.y); ctx.lineTo(q.x, q.y); } ctx.stroke();
  ctx.beginPath(); for (const o of N) { if (o.pj) continue; const r = 1 + o.lit * 1.6; ctx.moveTo(o.x + r, o.y); ctx.arc(o.x, o.y, r, 0, 6.29); } ctx.fillStyle = U.nav(.55); ctx.fill();
  inside.filter(o => !o.pj).sort((a, b) => a.d - b.d).slice(0, S.mob ? 5 : 10).forEach(o => { U.brackets(ctx, o.x, o.y, 5, 1, false); ctx.fillStyle = U.nav(.75); ctx.font = U.mono(7.5); ctx.textAlign = 'left'; ctx.fillText(`R-${String(o.i).padStart(4, '0')}`, o.x + 7, o.y - 5); });
  pj.forEach((o, i) => { const on = o.d < RAD; if (on && !lockT.has(i)) lockT.set(i, now); if (!on && o.d > RAD * 1.6) lockT.delete(i); const lt = lockT.has(i) ? now - lockT.get(i) : -1;
    ctx.fillStyle = '#fff'; ctx.strokeStyle = lt >= 0 ? '#FF8A1F' : '#1F3A8A'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.arc(o.x, o.y, 5.5, 0, 7); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.arc(o.x, o.y, 1.6, 0, 7); ctx.fillStyle = ctx.strokeStyle; ctx.fill();
    if (lt >= 0) { U.brackets(ctx, o.x, o.y, 14, lt / 450); const right = o.x < R.x + R.w * .6; U.callout(ctx, o.x, o.y, o.x + (right ? 1 : -1) * (S.mob ? 50 : 90), o.y - 34, [U.PN[i], `PRJ-0${i + 1} · LOCK`, `X ${o.x | 0} Y ${o.y | 0}`], lt / 1500); } });
  // reticle
  ctx.save(); ctx.translate(c.x, c.y); U.arcs(ctx, 0, 0, RAD, 4, t * .8, .25, .6, 1.4); U.arcs(ctx, 0, 0, RAD * .82, 24, -t * .5, .5, .3, .8); U.tickRing(ctx, 0, 0, RAD * 1.12, 72, t * .1, .35);
  ctx.strokeStyle = U.nav(.5); ctx.lineWidth = .8; ctx.beginPath(); for (const [a, b] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) { ctx.moveTo(a * 8, b * 8); ctx.lineTo(a * RAD * .5, b * RAD * .5); } ctx.stroke(); ctx.restore();
  ctx.fillStyle = U.nav(.7); ctx.font = U.mono(8.5); ctx.textAlign = 'left'; ctx.fillText(`SCAN ${inside.length.toString().padStart(3, '0')} · LOCK ${lockT.size}`, c.x + RAD + 8, c.y + RAD - 4);
  U.rulers(S, c, now);
});
S.start();
