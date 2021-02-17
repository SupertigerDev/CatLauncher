import { Player } from "./Player.js";
import { Terrain } from "./Terrain.js";
/**
@param {CanvasRenderingContext2D} context
@param {HTMLCanvasElement} canvas
/*/
export function GameEngine(context, canvas) {
    self = this;
    this.context = context;
    this.canvas = canvas;
    

    this.mouse = {x: 0, y: 0, mouseBtn1: false, keyPressed: {}}

    document.addEventListener("mousemove", (event) => {
        this.mouse.x = event.pageX;
        this.mouse.y = event.pageY;
    });
    document.addEventListener("mousedown", (event) => {
        this.mouse.mouseBtn1 = true;
    });
    document.addEventListener("mouseup", (event) => {
        this.mouse.mouseBtn1 = false;
    });
    document.addEventListener("keyup", event => {
        this.mouse.keyPressed[event.key] = 0;
    })
    document.addEventListener("keydown", event => {
        this.mouse.keyPressed[event.key] = 1;
    })


    this.terrain = new Terrain(canvas.width, canvas.height);
    this.player = new Player(0, 300, this);

    this.update = function () {
        this.player.update();
    }
    this.draw = function () {
        this.terrain.draw(context);
        this.player.draw();
    }
    this.frame = function() {
        context.clearRect(0,0, canvas.width, canvas.height)
        context.setTransform(1, 0, 0, 1, 0, 0); // reset transform
        self.update();
        self.draw(); 
        requestAnimationFrame(self.frame)
    }
    this.frame();


}