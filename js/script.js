document.addEventListener("keydown", keyEvents);

function keyEvents(event){
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

function clearClass(object, classe, timeOut){
    setTimeout(() => {
        object.classList.remove(classe)
    }, timeOut)
}