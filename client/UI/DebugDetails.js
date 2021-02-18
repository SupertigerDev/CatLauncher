import { GameEngine } from "../GameEngine.js"

export class DebugDetails {
    /**
    @param {GameEngine} gameEngine */
    constructor(gameEngine) {
        this.gameEngine = gameEngine
        this.context = this.gameEngine.context;
        this.canvas = this.gameEngine.canvas;

        this.debugInfo = []
        this.fontSize = 12;
        this.offsetx = 10;
        this.offsety = 10;
    }
    draw() {
        this.context.textAlign = "start"
        this.context.textBaseline = "top"
        this.context.font = this.fontSize + "px Arial";
        for (let i = 0; i < this.debugInfo.length; i++) {
            const [field, value] = this.debugInfo[i];
            this.context.fillStyle = "gray";
            this.context.fillText(field+ ": ", this.offsetx,i * this.fontSize + this.offsety)
            this.context.fillStyle = "white";
            this.context.fillText(value, this.context.measureText(field + ": ").width + this.offsetx, i * this.fontSize + this.offsety)
            
        }
    }
    update() {
        this.debugInfo = []
        const playerName = this.gameEngine.networkManager.playerName;
        const socketId = this.gameEngine.networkManager.io.id;
        this.debugInfo.push(["FPS", round(this.gameEngine.fps, 0)])
        playerName && this.debugInfo.push(["PLAYER_NAME", playerName])
        socketId && this.debugInfo.push(["SOCKET_ID", this.gameEngine.networkManager.io.id])
        if (socketId) {
            const selfPlayer = this.gameEngine.players[socketId];
            this.debugInfo.push(["X", round(selfPlayer.x, 0)])
            this.debugInfo.push(["Y", round(selfPlayer.y, 0)])
            this.debugInfo.push(["ANGLE", round((selfPlayer.aimGuider.angle)* (180/Math.PI), 1)])
            this.debugInfo.push(["POWER", round(selfPlayer.aimGuider.power, 1)])
        }

    }

}
function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}