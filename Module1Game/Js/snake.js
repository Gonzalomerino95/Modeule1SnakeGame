KEY_A = 65;
KEY_D = 68;
KEY_W = 87;
KEY_S = 83;

class Snake {
  constructor(ctx) {
    this.ctx = ctx;
    this.totalTiles = 25;
    this.tileSize = 24;

    this.xHead = this.tileSize *12;
    this.yHead = this.tileSize *12;

    this.headSize = this.tileSize + 4;

    this.previousHeadPosition = [this.xHead, this.yHead];

    this.snakeBody = [];
    this.bodySize = 0;

    this.vx = 0;
    this.vy = 0;

    this.movements = {
      left: false,
      right: false,
      up: false,
      down: false,
    };

    this.headRight = new Image ();
        this.headRight.src = "./GameAssets/SnakeAssets/head_right.png";
        this.headRight.isReady = false;
        this.headRight.onload = () => {
            this.headRight.isReady = true;
        }

    this.headLeft = new Image ();
        this.headLeft.src = "./GameAssets/SnakeAssets/head_left.png";
        this.headLeft.isReady = false;
        this.headLeft.onload = () => {
            this.headLeft.isReady = true;
        }

    this.headUp = new Image ();
        this.headUp.src = "./GameAssets/SnakeAssets/head_up.png";
        this.headUp.isReady = false;
        this.headUp.onload = () => {
            this.headUp.isReady = true;
        }

    this.headDown = new Image ();
        this.headDown.src = "./GameAssets/SnakeAssets/head_down.png";
        this.headDown.isReady = false;
        this.headDown.onload = () => {
            this.headDown.isReady = true;
        }
    }

  isReady() {
      if(this.headRight.isReady){
        return this.headRight.isReady;
      } 
      if(this.headLeft.isReady){
        return this.headLeft.isReady;
      }
      if(this.headUp.isReady){
        return this.headUp.isReady;
      }
      if(this.headDown.isReady){
        return this.headDown.isReady;
      }
    }

  draw() {
        this.drawBody();
        if (this.movements.right && this.isReady()) {
            this.ctx.drawImage(
            this.headRight,
            this.xHead - 2,
            this.yHead -2,
            this.headSize,
            this.headSize,
            ) 
        }else if (this.movements.left && this.isReady()) {
            this.ctx.drawImage(
            this.headLeft,
            this.xHead - 2,
            this.yHead -2,
            this.headSize,
            this.headSize,
            ) 
        }else if (this.movements.up && this.isReady()) {
            this.ctx.drawImage(
            this.headUp,
            this.xHead - 2,
            this.yHead -2,
            this.headSize,
            this.headSize,
            ) 
        }else if (this.movements.down && this.isReady()) {
            this.ctx.drawImage(
            this.headDown,
            this.xHead - 2,
            this.yHead -2,
            this.headSize,
            this.headSize,
            ) 
        }  else {
            this.ctx.drawImage(
            this.headDown,
            this.xHead - 2,
            this.yHead -2,
            this.headSize,
            this.headSize,
            ) 
        } 
    }

  onKeyEvent(event) {
    const status = event.type === "keydown";
    if(this.bodySize === 0){
        this.generateBody(2);
    }
    switch (event.keyCode) {
      case KEY_W:
        if (!this.movements.down) {
          (this.movements.left = false),
          (this.movements.right = false),
          (this.movements.up = status);
        }
        break;
      case KEY_A:
        if (!this.movements.right) {
          (this.movements.up = false),
          (this.movements.down = false),
          (this.movements.left = status);
        }
        break;
      case KEY_S:
        if (!this.movements.up) {
          (this.movements.left = false),
          (this.movements.right = false),
          (this.movements.down = status);
        }
        break;
      case KEY_D:
        if (!this.movements.left) {
          (this.movements.up = false),
          (this.movements.down = false),
          (this.movements.right = status);
        }
        break;
    }
  }

  move() {
    this.previousHeadPosition = [this.xHead, this.yHead];
    if (this.movements.up) {
      this.vy = -this.tileSize;
      this.yHead = this.yHead + this.vy;
      if(this.yHead < 0){
        this.yHead = this.ctx.canvas.height - this.tileSize;
        }
    }
    if (this.movements.left) {
      this.vx = -this.tileSize;
      this.xHead = this.xHead + this.vx;
      if(this.xHead < 0){
        this.xHead = this.ctx.canvas.width - this.tileSize;
        }
    }
    if (this.movements.down) {
      this.vy = this.tileSize;
      this.yHead = this.yHead + this.vy;
      if(this.yHead + this.tileSize > this.ctx.canvas.height){
        this.yHead = 0;
        }
    }
    if (this.movements.right) {
      this.vx = this.tileSize;
      this.xHead = this.xHead + this.vx;
      if(this.xHead + this.tileSize > this.ctx.canvas.width){
        this.xHead = 0;
      }
    }
    this.moveBody();
  }

  generateBody(points) {
    for(let i=0; i<points; i++){
      this.snakeBody.unshift([this.xHead, this.yHead]);
      this.bodySize++;  
    }
  }

  moveBody() {
      let previousPosition = [...this.previousHeadPosition];
      this.snakeBody.forEach((bodyPart, index) =>{
          const previousPartPosition = [...bodyPart];
          this.snakeBody[index] = [...previousPosition];
          previousPosition = [...previousPartPosition];
      });
    }
    
  drawBody(){  
        this.snakeBody.forEach((bodyPart) =>{          
            this.ctx.fillStyle = "#5A79FA";
            this.ctx.strokeStyle = "#6BCEED";
            this.ctx.setLineDash([]);
            this.ctx.beginPath();
            this.ctx.arc(bodyPart[0] + this.tileSize/2,bodyPart[1] + this.tileSize/2,this.tileSize/2,0,2*Math.PI);
            this.ctx.fill();
            this.ctx.stroke();                
        });
    }   

    colisionDetector(){
        return this.snakeBody.slice(3).some((bodyPart) => {
            return bodyPart[0] === this.xHead && bodyPart[1] === this.yHead
        });
      }
}

