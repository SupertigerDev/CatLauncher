export class ArcRender {
    /**
    @param {CanvasRenderingContext2D} context */
    constructor(x, y, context) {
        this.context = context;
        this.x = x; 
        this.y = y;

        this.angle = 45 * (Math.PI/180);
        this.velocity = 5;
        this.gravity = -0.7
        this.resolusion = 20;
    }

    draw(angle, power) {
        this.angle = angle - 300;
        this.velocity = power / 3
        this.drawLines(this.calculateArcArray())
    }
    calculateArcArray() {

        
        const arcLines = [];
        const maxDistance = ((this.velocity * this.velocity * Math.sin(2*this.angle)) / this.gravity)


        for (let i = 0; i <= this.resolusion; i++) {
            const t = i / this.resolusion;
            arcLines[i] = this.calculateArcPoint(t, maxDistance)   
        }
        return  arcLines;
    }


    calculateArcPoint(t, maxDistance) {

        const x = t * maxDistance
        const y = x * Math.tan(this.angle) - ((this.gravity * x * x) / (2 * this.velocity * this.velocity * Math.cos(this.angle) * Math.cos(this.angle)))
                
        return {x, y}
    }

    drawLines(pathArr) {
        this.context.strokeStyle = "blue";
        this.context.beginPath();
        this.context.moveTo(this.x, this.y);
        for (let i = 0; i < pathArr.length; i++) {
            const pos = pathArr[i];
            this.context.lineTo(this.x + pos.x, this.y + pos.y);            
        }
        this.context.stroke();
    }
}