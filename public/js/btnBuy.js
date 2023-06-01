let currentUser = JSON.parse(localStorage.getItem("currentUser"));

const button2 = document.querySelectorAll(".card__btn-buy1")
const button23 = document.getElementById("card__btn-buy1")
console.log(button23)
const button3 = document.querySelectorAll(".card__btn")
const button4 = document.querySelectorAll(".containerDetail__btn-add")
const button5 = document.querySelectorAll(".containerDetail__btn-buy")
const button6 = document.querySelectorAll(".containerDetail__containerBtn")
// const button7 = document.getElementById("idButton")
console.log(button2)

// arrayProducts.forEach((idx)=>{
//     // console.log(idx)
//     let id=idx.name
//     // console.log(id)
// })




    if (currentUser) {
        button2.forEach((parametro) => {
           pam = parametro.classList.add("enable");
            console.log(pam)
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

