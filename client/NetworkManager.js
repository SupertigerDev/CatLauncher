import { GameEngine } from "./GameEngine.js";
import { Player } from "./Player.js";

export class NetworkManager {
        /**
    @param {GameEngine} gameEngine */
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.io = io();
        this.registerEvents()
        this.playerName = localStorage["playerName"]
        this.authenticated = false;
    }
    registerEvents() {
        this.io.on("connect", () => {
            this.io.emit(emitConstants.AUTHENTICATE, {name})
        })
        this.io.on(eventConstants.AUTHENTICATED, () => {
            let name = prompt("Name", this.playerName || "");
            if (!name) name = "Unnamed Cat"
            this.playerName = localStorage["playerName"] = name;
            this.spawnPlayer(name, this.io.id);
        })
    }
    spawnPlayer(name, id) {
        const player = new Player(0, 300, this.gameEngine, name, id)
        player.x = this.gameEngine.canvas.width / 2  - (player.size / 2)
        this.gameEngine.players[id] = player;
        this.authenticated = true;
    }
}

export const emitConstants = {
    "AUTHENTICATE": 0x0,
    "PLAYER_MOVE": 0x1,
}
export const eventConstants = {
    "AUTHENTICATED": 0x0,

}