const tableBodyOrder = document.getElementById('table-body-order');
const productsArray = [];



badgeHTMLbuy = document.getElementById("cart-count");

let productsOrder = JSON.parse(localStorage.getItem("products"))
let productsOrder1 = JSON.parse(localStorage.getItem("products"))

let productsUser = JSON.parse(localStorage.getItem("users"))
let orderUser = JSON.parse(localStorage.getItem("currentUser"))
let orderFinal = JSON.parse(localStorage.getItem("orderArrayFinal"))
let productOrder = JSON.parse(sessionStorage.getItem("order"))
let productOrderFF = JSON.parse(sessionStorage.getItem("order"))

// console.log(productOrder) || [];

const btnEnd1 = document.getElementById("btnEnd")
const productFormBuy = document.getElementById("add-product");
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
        productsArr = respuesta.data.productos;
        // console.log(productsArr)
        // orderArray.push(productsArr)
        localStorage.setItem("products", JSON.stringify(productsArr))

    } catch (error) {
        console.log(error);

    }
}
arrayProducts1()

//---------------------RECORRER TODO EL ARRAY DE PRODUCTOS-------------------------//

let orderArray = [];

let cart = []

productsOrder.forEach((prod,id)=>{


    let quantity =parseInt(1)
    let  productID = id
    let nuevaOrden={
        productID,
        prodIDMongo:prod._id,
        quantity,
        nameOrder:prod.name,
        priceOrder:prod.price,
        imageOrder:prod.image, 
        descriptionOrder:prod.description,
        detailOrder:prod.detail,
    }
    orderArray.push(nuevaOrden)
    localStorage.setItem("orderProductsBuy", JSON.stringify(orderArray))

});
 
let userName=orderUser.fullName
let userOrder=orderUser.email
let totalOrder=`$$`
let createdAt = new Date()
let ordernFinal={
    // usuarioID1,
    userName,
    userOrder,
    totalOrder,
    createdAt,
    orderArray
}
console.log(orderArray)

//---------------------LIMPIAR TABLA SI NO HAY USUARIO-------------------------//

function cleantable(){

    if (orderUser) {
            // console.log("hay usuario")
        }else{
            tableBodyOrder.innerHTML = '';
            productOrder= [];
            sessionStorage.setItem("order", JSON.stringify(products))
            actualizarBadge();
        }
}

cleantable()

//----------------ACTUALIZAR CANTIDAD EN CARRITOS DE COMPRA--------------
// let count=0;
// function cartUpdate(){
// productOrder.forEach(productOrder => {
//     count += parseInt(productOrder.quantity)
// })

// badgeHTMLbuy.innerText=count;
// }
// cartUpdate()

//---------------------AGREGAR PRODUCTO COMPRADO MONGO-------------------------//



console.log(productsArray)
function addToOrder(index){
    console.log(index)



    let count1 = 0;
    let orderBuy =orderFinal[index]
    const existe = productsArray.some(prod => prod.productID===index)

    if(existe){
        const prod = productsArray.map(prod =>{
            if(prod.productID===index){
                prod.quantity++
            }
        })
    }else{
        productsArray.push(orderBuy)
    let arrayProducts = Object.values(productsArray)

    }
    productsArray.forEach(productsArray => {
    count1 += parseInt(productsArray.quantity)
    })
    showAlert("Producto agregado a carrito", "succes" )
    badgeHTMLbuy.innerText=count1;
    sessionStorage.setItem("order", JSON.stringify(productsArray))
}


function showNotUser() {
    // console.log("anda boton")
    if (!orderUser) {
        showAlert("Deberia lograrse para comprar", 'error')

    }
}


//---------------------LIMPIAR TABLA SI NO HAY USUARIO-------------------------//

function cleantable(){

    if (orderUser) {
            // console.log("hay usuario")
        }else{
            tableBodyOrder.innerHTML = '';
            productOrder= [];
            sessionStorage.setItem("order", JSON.stringify(productsArray))
            actualizarBadge();
        }
}

cleantable()

console.log(productsArray)
