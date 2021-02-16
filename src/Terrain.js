export class Terrain {
    constructor(width = 100, height = 100, context) {
        this.blockSize = 40;
        this.width = width;
        this.height = height;
        this.groundHeight = 150;

        this.terrain = [];


        const maxHeight = (this.blockSize * height / this.blockSize) - this.blockSize;
        const maxBlocksFitHeight = height / this.blockSize;
        let _y = 0;
        let _x = 0;
        for (let y = 0; y < height; y += this.blockSize) {
            this.terrain[_y] = [];
            _x = 0;
            if (maxHeight - y <= this.groundHeight){
                for (let x = 0; x < width; x += this.blockSize) {
                    this.terrain[_y][_x] = 1;
                    _x++
                }
            }
                _y++;
        }

        console.log(this.terrain)


    }
    /**
    @param {CanvasRenderingContext2D} context
    @param {HTMLCanvasElement} canvas */
    draw(context, canvas) {
        context.fillStyle = "purple";
        for (let y = 0; y < this.terrain.length; y++) {
            for (let x = 0; x < this.terrain[y].length; x++) {
                context.fillRect(x * this.blockSize, y*this.blockSize, this.blockSize - 0.5, this.blockSize - 0.5)
                
            }
            
        }

    }
}