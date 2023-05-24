const tableBodyOrder = document.getElementById('table-body-order');
const productsArray = [];


badgeHTMLbuy=document.getElementById("cart-count");

let productsOrder = JSON.parse(localStorage.getItem("products"))
let productsOrder1 = JSON.parse(localStorage.getItem("products"))

let productsUser = JSON.parse(localStorage.getItem("users"))
let orderUser = JSON.parse(localStorage.getItem("currentUser"))
let orderFinal = JSON.parse(localStorage.getItem("orderArrayFinal"))
let productOrder = JSON.parse(sessionStorage.getItem("order")) 
let productOrderFF = JSON.parse(sessionStorage.getItem("order")) 

console.log(productOrder)|| [];

const btnEnd1=document.getElementById("btnEnd")
const productFormBuy=document.getElementById("add-product");
const submitBtn = document.getElementById("submit-btn");
const total = document.getElementById("totalPrice")


let orderArrayMongo = [];
let cartMongo = []


//---------------------HACER EL ARRAY DE PRODUCTOS DESDE MONGO-------------------------//
async function arrayProducts1() {
    try {
        const respuesta = await axios.get(`${URL}/products`);
        // Products = data.products;
        // console.log(respuesta.data.productos.name)
        productsArr=respuesta.data.productos;
        console.log(productsArr)
        // orderArray.push(productsArr)
        localStorage.setItem("orderArrayFinal", JSON.stringify(productsArr))

    } catch (error) {
        console.log(error);

    }
}
arrayProducts1()


//---------------------AGREGAR PRODUCTO COMPRADO MONGO-------------------------//




// function addToOrder(index){
//     const id = orderFinal.map(user=>user._)
//     console.log(id)


//     let count1 = 0;
//     let orderBuy =orderFinal[index]
//     const existe = productsArray.some(prod => prod.productID===index)

//     if(existe){
//         const prod = productsArray.map(prod =>{
//             if(prod.productID===index){
//                 prod.quantity++
//             }
//         })
//     }else{
//     productsArray.push(orderBuy)
//     let arrayProducts = Object.values(productsArray)

//     }
//     productsArray.forEach(productsArray => {
//     count1 += parseInt(productsArray.quantity)
//     })
//     showAlert("Producto agregado a carrito", "succes" )
//     badgeHTMLbuy.innerText=count1;
//     sessionStorage.setItem("order", JSON.stringify(productsArray))
// }


function showNotUser(){
    console.log("anda boton")
    if(!orderUser){
        showAlert("Deberia lograrse para comprar", 'error')

    }
}