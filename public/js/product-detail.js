
// sessionStorage.clear("order");const tableBodyOrder3 = document.getElementById('table-body-order');
let productOrderDetail = JSON.parse(sessionStorage.getItem("order")) || [];


const URL1 = 'http://localhost:4000/api';
const URL_public2 = 'http://localhost:4000';
const token = localStorage.getItem('token');

const params = window.location.search;
const index = params.split("id=")[1].split("&")[0];
const paramsUrl = new URLSearchParams(params);
const paramsEntries = Object.fromEntries(paramsUrl)
const indice = paramsEntries.id;
let badgeHTMLbuy2 = document.getElementById("cart-count");
let productOrder2 = JSON.parse(sessionStorage.getItem("order")) || [];
const cardContainer1 = document.querySelector("#card-detail");




async function cargarProductos2(id) {
    console.log(id)
    try {
        respuesta = await axios.get(`${URL1}/product/${id}`)
        product = respuesta.data.respuesta
        // console.log(product)

        const prodElegido = respuesta.data.product;
        // console.log(prodElegido)
        // localStorage.setItem("products", JSON.stringify(products))
        renderizarDetail(prodElegido)


    } catch (error) {
        console.log(error);
    }
}
cargarProductos2(index)


function renderizarDetail(product) {


    let imageSrc2 =`${URL_public2}/upload/product/${product.image}`;

    cardContainer1.innerHTML = ` 
<main class="main">
    <div class="mainDetail">
        <div class="containerDetail">
            <div class="containerDetail__imageContainer">
                <img src=${imageSrc2} alt=${product.name} class="containerDetail__image">
            </div>

                 <div class="containerDetail__description"" >
                    <div class="containerDetail__container">
                            <div class="card__title">
                                <p>${product.name}</p>
                            </div>
                                    <div class="card__price">
                                    $ ${JSON.stringify(product.price)}
                                    </div>
                                <div class="card__detail">
                                    <p class="card__texto">${product.description}</p> 
                    </div>
                </div>
                    <div class="containerDetail__containerAdd"><div class="containerDetail__containerBtn1"><button class="containerDetail__containerBtn" onclick="decrement(index) ">
                    -
                    </button>
                    <input type="text" class="containerDetail__containerNumber1" id="countNumber1${index}" value=1 >
                    <button  class="containerDetail__containerBtn" onclick="increment(index)"> 
                    +</button>
                    </div>
                    </div>


                    <a  class="containerDetail__btn-buy" >  <button class="containerDetail__btn-buy" onclick="addToCartDetail('${product._id}')">Agregar a Carrito</button><a/>
                    </div>

        </div>
        <div class="containerDesc">
            <div class="containerDesc__cont">


              <h1 class="containerDesc__title">DESCRIPCION</h1>
                    <div class="containerDesc__detail">${product.detail}</div>
            </div>

        </div>




    </div> 
</main>`

}



//---------------------SUMA PRODUCTOS-------------------------//
let cantOrdenes = []
function increment(id) {
    // console.log(id)
    let input = document.getElementById(`countNumber1${id}`);
    // console.log(input)
    let currentValue = parseInt(input.value);

    input.value = currentValue + 1;
    currentValue = parseInt(input.value);

    // updateTotal(id)
}



function decrement(id) {
    // console.log(id)
    let input = document.getElementById(`countNumber1${id}`);
    // console.log(input)
    let currentValue = parseInt(input.value);

    if (currentValue > 1) {
        input.value = currentValue - 1;
        currentValue = parseInt(input.value);
    }
    // updateTotal(id)

}
console.log(cantOrdenes)

console.log(cantOrdenes.length)


async function addToCartDetail(id){
    console.log(id)
    Order = JSON.parse(sessionStorage.getItem('order')) || [];
    console.log(Order)
    // console.log(id)
    try {
        const res = await axios.get(`${URL1}/product/${id}`);
        const product = res.data.product;
        console.log(res)
        const cantidad=document.getElementById(`countNumber1${id}`)
        // let cantProd = parseInt( cantidad)
        // let index = (Order.findIndex(el=>el.product==product.id))
        // console.log(index)

        const orderNew = {
            id: product._id,
            image: product.image,
            name: product.name,
            price: product.price,
            cant: parseInt(cantidad.value),
            total: parseInt(cantidad.value) * parseInt(product.price)
           
        }
        console.log(orderNew)
        const prod = Order.find((prod)=>{
            if(prod.name === product.name){
              prod.cant = parseInt(prod.cant) +  parseInt(cantidad.value);
              prod.total = prod.cant * parseInt(prod.price);
              return prod;
            }
          })
          if(!prod) {
            Order.push(orderNew);
          }
          sessionStorage.setItem('order',JSON.stringify( Order));

          swal ({
            title:"Producto agregado a la Orden",
            icon: 'success',
        })
          countProducts()
    } catch (error) {
        console.log(error)
    }


    }
    


async function updateTotal(id){
    Order = JSON.parse(sessionStorage.getItem('order')) || [];
    let cantOrdenes = document.getElementById(`countNumber1${id}`)
    cant = cantOrdenes.length
    
    console.log(product[id])
    product[id].cant =  parseInt(cant);
    product[id].total = product[id].cant * parseInt(product[id].price);
      
//Guardarlo en el local storage
sessionStorage.setItem('order',JSON.stringify( products));
// renderizarTabla();

// contarProductos();

  }




//----------------ACTUALIZAR CANTIDAD EN CARRITOS DE COMPRA--------------
let count = 0;
function cartUpdate() {
    productOrderDetail.forEach(productOrderDetail => {
        count += parseInt(productOrderDetail.quantity)
    })

    badgeHTMLbuy2.innerText = count;
}
cartUpdate()







function increaseNumber(index) {
    // console.log(index)
    // console.log("funcionaboton")
    let count2 = 0
    // console.log(productOrder)
    let orderAdd = productOrderDetail[index]
    // console.log(orderAdd)

    productOrderDetail.forEach((idx) => {
        // console.log(idx)
        if (orderAdd === idx) {
            idx.cant++;
        }
    })

    productOrderDetail.forEach(productOrderDetail => {
        count2 += parseInt(productOrderDetail.cant)
    })
    console.log(count2)

    badgeHTMLbuy.innerText = count2;

    sessionStorage.setItem("order", JSON.stringify(productOrderDetail))



}



















































