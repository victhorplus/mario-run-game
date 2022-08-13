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
    if(
        // Verifica se a esquerda do objeto está colidindo com o Mario
        (pipe.getBoundingClientRect().left >= mario.getBoundingClientRect().left && pipe.getBoundingClientRect().left <= mario.getBoundingClientRect().right) &&
        // Verifica se a direita do objeto está colidindo com o Mario (inútil)
        (pipe.getBoundingClientRect().right >= mario.getBoundingClientRect().left && pipe.getBoundingClientRect().right <= mario.getBoundingClientRect().right) &&
        // Verifica se o topo do objeto está colidindo com o Mario
        (pipe.getBoundingClientRect().top <= mario.getBoundingClientRect().bottom && pipe.getBoundingClientRect().top >= mario.getBoundingClientRect().top) &&
        // Verifica se a parte de baixo do obejto está colidindo com o mario
        (pipe.getBoundingClientRect().bottom <= mario.getBoundingClientRect().bottom && pipe.getBoundingClientRect().bottom >= mario.getBoundingClientRect().top)
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
    mario.style.width = "70px";
}