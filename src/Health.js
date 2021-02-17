import { GameEngine } from "./GameEngine.js";
import { Terrain } from "./Terrain.js";

export class Health {
    /**
    @param {GameEngine} gameEngine */
    constructor(gameEngine) {
        this.context = gameEngine.context;
        this.color = "#ff4545";
        this.foreColor = "#252525";
        this.health = 90;

        this.height = 20;
        this.width = 150;

    }
    /**
    @param {CanvasRenderingContext2D} context */
    draw(x, y) {
        y -= 30;
        this.context.fillStyle = this.foreColor;
        this.context.fillRect(x, y, this.width, this.height)
        this.context.fillStyle = this.color;
        this.context.fillRect(x, y, this.health / 100 * this.width, this.height)


        this.context.font = "14px Arial";
        this.context.fillStyle = "black";
        this.context.textAlign = "center";
        this.context.fillText(this.health + "/100", x +this.width / 2, y + this.height - 4);
    }

    update() {

    }
}