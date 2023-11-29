const btnBack = document.getElementById("btn-back");
btnBack.addEventListener("click",function(e){
    e.preventDefault();
    window.history.back()
})