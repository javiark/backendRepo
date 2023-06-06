// protege q no entre copiando la url

const user = JSON.parse(localStorage.getItem("currentUser"))

if(!user || user.role !=="ADMIN_ROLE"){
    //Sacar o redireccionar a mi usuario si no esa logueado o si no es admin
    window.location.href="/"
}