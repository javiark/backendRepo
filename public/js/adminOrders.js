const currentUserOrders = JSON.parse(localStorage.getItem('currentUser'));
const URL5 = 'http://localhost:4000/api';
const URL_public5 = 'http://localhost:4000';
const token = localStorage.getItem('token');

const orderCont = document.getElementById('orders-cont');
const userForm = document.getElementById('my-account-form');
const tableBody = document.querySelector('#table-body-orders');
const tableBody2 = document.querySelector('#table-body-orders-total');


async function cargarOrdenes() {
    try {

        const respuesta = await axios.get(`${URL5}/orders/user/${currentUserOrders._id}`)
        // console.log(respuesta)
        const orderUser = respuesta.data.userOrders;
        renderizarTablaOrdenes(orderUser)
    } catch (error) {
        console.log(error)
    }
}
// cargarOrdenes()

async function cargaOrdenesTodas() {
    try {
        const respuesta = await axios.get(`${URL4}/orders`);
        ordersArray = respuesta.data.orders
        renderizarTablaOrdenes(ordersArray)
      

    } catch (error) {
        console.log(error);
    }
}
cargaOrdenesTodas()


async function deleteOrder(id) {
    console.log(id)
    swal({
        title: `Borrar orden`,
        text: `Esta seguro que desea borrar esta orden   `,
        icon: 'warning',
        buttons: {
            cancel: `Cancelar`,
            delete: `Borrar`
        }
    }).then(async function (value) {
        if (value === `delete`) {
            // ? LLAMADA AL BACKEND axios.delete
            try {
                const respuesta = await axios.delete(`${URL4}/orders/${id}`,{
                    headers: { Authorization: token } });
                    cargaOrdenesTodas()
            } catch (error) {
                console.log(error)
            }
            swal({
                title: `Elemento borrado correctamente`,
                icon: 'error'
            })
            renderizarTablaOrdenes();
        }
    })
}

async function buscarOrdenPorId() {
    try {
        const respuesta = await axios.get(`${URL4}/orders/user/${id}`);
        ordersArray = respuesta.data.orders
        renderizarTablaOrdenes(ordersArray)
    } catch (error) {
        console.log(error);
    }
}









//2- Definir una función para iterar el array
function renderizarTablaOrdenes(arrayOrders) {
    tableBody.innerHTML = '';
    if (arrayOrders.length === 0) {
        tableBody.innerHTML = "<p class='disabled'>NO SE ENCONTRARON ORDENES</p>"
        return
    }
    //3- Iterar el array para acceder a cada producto

    arrayOrders.forEach((order, index) => {

        const tableRow = `<tr class="product">
                            <td class="product__order">${order.userId.fullName}</td>
                            <td class="product__order">${order._id}</td>
                            <td class="product__price">$ ${order.totalPrice}</td>
                            <td class="product__order">${order.products.length}</td>
                            <td class="product__order">${order.status}</td>
                            <td class="product__actions">
                                <button class="product__action-btnDetail" onclick="deleteOrder('${order._id}')">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                           
                                <button class="product__action-btn product__btn-edit"  onclick="editOrder('${order._id}')">
                                    <i class="fa-solid fa-pencil " ></i>
                                </button>

                            
                            </td>
                        </tr>`
        tableBody.innerHTML += tableRow;

    });

}

// //2- Definir una función para iterar el array
// function renderizarTablaOrdenesTotal(arrayOrders) {
//     tableBody.innerHTML = '';
//     if (arrayOrders.length === 0) {
//         tableBody.innerHTML = "<p class='disabled'>NO SE ENCONTRARON ORDENES</p>"
//         return
//     }
//     //3- Iterar el array para acceder a cada producto

//     arrayOrders.forEach((order, index) => {

//         const tableRow = `<tr class="product">

//                             <td class="product__desc">${order._id}</td>
//                             <td class="product__price">$ ${order.totalPrice}</td>
//                             <td class="product__desc">${order.status}</td>
//                             <td class="product__actions">
//                                 <button class="product__action-btnDetail" onclick="deleteProduct('${order._id}')">
//                                     <i class="fa-solid fa-trash"></i>
//                                 </button>
                           
//                                 <button class="product__action-btn product__btn-edit"  onclick="editProduct1('${order._id}')">
//                                     <i class="fa-solid fa-pencil " ></i>
//                                 </button>

                            
//                             </td>
//                         </tr>`
//         tableBody.innerHTML += tableRow;

//     });

// }






