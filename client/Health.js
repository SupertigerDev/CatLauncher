import { GameEngine } from "./GameEngine.js";
import { Player } from "./Player.js";
import { Terrain } from "./Terrain.js";

export class Health {
    /**
    @param {GameEngine} gameEngine
    @param {Player} player */
    constructor(gameEngine, player) {
        this.player = player;
        this.context = gameEngine.context;
        this.color = "#ff4545";
        this.foreColor = "#252525";
        this.health = 100;

        this.height = 20;
        this.width = 150;

    }
    /**
    @param {CanvasRenderingContext2D} context */
    draw() {
        const x = (this.player.x + (this.player.size / 2)) - (this.width / 2)
        const y = this.player.y - this.player.size - 30;
        this.context.fillStyle = this.foreColor;
        this.context.fillRect(x, y, this.width, this.height)
        this.context.fillStyle = this.color;
        this.context.fillRect(x, y, this.health / 100 * this.width, this.height)


        this.context.font = "14px Arial";
        this.context.fillStyle = "black";
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.fillText(this.health + "/100", x +this.width / 2, y + this.height / 2);
        this.context.fillStyle = this.player.isSelf ? "white" : "red";
        this.context.fillText(this.player.name, x +this.width / 2, y - this.height);
    }

    update() {

    }
}