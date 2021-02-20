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
            let name = prompt("Name", this.playerName || "");
            if (!name) name = "Unnamed Cat"
            this.playerName = localStorage["playerName"] = name;
            this.io.emit(emitConstants.AUTHENTICATE, {name})
        })
        this.io.on(eventConstants.AUTHENTICATED, ({connectedPlayers}) => {
            this.spawnPlayer(this.playerName, this.io.id);
            for (let id in connectedPlayers) {
                const {name, position: {x, y}} = connectedPlayers[id];
                this.gameEngine.players[id] = new Player(x, y, this.gameEngine, name, id);
            }

            this.authenticated = true;
        })
        this.io.on(eventConstants.PLAYER_CONNECTED, ({id, name}) => {
            this.gameEngine.players[id] = new Player(0, 0, this.gameEngine, name, id);
        })
        this.io.on(eventConstants.PLAYER_MOVED, ({id, x, y}) => {
            const player = this.gameEngine.players[id];
            player.x = x;
            player.y = y;
        })
        this.io.on(eventConstants.PLAYER_DISCONNECTED, ({id}) => {
            delete this.gameEngine.players[id];
        })
        this.io.on(eventConstants.LAUNCH_ROCKET, ({id, power, angle}) => {
            this.gameEngine.players?.[id].launchRocket(power, angle);
        })
    }
    spawnPlayer(name, id) {
        const player = new Player(0, 300, this.gameEngine, name, id)
        player.x = this.gameEngine.canvas.width / 2  - (player.size / 2)
        this.gameEngine.players[id] = player;
    }
    launchRocketRequest(power, angle) {
        this.io.emit(emitConstants.LAUNCH_ROCKET_REQUEST, {power, angle})
    }
}

export const emitConstants = {
    "AUTHENTICATE": 0x0,
    "PLAYER_MOVE": 0x1,
    "LAUNCH_ROCKET_REQUEST": 0x2,
}
export const eventConstants = {
    "AUTHENTICATED": 0x0,
    "PLAYER_MOVED": 0x1,
    "PLAYER_CONNECTED": 0x2,
    "PLAYER_DISCONNECTED": 0x3,
    "LAUNCH_ROCKET": 0x4


}