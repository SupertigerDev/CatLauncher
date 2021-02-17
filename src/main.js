import { Player } from './Player.js';
import { Terrain } from './Terrain.js'
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.append(canvas);


// context.fillStyle = "white";
// context.fillRect(canvas.width - 10,canvas.height - 10,10,10)
// console.log(context.getImageData(0, 0,10, 1 ))

const mouse = {x: 0, y: 0, mouseBtn1: false, keyPressed: {}}

document.addEventListener("mousemove", (event) => {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
});
document.addEventListener("mousedown", (event) => {
    mouse.mouseBtn1 = true;
});
document.addEventListener("mouseup", (event) => {
    mouse.mouseBtn1 = false;
});
document.addEventListener("keyup", event => {
    mouse.keyPressed[event.key] = 0;
})
document.addEventListener("keydown", event => {
    mouse.keyPressed[event.key] = 1;
})

function GameEngine() {
    self = this;
    
    this.terrain = new Terrain(canvas.width, canvas.height);
    this.player = new Player(0, 300, context, this.terrain, mouse);

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
let gameEngine;

window.gameEngine = gameEngine = new GameEngine();
