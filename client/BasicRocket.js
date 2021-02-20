import { GameEngine } from "./GameEngine.js";
import { Player } from "./Player.js";

export class BasicRocket {
    /**
    @param {GameEngine} gameEngine
    @param {Player} player */
    constructor(gameEngine, player) {
        this.power = 0;
        this.angle = 0;
        this.context = gameEngine.context;
        this.player = player;
        this.aimGuider = player.aimGuider;
        this.mouse = gameEngine.mouse;
        this.gravity = -9.8; 
        this.launch = false;  
        this.xStartLaunch = this.aimGuider.x;
        this.yStartLaunch = this.aimGuider.y;
        this.xOffset = 0;
        this.yOffset = 0;

        // velocity X and Y
        this.v_x = this.velocity * Math.cos(this.angle)
        this.v_y = this.velocity *Math.sin(this.angle)

        // record path
        this.lastShotPathArray = [];
        this.recordStartTime = Date.now();
        this.recordLength = 5 * 1000 // 5 seconds
        this.recordInterval = 50 // 500 ms
        this.lastPathStamp = 0;


    }

    get velocity () {
        return this.power / 2.8
    }
    get x () {
        return this.xStartLaunch - this.xOffset;
    }
    get y () {
        return this.yStartLaunch - this.yOffset;
    }
    draw() {
        const x = this.x - this.xOffset * 29;
        const y = this.y - this.yOffset * 29;
        this.context.beginPath();
        this.context.fillStyle = "red"
        this.context.arc(x,y,10, 0, 2 * Math.PI);
        this.context.fill();
        if (this.launch) {
            this.drawLines(this.lastShotPathArray);
        }

    }
    update() {

        if (this.launch) {
            const dt = 0.01;
            const v_yNew = this.v_y + (this.gravity * dt)
            const v_xNew = this.v_x ;

            const v_yAverage = (v_yNew + this.v_y)/ 2
            const v_xAverage = (this.v_x + v_xNew)/ 2

            this.xOffset += v_xAverage * dt;
            this.yOffset += v_yAverage * dt


            this.v_y = v_yNew;
            this.v_x = v_xNew;
            this.recordPath();
        }
    }
    launchRocket(angle, power) {
        this.power = power;
        this.angle = angle;
        this.xStartLaunch = this.aimGuider.x;
        this.yStartLaunch = this.aimGuider.y;
        this.launch = true;
        this.xOffset = 0;
        this.yOffset = 0;
        this.v_x = this.velocity * Math.cos(this.angle)
        this.v_y = this.velocity *Math.sin(this.angle)
        this.recordStartTime = Date.now();
        this.lastShotPathArray = [{x: this.aimGuider.x, y: this.aimGuider.y}];
        this.recordPath();
    }
    recordPath() {
        const now = Date.now();
        if (now -this.recordStartTime > this.recordLength) {
            this.launch = false;
        };
        if (now - this.lastPathStamp < this.recordInterval) return;
        const x = this.x - this.xOffset * 29;
        const y = this.y - this.yOffset * 29;
        this.lastPathStamp = now;
        this.lastShotPathArray.push({x, y})
    }

    drawLines(pathArr) {
        if (!pathArr.length) return;
        this.context.strokeStyle = "white";
        this.context.beginPath();
        this.context.moveTo(pathArr[0].x, pathArr[0].y);
        for (let i = 1; i < pathArr.length; i++) {
            const pos = pathArr[i];
            this.context.lineTo(pos.x, pos.y);            
        }
        this.context.stroke();
    }
}