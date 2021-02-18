import { GameEngine } from "../GameEngine.js"

export class ConnectionStatus {
    /**
    @param {GameEngine} gameEngine */
    constructor(gameEngine) {
        this.gameEngine = gameEngine
        this.context = this.gameEngine.context;
        this.canvas = this.gameEngine.canvas;
        this.networkManager = this.gameEngine.networkManager

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
        if (this.networkManager.io.connected && !this.networkManager.authenticated) {
            this.text = "Authenticating..."
        }
        if (this.networkManager.io.connected && this.networkManager.authenticated) {
            this.text = "Authenticated!"
        }
    }
}