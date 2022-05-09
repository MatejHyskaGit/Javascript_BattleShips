function init(){
    //vars
    let cells = document.getElementsByClassName("cell");
    let grid = document.getElementById("grid-container");






    //actions
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", e => {
            alert("You just clicked " + e.target.id)
        })
    }
    console.log(cells)

    for (let index = 0; index < 15; index++) {
        let element = document.createElement("div");
        element.classList.add("cell");
        grid.appendChild(element);
        
    }













}
document.addEventListener("DOMContentLoaded", init)