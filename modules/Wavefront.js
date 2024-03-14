import * as UI from './UIConsts.js';
import * as Consts from './simConsts.js';
import { Vec2 } from './Vec2.js';

export class Wavefront {
    position = Vec2.zero();
    lifetime = Consts.waveLifetime;
    radius = 0;
    dead = false;


    constructor(pos, alive) {
        this.position = Vec2.fromOther(pos);
        this.dead = !alive;
    }

    revive(pos) {
        this.position.x = pos.x || pos[0] || 0;
        this.position.y = pos.y || pos[1] || 0;

        this.radius = 0;
        this.dead = false;
        this.lifetime = Consts.waveLifetime;
    }

    update(deltaTime) {
        if (this.dead) return;

        this.radius += Consts.propagationSpeed * deltaTime;
        this.lifetime -= deltaTime;
        this.dead = this.lifetime <= 0;

        UI.ctx.beginPath();
        UI.ctx.globalAlpha = Math.max(this.lifetime, 0) / Consts.waveLifetime;
        UI.ctx.strokeStyle = UI.waveColor;
        UI.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        UI.ctx.stroke();
        UI.ctx.globalAlpha = 1;
    }

    isDead() {
        return this.dead;
    }
}
