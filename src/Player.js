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

		this.velocity = 0.1;
		this.gravity = 0;

		this.isOnGround = false;

		this.health = new Health(this.context);

		this.aimGuider = new AimGuider(this.context, mouse, this);

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
	}

	collision() {
		this.isOnGround = false;
		for (let y = 0; y < this.terrain.terrain.length; y++) {
			for (let x = 0; x < this.terrain.terrain[y].length; x++) {
				const block = this.terrain.terrain[y][x];
				if (!block) continue;

				const yColliding = this.y > block.y - this.size && this.y < block.y + this.terrain.blockSize;
				const xColliding = this.x > block.x - this.size && this.x < block.x + this.terrain.blockSize;
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