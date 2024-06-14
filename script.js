   import Ball from './Ball.js' 
import Paddle from './Paddle.js'

const ball = new Ball(document.getElementById('ball'));
const ppaddle = new Paddle(document.getElementById('player-paddle'));
const cpaddle = new Paddle(document.getElementById('computer-paddle'));
const playerScore = document.getElementById('player-score');
const computerScore = document.getElementById('computer-score');

let lasttime;

// update loop
function update(time){
  if(lasttime != null){
    const delta = time - lasttime;
    
    // update code
    // console.log(delta);

    ball.update(delta, [ppaddle.rect(), cpaddle.rect()]);
    cpaddle.update(delta, ball.y);

    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--hue')
    )
    document.documentElement.style.setProperty('--hue', hue + delta * 0.01)

    if (isLose()) handleLose();
  }  
  
  lasttime = time;
  window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);

function isLose(){
  const rect =  ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}

function handleLose(){
  const rect = ball.rect();
  if(rect.right >= window.innerWidth){
    playerScore.textContent = parseInt(playerScore.textContent) + 1
  }
  else{
    computerScore.textContent = parseInt(computerScore.textContent) + 1
  }

  ball.reset();
  cpaddle.reset();

}

document.addEventListener('mousemove', e => {
  ppaddle.position = (e.y / window.innerHeight) * 100;
})
