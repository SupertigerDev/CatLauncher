import { Terrain } from "./Terrain.js";
import { Health } from "./Health.js";
import { AimGuider } from "./AimGuider.js";

export class Player {
    /**
    @param {Terrain} terrain
    @param {CanvasRenderingContext2D} context */
    constructor(x, y, context, terrain, mouse) {
        this.mouse = mouse;
        this.terrain = terrain;
        this.context = context;
        this.x = x;
        this.y = y;
        this.color = "green";
        this.size = 30;

        this.velocity = 1;
        this.gravity = 0;

        this.isOnGround = false;
        
        this.health = new Health(this.context);

        this.aimGuider = new AimGuider(this.context);

    }
    /**
    @param {CanvasRenderingContext2D} context */
    draw() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.size, this.size)
        this.health.draw((this.x + (this.size/ 2)) - (this.health.width / 2), this.y - this.size);
        this.aimGuider.draw(this.x + (this.size/2), this.y);
    }

    update() {
        this.aimGuider.update(this.mouse);
        const imageData = this.context.getImageData(this.x, this.y + this.size, 1, 1).data;
        const hasValue = parseInt(imageData.join(""));
        if (hasValue){
            this.isOnGround = true;
            return;
        }
        this.isOnGround = false;
        this.y += 5;
    }
}