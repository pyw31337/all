// 3D core for hero 15–17: three.js instanced parts, fresnel glass shading, Z-depth explode, desktop-only DOF, adaptive quality
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import * as M from './mech.js';
export { THREE };
export const NAVY = new THREE.Color('#1F3A8A'), INK = new THREE.Color('#0F1A3C'), ORANGE = new THREE.Color('#FF8A1F'), SKY = new THREE.Color('#8FA6DA');
const qp = new URLSearchParams(location.search), qs = qp.get('q'), FORCE = qp.get('dof') === '1';
export function world(S) {
  const mob = qs ? qs === 'low' : (innerWidth < 768 || matchMedia('(pointer:coarse)').matches);
  const Q = { mob, dpr: Math.min(devicePixelRatio || 1, mob ? 1.5 : 2), n: mob ? .4 : 1, dof: (!mob || FORCE) && !M.RM }; const T0 = performance.now();
  const cv = document.createElement('canvas'); cv.className = 'stage'; cv.setAttribute('aria-hidden', 'true'); S.cv.before(cv); S.cv.style.zIndex = 2;
  const R = new THREE.WebGLRenderer({ canvas: cv, antialias: !mob, alpha: true, powerPreference: 'high-performance' }); R.setClearColor(0xffffff, 0);
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(35, 1, .1, 60); cam.position.set(0, 0, 6);
  const G = new THREE.Group(); scene.add(G);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xC9D4EE, 2.2)); const dl = new THREE.DirectionalLight(0xffffff, 1.6); dl.position.set(2, 3, 4); scene.add(dl);
  let comp = null, bokeh = null;
  const W = { THREE, R, scene, cam, G, Q, cv, wpp: 1, ax: 0, ay: 0, rp: 1 };
  W.size = (ax, ay, rp) => { const w = innerWidth, h = innerHeight; R.setPixelRatio(Q.dpr); R.setSize(w, h, false); cv.style.width = w + 'px'; cv.style.height = h + 'px';
    cam.aspect = w / h; cam.setViewOffset(w, h, w / 2 - ax, h / 2 - ay, w, h); cam.updateProjectionMatrix();
    W.wpp = 2 * 6 * Math.tan(THREE.MathUtils.degToRad(17.5)) / h; W.ax = ax; W.ay = ay; W.rp = rp; G.scale.setScalar(rp * W.wpp);
    if (Q.dof) { if (!comp) { const bc = document.createElement('canvas'); bc.width = 320; bc.height = 200; const bx = bc.getContext('2d'), gr = bx.createRadialGradient(320 * .74, 200 * .48, 0, 320 * .74, 200 * .48, 320 * .6); gr.addColorStop(0, '#F3F6FC'); gr.addColorStop(1, '#fff'); bx.fillStyle = gr; bx.fillRect(0, 0, 320, 200); W.bgTex = new THREE.CanvasTexture(bc); W.bgTex.colorSpace = THREE.SRGBColorSpace; comp = new EffectComposer(R); comp.addPass(new RenderPass(scene, cam)); bokeh = new BokehPass(scene, cam, { focus: 6, aperture: .0035, maxblur: .007 }); comp.addPass(bokeh); comp.addPass(new OutputPass()); }
      comp.setPixelRatio(Q.dpr); comp.setSize(w, h); } };
  // adaptive: drop DOF, then DPR, when sustained frame rate is low
  let fr = 0, ft = performance.now();
  W.render = now => { scene.background = comp && Q.dof ? W.bgTex : null; if (comp && Q.dof) comp.render(); else R.render(scene, cam); fr++;
    if (now - ft > 1500) { const fps = fr * 1000 / (now - ft); fr = 0; ft = now; W.fps = fps;
      if (FORCE || now - T0 < 3500) return; if (fps < 42 && Q.dof) Q.dof = false; else if (fps < 30 && Q.dpr > 1) { Q.dpr = 1; R.setPixelRatio(1); } } };
  // screen <-> group-local
  const ray = new THREE.Raycaster(), pl = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), tv = new THREE.Vector3();
  W.local = (x, y, out = new THREE.Vector3()) => { const w = innerWidth, h = innerHeight; ray.setFromCamera({ x: x / w * 2 - 1, y: -(y / h) * 2 + 1 }, cam); if (!ray.ray.intersectPlane(pl, out)) out.set(1e3, 1e3, 0); return G.worldToLocal(out); };
  W.screen = (v, out = {}, obj = G) => { tv.copy(v); obj.localToWorld(tv); const z = tv.z; tv.project(cam); out.x = (tv.x + 1) / 2 * innerWidth; out.y = (1 - tv.y) / 2 * innerHeight; out.z = z; return out; };
  W.dist = v => { tv.copy(v); G.localToWorld(tv); return tv.distanceTo(cam.position); };
  return W;
}
export function glass({ a = .16, f = .75, solid = false } = {}) {
  return new THREE.ShaderMaterial({ transparent: !solid, depthWrite: solid, side: solid ? THREE.FrontSide : THREE.DoubleSide, uniforms: { uA: { value: a }, uF: { value: f }, uS: { value: solid ? 1 : 0 } },
    vertexShader: `varying vec3 vN; varying vec3 vV; varying vec3 vC;
void main(){ vec4 p = vec4(position,1.); vec3 n = normal;
#ifdef USE_INSTANCING
 p = instanceMatrix * p; n = mat3(instanceMatrix) * n;
#endif
 vC = vec3(.12,.23,.54);
#ifdef USE_INSTANCING_COLOR
 vC = instanceColor;
#endif
 vec4 mv = modelViewMatrix * p; vN = normalize(normalMatrix * n); vV = -mv.xyz; gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform float uA; uniform float uF; uniform float uS; varying vec3 vN; varying vec3 vV; varying vec3 vC;
void main(){ vec3 n = normalize(vN), v = normalize(vV); float fr = pow(1. - abs(dot(n, v)), 2.2);
 float lam = .62 + .38 * max(dot(n, normalize(vec3(.35,.6,.75))), 0.); float sp = pow(max(dot(reflect(-normalize(vec3(.35,.6,.75)), n), v), 0.), 24.);
 vec3 c = mix(vec3(1.) * lam, vC, mix(.28 + .72 * fr, .42 + .45 * fr, uS)) + sp * .35;
 gl_FragColor = vec4(c, mix(uA + uF * fr, 1., uS)); }` });
}
// instanced parts with springs toward home, 3D explode, cursor push
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _v = new THREE.Vector3(), _c = new THREE.Color();
export class Parts {
  constructor(G, geo, mat, items) { this.mesh = new THREE.InstancedMesh(geo, mat, items.length); this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); this.mesh.frustumCulled = false; G.add(this.mesh);
    this.it = items.map(o => ({ h: new THREE.Vector3(...o.h), p: new THREE.Vector3(...(o.p || [M.rnd(-4, 4), M.rnd(-3, 3), M.rnd(-14, 4)])), v: new THREE.Vector3(), r: o.r || [0, 0, 0], ro: new THREE.Vector3(M.rnd(-3, 3), M.rnd(-3, 3), M.rnd(-3, 3)), w: new THREE.Vector3(), s: o.s || [1, 1, 1], c: (o.c || NAVY).clone(), hot: 0, lock: 0, k: o.k || M.rnd(.035, .07), d: o.d || 0, tag: o.tag }));
    this.hold = 0; this.update(0, 0); }
  explode(now, cz = 0, pow = 1) { this.hold = now + 520; for (const o of this.it) { _v.copy(o.p).setZ(o.p.z - cz); if (_v.lengthSq() < 1e-4) _v.set(M.rnd(-1, 1), M.rnd(-1, 1), 0); _v.normalize();
    o.v.addScaledVector(_v, M.rnd(.06, .16) * pow); o.v.z += M.rnd(-.18, .3) * pow; o.w.set(M.rnd(-.3, .3), M.rnd(-.3, .3), M.rnd(-.3, .3)); } }
  push(m, rad, pow, now) { if (!m) return; const r2 = rad * rad; for (const o of this.it) { const dx = o.p.x - m.x, dy = o.p.y - m.y, d2 = dx * dx + dy * dy; if (d2 > r2) continue; const f = (1 - d2 / r2) * pow, d = Math.sqrt(d2) + 1e-3;
    o.v.x += dx / d * f * .02; o.v.y += dy / d * f * .02; o.v.z += f * .03; o.w.x += M.rnd(-.01, .01) * f; o.w.y += M.rnd(-.01, .01) * f; o.hot = Math.max(o.hot, f); } }
  update(now, asm = 1, target) { const held = now < this.hold, list = this.it;
    for (let i = 0; i < list.length; i++) { const o = list[i], k = held ? .004 : o.k * (now > o.d ? 1 : 0), t = target ? target(o, i, _v) : o.h;
      o.v.x = (o.v.x + (t.x - o.p.x) * k) * .86; o.v.y = (o.v.y + (t.y - o.p.y) * k) * .86; o.v.z = (o.v.z + (t.z - o.p.z) * k) * .86; o.p.add(o.v);
      o.ro.addScaledVector(o.w, 1); o.w.multiplyScalar(.95); if (!held) o.ro.multiplyScalar(1 - Math.min(.09, k * 1.4));
      _e.set(o.r[0] + o.ro.x, o.r[1] + o.ro.y, o.r[2] + o.ro.z); _q.setFromEuler(_e); _v.set(o.s[0], o.s[1], o.s[2]); _m.compose(o.p, _q, _v); this.mesh.setMatrixAt(i, _m);
      o.hot *= .93; _c.copy(o.c); if (o.lock > 0) _c.lerp(ORANGE, Math.min(1, o.lock)); else if (o.hot > .02) _c.lerp(SKY, o.hot * .6); this.mesh.setColorAt(i, _c); }
    this.mesh.instanceMatrix.needsUpdate = true; if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true; }
  spread() { let s = 0; for (const o of this.it) s += o.p.distanceToSquared(o.h); return s / this.it.length; }
}
// calendar emblem items (unit radius design): frame tiles + 6x3 cell tiles + binder rings
export function calendarItems(q = 1) { const out = [], push = (h, s, c, r) => out.push({ h, s, c, r });
  const w = .9, hgt = .62, y0 = .05; // frame of small plates
  const n = Math.round(26 * Math.max(q, .6)); for (let i = 0; i < n; i++) { const t = i / n, x = -w / 2 + w * t + w / n / 2; push([x, y0 + hgt / 2, 0], [w / n * .9, .025, .05]); push([x, y0 - hgt / 2, 0], [w / n * .9, .025, .05]); }
  for (let i = 0; i < 12; i++) { const y = y0 - hgt / 2 + hgt * (i + .5) / 12; push([-w / 2, y, 0], [.025, hgt / 12 * .9, .05]); push([w / 2, y, 0], [.025, hgt / 12 * .9, .05]); }
  for (let i = 0; i < 14; i++) push([-w / 2 + .05 + i * (w - .1) / 13, y0 + hgt / 2 - .07, 0], [.012, i % 3 ? .04 : .07, .03]);
  for (const x of [-.2, .2]) for (let k = 0; k < 4; k++) push([x, y0 + hgt / 2 + .02 + k * .035, .02], [.024, .03, .05]);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) push([-w / 2 + .1 + c * (w - .2) / 5, y0 + .1 - r * .14, .02], [.085, .085, r === 1 && c === 3 ? .16 : .07], r === 1 && c === 3 ? ORANGE : (r + c) % 4 === 0 ? NAVY : INK);
  return out; }
export const ringItems = (n, rad, z, depth = .05, wid = .03, gap = .7) => Array.from({ length: n }, (_, i) => { const t = i / n * Math.PI * 2, len = rad * Math.PI * 2 / n * gap; return { h: [Math.cos(t) * rad, Math.sin(t) * rad, z], r: [0, 0, t + Math.PI / 2], s: [len, wid, depth] }; });
export function lines(G, n) { const g = new THREE.BufferGeometry(), a = new Float32Array(n * 6); g.setAttribute('position', new THREE.BufferAttribute(a, 3)); const l = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: NAVY, transparent: true, opacity: .28 })); l.frustumCulled = false; G.add(l); l.a = a; return l; }
