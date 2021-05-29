class Background{
    constructor(ctx){
        this.ctx = ctx;
        this.totalTiles = 25;
        this.tileSize = 24;
        this.x = 0;
        this.y = 0;
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;

        this.img = new Image ();
        this.img.src = "./GameAssets/GrassBackgroundOption2.png";
        this.img.isReady = false;
        this.img.onload = () => {
            this.img.isReady = true;
        }
    }

    isReady() {
        return this.img.isReady
    }

    draw(){
        if (this.isReady()) {
            this.ctx.drawImage(
                this.img,
                this.x,
                this.y,
                this.width,
                this.height,
            )   
        }
        
        //Creating a grid to divide our canvas into 30*30 tiles (Tiles are 20*20 pixels)
            
        for(var i=0; i<=600; i += this.tileSize){
            this.ctx.beginPath();
            //Creating the vertical lines of our grid
            this.ctx.moveTo(i,0);
            this.ctx.lineTo(i,600);
            //Creating the horizonal lines of our grid
            this.ctx.moveTo(0,i);
            this.ctx.lineTo(600,i);
            //and drawing the lines
            ctx.setLineDash([4, 2])
            this.ctx.strokeStyle = "#77B829";
            this.ctx.stroke();

        }

    }

}