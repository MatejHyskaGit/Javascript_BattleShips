function init(){
    //vars
    const cells = document.getElementsByClassName("cell");
    let grid = document.getElementById("grid-container");
    let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    let ship_container = document.getElementById("ship-container");
    let i_container = document.getElementById("I-ship-container");
    let square_container = document.getElementById("square-ship-container");
    let l_container = document.getElementById("l-ship-container");
    let lightning_container = document.getElementById("lightning-ship-container");
    let flexcheck = document.getElementById("flexCheckDefault")
    let i_placing = false
    let square_placing = false






    //actions
    
    for (let index = 0; index < 10; index++) {
        let letter = letters[index];
        for (let i = 1; i < 11; i++) {
            let element = document.createElement("div");
            element.classList.add("cell");
            element.classList.add("cell-alive");
            element.innerText = letter + i;
            element.id = "" + index + (i-1);
            grid.appendChild(element);
        }
    }

    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", function(event) {
            if(i_placing || square_placing/* || l_placing || light_placing*/){
                let hover = document.getElementsByClassName("cell-hover")
                for (let i = 0; i < hover.length; i++) {
                    hover[i].classList.remove("cell_hover")
                    if(i_placing){
                        hover[i].classList.add("cell-ship-i")
                    }
                    if(square_placing){
                        hover[i].classList.add("cell-ship-square")
                    }
                    if(i == hover.length-1 && i_placing == true){
                        i_placing = false;
                        i_container.remove();
                    }
                    if(i == hover.length-1 && square_placing == true){
                        square_placing = false;
                        square_container.remove();
                    }
                }
            }
            else{
                if(event.target.innerText != ""){
                    alert("You shot" + event.target.id)
                }
                event.target.innerText = "";
                event.target.classList.remove("cell-alive");
                event.target.classList.add("cell-ship-shot");
            }
        })
        cells[i].addEventListener("mouseover", function(event){
            for (let i = 0; i < cells.length; i++) {
                cells[i].classList.remove("cell-hover")
            }
            let eid = parseInt(event.target.id)
            let idnum2 = event.target.id[1];
            console.log(idnum2)
            cells[eid].classList.add("cell-hover")
            if(i_placing == true){
                if(cells[eid + 10] == undefined){
                    cells[eid - 10].classList.add("cell-hover")
                    cells[eid - 20].classList.add("cell-hover")
                    cells[eid - 30].classList.add("cell-hover")
                }
                else if(cells[eid + 20] == undefined){
                    cells[eid - 10].classList.add("cell-hover")
                    cells[eid - 20].classList.add("cell-hover")
                    cells[eid + 10].classList.add("cell-hover")
                }
                else if(cells[eid + 30] == undefined){
                    cells[eid - 10].classList.add("cell-hover")
                    cells[eid + 10].classList.add("cell-hover")
                    cells[eid + 20].classList.add("cell-hover")
                }
                else{
                    cells[eid + 10].classList.add("cell-hover")
                    cells[eid + 20].classList.add("cell-hover")
                    cells[eid + 30].classList.add("cell-hover")
                }
            }

            else if(square_placing == true){
                if(cells[eid + 10] == undefined && cells[eid + 1] == undefined){
                    cells[eid - 10].classList.add("cell-hover")
                    cells[eid - 1].classList.add("cell-hover")
                    cells[eid - 11].classList.add("cell-hover")
                }
                else if(cells[eid + 10] == undefined){
                    cells[eid - 10].classList.add("cell-hover")
                    cells[eid + 1].classList.add("cell-hover")
                    cells[eid - 9].classList.add("cell-hover")
                }
                else if(idnum2 == "9"){
                    cells[eid - 1].classList.add("cell-hover")
                    cells[eid + 9].classList.add("cell-hover")
                    cells[eid + 10].classList.add("cell-hover")
                }
                else{
                    cells[eid + 10].classList.add("cell-hover")
                    cells[eid + 1].classList.add("cell-hover")
                    cells[eid + 11].classList.add("cell-hover")
                }
            }
        })
    }


    //generate ship containers

    i_container.addEventListener("click", function(event){
        if(i_placing == false){
            i_placing = true
        }
        else{
            i_placing = false
        }
    })


    square_container.addEventListener("click", function(event){
        if(square_placing == false){
            square_placing = true
        }
        else{
            square_placing = false
        }
    })
}












document.addEventListener("DOMContentLoaded", init)