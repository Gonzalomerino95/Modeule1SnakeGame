let frameCount = 0;

class Game {
    constructor(ctx){
        this.ctx = ctx;
        this.background = new Background(ctx);
        this.snake = new Snake(ctx);
        this.apple = new Apple(ctx);
        this.goldenApple = [];
        this.timer = null;
        this.counter = 0;
        this.score = 0;

        this.theme = new Audio("./GameAssets/277363__nyan-cat__8bit-race-music.mp3");
        this.theme.volume = 0.1
    }

    startGame(){
        
        this.interval = setInterval(() => {

            this.clear();

            this.move();
            this.theme.play();
            if(this.counter % 120 === 0 && this.counter > 0){
                this.goldenApple.push(new Apple(ctx,true));
                this.timer = setTimeout(() => {
                                //console.log("Borro elemento array intervalo: ",this.goldenApple.length)
                                this.goldenApple.pop();
                            }, 1000*5);
            }
            this.checkColisions(); 

            this.draw();
            
            this.drawScore();

            this.counter++;

        }, 1000/4);

    };

    clear(){
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    };

    move(){
        this.snake.move();
    }; 

    draw(){
        this.background.draw();
        this.snake.draw();
        this.apple.drawApple(this.snake);
        this.goldenApple.forEach((apple)=> apple.drawApple(this.snake));        
    };

    checkColisions(){
        let resultObj = this.apple.checkAppleCollision(this.snake, this.score);
        this.score = resultObj.score
        this.goldenApple.forEach((apple) =>{
            resultObj = apple.checkAppleCollision(this.snake, this.score)
            this.score = resultObj.score
            //console.log(resultObj)
            if(resultObj.result){
                //console.log("Borro el elemento del array: ",this.goldenApple.length)
                this.goldenApple.pop();
                clearTimeout(this.timer)
            }
        })
        if(this.snake.colisionDetector()){
            this.gameOver();
        }
        //console.log("Total points: ",this.score)
    }

    drawScore(){
        this.ctx.fillStyle="white";
        this.ctx.font = "24px Arial";
        this.ctx.fillText("SCORE: " + this.score, 430,25);
    }

    gameOver(){
        clearInterval(this.interval);
        this.gameOverScreen();
    }

    gameOverScreen(){
        setTimeout(() => {
            this.ctx.fillStyle = "rgb(47, 30, 20, 0.6)";
            this.ctx.strokeStyle = "white";
            this.ctx.fillRect(187,260, 200, 60)  
            this.ctx.fillRect(90,350, 420, 60)  
            this.ctx.strokeRect(187,260, 200, 60)
            this.ctx.strokeRect(90,350, 420, 60)
            this.ctx.fillStyle = "white";
            this.ctx.font = "150px, Arial";
            this.ctx.fillText("GAME OVER!",210,300);
            this.ctx.font = "80px, Arial";
            this.ctx.fillText(`PRESS "RESTART" TO TRY AGAIN`,105,390);         
        }, 250);        
    }

    onKeyEvent(event) {
        this.snake.onKeyEvent(event)
    };  

    deleateApple(){
        if(this.apple.isEaten){
        }
    }
    
}