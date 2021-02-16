import { Terrain } from './Terrain.js'
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.append(canvas);


// context.fillStyle = "white";
// context.fillRect(canvas.width - 10,canvas.height - 10,10,10)

const terrain = new Terrain(canvas.height, canvas.width, context);

// console.log(context.getImageData(0, 0,10, 1 ))


function loop() {
    requestAnimationFrame(loop);
    context.clearRect(0,0, canvas.width, canvas.height)
    terrain.draw(context, canvas);
}

requestAnimationFrame(loop);