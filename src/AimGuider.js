import { Terrain } from "./Terrain.js";

export class AimGuider {
    /**
    @param {CanvasRenderingContext2D} context */
    constructor(context) {
        this.context = context;

        this.guiderBg = new Path2D();
        this.guiderPower = new Path2D();

        this.power = 50;
        this.angle = 0;

        this.x = 0;
        this.y = 0

    }
    draw(x, y) {
        this.x = x;
        this.y = y;
        this.context.setTransform(1, 0, 0, 1, x, y);
        this.context.rotate(this.angle);

        
        this.context.fillStyle = "#ffffff82";
        this.guiderBg = this.createGuider(new Path2D(), 100)
        this.context.fill(this.guiderBg);

        this.context.fillStyle = "#ffffff9c";
        this.guiderPower = this.createGuider(new Path2D(), this.power);
        this.context.fill(this.guiderPower);
    }

    update(mouse) {
        const mouseYMid = (mouse.y - this.y);
        const mouseXMid = (mouse.x - this.x);
        this.angle = Math.atan2(mouseYMid, mouseXMid) - 300;

        const mouseYClamp = Math.abs(mouseYMid)
        const mouseXClamp = Math.abs(mouseXMid)

        this.power = mouseYMid


    }
/**
    @param {Path2D} path */
    createGuider(path, level) {
        const size = level * 3;
        const width = size / 9;

        path.moveTo(0, 0);
        path.lineTo(-width, -size);
        path.lineTo(width, -size);
        return path;
    }
}

function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}