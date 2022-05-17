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
    let enemy_grid = document.getElementById("enemy-grid");
    let enemy_cells = document.getElementsByClassName("cell-enemy")
    let shot_list = [];
    var enemy_round_shots = sessionStorage.getItem("difficulty");
    //console.log(enemy_round_shots)







    //actions
    //console.log(window.location)
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
    for (let index = 0; index < 10; index++) {
        let letter = letters[index];
        for (let i = 1; i < 11; i++) {
            let element = document.createElement("div");
            element.classList.add("cell-enemy");
            element.innerText = letter + i;
            element.id = "" + index + (i-1);
            enemy_grid.appendChild(element);
        }
    }
    grid.addEventListener("mouseleave", e => {
        let hover_list = document.getElementsByClassName("cell-hover")
        for (let i = hover_list.length; i > 0; i--) {
            hover_list[i-1].classList.remove("cell-hover")
        }
    })
    //random generování enemy lodí
    //i lod generace
    let i_rand = Math.floor((Math.random() * 69));
    //console.log(i_rand)
    let enemy_i_list = [i_rand, i_rand+10, i_rand+20, i_rand+30]
    //console.log(enemy_i_list)
    const enemy_i_list_const = enemy_i_list;

    //square lod generace
    let enemy_square_list = []
    let enemy_square_list_const = []
    function gen_square(){
        let square_rand = Math.floor((Math.random() * 89));
        enemy_square_list = [square_rand, square_rand+1, square_rand+10, square_rand+11]
        enemy_square_list_const = [square_rand, square_rand+1, square_rand+10, square_rand+11]
        if(square_rand == 9 || square_rand.toString()[1] == "9"){
            gen_square()
        }
        else if(HasDuplicates(enemy_i_list, enemy_square_list)){
            gen_square()
        }
    }
    gen_square();
    

    //l lod generace
    let enemy_l_list = []
    function gen_l(){
        let l_rand = Math.floor((Math.random() * 77));
        enemy_l_list = [l_rand, l_rand+10, l_rand+20, l_rand+21, l_rand+22]
        if(l_rand == 8 || l_rand == 9 || l_rand.toString()[1] == "8" || l_rand.toString()[1] == "9"){
            gen_l()
        }
        else if(HasDuplicates(enemy_l_list, enemy_i_list) || HasDuplicates(enemy_l_list, enemy_square_list)){
            gen_l()
        }
    }
    gen_l();
    const enemy_l_list_const = enemy_l_list;

    //lightning lod generace
    let enemy_light_list = []
    function gen_light(){
        let light_rand = Math.floor((Math.random() * 78));
        enemy_light_list = [light_rand, light_rand+10, light_rand+11, light_rand+21]
        if(light_rand == 9 || light_rand.toString()[1] == "9"){
            gen_light()
        }
        else if(HasDuplicates(enemy_light_list, enemy_i_list) || HasDuplicates(enemy_light_list, enemy_square_list) || HasDuplicates(enemy_light_list, enemy_l_list)){
            gen_light()
        }
    }
    gen_light();
    /*
    if(enemy_light_list_const == null){
        const enemy_light_list_const = enemy_light_list;
    }
*/
    function GetIndexOf(item, list){
        for (let i = 0; i < list.length; i++) {
            //console.log(i)
            if(list[i] == item){
                //console.log(i)
                return i;
            }
        }
        return -1;
    }

    function IsItemInList(item, list){
        for (let index = 0; index < list.length; index++) {
            if(item == list[index]) return true;
        }
        return false;
    }

    function HasDuplicates(list1, list2){
        for (let i = 0; i < list1.length; i++) {
            for (let j = 0; j < list2.length; j++) {
                if(list1[i] == list2[j]) return true
            }
        }
        return false;
    }
    



    for (let i = 0; i < enemy_cells.length; i++) {
        enemy_cells[i].addEventListener("mouseover", e => {
            for (let index = 0; index < enemy_cells.length; index++) {
                enemy_cells[index].classList.remove("cell-hover")
            }
            e.target.classList.add("cell-hover")
        })
        enemy_cells[i].addEventListener("click", e => {
            if(ship_container.children.length == 0){
                if(e.target.innerText != ""){
                    e.target.innerText = "";
                    info.innerText = "";
                    e.target.classList.add("cell-ship-shot");
                    //alert(e.target.id)
                    //console.log(parseInt(e.target.id))
                    //console.log(enemy_square_list)
                    if(IsItemInList(parseInt(e.target.id), enemy_square_list)){
                        enemy_square_list.splice(GetIndexOf(parseInt(e.target.id), enemy_square_list), 1);
                        console.log(enemy_square_list_const)
                        if(enemy_square_list.length == 0){
                            for (let i = 0; i < enemy_square_list_const.length; i++) {
                                enemy_cells[enemy_square_list_const[i]].classList.add("ship-sunk")
                                enemy_cells[enemy_square_list_const[i]].classList.remove("cell-ship-shot")
                            }
                            info.innerText = "You sunk a Base Ship!"
                        }
                    }
                    else if(IsItemInList(parseInt(e.target.id), enemy_i_list)){
                        enemy_i_list.splice(GetIndexOf(parseInt(e.target.id), enemy_i_list), 1);
                        if(enemy_i_list.length == 0){
                            info.innerText = "You sunk a Battleship!"
                        }
                    }
                    else if(IsItemInList(parseInt(e.target.id), enemy_l_list)){
                        enemy_l_list.splice(GetIndexOf(parseInt(e.target.id), enemy_l_list), 1);
                        if(enemy_l_list.length == 0){
                            info.innerText = "You sunk a Carrier!"
                        }
                    }
                    else if(IsItemInList(parseInt(e.target.id), enemy_light_list)){
                        enemy_light_list.splice(GetIndexOf(parseInt(e.target.id), enemy_light_list), 1);
                        if(enemy_light_list.length == 0){
                            info.innerText = "You sunk a Cruiser!"
                        }
                    }
                    else{
                        e.target.classList.add("cell-miss")
                    }
                    if(enemy_square_list.length == 0 && enemy_i_list.length == 0 && enemy_l_list.length == 0 && enemy_light_list.length == 0){
                        info.innerText = "You win!"
                        window.location.href = "win.html";
                    }
                    //console.log(enemy_square_list)
                    for (let i = 0; i < enemy_round_shots; i++) {
                        enemy_shoot();
                    }
                }
            }
            else{
                info.innerText = "You must place all your ships first!"
            }
        })
    }
    enemy_grid.addEventListener("mouseleave", e => {
        let hover_list = document.getElementsByClassName("cell-hover")
        hover_list[0].classList.remove("cell-hover");
    })





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
        })
        function enemy_shoot(){
            let shoot_rand = Math.floor((Math.random() * 100));
            //console.log(shoot_rand)
            //console.log(shot_list)
            if(IsItemInList(shoot_rand, shot_list)){
                enemy_shoot();
            }
            shot_list.push(shoot_rand);
            if(ship_container.children.length == 0){
                let i_list = document.getElementsByClassName("cell-ship-i")
                let square_list = document.getElementsByClassName("cell-ship-square")
                let l_list = document.getElementsByClassName("cell-ship-l")
                let light_list = document.getElementsByClassName("cell-ship-light")
                let ship_list = document.getElementsByClassName("cell-ship")

                if(cells[shoot_rand].innerText != ""){
                    //alert("You shot " + cells[shoot_rand].id)
                    //console.log(cells[shoot_rand])
                }
                
                if(cells[shoot_rand].classList.contains("cell-ship")){
                    cells[shoot_rand].classList.add("cell-ship-shot");
                    cells[shoot_rand].classList.remove("cell-ship")
                    if(cells[shoot_rand].classList.contains("cell-ship-i")){
                        cells[shoot_rand].classList.remove("cell-ship-i")
                        if(i_list.length == 0){
                            info.innerText = "Enemy sunk a Battleship!";
                        }
                    }
                    if(cells[shoot_rand].classList.contains("cell-ship-square")){
                        cells[shoot_rand].classList.remove("cell-ship-square")
                        if(square_list.length == 0){
                            info.innerText = "Enemy sunk a Base ship!";
                        }
                    }
                    if(cells[shoot_rand].classList.contains("cell-ship-l")){
                        cells[shoot_rand].classList.remove("cell-ship-l")
                        if(l_list.length == 0){
                            info.innerText = "Enemy sunk a Carrier!";
                        }
                    }
                    if(cells[shoot_rand].classList.contains("cell-ship-light")){
                        cells[shoot_rand].classList.remove("cell-ship-light")
                        if(light_list.length == 0){
                            info.innerText = "Enemy sunk a Cruiser!";
                        }
                    }
                    if(ship_list.length == 0){
                        info.innerText = "You lose!"
                        window.location.href = "lose.html";
                    }
                }
                else if(cells[shoot_rand].classList.contains("cell-ship-shot") == false){
                    cells[shoot_rand].classList.add("cell-miss");
                }
                cells[shoot_rand].innerText = "";
            }
            else{
                info.innerText = "You must place down all you ships first!"
            }
        }
        
        
            

        cells[i].addEventListener("mouseover", function(event){
            for (let i = 0; i < cells.length; i++) {
                cells[i].classList.remove("cell-hover")
            }
            let eid = parseInt(event.target.id)
            let idnum2 = event.target.id[1];
            if(ship_container.children.length != 0){
                event.target.classList.add("cell-hover")
                cells[eid].classList.add("cell-hover")
            }
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