const tableBodyOrder = document.getElementById('table-body-order');
const products1 = [];
const productsArray = [];

const URL2 = 'http://localhost:4000/api';
const URL_public1 = 'http://localhost:4000';


badgeHTMLbuy = document.getElementById("cart-count");

let orderUser = JSON.parse(localStorage.getItem("currentUser"))
let productOrder = JSON.parse(sessionStorage.getItem("order"))
// let productOrderFF = JSON.parse(sessionStorage.getItem("order"))
console.log(productOrder)





const btnEnd1 = document.getElementById("btnEnd")
const productFormBuy = document.getElementById("add-product");
const submitBtn = document.getElementById("submit-btn");
const total = document.getElementById("totalPrice")


//---------------------RECORRER TODO EL ARRAY DE PRODUCTOS-------------------------//

let orderArray = [];
let cart = []

//----------------ACTUALIZAR CANTIDAD EN CARRITOS DE COMPRA--------------
let count = 0;
function cartUpdate() {
    productOrder.forEach(productOrder => {
        count += parseInt(productOrder.cant)
    })
    console.log(count)

    badgeHTMLbuy.innerText = count;
}
cartUpdate()


//----------------PINTAR TABLA--------------


function renderizarTablaOrdenes() {

    tableBodyOrder.innerHTML = '';
    if (productOrder.length === 0) {
        tableBodyOrder.innerHTML = "<p class='disabled'>NO SE ENCONTRARON PRODUCTOS</p>"
        return
    }
    // console.log(productOrderFF)

    productOrder.forEach((prod, index) => {

        let imageSrc1 = prod.image ? `${URL_public1}/upload/product/${prod.image}` : '/assets/images/no-product.png';


        tableBodyOrder.innerHTML += `<tr class="order">
        <td class="order__img-cell"><img class="product__img" src="${imageSrc1}" alt="${prod.name}"></td>
        <td class="order__name" onclick="editName(${index})">${prod.name}</td>
        <td class="order__quantity" ><div class="boton-container"><div class="boton-container__boton-div"><button class="boton-container__boton-order" onclick="restToOrderQuantity('${index}') " id=${index} >-</button>
        <input  type="text"  id="cantidadOrden${index}" value="${prod.cant}" class="boton-container__boton-number" >
        <button class="boton-container__boton-order" onclick= "AccToOrderQuantity('${index}')">+</button>
        </div>
        </div>
        </td>
        <td class="order__price" id="new-price">$ ${prod.price}</td>
        <td class="order__price">$ ${prod.price * prod.cant}</td>
        <td class="order__actions">
            <button class="product__action-btnDetail" onclick="deleteProductBuy(${index})">
                <i class="fa-solid fa-trash"></i>
            </button> 
        </td>
    </tr>
    
    `
    })
}



renderizarTablaOrdenes()



//---------------------LIMPIAR TABLA SI NO HAY USUARIO-------------------------//

function cleantable() {

    if (orderUser) {
        // console.log("hay usuario")
    } else {
        tableBodyOrder.innerHTML = '';
        productOrder = [];
        sessionStorage.setItem("order", JSON.stringify(products))
        actualizarBadge();
    }
}

cleantable()





//---------------------AGREGAR PRODUCTO COMPRADO-------------------------//
// console.log(products)

// async function addToOrder(id) {
//     // event.preventDefault();
//     try{

//     const respuesta = await axios.get(`${URL2}/product/${id}`);
//     const product = respuesta.data.product;
//     console.log
//     const index = Order.findIndex(item => item.name === product.name);

//     if (index !== -1) { // Si el producto ya está en el carrito, aumentar su cantidad
//         Order[index].quantity++;
//     } else { // Si el producto no está en el carrito, agregarlo con cantidad 1
//         const newProduct = {
//             ...product,
//             quantity: 1
//         };
//         Order.push(newProduct);
//     }

//     // Guardar el carrito actualizado en el localStorage
//     sessionStorage.setItem("order", JSON.stringify(Order));
//     console.log(Order);
//     window.location.replace("/pages/order-detail/order-detail.html");
// } catch (error) {
//         console.log(error);
// }}



async function addToOrder(id){
    let count1 = 0;
    let Order = JSON.parse(sessionStorage.getItem("order"))
    try {
        const response = await axios.get(`${URL2}/product/${id}`);
        const product = response.data.product; 
        
    const orderNew = {
        id: product._id,
        image:product.image,
        name: product.name,
        price: product.price,
        cant: 1,
        total: product.price 
    }
        
    const prod1 = Order.find((prod)=>{
        if(prod.name === product.name){
          prod.cant = parseInt(prod.cant) + 1 ;
        //   prod.total = prod.cant * parseInt(prod.price);
          return prod;
        }
      })
  
      if(!prod1) {
        Order.push(orderNew);
      }
      console.log(Order)

    sessionStorage.setItem('order',JSON.stringify(Order));

        swal({
            title: "el producto se agrego al carrito",
            icon: 'success',
        })
        Order.forEach(Order => {
            count1 += parseInt(Order.cant)
        })
        badgeHTMLbuy.innerText = count1;
    } catch (error) {
        console.log(error);
    }

}


// async function addToOrder(index) {
//     // console.log(index)
//     let count1 = 0;

//     try {

//         const response = await axios.get(`${URL2}/product/${index}`);
//         const productOrder = response.data.product;
//         console.log(productOrder)
//         const orderBuy = {
//             id: productOrder._id,
//             image: productOrder.image,
//             name: productOrder.name,
//             price: productOrder.price,
//             cant: 1,
//             total: productOrder.price
//         }

//         // console.log(products1)
//         // console.log(products1.name)
//         const productOrder1 = Order.find((prod) => {
//             if (prod.name === productOrder.name) {
//                 prod.cant = parseInt(prod.cant) + 1;
//                 prod.total = prod.cant * parseInte(prod.price)
//                 return prod;
//             }
//         })

//         if (!productOrder1) {
//             Order.push(orderBuy)
//             // console.log(products1)
//         }
//         products1.forEach(products1 => {
//             count1 += parseInt(products1.cant)
//         })
//         badgeHTMLbuy.innerText = count1;

//         sessionStorage.setItem('order', JSON.stringify( Order));
//         console.log( Order)

//         swal({
//             title: "el producto se agrego al carrito",
//             icon: 'success',
//         })

//         // contarProductos();

//     } catch (error) {
//         console.log(error);
//     }

// }










//-----------------------OBTENER ID DE USUARIO---------------------
// const usuarioID1 = productsUser.findIndex(id1 => id1.email === orderUser.email)
// console.log(usuarioID1)




//----------------ACTUALIZAR PRECIO--------------

// let valorTotal =productOrder.reduce((acc,prod) => acc + prod.quantity * prod.priceOrder,0 )
// total.innerHTML = `$ ${valorTotal}`




function deleteProductBuy(indice) {
    let count2 = 0;
    swal({
        title: "Borrar producto",
        text: `Esta seguro que desea borrar el producto `,
        icon: `warning`,
        buttons: {
            cancel: "Cancelar",
            delete: "Borrar",
        }
    }).then(value => {
        if (value === "delete") {
            productOrder.splice(indice, 1);
            sessionStorage.setItem("order", JSON.stringify(productOrder));

            productOrder.forEach(productOrder => {
                count2 += parseInt(productOrder.quantity)
            })
            // badgeHTMLbuy.innerText = count2;
            let valorTotal = productOrder.reduce((acc, prod) => acc + prod.quantity * prod.priceOrder, 0)
            total.innerHTML = `$ ${valorTotal}`
            console.log(productOrder)

            swal({
                title: "Elemento borrado correctamente",
                icon: "error"

            });
            renderizarTablaOrdenes()

        } else {
            return; //return null
        }
    })


}





//----------------SUMAR CANTIDAD PRODUCTO--------------




function AccToOrderQuantity(id) {
    let input = document.getElementById(`cantidadOrden${id}`);
    let currentValue = parseInt(input.value);

    input.value = currentValue + 1;
    currentValue = parseInt(input.value);
}

function restToOrderQuantity(id) {
    let input = document.getElementById(`cantidadOrden${id}`);
    let currentValue = parseInt(input.value);
    if ( currentValue > 1) {
        input.value = currentValue - 1;
        currentValue = parseInt(input.value);
    }
}

function totalProducts(id) {

    const cantProd = document.getElementById(`cantidadOrden${id}`);

    productOrder[id].cant = parseInt(cantProd.value);
    productOrder[id].total = productOrder[id].cant * parseInt(productOrderFF[id].price);

    sessionStorage.setItem('order', JSON.stringify(productOrderFF));
    renderizarTablaOrdenes();
    countProducts();
}

// function countProducts() {
//     order = JSON.parse(sessionStorage.getItem('order')) || [];
//     let quantity = 0;
//     order.forEach((prod) => {
//         quantity += prod.cant;
//     })
//     badgeHTMLbuy.innerText = quantity;
// }

// countProducts();


// function AccToOrderQuantity(index) {
//     console.log(index)
//     try {

//     } catch (error) {
//         console.log(error);
//     }
//     // console.log("funcionaboton")
//     let count2 = 0
//     // console.log(productOrder)
//     // let orderAdd = productOrderFF[index]
//     // console.log(orderAdd)

//     productOrderFF.forEach((idx) => {
//         console.log(idx)
//         if (orderAdd === idx) {
//             idx.quantity++;
//         }
//     })

//     productOrderFF.forEach(productOrderFF => {
//         count2 += parseInt(productOrderFF.quantity)
//     })
//     console.log(count2)

//     badgeHTMLbuy.innerText = count2;

//     sessionStorage.setItem("order", JSON.stringify(productOrderFF))

//     //calcular Valor total
//     let valorTotalSumar = productOrderFF.reduce((acc, prod) => acc + prod.quantity * prod.priceOrder, 0)
//     total.innerHTML = `$ ${valorTotalSumar}`

//     renderizarTablaOrdenes()

// }

// function AccToOrderQuantity(id) {
//     console.log(id)
//     let input = document.getElementById(`cantidadOrden${id}`)
//     console.log(input)
//     let value = parseInt(input.value, 10);
//     input.value = isNaN(value) ? 1 : value + 1;
//     // totalUpdate(id);
// }

// function totalUpdate(id) {

//     const cantidadProdcutos = document.getElementById(`cantidadOrden${id}`);

//     productOrderFF[id].cant = parseInt(cantidadProdcutos.value);
//     productOrderFF[id].total = productOrderFF[id].cant * parseInt(productOrderFF[id].price);

//     //Guardarlo en el local storage
//     sessionStorage.setItem('order', JSON.stringify(productOrderFF));
//     // renderizarTabla();

//     // contarProductos();

// }

// function AccToOrderQuantity(index) {
//     console.log(index)
//     // console.log("funcionaboton")
//     let count2 = 0
//     // console.log(productOrder)
//     // let orderAdd = productOrderFF[index]
//     // console.log(orderAdd)

//     productOrderFF.forEach((idx) => {
//         console.log(idx)
//         if (orderAdd === idx) {
//             idx.quantity++;
//         }
//     })

//     productOrderFF.forEach(productOrderFF => {
//         count2 += parseInt(productOrderFF.quantity)
//     })
//     console.log(count2)

//     badgeHTMLbuy.innerText = count2;

//     sessionStorage.setItem("order", JSON.stringify(productOrderFF))

//     //calcular Valor total
//     let valorTotalSumar = productOrderFF.reduce((acc, prod) => acc + prod.quantity * prod.priceOrder, 0)
//     total.innerHTML = `$ ${valorTotalSumar}`

//     renderizarTablaOrdenes()

// }

//----------------RESTAR CANTIDAD PRODUCTO--------------

// function restToOrderQuantity(index) {
//     console.log(index)
//     // console.log("funcionaboton")
//     let count2 = 0
//     // console.log(productOrder)
//     let orderAdd = productOrderFF[index]
//     console.log(orderAdd)

//     productOrderFF.forEach((idx) => {
//         console.log(idx)
//         if (orderAdd === idx & idx.quantity > 0) {
//             idx.quantity--;
//         }
//     })

//     productOrderFF.forEach(productOrderFF => {
//         count2 += parseInt(productOrderFF.quantity)
//     })
//     console.log(count2)

//     badgeHTMLbuy.innerText = count2;

//     sessionStorage.setItem("order", JSON.stringify(productOrderFF))

//     //calcular Valor total
//     let valorTotalSumar = productOrderFF.reduce((acc, prod) => acc + prod.quantity * prod.priceOrder, 0)
//     total.innerHTML = `$ ${valorTotalSumar}`

//     renderizarTablaOrdenes()

// }
//----------------FINALIZAR COMPRA--------------
// if(tableBodyOrder=''){
//     console.log("no hay nada")
// }

if (productOrder.length === 0) {
    console.log("no")
    btnEnd1.classList.add("buy-btn-empty")

}

function buyEnd() {
    if (!productOrder) {
        swal({
            title: `Su carrito esta vacio`,
            icon: 'error',
        })
    } else {


        swal({
            title: `Gracias por su compra`,
            icon: 'success',
        })

        sessionStorage.removeItem("order");

        setTimeout(() => {
            window.location.href = "/"

        }, 3000)
    }
}

let currentUser1 = JSON.parse(localStorage.getItem("currentUser"));




