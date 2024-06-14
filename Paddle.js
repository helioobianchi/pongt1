const INITIAL_VELOCITY = .0125;

export default class Paddle{
  constructor(paddleElem){
    this.paddleElem = paddleElem;
    this.reset();
  }

  get position(){
    return parseFloat(
      getComputedStyle(this.paddleElem).getPropertyValue('--position')
    );
  }

  set position(value){
    this.paddleElem.style.setProperty('--position', value);
  }
  
  rect(){
    return this.paddleElem.getBoundingClientRect();
  }

  update(delta, ballY){
    this.position += this.velocity * delta * (ballY - this.position);
  }

  reset(){
    this.position = 50;
    this.velocity = INITIAL_VELOCITY;
    this.direction = 0;
  }
}