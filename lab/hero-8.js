// 8 · Assembly
import * as M from './mech.js';
import { emblem } from './emblem.js';
const E = emblem(); const S = M.stage(S => E.build(S)); S.onDown = () => E.explode();
M.loop(now => { const c = M.cursor(S, now); S.ctx.clearRect(0, 0, S.W, S.H); M.bg(S); E.update(S, now, c); });
S.start();
