import { ICONS, RM } from './icons.js';
const svg = document.querySelector('#stage'); const NS = 'http://www.w3.org/2000/svg';
const L = [['tent',.5,.5,.4,-4],['calendar',.12,.2,.26,6],['cctv',.78,.2,.22,-8],['ticket',.82,.66,.18,10],['dropper',.08,.7,.13,-18],['scissors',.6,.86,.12,14],['comb',.3,.88,.1,-6],['bars',.6,.12,.11,0],['line',.95,.42,.12,4],['pie',.18,.5,.09,0]];
const N = [['40',.3,.17,.11],['2026',.86,.9,.08],['12',.02,.4,.07],['1억',.65,.62,.09],['7/12',.48,.08,.06],['→',.26,.66,.08]];
let items = [];
const build = () => {
  const W = svg.clientWidth, H = svg.clientHeight, mob = W < 768;
  const R = mob ? { x: W * .05, y: H * .07, w: W * .9, h: H * .36 } : { x: W * .53, y: H * .1, w: W * .44, h: H * .8 };
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  const u = Math.min(R.w, R.h * 1.3);
  let s = `<defs><filter id="rough"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.2"/></filter><filter id="rough2"><feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="9" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3.4"/></filter></defs>`;
  L.forEach(([k, fx, fy, sz, rot], i) => {
    const size = sz * u, x = R.x + fx * R.w, y = R.y + fy * R.h, sc = size / 24, sw = (sz > .3 ? 2.6 : 1.9) / sc;
    const col = i === 0 || i === 1 ? '#1F3A8A' : '#3b3f47';
    s += `<g class="ic" data-i="${i}" transform="translate(${x - size / 2} ${y - size / 2}) rotate(${rot} ${size / 2} ${size / 2}) scale(${sc})" style="--d:${.15 + i * .18}s">
      <path class="p1" d="${ICONS[k]}" stroke="${col}" stroke-width="${sw}" filter="url(#rough)"/>
      <path class="p2" d="${ICONS[k]}" stroke="${col}" stroke-width="${sw * .6}" filter="url(#rough2)" transform="translate(.35 .25)"/></g>`;
  });
  N.forEach(([t, fx, fy, sz], i) => { const x = R.x + fx * R.w, y = R.y + fy * R.h, fs = sz * u;
    if (t === '1억') s += `<path class="hlx" d="M${x - fs * .1} ${y - fs * .18} L${x + fs * 1.15} ${y - fs * .22}" stroke-width="${fs * .42}" style="--d:${1.8}s"/>`;
    s += `<text class="num" x="${x}" y="${y}" font-size="${fs}" style="--d:${1 + i * .15}s">${t}</text>`; });
  for (let i = 0; i < 26; i++) { const x = R.x + Math.random() * R.w, y = R.y + Math.random() * R.h; s += `<ellipse class="crumb" cx="${x}" cy="${y}" rx="${1 + Math.random() * 3}" ry="${.6 + Math.random() * 1.6}" transform="rotate(${Math.random() * 180} ${x} ${y})"/>`; }
  svg.innerHTML = s;
  items = [...svg.querySelectorAll('.ic')].map(g => { const b = g.getBoundingClientRect(); g.querySelectorAll('path').forEach(p => { const l = p.getTotalLength(); p.style.setProperty('--l', l); }); return { g, cx: b.left + b.width / 2, cy: b.top + b.height / 2, r: Math.max(b.width, b.height) / 2, t: 0 }; });
  requestAnimationFrame(() => svg.classList.add('go'));
};
build(); let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { svg.classList.remove('go'); build(); }, 200); });
if (!RM) {
  const near = (x, y) => items.forEach(it => { const d = Math.hypot(it.cx - x, it.cy - y); const now = performance.now();
    if (d < it.r + 90 && now - it.t > 1600) { it.t = now; it.g.classList.remove('redraw', 'wob'); void it.g.getBBox(); it.g.classList.add('redraw', 'wob'); } });
  addEventListener('pointermove', e => near(e.clientX, e.clientY));
  addEventListener('pointerdown', e => near(e.clientX, e.clientY));
}
