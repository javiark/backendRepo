let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let arrayProducts = JSON.parse(localStorage.getItem("orderArrayFinal"));
const button2 = document.querySelectorAll(".card__btn-buy1")
const button3 = document.querySelectorAll(".card__btn")
const button4 = document.querySelectorAll(".containerDetail__btn-add")
const button5 = document.querySelectorAll(".containerDetail__btn-buy")
const button6 = document.querySelectorAll(".containerDetail__containerBtn")
// const button7 = document.getElementById("idButton")

// console.log(arrayProducts)
// console.log(currentUser)
// console.log(button7)
// console.dir(button2)
// console.dir(button3)
// console.dir(button4)




// const id = arrayProducts.map(user=>user.name)
// console.log(id)

// arrayProducts.forEach((idx)=>{
//     console.log(idx)
//     let id=idx.name
//     console.log(id)
 
// })
arrayProducts.forEach((idx)=>{
    // console.log(idx)
    let id=idx.name
    // console.log(id)
})

// async function arrayBoton() {
//     try {
//         const respuesta = await axios.get(`${URL}/products`);
//         // Products = data.products;
//         // console.log(respuesta.data.productos.name)
//         productsBtn=respuesta.data.productos;
//         console.log(productsBtn)


//     } catch (error) {
//         console.log(error);

//     }
// }
// arrayBoton()




// function btnBuy(){



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
         button7.forEach((parametro) => {
            pam = parametro.classList.add("enable2");
             console.log(pam)
         });
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
