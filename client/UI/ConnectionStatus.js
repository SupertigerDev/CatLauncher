import { GameEngine } from "../GameEngine.js"

export class ConnectionStatus {
    /**
    @param {GameEngine} gameEngine */
    constructor(gameEngine) {
        this.gameEngine = gameEngine
        this.context = this.gameEngine.context;
        this.canvas = this.gameEngine.canvas;

        this.text = "Connecting...";
    }
    draw() {
        this.context.textAlign = "center"
        this.context.textBaseline = "middle"
        this.context.font = "18px Arial";
        this.context.fillStyle = "white";
        this.context.fillText(this.text, this.canvas.width/2, 40)
    }
    update() {

        if (this.gameEngine.networkManager.io.connected) {
            this.text = "Connected!"
        }

    }
}