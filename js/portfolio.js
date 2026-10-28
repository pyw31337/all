import { PROJECTS } from '../data/projects.js';

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

/* Nav state */
const nav = $('#nav');
const onScroll = () => nav.classList.toggle('is-solid', scrollY > 40);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* Projects */
const ORDER = ['calendar', 'culture', 'cctv'];
const featured = ORDER.map(id => PROJECTS.find(p => p.id === id)).filter(Boolean)
  .concat(PROJECTS.filter(p => p.featured && !ORDER.includes(p.id)));
const others = PROJECTS.filter(p => !featured.includes(p));
$('#project-count').textContent = PROJECTS.length;
$('#project-count').dataset.count = PROJECTS.length;

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
    <div class="fp__body"><span class="fp__no">0${i + 1}</span>${head(p)}${rows(p)}${links(p)}</div>
  </article>`).join('');

$('#others').innerHTML = others.map(p => `
  <article class="op reveal ${p.status === 'archived' ? 'is-archived' : ''}" style="--accent:${esc('var(--brand)')}">
    <div class="op__shot">${p.screenshot ? `<img src="${esc(p.screenshot)}" alt="${esc(p.title)} 서비스 화면" loading="lazy" decoding="async">` : `<div class="op__ph" aria-hidden="true"><span>${esc(p.titleEn || p.title)}</span></div>`}
      ${p.status === 'archived' ? `<span class="badge">Archived · ${esc(p.badge || '')}</span>` : ''}</div>
    <div class="op__body">${head(p)}${rows(p)}${links(p)}</div>
  </article>`).join('');

/* Ontology visualization */
(function onto() {
  const el = $('#onto'); if (!el) return;
  const nodes = [['사진', 'Photos'], ['장소', 'Places'], ['사람', 'People'], ['일정', 'Events'], ['지출', 'Expenses'], ['메모', 'Notes'], ['영상', 'Media'], ['주변 행사', 'Culture']];
  const W = 600, H = 600, cx = 300, cy = 300, R = 220;
  let s = `<svg viewBox="0 0 ${W} ${H}" aria-hidden="true"><defs><radialGradient id="og"><stop offset="0" stop-color="#1F3A8A" stop-opacity=".55"/><stop offset="1" stop-color="#1F3A8A" stop-opacity="0"/></radialGradient></defs>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${R}" class="o-ring"/><circle cx="${cx}" cy="${cy}" r="${R * .55}" class="o-ring"/>`;
  const pts = nodes.map((n, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / nodes.length; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; });
  pts.forEach((p, i) => { const q = pts[(i + 3) % pts.length]; s += `<path class="o-cross" d="M${p[0]},${p[1]} Q${cx},${cy} ${q[0]},${q[1]}"/>`; });
  pts.forEach((p, i) => { s += `<line class="o-line" style="--d:${i * 0.12}s" x1="${p[0]}" y1="${p[1]}" x2="${cx}" y2="${cy}" data-i="${i}"/>`; });
  s += `<circle cx="${cx}" cy="${cy}" r="110" fill="url(#og)" class="o-glow"/><circle cx="${cx}" cy="${cy}" r="46" class="o-core"/><text x="${cx}" y="${cy - 2}" class="o-core-t">그날</text><text x="${cx}" y="${cy + 18}" class="o-core-e">ONE DAY</text>`;
  pts.forEach((p, i) => { s += `<g class="o-node" tabindex="0" data-i="${i}" style="--d:${0.3 + i * 0.08}s"><circle cx="${p[0]}" cy="${p[1]}" r="34"/><text x="${p[0]}" y="${p[1] - 1}">${nodes[i][0]}</text><text x="${p[0]}" y="${p[1] + 15}" class="e">${nodes[i][1]}</text></g>`; });
  el.innerHTML = s + '</svg>';
  el.querySelectorAll('.o-node').forEach(g => {
    const on = v => () => { el.querySelector(`.o-line[data-i="${g.dataset.i}"]`).classList.toggle('is-on', v); g.classList.toggle('is-on', v); };
    g.addEventListener('mouseenter', on(true)); g.addEventListener('mouseleave', on(false));
    g.addEventListener('focus', on(true)); g.addEventListener('blur', on(false));
  });
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
floaties($('#stats'), 7); floaties($('#profile'), 9);
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
  const paint = () => { raf = 0; media.style.transform = `translate3d(${mx * -18}px,${sy * 0.25 + my * -12}px,0) scale(1.08)`; inner.style.transform = `translate3d(${mx * 8}px,${my * 6}px,0)`; };
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
