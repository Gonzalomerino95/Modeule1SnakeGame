class Apple {
    constructor(ctx, isGolden=false){
        this.ctx = ctx;
        this.totalTiles = 25;
        this.tileSize = 24;
        this.isGolden = isGolden;

        this.Xapple = Math.floor(Math.random() * this.totalTiles) * this.tileSize;
        this.Yapple = Math.floor(Math.random() * this.totalTiles) * this.tileSize;
        this.appleSize = 34;

        this.appleSprite = new Image ();
        this.appleSprite.src = this.isGolden ? "./GameAssets/SnakeAssets/GoldenApple.png" : "./GameAssets/SnakeAssets/apple.png";
        this.appleSprite.isReady = false;
        this.appleSprite.onload = () => {
            this.appleSprite.isReady = true;
        }
    }

    isReady() {
        if(this.appleSprite.isReady){
          return this.appleSprite.isReady;
        }
    }

    drawApple(snake){
        snake.snakeBody.forEach((bodyPart) => {
            if(bodyPart[0] === this.Xapple && bodyPart[1] === this.Yapple || this.Xapple === snake.xHead && this.Yapple === snake.yHead){                
                this.Xapple = Math.floor(Math.random() * this.totalTiles) * this.tileSize;
                this.Yapple = Math.floor(Math.random() * this.totalTiles) * this.tileSize;
                this.drawApple(snake);
            }else{
                this.ctx.drawImage(
                this.appleSprite,
                this.Xapple -4,
                this.Yapple -4,
                this.appleSize,
                this.appleSize,
                ) 
            }
        });
    }
    checkAppleCollision(snake, score){
        if(this.Xapple === snake.xHead && this.Yapple === snake.yHead){

            let points = this.isGolden ? 3 : 1;
            //console.log("Points: ", points)
            
            snake.generateBody(points);
            score = score + points;
            //console.log("Score: ", score)

            if(!this.isGolden){
                this.Xapple = Math.floor(Math.random() * this.totalTiles) * this.tileSize;
                this.Yapple = Math.floor(Math.random() * this.totalTiles) * this.tileSize;
                this.drawApple(snake);
            }else{
                return {result: true, score: score};
            }
        }
        return {result: false, score: score};
    }

}