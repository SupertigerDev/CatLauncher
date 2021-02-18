import { Player } from "./Player.js";
import { Terrain } from "./Terrain.js";

export class Game {
    /**
    @param {CanvasRenderingContext2D} context
    @param {HTMLCanvasElement} canvas */
    constructor(context, canvas, mouse) {
        this.context = context;
        this.canvas = canvas;
        this.mouse = mouse;

        const terrain = new Terrain(canvas.width, canvas.height)

        const player = new Player(500, 300, context, terrain, mouse)

    }
    draw() {

    }

    update() {

    }


    init() {
        console.log(this)
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height)
        this.update();
        this.draw()
        requestAnimationFrame(this.init);
    }
}