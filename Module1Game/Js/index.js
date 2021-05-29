const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

window.onload = () => {
    let gameStarted = false
    document.getElementById('start-button').onclick = () => {     
      if(gameStarted === false){
        gameStarted = true;
        start();
      }
    };
  
    const game = new Game(ctx);
  
    function start() {
  
    game.startGame();
    }

    const throttle = (fn,delay) => {
      let last = 0;
      return(arg) => {
        const now = new Date().getTime();
        if(now-last < delay){
          return;
        }else{
          last = now;
          return fn(arg);
        }
      } 
    }
   
    document.addEventListener('keydown', throttle((event) => {
      game.onKeyEvent(event)
      //console.log("throttle");
    }, 1000/5));      
 };