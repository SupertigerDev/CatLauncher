import { Terrain } from "./Terrain.js";
import { Health } from "./Health.js";
import { AimGuider } from "./AimGuider.js";
import { GameEngine } from "./GameEngine.js";
import { emitConstants } from "./NetworkManager.js";

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

		this.health = new Health(gameEngine);
		this.aimGuider = new AimGuider(gameEngine, this);
		this.isSelf = this.id === this.gameEngine.networkManager.io.id;
	}
	draw() {
		this.context.fillStyle = this.color;
		this.context.fillRect(this.x, this.y, this.size, this.size)
		this.health.draw((this.x + (this.size / 2)) - (this.health.width / 2), this.y - this.size);
		this.aimGuider.draw();
		this.context.setTransform(1, 0, 0, 1, 0, 0);
	}

	update() {
		this.aimGuider.update();
		this.collision();
		this.fallGravity();
		this.movement();
		this.emitEvent();
	}
	emitEvent() {
		if (this.lastX !== Math.round(this.x) || this.lastY !== Math.round(this.y)) {
			this.lastX = Math.round(this.x);
			this.lastY = Math.round(this.y);
			this.io.emit(emitConstants.PLAYER_MOVE, {x: this.lastX, y: this.lastY});
		} 
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
		if (!this.isOnGround) {
			this.gravity += 0.1;
			this.y += this.gravity;
		} else {
			this.gravity = 0;
		}
	}
	movement() {
		if (this.mouse.keyPressed.a) {
			this.x -=1;
		}
		if (this.mouse.keyPressed.d) {
			this.x +=1;
		}
	}
}