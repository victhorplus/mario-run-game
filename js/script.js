const STATE_GAME = {
    score: 0
}
setup();

function setup(){
    // Add keyboard events
    document.addEventListener("keydown", keyboardEvents);
    STATE_GAME.interval = setInterval(loop, 50)
}

function loop(){
    marioColision();
    detectPoint();
}

function keyboardEvents(event){
    switch(event.code.toLowerCase()){
        case 'space':
            jumpEvent();
            break;
        case 'keyp':
            pauseGame();
            break;
        case 'enter':
            reestart();
            break;
    }
}

function jumpEvent(){
    let mario = document.querySelector(".mario");
    mario.classList.add("mario--jump");
    clearClass(mario, "mario--jump", 700)
}

function clearClass(pipe, classe, timeOut){
    setTimeout(() => {
        pipe.classList.remove(classe)
    }, timeOut)
}

function marioColision(){
    let mario = document.querySelector(".mario");
    let pipe = document.querySelector(".pipe");
    let marioPosition = mario.getBoundingClientRect();
    let pipePosition = pipe.getBoundingClientRect();

    // Colisões do ponto de vista do Mario
    let rightCollision = marioPosition.left <= pipePosition.left && marioPosition.right >= pipePosition.left;
    let leftCollision = marioPosition.left <= pipePosition.right && marioPosition.right >= pipePosition.right;
    let topCollision = marioPosition.top <= pipePosition.bottom && marioPosition.bottom >= pipePosition.bottom;
    let bottomCollision = marioPosition.top <= pipePosition.top && marioPosition.bottom >= pipePosition.top;

    if(
        (rightCollision && bottomCollision && topCollision) ||
        (leftCollision && bottomCollision && topCollision) ||
        (bottomCollision && rightCollision && leftCollision) ||
        (topCollision && rightCollision && leftCollision)
    ){
        pauseGame();
        gameOver();
    }
}

function detectPoint(){
    let pipe = document.querySelector(".pipe");
    let pipePosition = +getComputedStyle(pipe).left.replace("px", "")
    if(pipePosition < -47 && pipePosition > -60){
        STATE_GAME.score++;
    }
    setScore(STATE_GAME.score)
}

function setScore(value){
    let score = document.querySelector(".score");
    let score_shadow = document.querySelector(".score_shadow");
    score.innerHTML = value;
    score_shadow.innerHTML = value;
}
function gameOver(){
    let mario = document.querySelector(".mario");
    mario.src = "assets/game-over.png";
    mario.style.width = "65px";
    mario.style.left = "40px"
}

function pauseGame(){
    let mario = document.querySelector(".mario");
    let pipe = document.querySelector(".pipe");
    let cloud = document.querySelector(".clouds");

    pipe.style.animationPlayState = "paused"
    cloud.style.animationPlayState = "paused"
    mario.style.animationPlayState = "paused"
    mario.src = "assets/mario-stopped.gif";
    clearInterval(STATE_GAME.interval)
}

function reestart(){
    let mario = document.querySelector(".mario");
    let pipe = document.querySelector(".pipe");
    let cloud = document.querySelector(".clouds");

    mario.style.animationPlayState = "running";
    pipe.style.animationPlayState = "running";
    cloud.style.animationPlayState = "running";

    mario.src = "assets/mario.gif";
    mario.style.width = "120px";
    mario.style.left = "0px"

    interval = setInterval(loop, 50);
}