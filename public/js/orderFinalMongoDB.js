const tableBodyOrder = document.getElementById('table-body-order');
const products1 = [];
const productsArray = [];

const URL2 = 'http://localhost:4000/api';
const URL_public1 = 'http://localhost:4000';


badgeHTMLbuy = document.getElementById("cart-count");

let orderUser = JSON.parse(localStorage.getItem("currentUser"))
let productOrder = JSON.parse(sessionStorage.getItem("order"))
// let productOrderFF = JSON.parse(sessionStorage.getItem("order"))
// console.log(productOrder)





const btnEnd1 = document.getElementById("btnEnd")
const productFormBuy = document.getElementById("add-product");
const submitBtn = document.getElementById("submit-btn");
const total = document.getElementById("totalPrice")
// console.log(total)


//---------------------RECORRER TODO EL ARRAY DE PRODUCTOS-------------------------//

let orderArray = [];
let cart = []




function renderizarTablaOrdenes() {

    tableBodyOrder.innerHTML = '';
    if (productOrder.length === 0) {
        tableBodyOrder.innerHTML = "<p class='disabled'>NO SE ENCONTRARON PRODUCTOS</p>"
        return
    }
    // console.log(productOrder)

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
        <td class="order__price">$ ${prod.total}</td>
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

// function cleantable() {

//     if (orderUser) {
//         // console.log("hay usuario")
//     } else {
//         tableBodyOrder.innerHTML = '';
//         productOrder = [];
//         sessionStorage.setItem("order", JSON.stringify(products))
//         actualizarBadge();
//     }
// }

// cleantable()





//---------------------AGREGAR PRODUCTO COMPRADO-------------------------//

async function addToOrder(id) {
    let count1 = 0;
    let Order = JSON.parse(sessionStorage.getItem("order")) || [];
    try {
        const respuesta = await axios.get(`${URL2}/product/${id}`);
        const product = respuesta.data.product;


        const newOrder = {
            id: product._id,
            image: product.image,
            name: product.name,
            price: product.price,
            cant: 1,
            total: product.price

        }

        const prod = Order.find((prod) => {
            if (prod.name === product.name) {
                prod.cant = parseInt(prod.cant) + 1;
                prod.total = prod.cant * parseInt(prod.price);
                return prod;
            }
        })

        if (!prod) {
            Order.push(newOrder);
        }

        //Guardarlo en el local storage
        console.log(Order)
        sessionStorage.setItem('order', JSON.stringify(Order));

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
            totalBuy()
            renderizarTablaOrdenes()



        } else {
            return; //return null
        }
    })


}



function AccToOrderQuantity(id) {
    let input = document.getElementById(`cantidadOrden${id}`);
    let currentValue = parseInt(input.value);

    input.value = currentValue + 1;
    currentValue = parseInt(input.value);
    countProducts()
    totalOrder1(id)
    totalBuy()
}

function restToOrderQuantity(id) {
    let input = document.getElementById(`cantidadOrden${id}`);
    let currentValue = parseInt(input.value);
    if (currentValue > 1) {
        input.value = currentValue - 1;
        currentValue = parseInt(input.value);
    }
    countProducts()
    totalOrder1(id)
    totalBuy()
}



function totalOrder1(id) {

    const prodQuantity = document.getElementById(`cantidadOrden${id}`);
    productOrder[id].cant = parseInt(prodQuantity.value);
    productOrder[id].total = productOrder[id].cant * parseInt(productOrder[id].price);



    //Guardarlo en el local storage
    sessionStorage.setItem('order', JSON.stringify(productOrder));
    renderizarTablaOrdenes();


}

//----------------ACTUALIZAR PRECIO--------------
function totalBuy() {
    let valorTotal = 0;
    Order = JSON.parse(sessionStorage.getItem('order')) || [];
    Order.forEach((product) => {
        valorTotal += Math.round((product.cant * product.price) * 100) / 100;;
    });


    total.innerHTML = `$ ${valorTotal}`

    // console.log(valorTotal)
}
totalBuy()






function countProducts() {
    Order = JSON.parse(sessionStorage.getItem('order')) || [];
    let quantity = 0;
    Order.forEach((prod) => {
        quantity += prod.cant;
    })
    badgeHTMLbuy.innerText = quantity;
}

countProducts();



if (productOrder.length === 0) {
    console.log("no")
    btnEnd1.classList.add("buy-btn-empty")

}



let currentUser1 = JSON.parse(localStorage.getItem("currentUser"));




async function buyEnd() {
    const currentUser2 = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser2) {
        swal({
            title: "Tiene que loguearse para comprar",
            icon: 'warning',
        })
    }
    else {
        try {
            let totalOrden = 0;
            const orden = {};
            let productPush = [];
            console.log(productOrder)
            productOrder.forEach((prod) => {
                const producto = {
                    // productName: prod.name,
                    productId: prod.id,
                    quantity: prod.cant,
                    price: prod.price
                }
                totalOrden += prod.total
                productPush.push(producto)
                console.log(productPush)
            });

            orden.products = productPush;
            orden.totalPrice = totalOrden;
            orden.userId = currentUser2._id;
            orden.createdAt = Date.now;

            console.log(orden)

            await axios.post(`${URL2}/orders`, orden);
            setTimeout(() => {
                window.location.href = "/"

            }, 2000)

            sessionStorage.removeItem('order')
            swal({
                title: "Gracias por su compra",
                icon: 'success',
            })
            productPush = [];
            renderizarTablaOrdenes();
            countProducts();

        } catch (error) {
            swal({
                title: "No se pudo realizar la orden",
                icon: 'error',
            })
            console.log(error);
        }
    }
}





















