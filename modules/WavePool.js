import { Wavefront } from './Wavefront.js';
import * as Consts from './simConsts.js';

export class WavePool {
    waves = new Array(Consts.maxWaves);
    aliveStart = 0;
    deadStart = 0;

    constructor() {
        for (let i = 0; i < this.waves.length; i++) {
            this.waves[i] = new Wavefront([0, 0], false);
        }
    }

    update(deltaTime) {
        for (let i = this.aliveStart; i != this.deadStart; i = (i + 1) % this.waves.length) {
            this.waves[i].update(deltaTime);

            if (this.waves[i].isDead()) this.aliveStart = (this.aliveStart + 1) % this.waves.length;
        }
    }

    instantiateWave(pos) {
        this.waves[this.deadStart].revive(pos);
        this.deadStart = (this.deadStart + 1) % this.waves.length;
    }
}
