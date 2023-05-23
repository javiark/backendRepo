let orderUser = JSON.parse(localStorage.getItem("currentUser"))

function showNotUser(){
    console.log("anda boton")
    if(!orderUser){
        showAlert("Deberia lograrse para comprar", 'error')
    }
}
