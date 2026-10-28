import { RM } from './icons.js';
const L = [...document.querySelectorAll('[data-depth]')], btn = document.querySelector('#gyro');
let tx = 0, ty = 0, x = 0, y = 0, sy = 0;
addEventListener('pointermove', e => { tx = e.clientX / innerWidth - .5; ty = e.clientY / innerHeight - .5; });
addEventListener('scroll', () => { sy = scrollY; }, { passive: true });
const ori = e => { if (e.gamma == null) return; tx = Math.max(-.5, Math.min(.5, e.gamma / 50)); ty = Math.max(-.5, Math.min(.5, (e.beta - 40) / 50)); };
const startGyro = () => addEventListener('deviceorientation', ori);
if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
  btn.hidden = false; btn.onclick = () => DeviceOrientationEvent.requestPermission().then(s => { if (s === 'granted') { startGyro(); btn.hidden = true; } });
} else startGyro();
const frame = () => {
  x += (tx - x) * .07; y += (ty - y) * .07;
  L.forEach(l => { const d = +l.dataset.depth; l.style.transform = `translate3d(${-x * d * 60}px, ${-y * d * 40 - sy * d * .25}px, 0) rotate(${x * d * (l.dataset.rot || 0)}deg)`; });
  requestAnimationFrame(frame);
};
if (!RM) frame();
