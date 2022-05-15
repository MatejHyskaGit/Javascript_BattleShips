function init(){
    //vars
    const cells = document.getElementsByClassName("cell");
    let grid = document.getElementById("grid-container");
    let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    let ship_container = document.getElementById("ship-container");
    let i_container = document.getElementById("I-ship-container");
    let square_container = document.getElementById("square-ship-container");
    let l_container = document.getElementById("l-ship-container");
    let light_container = document.getElementById("lightning-ship-container");
    let i_placing = false
    let square_placing = false
    let l_placing = false
    let light_placing = false
    let info = document.getElementById("info-text");







    //actions
    console.log(window.location)
    for (let index = 0; index < 10; index++) {
        let letter = letters[index];
        for (let i = 1; i < 11; i++) {
            let element = document.createElement("div");
            element.classList.add("cell");
            element.innerText = letter + i;
            element.id = "" + index + (i-1);
            grid.appendChild(element);
        }
    }

    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", function(event) {
            if(i_placing || square_placing || l_placing || light_placing){
                let hover = document.getElementsByClassName("cell-hover")
                for (let i = 0; i < hover.length; i++) {
                    hover[i].classList.remove("cell_hover")
                    if(i_placing){
                        if(hover[i].classList.contains("cell-ship-l") == false && hover[i].classList.contains("cell-ship-square") == false && hover[i].classList.contains("cell-ship-light") == false){
                            hover[i].classList.add("cell-ship-i")
                        }
                    }
                    if(square_placing){
                        if(hover[i].classList.contains("cell-ship-l") == false && hover[i].classList.contains("cell-ship-i") == false && hover[i].classList.contains("cell-ship-light") == false){
                            hover[i].classList.add("cell-ship-square")
                        }
                    }
                    if(l_placing){
                        if(hover[i].classList.contains("cell-ship-square") == false && hover[i].classList.contains("cell-ship-i") == false && hover[i].classList.contains("cell-ship-light") == false){
                            hover[i].classList.add("cell-ship-l")
                        }
                    }
                    if(light_placing){
                        if(hover[i].classList.contains("cell-ship-square") == false && hover[i].classList.contains("cell-ship-i") == false && hover[i].classList.contains("cell-ship-l") == false){
                            hover[i].classList.add("cell-ship-light")
                        }
                    }
                    let i_list = document.getElementsByClassName("cell-ship-i")
                    let square_list = document.getElementsByClassName("cell-ship-square")
                    let l_list = document.getElementsByClassName("cell-ship-l")
                    let light_list = document.getElementsByClassName("cell-ship-light")
                    if(i == hover.length-1 && i_placing == true){
                        if(i_list.length != 4){
                            for (let i = i_list.length; i > 0; i--) {
                                i_list[i-1].classList.remove("cell-ship-i")
                            }
                        }
                        else{
                            for (let i = i_list.length; i > 0; i--) {
                                i_list[i-1].classList.add("cell-ship")
                            }
                            i_placing = false;
                            i_container.remove();
                        }
                    }
                    if(i == hover.length-1 && square_placing == true){
                        if(square_list.length != 4){
                            for (let i = square_list.length; i > 0; i--) {
                                square_list[i-1].classList.remove("cell-ship-square")
                            }
                        }
                        else{
                            for (let i = square_list.length; i > 0; i--) {
                                square_list[i-1].classList.add("cell-ship")
                            }
                            square_placing = false;
                            square_container.remove();
                        }
                    }
                    if(i == hover.length-1 && l_placing == true){
                        if(l_list.length != 5){
                            for (let i = l_list.length; i > 0; i--) {
                                l_list[i-1].classList.remove("cell-ship-l")
                            }
                        }
                        else{
                            for (let i = l_list.length; i > 0; i--) {
                                l_list[i-1].classList.add("cell-ship")
                            }
                            l_placing = false;
                            l_container.remove();
                        }
                    }
                    if(i == hover.length-1 && light_placing == true){
                        if(light_list.length != 4){
                            for (let i = light_list.length; i > 0; i--) {
                                light_list[i-1].classList.remove("cell-ship-light")
                            }
                        }
                        else{
                            for (let i = light_list.length; i > 0; i--) {
                                light_list[i-1].classList.add("cell-ship")
                            }
                            light_placing = false;
                            light_container.remove();
                        }
                    }
                }
            }
            else{
                info.innerText = "";
                if(ship_container.children.length == 0){
                    let i_list = document.getElementsByClassName("cell-ship-i")
                    let square_list = document.getElementsByClassName("cell-ship-square")
                    let l_list = document.getElementsByClassName("cell-ship-l")
                    let light_list = document.getElementsByClassName("cell-ship-light")
                    let ship_list = document.getElementsByClassName("cell-ship")

                    if(event.target.innerText != ""){
                        //alert("You shot " + event.target.id)
                        //console.log(event.target)
                    }
                    
                    if(event.target.classList.contains("cell-ship")){
                        event.target.classList.add("cell-ship-shot");
                        event.target.classList.remove("cell-ship")
                        console.log(ship_list.length);
                        if(event.target.classList.contains("cell-ship-i")){
                            event.target.classList.remove("cell-ship-i")
                            console.log(i_list.length)
                            if(i_list.length == 0){
                                info.innerText = "You sunk a Battleship!";
                            }
                        }
                        if(event.target.classList.contains("cell-ship-square")){
                            event.target.classList.remove("cell-ship-square")
                            console.log(square_list.length)
                            if(square_list.length == 0){
                                info.innerText = "You sunk a Base ship!";
                            }
                        }
                        if(event.target.classList.contains("cell-ship-l")){
                            event.target.classList.remove("cell-ship-l")
                            console.log(l_list.length)
                            if(l_list.length == 0){
                                info.innerText = "You sunk a Carrier!";
                            }
                        }
                        if(event.target.classList.contains("cell-ship-light")){
                            event.target.classList.remove("cell-ship-light")
                            console.log(light_list.length)
                            if(light_list.length == 0){
                                info.innerText = "You sunk a Cruiser!";
                            }
                        }
                        if(ship_list.length == 0){
                            info.innerText = "You win!"
                            window.location.href = "win.html";
                        }
                    }
                    else if(event.target.classList.contains("cell-ship-shot") == false){
                        event.target.classList.add("cell-miss");
                    }
                    event.target.innerText = "";
                }
                else{
                    info.innerText = "You must place down all you ships first!"
                }
            }
        })
        cells[i].addEventListener("mouseover", function(event){
            for (let i = 0; i < cells.length; i++) {
                cells[i].classList.remove("cell-hover")
            }
            if(event.target.classList.contains("cell-ship-shot") == false){
                event.target.classList.add("cell-hover")
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
            else if(l_placing == true){
                if(event.target == cells[9] || event.target == cells[8] || event.target == cells[18] || event.target == cells[19]){
                    event.target.classList.remove("cell-hover")
                    cells[7].classList.add("cell-hover")
                    cells[17].classList.add("cell-hover")
                    cells[27].classList.add("cell-hover")
                    cells[28].classList.add("cell-hover")
                    cells[29].classList.add("cell-hover")
                }
                else if(idnum2 == "8"){
                    cells[eid + 1].classList.add("cell-hover")
                    cells[eid - 1].classList.add("cell-hover")
                    cells[eid - 11].classList.add("cell-hover")
                    cells[eid - 21].classList.add("cell-hover")
                }
                else if(idnum2 == "9"){
                    cells[eid - 1].classList.add("cell-hover")
                    cells[eid - 2].classList.add("cell-hover")
                    cells[eid - 12].classList.add("cell-hover")
                    cells[eid - 22].classList.add("cell-hover")
                }
                else if(cells[eid - 10] == undefined){
                    cells[eid + 10].classList.add("cell-hover")
                    cells[eid + 20].classList.add("cell-hover")
                    cells[eid + 21].classList.add("cell-hover")
                    cells[eid + 22].classList.add("cell-hover")
                }
                else if(cells[eid - 20] == undefined){
                    cells[eid + 10].classList.add("cell-hover")
                    cells[eid - 10].classList.add("cell-hover")
                    cells[eid + 11].classList.add("cell-hover")
                    cells[eid + 12].classList.add("cell-hover")
                }
                else{
                    cells[eid - 10].classList.add("cell-hover")
                    cells[eid - 20].classList.add("cell-hover")
                    cells[eid + 1].classList.add("cell-hover")
                    cells[eid + 2].classList.add("cell-hover")
                }
                
            }
            else if(light_placing == true){
                if(event.target == cells[99] || event.target == cells[89]){
                    cells[99].classList.add("cell-hover")
                    cells[89].classList.add("cell-hover")
                    cells[88].classList.add("cell-hover")
                    cells[78].classList.add("cell-hover")
                }
                else if(idnum2 == "9"){
                    event.target.classList.remove("cell-hover")
                    cells[eid - 1].classList.add("cell-hover")
                    cells[eid + 9].classList.add("cell-hover")
                    cells[eid + 10].classList.add("cell-hover")
                    cells[eid + 20].classList.add("cell-hover")
                }
                else if(cells[eid + 10] == undefined){
                    event.target.classList.remove("cell-hover")
                    cells[eid + 1].classList.add("cell-hover")
                    cells[eid - 9].classList.add("cell-hover")
                    cells[eid - 10].classList.add("cell-hover")
                    cells[eid - 20].classList.add("cell-hover")
                }
                else if(cells[eid + 20] == undefined){
                    cells[eid + 1].classList.add("cell-hover")
                    cells[eid - 10].classList.add("cell-hover")
                    cells[eid + 11].classList.add("cell-hover")
                }
                else{
                    cells[eid + 10].classList.add("cell-hover")
                    cells[eid + 11].classList.add("cell-hover")
                    cells[eid + 21].classList.add("cell-hover")
                }
            }
        })
    }


    //generate ship containers

    i_container.addEventListener("click", function(event){
        if(i_placing == false){
            i_placing = true
            square_placing = false
            l_placing = false
            light_placing = false
        }
        else{
            i_placing = false
        }
    })


    square_container.addEventListener("click", function(event){
        if(square_placing == false){
            square_placing = true
            i_placing = false
            l_placing = false
            light_placing = false
        }
        else{
            square_placing = false
        }
    })
    l_container.addEventListener("click", function(event){
        if(l_placing == false){
            l_placing = true
            square_placing = false
            i_placing = false
            light_placing = false
        }
        else{
            l_placing = false
        }
    })
    light_container.addEventListener("click", function(event){
        if(light_placing == false){
            light_placing = true
            square_placing = false
            i_placing = false
            l_placing = false
        }
        else{
            light_placing = false
        }
    })
}












document.addEventListener("DOMContentLoaded", init)