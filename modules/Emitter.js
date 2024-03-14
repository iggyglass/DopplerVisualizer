import * as UI from './UIConsts.js';
import * as Consts from './simConsts.js';
import { Vec2 } from './Vec2.js';

export class Emitter {
    position = Vec2.zero();
    velocity = Vec2.zero();

    constructor(position) {
        this.position = Vec2.fromOther(position);
    }

    update(deltaTime, target) {
        let direction = Vec2.fromOther(target).sub(this.position);
        let dist = direction.magnitude();

        if (dist < Consts.springEpsilon) {
            direction = Vec2.zero();
            dist = 0;
        }

        let acceleration = direction.normalize();

        this.velocity.add(acceleration.mulScalar(Consts.acceleration * deltaTime))

        if (this.velocity.magnitude() > UI.speedSlider.value * Consts.propagationSpeed) {
            this.velocity.normalize().mulScalar(UI.speedSlider.value * Consts.propagationSpeed);
        }

        this.position.add(this.velocity.clone().mulScalar(deltaTime));

        if (dist < Consts.minDist) this.velocity.mulScalar(Consts.damping);

        UI.ctx.beginPath();
        UI.ctx.fillStyle = UI.emitterColor;
        UI.ctx.arc(this.position.x, this.position.y, UI.emitterSize, 0, 2 * Math.PI);
        UI.ctx.fill();
    }

    getPosition() {
        return this.position;
    }
}
