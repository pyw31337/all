import { PROJECTS } from '../data/projects.js?v=20261028-17';

const $ = (s, el = document) => el.querySelector(s);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* Theme */
$('#theme-toggle').addEventListener('click', () => {
  const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem('theme', t); } catch (e) {}
});

/* Email (address assembled only on click) */
document.addEventListener('click', e => {
  const b = e.target.closest('.js-email');
  if (b) location.href = 'mai' + 'lto:' + b.dataset.u + '\u0040' + b.dataset.d;
});

/* Mobile menu */
const mt = $('#menu-toggle'), mn = $('#mnav');
const setMenu = v => { mn.hidden = !v; mt.setAttribute('aria-expanded', v); mt.setAttribute('aria-label', v ? '메뉴 닫기' : '메뉴 열기'); document.body.classList.toggle('menu-open', v); };
mt.addEventListener('click', () => setMenu(mn.hidden));
mn.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
/* Nav state */
const nav = $('#nav');
const onScroll = () => nav.classList.toggle('is-solid', scrollY > 40);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* Projects */
const ORDER = ['calendar', 'culture', 'cctv'];
const featured = ORDER.map(id => PROJECTS.find(p => p.id === id)).filter(Boolean)
  .concat(PROJECTS.filter(p => p.featured && !ORDER.includes(p.id)));
const others = PROJECTS.filter(p => !featured.includes(p));

const rows = p => `
  <dl class="iwb">
    <div><dt>의도<small lang="en">Intent</small></dt><dd>${esc(p.intent || p.summary)}</dd></div>
    ${p.why ? `<div><dt>왜<small lang="en">Why</small></dt><dd>${esc(p.why)}</dd></div>` : ''}
    ${p.benefit ? `<div><dt>이익<small lang="en">Benefit</small></dt><dd>${esc(p.benefit)}</dd></div>` : ''}
  </dl>`;
const links = p => `
  <div class="plinks">
    ${p.url ? `<a class="btn btn--accent btn--sm" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">서비스 보기 <span lang="en">/ Visit</span> ↗</a>` : ''}
    ${p.githubUrl ? `<a class="btn btn--ghost btn--sm" href="${esc(p.githubUrl)}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ''}
    ${!p.url && !p.githubUrl ? `<span class="archived-note">서비스 종료 · 링크 없음 <span lang="en">/ Archived</span></span>` : ''}
  </div>`;
const head = p => `
  <p class="ptag"><span class="ptag__dot"></span>${esc(p.categoryLabel || '')}${p.stats ? ` · ${esc(p.stats)}` : ''}</p>
  <h3>${esc(p.title)} <em lang="en">${esc(p.titleEn || '')}</em></h3>
  ${p.summaryEn ? `<p class="pen" lang="en">${esc(p.summaryEn)}</p>` : ''}`;

$('#featured').innerHTML = featured.map((p, i) => `
  <article class="fp reveal" style="--accent:${esc('var(--brand)')}">
    <a class="fp__shot" ${p.url ? `href="${esc(p.url)}" target="_blank" rel="noopener noreferrer"` : ''} aria-label="${esc(p.title)} 화면">
      ${p.screenshot ? `<img src="${esc(p.screenshot)}" alt="${esc(p.title)} 서비스 화면" loading="lazy" decoding="async">` : ''}
    </a>
    <div class="fp__body"><span class="fp__no">04-${i + 1}</span>${head(p)}${rows(p)}${links(p)}</div>
  </article>`).join('');

$('#others').innerHTML = others.map((p, i) => `
  <article class="op reveal ${p.status === 'archived' ? 'is-archived' : ''}" style="--accent:${esc('var(--brand)')}">
    <div class="op__shot">${p.screenshot ? `<img src="${esc(p.screenshot)}" alt="${esc(p.title)} 서비스 화면" loading="lazy" decoding="async">` : `<div class="op__ph" aria-hidden="true"><span>${esc(p.titleEn || p.title)}</span></div>`}
      ${p.status === 'archived' ? `<span class="badge">Archived · ${esc(p.badge || '')}</span>` : ''}</div>
    <div class="op__body"><span class="fp__no op__no">04-${featured.length + i + 1}</span>${head(p)}${rows(p)}${links(p)}</div>
  </article>`).join('');

/* Ontology: living force-directed graph (canvas, no libs) */
(function graph() {
  const el = $('#onto'); if (!el) return;
  const box = el.closest('.onto'), cap = box.querySelector('figcaption'); const cv = document.createElement('canvas'); cv.className = 'onto__cv'; box.prepend(cv); const ctx = cv.getContext('2d');
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const P = [['사진','Photos'],['장소','Places'],['사람','People'],['일정','Events'],['지출','Expenses'],['메모','Notes'],['영상','Media'],['주변 행사','Culture']];
  const S = [['카페',1],['영수증',4],['가족',2],['공연',7],['산책',1],['생일',3],['날씨',3],['캠핑장',1],['친구',2],['리뷰',5],['가계부',4],['브이로그',6],['전시',7],['스크린샷',0],['동선',1],['일기',5]];
  let W = 0, H = 0, dpr = 1, G = { x: 0, y: 0, w: 1, h: 1 }, C = null; const PAD = 30;
  const N = [{ t: '그날', e: 'The Day', r: 38, k: 0 }];
  P.forEach(([t, e]) => N.push({ t, e, r: 26, k: 1 }));
  S.forEach(([t, p]) => N.push({ t, r: 6, k: 2, p: p + 1 }));
  const base = []; for (let i = 1; i <= P.length; i++) base.push([0, i, 1]);
  N.forEach((n, i) => { if (n.k === 2) base.push([n.p, i, 1]); });
  [[1,2],[3,4],[3,8],[5,6],[2,3]].forEach(([a,b]) => base.push([a, b, .5]));
  const fit = () => { const b = box.getBoundingClientRect(), s = el.getBoundingClientRect(), c = cap.getBoundingClientRect(); W = b.width; H = b.height; G = { x: s.left - b.left, y: s.top - b.top, w: s.width, h: s.height }; C = { l: c.left - b.left - 20, t: c.top - b.top - 20, r: c.right - b.left + 20, b: c.bottom - b.top + 20 }; dpr = Math.min(2, devicePixelRatio || 1); cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + 'px'; cv.style.height = H + 'px'; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
  fit(); new ResizeObserver(fit).observe(box);
  N.forEach((n, i) => { const a = i * 2.4; const d = n.k === 0 ? 0 : n.k === 1 ? .3 : .42; n.x = G.x + G.w / 2 + Math.cos(a) * G.w * d; n.y = G.y + G.h / 2 + Math.sin(a) * G.h * d; n.vx = n.vy = 0; n.ph = Math.random() * 6.28; n.a = 0; });
  const dyn = new Map(); // proximity links: key -> alpha
  let hover = -1, drag = -1, t = 0, run = false, raf = 0;
  const nb = i => { const s = new Set([i]); base.forEach(([a, b]) => { if (a === i) s.add(b); if (b === i) s.add(a); }); dyn.forEach((v, k) => { if (v > .3) { const [a, b] = k.split('-').map(Number); if (a === i) s.add(b); if (b === i) s.add(a); } }); return s; };
  const step = () => {
    t += .008; const cx = G.x + G.w / 2, cy = G.y + G.h / 2, sc = Math.min(G.w, G.h) / 600;
    for (let i = 0; i < N.length; i++) for (let j = i + 1; j < N.length; j++) {
      const a = N[i], b = N[j]; let dx = b.x - a.x, dy = b.y - a.y, d2 = dx * dx + dy * dy + .01, d = Math.sqrt(d2);
      const f = (a.k === 2 && b.k === 2 ? 900 : 2600) * sc / d2; dx /= d; dy /= d;
      a.vx -= dx * f; a.vy -= dy * f; b.vx += dx * f; b.vy += dy * f;
      if (a.k === 2 && b.k === 2) { const key = i + '-' + j, near = d < 80 * sc; const v = dyn.get(key) || 0; const nv = Math.max(0, Math.min(1, v + (near ? .02 : -.02))); nv ? dyn.set(key, nv) : dyn.delete(key); }
    }
    base.forEach(([i, j, w]) => { const a = N[i], b = N[j]; const L = (a.k === 0 ? 170 : b.k === 2 ? 62 : 150) * sc; const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1; const f = (d - L) * .004 * w; a.vx += dx / d * f; a.vy += dy / d * f; b.vx -= dx / d * f; b.vy -= dy / d * f; });
    N.forEach((n, i) => {
      n.vx += (cx - n.x) * .0009 + Math.cos(t * 1.3 + n.ph) * .05; n.vy += (cy - n.y) * .0009 + Math.sin(t + n.ph * 1.7) * .05;
      const m = n.r + (n.k === 2 ? 22 : 8) + PAD;
      if (i === drag) { n.x = Math.max(m, Math.min(W - m, n.x)); n.y = Math.max(m, Math.min(H - m, n.y)); return; }
      if (C && n.x > C.l - n.r && n.x < C.r + n.r && n.y > C.t - n.r && n.y < C.b + n.r) { n.vx += (cx - n.x) * .006; n.vy += (cy - n.y) * .004; } if (n.k === 0) { n.vx += (cx - n.x) * .01; n.vy += (cy - n.y) * .01; }
      n.vx *= .9; n.vy *= .9; n.x += n.vx; n.y += n.vy;
      n.x = Math.max(m, Math.min(W - m, n.x)); n.y = Math.max(m, Math.min(H - m, n.y));
    });
  };
  const css = getComputedStyle(document.documentElement);
  const draw = () => {
    const dark = document.documentElement.dataset.theme === 'dark';
    const brand = dark ? '#8EA3E6' : '#1F3A8A', ink = dark ? '#E7EAF2' : '#111418', soft = dark ? 'rgba(142,163,230,' : 'rgba(31,58,138,';
    ctx.clearRect(0, 0, W, H); const hs = hover >= 0 ? nb(hover) : null;
    const line = (a, b, al, w) => { ctx.strokeStyle = soft + al + ')'; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); };
    base.forEach(([i, j, w]) => { const on = hs && hs.has(i) && hs.has(j) && (i === hover || j === hover); line(N[i], N[j], hs ? (on ? .9 : .08) : (N[i].k === 0 ? .35 : .22) * w + .05, on ? 2 : 1); });
    dyn.forEach((v, k) => { const [i, j] = k.split('-').map(Number); ctx.setLineDash([3, 4]); line(N[i], N[j], (hs ? .1 : .45) * v, 1); ctx.setLineDash([]); });
    N.forEach((n, i) => {
      const dim = hs && !hs.has(i) ? .25 : 1; ctx.globalAlpha = dim;
      if (n.k === 0) { const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 2.6); g.addColorStop(0, soft + '.25)'); g.addColorStop(1, soft + '0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 2.6, 0, 7); ctx.fill(); }
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r * (i === hover ? 1.12 : 1), 0, 7);
      if (n.k === 0) { ctx.fillStyle = brand; ctx.fill(); }
      else if (n.k === 1) { ctx.fillStyle = dark ? '#131721' : '#fff'; ctx.fill(); ctx.strokeStyle = brand; ctx.lineWidth = i === hover ? 2.4 : 1.4; ctx.stroke(); }
      else { ctx.fillStyle = i === hover ? '#FF8A1F' : soft + '.55)'; ctx.fill(); }
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      if (n.k === 0) { ctx.fillStyle = '#fff'; ctx.font = '800 17px Pretendard Variable, sans-serif'; ctx.fillText(n.t, n.x, n.y - 5); ctx.font = '600 9.5px Pretendard Variable, sans-serif'; ctx.fillText(n.e, n.x, n.y + 11); }
      else if (n.k === 1) { ctx.fillStyle = ink; ctx.font = '700 13px Pretendard Variable, sans-serif'; ctx.fillText(n.t, n.x, n.y); }
      else { ctx.fillStyle = dark ? '#AEB6C6' : '#5B6270'; ctx.font = '500 11px Pretendard Variable, sans-serif'; ctx.fillText(n.t, n.x, n.y + 15); }
      ctx.globalAlpha = 1;
    });
  };
  const loop = () => { step(); draw(); if (run) raf = requestAnimationFrame(loop); };
  for (let k = 0; k < 260; k++) step(); draw();
  if (RM) { new MutationObserver(draw).observe(document.documentElement, { attributes: true }); return; }
  new IntersectionObserver(([e]) => { run = e.isIntersecting; cancelAnimationFrame(raf); if (run) loop(); }).observe(el);
  const pos = e => { const r = box.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const pick = (x, y) => { let best = -1, bd = 1e9; N.forEach((n, i) => { const d = Math.hypot(n.x - x, n.y - y); if (d < Math.max(n.r, 14) + 4 && d < bd) { bd = d; best = i; } }); return best; };
  box.addEventListener('pointermove', e => { const [x, y] = pos(e); if (drag >= 0) { N[drag].x = x; N[drag].y = y; N[drag].vx = N[drag].vy = 0; } else { hover = pick(x, y); box.style.cursor = hover >= 0 ? 'grab' : ''; } });
  box.addEventListener('pointerdown', e => { const [x, y] = pos(e); drag = pick(x, y); if (drag >= 0) { hover = drag; box.classList.add('is-drag'); getSelection().removeAllRanges(); box.setPointerCapture(e.pointerId); box.style.cursor = 'grabbing'; e.preventDefault(); } });
  const up = () => { drag = -1; box.classList.remove('is-drag'); box.style.cursor = ''; }; box.addEventListener('pointerup', up); box.addEventListener('pointercancel', up);
  box.addEventListener('pointerleave', () => { if (drag < 0) hover = -1; });
})();

/* Lineage map */
(function lineage() {
  const el = $('#lineage'); if (!el) return;
  const N = {
    limery: [110, 110, '라임리', 'Limery · archived', 'ghost'],
    calendar: [470, 110, '렛츠 캘린더', "Let's Calendar", 'key'],
    culture: [470, 300, '컬처플로우', 'Culture Flow · hub', 'hub'],
    camp: [830, 300, '렛츠 캠핑', "Let's Camp", ''],
    cctv: [830, 110, '렛츠 뷰', "Let's View", ''],
    pick: [110, 300, '렛츠 픽', "Let's Pick", 'tool'],
    hair: [830, 470, '렛츠 헤어', "Let's Hair", 'tool'],
  };
  const E = [['limery', 'calendar', '범위를 소모임으로 축소', 1], ['culture', 'calendar', '주변 행사', 1], ['culture', 'camp', '지역 행사', 1], ['cctv', 'camp', '교통·날씨 맥락', 0]];
  let s = `<svg viewBox="0 0 940 560" aria-label="라임리에서 렛츠 캘린더로, 컬처플로우가 렛츠 캘린더와 렛츠 캠핑에 연동되는 서비스 관계도" role="img">`;
  E.forEach(([a, b, t, solid], i) => {
    const [x1, y1] = N[a], [x2, y2] = N[b];
    s += `<path class="l-edge ${solid ? '' : 'is-dashed'}" style="--d:${i * .2}s" d="M${x1},${y1} C${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2},${y2}"/>`;
    s += `<text class="l-label" x="${(x1 + x2) / 2}" y="${(y1 + y2) / 2 - 12}">${t}</text>`;
  });
  Object.values(N).forEach(([x, y, t, e, k]) => { s += `<g class="l-node ${k}"><rect x="${x - 95}" y="${y - 34}" width="190" height="68" rx="34"/><text x="${x}" y="${y - 2}">${t}</text><text class="e" x="${x}" y="${y + 18}">${e}</text></g>`; });
  el.innerHTML = s + '</svg>';
})();

/* Reveal + count-up */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('is-in'); io.unobserve(e.target);
  e.target.querySelectorAll('[data-count]').forEach(countUp);
}), { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
/* sketch underline under section heads */
document.querySelectorAll('.sec-head h2').forEach(h => h.insertAdjacentHTML('afterend', '<svg class="sketch-ul" viewBox="0 0 260 18" preserveAspectRatio="none" aria-hidden="true"><path d="M3 11 C 50 5, 110 14, 160 8 S 230 6, 257 10"/><path d="M40 15 C 90 11, 150 16, 210 12"/></svg>'));
/* floating sketch icons */
const ICONS = ['<rect x="4" y="6" width="16" height="15" rx="3"/><path d="M4 10h16M9 3v5M15 3v5"/>', '<path d="M12 4 3 20h18Z"/><path d="M12 4v16M9 20l3-6 3 6"/>', '<path d="M4 8h16v3a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4Z"/><path d="M14 8v10" stroke-dasharray="2 2"/>', '<path d="M9 18V6l10-2v12"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="16" r="2"/>', '<path d="M4 20V10M10 20V5M16 20v-7M22 20H2"/>', '<rect x="3" y="7" width="13" height="8" rx="2"/><path d="M16 10l4-2v6l-4-2M8 15v4h6"/>', '<path d="M3 17l6-6 4 3 8-8"/><path d="M15 6h6v6"/>'];
const floaties = (host, n) => { if (!host) return; const w = document.createElement('div'); w.className = 'floaties'; w.setAttribute('aria-hidden', 'true');
  w.innerHTML = Array.from({ length: n }, (_, i) => `<svg viewBox="0 0 24 24" style="left:${(i * 37 + 7) % 92}%;top:${(i * 53 + 11) % 80}%;--s:${[28, 44, 64, 36, 52][i % 5]}px;--r:${(i * 23) % 40 - 20}deg;--t:${7 + i % 5}s;--d:${-i * 1.3}s;--fx:${i % 2 ? 14 : -12}px;--fy:${i % 3 ? -16 : 12}px">${ICONS[i % ICONS.length]}</svg>`).join('');
  host.prepend(w); };
floaties($('#stats'), 7);
document.querySelectorAll('.reveal, .onto, .lineage, mark.hlm, .sketch-ul').forEach(el => io.observe(el));
function countUp(n) {
  const to = +n.dataset.count; if (reduce || !to) { n.textContent = to; return; }
  const from = to > 1000 ? to - 40 : 0, t0 = performance.now(), dur = 1200;
  const tick = t => { const k = Math.min(1, (t - t0) / dur), v = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3))); n.textContent = v; if (k < 1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
}

/* Hero parallax (scroll + cursor) */
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
if (!reduce) {
  const media = $('.hero__media'), inner = $('.hero__inner'), hero = $('.hero');
  let sy = 0, mx = 0, my = 0, raf = 0;
  const paint = () => { raf = 0; if (media) media.style.transform = `translate3d(${mx * -18}px,${sy * 0.25 + my * -12}px,0) scale(1.08)`; inner.style.transform = `translate3d(${mx * 8}px,${my * 6}px,0)`; };
  const req = () => { if (!raf) raf = requestAnimationFrame(paint); };
  addEventListener('scroll', () => { sy = scrollY < innerHeight ? scrollY : sy; req(); }, { passive: true });
  if (fine) hero.addEventListener('pointermove', e => { const r = hero.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width - .5; my = (e.clientY - r.top) / r.height - .5; req(); });
}
/* Card tilt + cursor spotlight + magnetic buttons */
if (!reduce && fine) {
  const tiltSel = '.fp__shot, .op, .hl, .stat, .pcard, .tilt';
  document.addEventListener('pointermove', e => {
    const el = e.target.closest(tiltSel);
    document.querySelectorAll('.is-hover').forEach(x => { if (x !== el) { x.classList.remove('is-hover'); x.style.transform = ''; } });
    if (el) { const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.classList.add('is-hover'); el.style.setProperty('--mx', x * 100 + '%'); el.style.setProperty('--my', y * 100 + '%');
      const k = el.matches('.stat') ? 4 : 6; el.style.transform = `perspective(900px) rotateX(${(.5 - y) * k}deg) rotateY(${(x - .5) * k}deg) translateY(-4px)`; }
    const b = e.target.closest('.btn');
    document.querySelectorAll('.btn.is-mag').forEach(x => { if (x !== b) { x.classList.remove('is-mag'); x.style.transform = ''; } });
    if (b) { const r = b.getBoundingClientRect(); b.classList.add('is-mag'); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px,${(e.clientY - r.top - r.height / 2) * .25}px)`; }
  }, { passive: true });
}
document.documentElement.classList.add('is-ready');

/* Scroll parallax (subtle) */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const els = [...document.querySelectorAll('[data-speed]')];
  document.querySelectorAll('.fp__shot img, .op__shot img').forEach(img => { img.dataset.speed = '-.05'; img.style.scale = '1.08'; els.push(img); });
  let tick = false;
  const run = () => { tick = false; const vh = innerHeight; els.forEach(el => { const r = (el.parentElement || el).getBoundingClientRect(); if (r.bottom < -200 || r.top > vh + 200) return; const c = r.top + r.height / 2 - vh / 2; el.style.translate = `0 ${(c * +el.dataset.speed).toFixed(1)}px`; }); };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(run); } }, { passive: true }); run();
})();

// v8: film poster tooltips — tap to toggle on touch, Esc / outside to close
(() => {
  const films = [...document.querySelectorAll('.film')];
  if (!films.length) return;
  const close = (except) => films.forEach((f) => f !== except && f.classList.remove('is-open'));
  films.forEach((f) => f.addEventListener('click', (e) => { e.stopPropagation(); const o = !f.classList.contains('is-open'); close(f); f.classList.toggle('is-open', o); }));
  document.addEventListener('click', () => close());
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();
