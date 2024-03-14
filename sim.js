import { Emitter } from './modules/Emitter.js';
import { WavePool } from './modules/WavePool.js';
import * as Consts from './modules/simConsts.js';
import * as UI from './modules/UIConsts.js';

var pool = new WavePool();
var emitter;

var lastDraw = Date.now();

var mousePos = {
    x: window.innerWidth * window.devicePixelRatio / 2,
    y: window.innerHeight * window.devicePixelRatio / 2
};

function init() {
    initCanvas();

    window.addEventListener('resize', initCanvas);
    window.addEventListener('mousemove', onMouseMove);
    UI.speedSlider.addEventListener('input', (_) => UI.speedSliderText.innerHTML = `${UI.speedSlider.value}<i>c</i>`);
    setInterval(() => pool.instantiateWave(emitter.getPosition()), Consts.wavePeriod);

    emitter = new Emitter([UI.canvas.width / 2, UI.canvas.height / 2]);

    window.requestAnimationFrame(draw);
}

function initCanvas() {
    UI.canvas.width = Math.floor(window.innerWidth * window.devicePixelRatio);
    UI.canvas.height = Math.floor(window.innerHeight * window.devicePixelRatio);

    UI.canvas.style.width = `${window.innerWidth}px`;
    UI.canvas.style.height = `${window.innerHeight}px`;
}

function onMouseMove(event) {
    mousePos.x = event.x * window.devicePixelRatio;
    mousePos.y = event.y * window.devicePixelRatio;
}

function draw() {
    let currentTime = Date.now();
    let deltaTime = currentTime - lastDraw;
    lastDraw = currentTime;

    UI.ctx.clearRect(0, 0, UI.canvas.width, UI.canvas.height);

    emitter.update(deltaTime, mousePos);
    pool.update(deltaTime);

    window.requestAnimationFrame(draw);
}

window.init = init;
