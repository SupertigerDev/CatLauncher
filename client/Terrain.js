export class Terrain {
    constructor(width = 100, height = 100) {
        this.blockSize = 40;
        this.width = width;
        this.height = height;
        this.groundHeight = 300;
        this.color = "purple";
        this.terrain = [];


        const maxHeight = (this.blockSize * height / this.blockSize) - this.blockSize;
        const maxWidth = (this.blockSize * width / this.blockSize) - this.blockSize;
        const maxBlocksFitHeight = height / this.blockSize;
        let _y = 0;
        let _x = 0;

        for (let y = height; y >= 0; y-= this.blockSize) {
            this.terrain[_y] = [];
            _x = 0;
            for (let x = 0; x < width; x += this.blockSize) {
                const pos = {x: _x * this.blockSize, y: _y * this.blockSize}
                this.terrain[_y][_x] = y <= this.groundHeight ? pos : 0;
      
                _x++
            } 
                _y++;
        }

        console.log(this.terrain)


    }
    /**
    @param {CanvasRenderingContext2D} context */
    draw(context) {
        context.fillStyle = this.color;
        for (let y = 0; y < this.terrain.length; y++) {
            for (let x = 0; x < this.terrain[y].length; x++) {
                const block = this.terrain[y][x];
                if (block) {
                    context.fillRect(x * this.blockSize, y*this.blockSize, this.blockSize - 0.5, this.blockSize - 0.5)
                }
            }
            
        }

    }
}