import { ArcRender } from "./ArcRender.js";
import { BasicRocket } from "./BasicRocket.js";
import { Player } from "./Player.js";
import { Terrain } from "./Terrain.js";

export class AimGuider {
    /**
    @param {CanvasRenderingContext2D} context
    @param {Player} player */
    constructor(context, mouse, player) {
        this.player = player;
        this.context = context;

        
        this.guiderBg = new Path2D();
        this.guiderPower = new Path2D();
        this.mouse = mouse;
        
        this.power = 0;
        this.angle = 0;
        
        this.show = false;
        
        this.changeAngleSpeed = 100;
        this.lastAngleChanged = Date.now();
        
        this.changePowerSpeed = 100;
        this.lastPowerChanged = Date.now();
        // this.arcRender = new ArcRender(this.x, this.y, context);
        this.basicRocket = new BasicRocket(context, this, 0, 0, this.mouse);

        this.xOffset = this.player.size / 2;
        this.yOffset = 0
    }
    
    get x () {
        return this.player.x + this.xOffset;
    }
    get y () {
        return this.player.y + this.yOffset;
    }

    draw() {
        this.context.setTransform(1, 0, 0, 1, this.x, this.y);
        this.context.rotate(this.angle - 1.5708 );
        if (!this.show) return;

        
        // this.context.fillStyle = "#ffffff82";
        // this.guiderBg = this.createGuider(new Path2D(), 100)
        // this.context.fill(this.guiderBg);

        this.context.fillStyle = "#ffffff9c";
        this.guiderPower = this.createGuider(new Path2D(), this.power);
        this.context.fill(this.guiderPower);

		this.context.setTransform(1, 0, 0, 1, 0, 0);

        // this.arcRender.x = this.x;
        // this.arcRender.y = this.y;
        // this.arcRender.draw(this.angle, this.power);

        this.basicRocket.draw()
        
    }

    update() {
        this.basicRocket.update();
        // change angle using arrow keys
        this.changeAngle();
        if (this.mouse.mouseBtn1) this.show = true;
        if (!this.mouse.mouseBtn1) return;
        const yAngleToMouse = this.y - this.mouse.y;
        const xAngleToMouse = this.x - this.mouse.x;
        this.angle = Math.atan2(yAngleToMouse, xAngleToMouse);
        
        // get distance and set power
        const distance = Math.sqrt( xAngleToMouse*xAngleToMouse + yAngleToMouse*yAngleToMouse );
        this.power = clamp(distance/3, 0, 100)

        if (this.power <= 3) this.show = false; 

        // console.log((this.angle)* (180/Math.PI))



    }

    changeAngle() {
        const leftArrow =this.mouse.keyPressed.ArrowLeft;
        const rightArrow =this.mouse.keyPressed.ArrowRight;
        const upArrow =this.mouse.keyPressed.ArrowUp;
        const downArrow =this.mouse.keyPressed.ArrowDown;
        
        if (leftArrow || rightArrow) {
            this.show = true;
            !this.power && (this.power = 20);
            const now = Date.now();
            if ((now - this.lastAngleChanged ) < this.changeAngleSpeed) return;
            this.lastAngleChanged = now;
            leftArrow && (this.angle -=0.02);
            rightArrow && (this.angle +=0.02);
        }
        if (upArrow || downArrow) {
            this.show = true;
            !this.power && (this.power = 20);
            const now = Date.now();
            if ((now - this.lastPowerChanged ) < this.changePowerSpeed) return;
            this.lastPowerChanged = now;
            downArrow && (this.power -=1);
            upArrow && (this.power += 1);
            this.power = clamp(this.power, 0, 100)

        }
    }
/**@param {Path2D} path */
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