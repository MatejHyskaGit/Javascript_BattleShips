function init(){
    //vars
    let cells = document.getElementsByClassName("cell");
    let grid = document.getElementById("grid-container");
    let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    let confirm = document.getElementById("confirm");
    let btn_yes = document.getElementById("conf_yes");
    let btn_no = document.getElementById("conf_no");
    let conf_text = documnt.getElementById("conf_text");






    //actions
    for (let index = 0; index < 10; index++) {
        let letter = letters[index];
        for (let i = 1; i < 11; i++) {
            let element = document.createElement("div");
            element.classList.add("cell");
            element.innerText = letter + i;
            element.id = letter + i;
            grid.appendChild(element);
        }
    }

    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", e => {
            confirm.style.right = 20 + "%";
            conf_text.innerText = "Confirm: " + e.target.id;
            btn_yes.addEventListener("click", element => {
                alert("You just clicked" + e.target.id);
                confirm.style.right = 3 + "%";
            })
            btn_no.addEventListener("click", element => {
                confirm.style.right = 3 + "%";
            })
        })
    }

/*
    for (let index = 0; index < 100; index++) {
        let element = document.createElement("div");
        element.classList.add("cell");
        
        grid.appendChild(element);
        
    }
*/












}
document.addEventListener("DOMContentLoaded", init)