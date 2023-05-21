let currentUser = JSON.parse(localStorage.getItem("currentUser"));
const button2 = document.querySelectorAll(".card__btn-buy1")
const button3 = document.querySelectorAll(".card__btn")
const button4 = document.querySelectorAll(".containerDetail__btn-add")
const button5 = document.querySelectorAll(".containerDetail__btn-buy")
const button6 = document.querySelectorAll(".containerDetail__containerBtn")
console.dir(button2)
console.dir(button3)
console.dir(button4)
function btnBuy(){



    if (currentUser) {
        button2.forEach((parametro) => {
           pam = parametro.classList.add("enable");
            // console.log(pam)
        });
        button3.forEach((parametro) => {
            pam = parametro.classList.add("enable");
             // console.log(pam)
         });
         button4.forEach((parametro) => {
            pam = parametro.classList.add("enable2");
             console.log(pam)
         });
         button5.forEach((parametro) => {
            pam = parametro.classList.add("enable2");
             console.log(pam)
         });
         button6.forEach((parametro) => {
            pam = parametro.classList.add("enable2");
             console.log(pam)
         });
}
}
btnBuy()


// function btnBuy(){
//     const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//     const boton = document.querySelector(".card__btn-buy")
//     if (currentUser) {
//     boton.classList.add("enable");
// }
// }
// btnBuy()
