setup();
var interval;
function setup(){
    // Add keyboard events
    document.addEventListener("keydown", keyboardEvents);
    interval = setInterval(loop, 50)
}

function loop(){
    marioColision()
}

function keyboardEvents(event){
    switch(event.code.toLowerCase()){
        case 'space':
            jumpEvent();
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
    marioPosition = mario.getBoundingClientRect();
    pipePosition = pipe.getBoundingClientRect();

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
        stopGame();
        gameOver();
    }
}

function stopGame(){
    let mario = document.querySelector(".mario");
    let pipe = document.querySelector(".pipe");
    let pipePosition = window.getComputedStyle(pipe).left;

    clearClass(pipe, "pipe--move", 0);
    pipe.style.left = pipePosition;
    mario.src = "assets/mario-stopped.gif";
    clearInterval(interval)
}

function gameOver(){
    let mario = document.querySelector(".mario");
    mario.src = "assets/game-over.png";
    mario.style.width = "65px";
    mario.style.left = "40px"
}