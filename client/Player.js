import { Terrain } from "./Terrain.js";
import { Health } from "./Health.js";
import { AimGuider } from "./AimGuider.js";
import { GameEngine } from "./GameEngine.js";
import { emitConstants } from "./NetworkManager.js";
import { BasicRocket } from "./BasicRocket.js";

export class Player {
	/**
	@param {Terrain} terrain
	@param {GameEngine} gameEngine */
	constructor(x, y, gameEngine, name, id) {
		this.name = name;
		this.id = id;
		this.gameEngine = gameEngine;
		this.io = this.gameEngine.networkManager.io;
		this.mouse = gameEngine.mouse;
		this.context = gameEngine.context;
		this.x = x;
		this.y = y;
		this.lastX = 0;
		this.lastY = 0;
		this.color = "green";
		this.size = 30;

		this.velocity = 0.1;
		this.gravity = 0;

		this.isOnGround = false;

		this.health = new Health(gameEngine, this);
		this.aimGuider = new AimGuider(gameEngine, this);
		this.basicRocket = new BasicRocket(gameEngine, this, 0, 0);
		this.isSelf = this.id === this.gameEngine.networkManager.io.id;
	}
	draw() {
		this.basicRocket.draw()
		this.context.fillStyle = this.color;
		this.context.fillRect(this.x, this.y, this.size, this.size)
		this.health.draw();
		this.aimGuider.draw();
		this.context.setTransform(1, 0, 0, 1, 0, 0);
	}

	update(delta) {
		this.aimGuider.update();
		this.basicRocket.update()
		this.collision();
		this.fallGravity();
		this.movement(delta);
		this.emitEvent();

		// launch rocket
        if (this.isSelf && !this.basicRocket.launch && this.mouse.keyPressed[" "]) {
            this.gameEngine.networkManager.launchRocketRequest(this.aimGuider.power, this.aimGuider.angle);
        }
	}
	emitEvent() {
		if (!this.isSelf) return;
		if (this.lastX !== Math.round(this.x) || this.lastY !== Math.round(this.y)) {
			this.lastX = Math.round(this.x);
			this.lastY = Math.round(this.y);
			this.io.emit(emitConstants.PLAYER_MOVE, {x: this.lastX, y: this.lastY});
		} 
	}

	launchRocket(power, angle) {
		this.basicRocket.launchRocket(angle, power);
	}

	collision() {
		const terrain = this.gameEngine.terrain;
		this.isOnGround = false;
		for (let y = 0; y < terrain.terrain.length; y++) {
			for (let x = 0; x < terrain.terrain[y].length; x++) {
				const block = terrain.terrain[y][x];
				if (!block) continue;

				const yColliding = this.y > block.y - this.size && this.y < block.y + terrain.blockSize;
				const xColliding = this.x > block.x - this.size && this.x < block.x + terrain.blockSize;
				if (yColliding && xColliding) {
					this.y = block.y - this.size
					this.isOnGround = true;
				}
			}
		}
	}
	fallGravity() {
		if (!this.isSelf) return;
		if (!this.isOnGround) {
			this.gravity += 0.1;
			this.y += this.gravity;
		} else {
			this.gravity = 0;
		}
	}
	movement(delta) {
		if (!this.isSelf) return;
		if (this.mouse.keyPressed.a) {
			this.x -=150 * delta;
		}
		if (this.mouse.keyPressed.d) {
			this.x +=150 * delta;
		}
	}
}