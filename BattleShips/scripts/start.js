function init(){
    let dif_cont = document.getElementById("diffucult-container")
    let easy = document.getElementById("easy")
    let normal = document.getElementById("normal")
    let hard = document.getElementById("hard")
    let extreme = document.getElementById("extreme")
    let impossible = document.getElementById("impossible")
    let btn = document.getElementById("play-btn")
    let difficulty = 0;
    let info = document.getElementById("info")


    easy.addEventListener("click", e => {
        info.innerText = ""
        normal.classList.remove("normal-hover");
        hard.classList.remove("hard-hover");
        extreme.classList.remove("extreme-hover");
        impossible.classList.remove("impossible-hover");
        easy.classList.add("easy-hover");
        difficulty = 1;
        sessionStorage.setItem("difficulty", difficulty);
    })
    normal.addEventListener("click", e => {
        info.innerText = ""
        normal.classList.add("normal-hover");
        hard.classList.remove("hard-hover");
        extreme.classList.remove("extreme-hover");
        impossible.classList.remove("impossible-hover");
        easy.classList.remove("easy-hover");
        difficulty = 2;
        sessionStorage.setItem("difficulty", difficulty);
    })
    hard.addEventListener("click", e => {
        info.innerText = ""
        normal.classList.remove("normal-hover");
        hard.classList.add("hard-hover");
        extreme.classList.remove("extreme-hover");
        impossible.classList.remove("impossible-hover");
        easy.classList.remove("easy-hover");
        difficulty = 3;
        sessionStorage.setItem("difficulty", difficulty);
    })
    extreme.addEventListener("click", e => {
        info.innerText = ""
        normal.classList.remove("normal-hover");
        hard.classList.remove("hard-hover");
        extreme.classList.add("extreme-hover");
        impossible.classList.remove("impossible-hover");
        easy.classList.remove("easy-hover");
        difficulty = 4;
        sessionStorage.setItem("difficulty", difficulty);
    })
    impossible.addEventListener("click", e => {
        info.innerText = ""
        normal.classList.remove("normal-hover");
        hard.classList.remove("hard-hover");
        extreme.classList.remove("extreme-hover");
        impossible.classList.add("impossible-hover");
        easy.classList.remove("easy-hover");
        difficulty = 5;
        sessionStorage.setItem("difficulty", difficulty);
    })
    btn.addEventListener("click", e => {
        if(difficulty == 0){
            e.preventDefault();
            info.innerText = "Please select a difficulty before playing."
        }
    })
    btn.addEventListener("mouseover", e => {
        btn.style.backgroundColor = "rgb(128, 128, 128)"
        if(difficulty == 1){
            btn.style.color = "rgba(0, 255, 0, 0.575)"
        }
        else if(difficulty == 2){
            btn.style.color = "rgba(255, 255, 0, 0.678)"
        }
        else if(difficulty == 3){
            btn.style.color = "rgba(255, 127.5, 0, 0.678)"
        }
        else if(difficulty == 4){
            btn.style.color = "rgba(255, 0, 0, 0.678)"
        }
        else if(difficulty == 5){
            btn.style.color = "rgba(255, 0, 255, 0.678)"
        }
        else{
            btn.style.color = "rgb(0, 0, 0)"
        }
    })
    btn.addEventListener("mouseleave", e => {
        btn.style.color = "white";
        btn.style.backgroundColor = "rgb(80, 80, 80)"
    })







}

document.addEventListener("DOMContentLoaded", init)