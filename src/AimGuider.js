import { Terrain } from "./Terrain.js";

export class AimGuider {
    /**
    @param {CanvasRenderingContext2D} context */
    constructor(context) {
        this.context = context;

        this.guiderBg = new Path2D();
        this.guiderPower = new Path2D();

        this.power = 0;
        this.angle = 0;

        this.x = 0;
        this.y = 0

        this.show = false;

    }
    draw(x, y) {
        this.x = x;
        this.y = y;
        this.context.setTransform(1, 0, 0, 1, x, y);
        this.context.rotate(this.angle);
        if (!this.show) return;

        
        // this.context.fillStyle = "#ffffff82";
        // this.guiderBg = this.createGuider(new Path2D(), 100)
        // this.context.fill(this.guiderBg);

        this.context.fillStyle = "#ffffff9c";
        this.guiderPower = this.createGuider(new Path2D(), this.power);
        this.context.fill(this.guiderPower);
    }

    update(mouse) {
        if (mouse.mouseBtn1) this.show = true;
        if (!mouse.mouseBtn1) return;
        const yAngleToMouse = this.y - mouse.y;
        const xAngleToMouse = this.x - mouse.x;
        this.angle = Math.atan2(yAngleToMouse, xAngleToMouse) + 300;
        
        // get distance and set power
        const distance = Math.sqrt( xAngleToMouse*xAngleToMouse + yAngleToMouse*yAngleToMouse );
        this.power = clamp(distance/3, 0, 100)

        if (this.power <= 3) this.show = false; 



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