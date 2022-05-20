function init(){
    //vars
    const cells = document.getElementsByClassName("cell");
    let grid = document.getElementById("grid-container");
    let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    let info = document.getElementById("info-text");
    let enemy_grid = document.getElementById("enemy-grid");
    let enemy_cells = document.getElementsByClassName("cell-enemy")
    let shot_list = [];
    var enemy_round_shots = sessionStorage.getItem("difficulty");
    if(enemy_round_shots == null){
        enemy_round_shots = 10
        info.innerText = "Have fun, you cheater!"
    }
    let ship_show_i = document.getElementById("ship-show-i");
    let ship_show_square = document.getElementById("ship-show-square");
    let ship_show_l = document.getElementById("ship-show-l");
    let ship_show_light = document.getElementById("ship-show-light");
    //console.log(enemy_round_shots)







    //actions
    //console.log(window.location)
    for (let index = 0; index < 10; index++) {
        for (let i = 1; i < 11; i++) {
            let element = document.createElement("div");
            element.classList.add("cell");
            element.id = "" + index + (i-1);
            grid.appendChild(element);
        }
    }
    for (let index = 0; index < 10; index++) {
        let letter = letters[index];
        for (let i = 1; i < 11; i++) {
            let element = document.createElement("div");
            element.classList.add("cell-enemy");
            element.innerText = " ";
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
    enemy_grid.addEventListener("mouseleave", e => {
        let hover_list = document.getElementsByClassName("cell-hover")
        hover_list[0].classList.remove("cell-hover");
    })


    //random generování ally lodí
    //i lod generace
    let ally_i_rand = Math.floor((Math.random() * 69));
    let ally_i_list = [ally_i_rand, ally_i_rand+10, ally_i_rand+20, ally_i_rand+30]
    let ally_i_list_const = [ally_i_rand, ally_i_rand+10, ally_i_rand+20, ally_i_rand+30]
    let ally_i_list_near = [ally_i_rand-10, ally_i_rand-9, ally_i_rand+1, ally_i_rand+11, ally_i_rand+21, ally_i_rand+31, ally_i_rand+41, ally_i_rand+40, ally_i_rand+39, ally_i_rand+29, ally_i_rand+19, ally_i_rand+9, ally_i_rand-1, ally_i_rand-11]
    if(ally_i_rand == 0 || ally_i_rand.toString()[1] == "0"){
        ally_i_list_near.splice(GetIndexOf(ally_i_rand+39, ally_i_list_near), 6)
    }
    if(ally_i_rand == 9 || ally_i_rand.toString()[1] == "9"){
        ally_i_list_near.splice(GetIndexOf(ally_i_rand-9, ally_i_list_near), 6)
    }
    for (let i = 0; i < ally_i_list.length; i++) {
        cells[ally_i_list[i]].classList.add("cell-ship-i");
        cells[ally_i_list[i]].classList.add("cell-ship");
    }

    //square lod generace
    let ally_square_list = []
    let ally_square_list_near = []
    let ally_square_list_const = []
    function ally_gen_square(){
        let ally_square_rand = Math.floor((Math.random() * 89));
        ally_square_list = [ally_square_rand, ally_square_rand+1, ally_square_rand+10, ally_square_rand+11]
        ally_square_list_const = [ally_square_rand, ally_square_rand+1, ally_square_rand+10, ally_square_rand+11]
        ally_square_list_near = [ally_square_rand-10, ally_square_rand-9, ally_square_rand-8, ally_square_rand+2, ally_square_rand+12, ally_square_rand+22, ally_square_rand+21, ally_square_rand+20, ally_square_rand+19, ally_square_rand+9, ally_square_rand-1, ally_square_rand-11]
        if(ally_square_rand == 8 || ally_square_rand.toString()[1] == "8"){
            ally_square_list_near.splice(GetIndexOf(ally_square_rand-8, ally_square_list_near), 4)
        }
        if(ally_square_rand == 0 || ally_square_rand.toString()[1] == "0"){
            ally_square_list_near.splice(GetIndexOf(ally_square_rand+19, ally_square_list_near), 4)
        }
        if(ally_square_rand == 9 || ally_square_rand.toString()[1] == "9"){
            ally_gen_square()
        }
        else if(HasDuplicates(ally_i_list_near, ally_square_list)){
            ally_gen_square()
        }
        else if(HasDuplicates(ally_i_list, ally_square_list)){
            ally_gen_square()
        }
        for (let i = 0; i < ally_square_list.length; i++) {
            cells[ally_square_list[i]].classList.add("cell-ship-square");
            cells[ally_square_list[i]].classList.add("cell-ship");
        }
    }
    ally_gen_square();


    //l lod generace
    let ally_l_list = []
    let ally_l_list_near = []
    let ally_l_list_const = []
    function ally_gen_l(){
        let ally_l_rand = Math.floor((Math.random() * 77));
        ally_l_list = [ally_l_rand, ally_l_rand+10, ally_l_rand+20, ally_l_rand+21, ally_l_rand+22]
        ally_l_list_near = [ally_l_rand-10, ally_l_rand-9, ally_l_rand+1, ally_l_rand+11, ally_l_rand+12, ally_l_rand+13, ally_l_rand+23, ally_l_rand+33, ally_l_rand+32, ally_l_rand+31, ally_l_rand+30, ally_l_rand+29, ally_l_rand+19, ally_l_rand+9, ally_l_rand-1, ally_l_rand-11]
        ally_l_list_const = [ally_l_rand, ally_l_rand+10, ally_l_rand+20, ally_l_rand+21, ally_l_rand+22]
        if(ally_l_rand == 0 || ally_l_rand.toString()[1] == "0"){
            ally_l_list_near.splice(GetIndexOf(ally_l_rand+29, ally_l_list_near), 5)
        }
        if(ally_l_rand == 7 || ally_l_rand.toString()[1] == "7"){
            ally_l_list_near.splice(GetIndexOf(ally_l_rand+13, ally_l_list_near), 3)
        }
        if(ally_l_rand == 8 || ally_l_rand == 9 || ally_l_rand.toString()[1] == "8" || ally_l_rand.toString()[1] == "9"){
            ally_gen_l()
        }
        else if(HasDuplicates(ally_i_list_near, ally_l_list) || HasDuplicates(ally_square_list_near, ally_l_list)){
            ally_gen_l()
        }
        else if(HasDuplicates(ally_l_list, ally_i_list) || HasDuplicates(ally_l_list, ally_square_list)){
            ally_gen_l()
        }
        for (let i = 0; i < ally_l_list.length; i++) {
            cells[ally_l_list[i]].classList.add("cell-ship-l");
            cells[ally_l_list[i]].classList.add("cell-ship");
        }
    }
    ally_gen_l();


    //lightning lod generace
    let ally_light_list = []
    let ally_light_list_near = []
    let ally_light_list_const = []
    function ally_gen_light(){
        let ally_light_rand = Math.floor((Math.random() * 78));
        ally_light_list = [ally_light_rand, ally_light_rand+10, ally_light_rand+11, ally_light_rand+21]
        ally_light_list_near = [ally_light_rand-10, ally_light_rand-9, ally_light_rand+1, ally_light_rand+2, ally_light_rand+12, ally_light_rand+22, ally_light_rand+32, ally_light_rand+31, ally_light_rand+30, ally_light_rand+20, ally_light_rand+19, ally_light_rand+9, ally_light_rand-1, ally_light_rand-11]
        ally_light_list_const = [ally_light_rand, ally_light_rand+10, ally_light_rand+11, ally_light_rand+21]
        if(ally_light_rand == 8 || ally_light_rand.toString()[1] == "8"){
            ally_light_list_near.splice(GetIndexOf(ally_light_rand+2, ally_light_list_near), 4)
        }
        if(ally_light_rand == 0 || ally_light_rand.toString()[1] == "0"){
            ally_light_list_near.splice(GetIndexOf(ally_light_rand+19, ally_light_list_near), 4)
        }
        if(ally_light_rand == 9 || ally_light_rand.toString()[1] == "9"){
            ally_gen_light()
        }
        else if(HasDuplicates(ally_light_list, ally_i_list_near) || HasDuplicates(ally_light_list, ally_square_list_near) || HasDuplicates(ally_light_list, ally_l_list_near)){
            ally_gen_light()
        }
        else if(HasDuplicates(ally_light_list, ally_i_list) || HasDuplicates(ally_light_list, ally_square_list) || HasDuplicates(ally_light_list, ally_l_list)){
            ally_gen_light()
        }
        for (let i = 0; i < ally_light_list.length; i++) {
            cells[ally_light_list[i]].classList.add("cell-ship-light");
            cells[ally_light_list[i]].classList.add("cell-ship");
        }
    }
    ally_gen_light();



    //random generování enemy lodí
    //i lod generace
    let i_rand = Math.floor((Math.random() * 69));
    //console.log(i_rand)
    let enemy_i_list = [i_rand, i_rand+10, i_rand+20, i_rand+30]
    let enemy_i_list_const = [i_rand, i_rand+10, i_rand+20, i_rand+30]
    let enemy_i_list_near = [i_rand-10, i_rand-9, i_rand+1, i_rand+11, i_rand+21, i_rand+31, i_rand+41, i_rand+40, i_rand+39, i_rand+29, i_rand+19, i_rand+9, i_rand-1, i_rand-11]
    if(i_rand == 0 || i_rand.toString()[1] == "0"){
        enemy_i_list_near.splice(GetIndexOf(i_rand+39, enemy_i_list_near), 6)
    }
    if(i_rand == 9 || i_rand.toString()[1] == "9"){
        enemy_i_list_near.splice(GetIndexOf(i_rand-9, enemy_i_list_near), 6)
    }
    //console.log(enemy_i_list)

    //square lod generace
    let enemy_square_list = []
    let enemy_square_list_const = []
    let enemy_square_list_near = []
    function gen_square(){
        let square_rand = Math.floor((Math.random() * 89));
        enemy_square_list = [square_rand, square_rand+1, square_rand+10, square_rand+11]
        enemy_square_list_const = [square_rand, square_rand+1, square_rand+10, square_rand+11]
        enemy_square_list_near = [square_rand-10, square_rand-9, square_rand-8, square_rand+2, square_rand+12, square_rand+22, square_rand+21, square_rand+20, square_rand+19, square_rand+9, square_rand-1, square_rand-11]
        if(square_rand == 8 || square_rand.toString()[1] == "8"){
            enemy_square_list_near.splice(GetIndexOf(square_rand-8, enemy_square_list_near), 4)
        }
        if(square_rand == 0 || square_rand.toString()[1] == "0"){
            enemy_square_list_near.splice(GetIndexOf(square_rand+19, enemy_square_list_near), 4)
        }
        if(square_rand == 9 || square_rand.toString()[1] == "9"){
            gen_square()
        }
        else if(HasDuplicates(enemy_i_list_near, enemy_square_list)){
            gen_square()
        }
        else if(HasDuplicates(enemy_i_list, enemy_square_list)){
            gen_square()
        }
    }
    gen_square();
    
    //l lod generace
    let enemy_l_list = []
    let enemy_l_list_const = []
    let enemy_l_list_near = []
    function gen_l(){
        let l_rand = Math.floor((Math.random() * 77));
        enemy_l_list = [l_rand, l_rand+10, l_rand+20, l_rand+21, l_rand+22]
        enemy_l_list_const = [l_rand, l_rand+10, l_rand+20, l_rand+21, l_rand+22]
        enemy_l_list_near = [l_rand-10, l_rand-9, l_rand+1, l_rand+11, l_rand+12, l_rand+13, l_rand+23, l_rand+33, l_rand+32, l_rand+31, l_rand+30, l_rand+29, l_rand+19, l_rand+9, l_rand-1, l_rand-11]
        if(l_rand == 0 || l_rand.toString()[1] == "0"){
            enemy_l_list_near.splice(GetIndexOf(l_rand+29, enemy_l_list_near), 5)
        }
        if(l_rand == 7 || l_rand.toString()[1] == "7"){
            enemy_l_list_near.splice(GetIndexOf(l_rand+13, enemy_l_list_near), 3)
        }
        if(l_rand == 8 || l_rand == 9 || l_rand.toString()[1] == "8" || l_rand.toString()[1] == "9"){
            gen_l()
        }
        else if(HasDuplicates(enemy_i_list_near, enemy_l_list) || HasDuplicates(enemy_square_list_near, enemy_l_list)){
            gen_l()
        }
        else if(HasDuplicates(enemy_l_list, enemy_i_list) || HasDuplicates(enemy_l_list, enemy_square_list)){
            gen_l()
        }
    }
    gen_l();

    //lightning lod generace
    let enemy_light_list = []
    let enemy_light_list_const = []
    let enemy_light_list_near = []
    function gen_light(){
        let light_rand = Math.floor((Math.random() * 78));
        enemy_light_list = [light_rand, light_rand+10, light_rand+11, light_rand+21]
        enemy_light_list_const = [light_rand, light_rand+10, light_rand+11, light_rand+21]
        enemy_light_list_near = [light_rand-10, light_rand-9, light_rand+1, light_rand+2, light_rand+12, light_rand+22, light_rand+32, light_rand+31, light_rand+30, light_rand+20, light_rand+19, light_rand+9, light_rand-1, light_rand-11]
        if(light_rand == 8 || light_rand.toString()[1] == "8"){
            enemy_light_list_near.splice(GetIndexOf(light_rand+2, enemy_light_list_near), 4)
        }
        if(light_rand == 0 || light_rand.toString()[1] == "0"){
            enemy_light_list_near.splice(GetIndexOf(light_rand+19, enemy_light_list_near), 4)
        }
        if(light_rand == 9 || light_rand.toString()[1] == "9"){
            gen_light()
        }
        else if(HasDuplicates(enemy_light_list, enemy_i_list_near) || HasDuplicates(enemy_light_list, enemy_square_list_near) || HasDuplicates(enemy_light_list, enemy_l_list_near)){
            gen_light()
        }
        else if(HasDuplicates(enemy_light_list, enemy_i_list) || HasDuplicates(enemy_light_list, enemy_square_list) || HasDuplicates(enemy_light_list, enemy_l_list)){
            gen_light()
        }
    }
    gen_light();


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
    


    function enemy_shoot(){
        let shoot_rand = Math.floor((Math.random() * 100));
        //console.log(shoot_rand)
        //console.log(shot_list)
        if(IsItemInList(shoot_rand, shot_list)){
            enemy_shoot();
        }
        shot_list.push(shoot_rand);
        let i_list = document.getElementsByClassName("cell-ship-i")
        let square_list = document.getElementsByClassName("cell-ship-square")
        let l_list = document.getElementsByClassName("cell-ship-l")
        let light_list = document.getElementsByClassName("cell-ship-light")
        let ship_list = document.getElementsByClassName("cell-ship")
        
        if(cells[shoot_rand].classList.contains("cell-ship")){
            cells[shoot_rand].classList.add("cell-ship-shot-ally");
            cells[shoot_rand].classList.remove("cell-ship")
            if(cells[shoot_rand].classList.contains("cell-ship-i")){
                cells[shoot_rand].classList.remove("cell-ship-i")
                if(i_list.length == 0){
                    for (let i = 0; i < ally_i_list_const.length; i++) {
                        cells[ally_i_list_const[i]].classList.add("ship-sunk-ally")
                    }
                    info.innerText = "Enemy sunk a Battleship!";
                }
                }
            if(cells[shoot_rand].classList.contains("cell-ship-square")){
                cells[shoot_rand].classList.remove("cell-ship-square")
                if(square_list.length == 0){
                    for (let i = 0; i < ally_square_list_const.length; i++) {
                        cells[ally_square_list_const[i]].classList.add("ship-sunk-ally")
                    }
                    info.innerText = "Enemy sunk a Base ship!";
                }
            }
            if(cells[shoot_rand].classList.contains("cell-ship-l")){
                cells[shoot_rand].classList.remove("cell-ship-l")
                if(l_list.length == 0){
                    for (let i = 0; i < ally_l_list_const.length; i++) {
                        cells[ally_l_list_const[i]].classList.add("ship-sunk-ally")
                    }
                    info.innerText = "Enemy sunk a Carrier!";
                }
            }
            if(cells[shoot_rand].classList.contains("cell-ship-light")){
                cells[shoot_rand].classList.remove("cell-ship-light")
                if(light_list.length == 0){
                    for (let i = 0; i < ally_light_list_const.length; i++) {
                        cells[ally_light_list_const[i]].classList.add("ship-sunk-ally")
                    }
                    info.innerText = "Enemy sunk a Cruiser!";
                }
            }
            if(ship_list.length == 0){
                info.innerText = "You lose!"
                window.location.href = "lose.html";
            }
        }
        else if(cells[shoot_rand].classList.contains("cell-ship-shot-ally") == false){
            cells[shoot_rand].classList.add("cell-miss");
        }
        cells[shoot_rand].innerText = "";
    }

    for (let i = 0; i < enemy_cells.length; i++) {
        enemy_cells[i].addEventListener("mouseover", e => {
            for (let index = 0; index < enemy_cells.length; index++) {
                enemy_cells[index].classList.remove("cell-hover")
            }
            e.target.classList.add("cell-hover")
        })
        enemy_cells[i].addEventListener("click", e => {
            if(e.target.innerText != ""){
                e.target.innerText = "";
                info.innerText = "";
                e.target.classList.add("cell-ship-shot");
                //alert(e.target.id)
                //console.log(parseInt(e.target.id))
                //console.log(enemy_square_list)
                if(IsItemInList(parseInt(e.target.id), enemy_square_list)){
                    enemy_square_list.splice(GetIndexOf(parseInt(e.target.id), enemy_square_list), 1);
                    //console.log(enemy_square_list_const)
                    if(enemy_square_list.length == 0){
                        for (let i = 0; i < enemy_square_list_const.length; i++) {
                            enemy_cells[enemy_square_list_const[i]].classList.add("ship-sunk")
                            enemy_cells[enemy_square_list_const[i]].classList.remove("cell-ship-shot")
                        }
                        for (let i = 0; i < enemy_square_list_near.length; i++) {
                            if(enemy_cells[enemy_square_list_near[i]] == undefined){
                                continue
                            }
                            if(enemy_cells[enemy_square_list_near[i]].classList.contains("cell-miss")){
                                continue
                            }
                            else{
                                enemy_cells[enemy_square_list_near[i]].innerText = ""
                                enemy_cells[enemy_square_list_near[i]].classList.add("ship-sunk-near")
                            }
                        }
                        info.innerText = "You sunk a Base Ship!"
                        ship_show_square.remove();
                    }
                }
                else if(IsItemInList(parseInt(e.target.id), enemy_i_list)){
                    enemy_i_list.splice(GetIndexOf(parseInt(e.target.id), enemy_i_list), 1);
                    if(enemy_i_list.length == 0){
                        for (let i = 0; i < enemy_i_list_const.length; i++) {
                            enemy_cells[enemy_i_list_const[i]].classList.add("ship-sunk")
                            enemy_cells[enemy_i_list_const[i]].classList.remove("cell-ship-shot")
                        }
                        for (let i = 0; i < enemy_i_list_near.length; i++) {
                            if(enemy_cells[enemy_i_list_near[i]] == undefined){
                                continue
                            }
                            if(enemy_cells[enemy_i_list_near[i]].classList.contains("cell-miss")){
                                continue
                            }
                            else{
                                enemy_cells[enemy_i_list_near[i]].innerText = ""
                                enemy_cells[enemy_i_list_near[i]].classList.add("ship-sunk-near")
                            }
                        }
                        info.innerText = "You sunk a Battleship!"
                        ship_show_i.remove();
                    }
                }
                else if(IsItemInList(parseInt(e.target.id), enemy_l_list)){
                    enemy_l_list.splice(GetIndexOf(parseInt(e.target.id), enemy_l_list), 1);
                    if(enemy_l_list.length == 0){
                        for (let i = 0; i < enemy_l_list_const.length; i++) {
                            enemy_cells[enemy_l_list_const[i]].classList.add("ship-sunk")
                            enemy_cells[enemy_l_list_const[i]].classList.remove("cell-ship-shot")
                        }
                        for (let i = 0; i < enemy_l_list_near.length; i++) {
                            if(enemy_cells[enemy_l_list_near[i]] == undefined){
                                continue
                            }
                            if(enemy_cells[enemy_l_list_near[i]].classList.contains("cell-miss")){
                                continue
                            }
                            else{
                                enemy_cells[enemy_l_list_near[i]].innerText = ""
                                enemy_cells[enemy_l_list_near[i]].classList.add("ship-sunk-near")
                            }
                        }
                        info.innerText = "You sunk a Carrier!"
                        ship_show_l.remove();
                    }
                }
                else if(IsItemInList(parseInt(e.target.id), enemy_light_list)){
                    enemy_light_list.splice(GetIndexOf(parseInt(e.target.id), enemy_light_list), 1);
                    if(enemy_light_list.length == 0){
                        for (let i = 0; i < enemy_light_list_const.length; i++) {
                            enemy_cells[enemy_light_list_const[i]].classList.add("ship-sunk")
                            enemy_cells[enemy_light_list_const[i]].classList.remove("cell-ship-shot")
                        }
                        for (let i = 0; i < enemy_light_list_near.length; i++) {
                            if(enemy_cells[enemy_light_list_near[i]] == undefined){
                                continue
                            }
                            if(enemy_cells[enemy_light_list_near[i]].classList.contains("cell-miss")){
                                continue
                            }
                            else{
                                enemy_cells[enemy_light_list_near[i]].innerText = ""
                                enemy_cells[enemy_light_list_near[i]].classList.add("ship-sunk-near")
                            }
                        }
                        info.innerText = "You sunk a Cruiser!"
                        ship_show_light.remove();
                    }
                }
                else{
                    e.target.classList.add("cell-miss")
                }
                if(enemy_square_list.length == 0 && enemy_i_list.length == 0 && enemy_l_list.length == 0 && enemy_light_list.length == 0){
                    info.innerText = "You win!"
                    window.location.href = "win.html";
                    sessionStorage.setItem("win", true);
                }
                //console.log(enemy_square_list)
                for (let i = 0; i < enemy_round_shots; i++) {
                    enemy_shoot();
                }
            }
        })
    }
}












document.addEventListener("DOMContentLoaded", init)