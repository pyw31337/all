// 12 · Radar tracking: sweep finds project blips and locks; cursor manual lock; click = scatter + re-lock
import * as M from './mech.js'; import * as U from './hud.js';
let B = [], cx, cy, r, T0, boom = -1;
const S = M.stage(S => { const R = S.R; cx = R.x + R.w * (S.mob ? .5 : .55); cy = R.y + R.h * .5; r = Math.min(R.w, R.h) * .44; B = []; T0 = performance.now();
  const n = Math.round(180 * S.q) + 6; for (let i = 0; i < n; i++) { const pj = i < 6, th = pj ? i / 6 * 6.283 + .4 + M.rnd(-.3, .3) : M.rnd(0, 6.283), rr = pj ? M.rnd(.38, .85) : Math.sqrt(Math.random()) * .95;
    B.push({ i, pj, th, rr, x: cx, y: cy, vx: 0, vy: 0, hit: -1e9, lock: -1e9, dr: M.rnd(-.02, .02) }); } });
S.onDown = () => { boom = performance.now(); B.forEach(b => { const a = Math.atan2(b.y - cy, b.x - cx) + M.rnd(-.4, .4); b.vx += Math.cos(a) * M.rnd(10, 26); b.vy += Math.sin(a) * M.rnd(10, 26); b.lock = -1e9; }); };
const wrap = a => ((a % 6.283) + 6.283) % 6.283;
M.loop(now => {
  const ctx = S.ctx, t = (now - T0) / 1000; ctx.clearRect(0, 0, S.W, S.H); M.bg(S);
  const c = M.cursor(S, now, t => [.55 + .3 * Math.cos(t * .5), .5 + .3 * Math.sin(t * .37)]), rev = U.boot(S, t, ['RADAR · INIT', 'GRID 16PX · OK', 'TRACK P-01…P-06']);
  const R0 = r * M.easeIO(M.cl(rev * 1.2)), sw = wrap(t * 1.15 - 1.57);
  // rings & reticle
  for (const f of [.25, .5, .75]) { ctx.strokeStyle = U.nav(.16); ctx.lineWidth = .7; ctx.beginPath(); ctx.arc(cx, cy, R0 * f, 0, 7); ctx.stroke(); }
  U.tickRing(ctx, cx, cy, R0, 180, 0, .5, R0 > r * .9); U.arcs(ctx, cx, cy, R0 * 1.07, 12, t * .12, .4, .35); U.arcs(ctx, cx, cy, R0 * 1.12, 40, -t * .2, .55, .25, .8);
  ctx.strokeStyle = U.nav(.12); ctx.beginPath(); ctx.moveTo(cx - R0, cy); ctx.lineTo(cx + R0, cy); ctx.moveTo(cx, cy - R0); ctx.lineTo(cx, cy + R0); ctx.stroke();
  if (rev >= 1) { const g = ctx.createConicGradient(sw - 1.1, cx, cy); g.addColorStop(0, U.nav(0)); g.addColorStop(.17, U.nav(.13)); g.addColorStop(.175, U.nav(0)); g.addColorStop(1, U.nav(0)); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R0, 0, 7); ctx.fill();
    ctx.strokeStyle = U.nav(.6); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(sw) * R0, cy + Math.sin(sw) * R0); ctx.stroke(); }
  // blips
  let near = null, nd = (S.mob ? 40 : 55) ** 2;
  for (const b of B) { b.th += b.dr * .01; const tx = cx + Math.cos(b.th) * b.rr * R0, ty = cy + Math.sin(b.th) * b.rr * R0, st = now - boom < 450 ? .004 : .05;
    b.vx = (b.vx + (tx - b.x) * st) * .84; b.vy = (b.vy + (ty - b.y) * st) * .84; b.x += b.vx; b.y += b.vy;
    const ang = wrap(Math.atan2(b.y - cy, b.x - cx)), dd = wrap(sw - ang); if (rev >= 1 && dd < .06) { b.hit = now; if (b.pj && now - b.lock > 5200) b.lock = now; }
    const d2 = (b.x - c.x) ** 2 + (b.y - c.y) ** 2; if (!c.idle && b.pj && d2 < nd) { nd = d2; near = b; } }
  ctx.beginPath(); for (const b of B) { if (b.pj) continue; const h = M.cl(1 - (now - b.hit) / 1800); const rr = .8 + h * 1.6; ctx.moveTo(b.x + rr, b.y); ctx.arc(b.x, b.y, rr, 0, 6.29); } ctx.fillStyle = U.nav(.55); ctx.fill();
  B.forEach(b => { if (!b.pj) return; const h = M.cl(1 - (now - b.hit) / 2200), lk = now - b.lock, man = b === near, live = lk < 5000 || man;
    ctx.fillStyle = live ? '#FF8A1F' : U.nav(.4 + .6 * h); ctx.beginPath(); ctx.arc(b.x, b.y, 3.2, 0, 7); ctx.fill(); ctx.strokeStyle = U.nav(.3 * h); ctx.beginPath(); ctx.arc(b.x, b.y, 6 + 10 * (1 - h), 0, 7); ctx.stroke();
    if (live) { const p = man ? 1 : M.cl(lk / 500), out = M.cl(man ? 1 : (5000 - lk) / 400); ctx.globalAlpha = out; U.brackets(ctx, b.x, b.y, 11, p);
      const right = b.x > cx - 40, lx = b.x + (right ? 1 : -1) * (S.mob ? 40 : 70), ly = b.y - 26, az = (wrap(Math.atan2(b.y - cy, b.x - cx) + 1.57) * 57.3).toFixed(1), rg = (Math.hypot(b.x - cx, b.y - cy) / r).toFixed(2);
      U.callout(ctx, b.x, b.y, lx, ly, [U.PN[b.i], `TGT-0${b.i + 1} · AZ ${az}° · RNG ${rg}`], man ? 1 : M.cl(lk / 1400)); ctx.globalAlpha = 1; } });
  if (!c.idle) M.reticle(S, c, 24, now);
  U.rulers(S, c.idle ? { x: -1e4 } : c, now);
  const locks = B.filter(b => b.pj && now - b.lock < 5000).length; ctx.fillStyle = U.nav(.6); ctx.font = U.mono(9); ctx.textAlign = 'left';
  ctx.fillText(`SWEEP ${(sw * 57.3).toFixed(0).padStart(3, '0')}° · CONTACTS ${B.length} · LOCKED ${locks}/6`, S.R.x, S.R.y + S.R.h + 26);
});
S.start();
