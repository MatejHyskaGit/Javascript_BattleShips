function init(){
    let win_check = sessionStorage.getItem("win")
    console.log(win_check)
    if(win_check == null){
        window.location.href = "index.html"
    }
    else{
        let win_check_str = sessionStorage.getItem("win").toString()
        if(win_check_str == "null"){
            window.location.href = "index.html"
        }
    }
    sessionStorage.setItem("win", null)
}







document.addEventListener("DOMContentLoaded", init)