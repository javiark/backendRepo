const currentUserOrders = JSON.parse(localStorage.getItem('currentUser'));
const URL5 = 'http://localhost:4000/api';
const URL_public5 = 'http://localhost:4000';
const token4 = localStorage.getItem('token');

const orderCont = document.getElementById('orders-cont');
const userForm = document.getElementById('my-account-form');
const tableBody = document.querySelector('#table-body-orders');

const tableBody2 = document.getElementById("table-body-orders-user")



// async function cargarOrdenes() {
//     try {

//         const respuesta = await axios.get(`${URL5}/orders/user/${currentUserOrders._id}`)
//         // console.log(respuesta)
//         const orderUser = respuesta.data.userOrders;
//         renderizarTablaOrdenes(orderUser)
//     } catch (error) {
//         console.log(error)
//     }
// }
// cargarOrdenes()

async function cargaOrdenesTodas() {
    try {
        const respuesta = await axios.get(`${URL4}/orders`);
        ordersArray = respuesta.data.orders
        renderizarTablaOrdenes(ordersArray)
        // renderizarUserOrder2(ordersArray)


    } catch (error) {
        console.log(error);
    }
}
cargaOrdenesTodas()


async function deleteOrder(id) {
    console.log(id)
    const token = localStorage.getItem("token");
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
                const respuesta = await axios.delete(`${URL5}/orders/${id}`, {
                    headers: { Authorization: token }
                });
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

// async function buscarOrdenPorId() {
//     try {
//         const respuesta = await axios.get(`${URL4}/orders/user/${id}`);
//         ordersArray = respuesta.data.orders
//         renderizarTablaOrdenes(ordersArray)
//     } catch (error) {
//         console.log(error);
//     }
// }









//2- Definir una función para iterar el array
function renderizarTablaOrdenes(arrayOrders) {
    console.log(arrayOrders)
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
                            <td class="product__orderPrice">$ ${order.totalPrice}</td>
                            <td class="product__order">${order.products.length}</td>
                            <td class="product__order">${formatearFecha(order.createdAt)}</td>
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

function renderizarUserOrder2(arrayOrders) {
    tableBody2.innerHTML = '';
    if (arrayOrders.length === 0) {
        tableBody2.innerHTML = "<p class='disabled'>NO SE ENCONTRARON USUARIOS</p>"
        return
    }
    //3- Iterar el array para acceder a cada producto

    arrayOrders.forEach((order, index) => {

        const tableRow = `<tr class="product">
                            <td class="product__order">${order.userId.fullName}</td>
                            <td class="product__order">${order._id}</td>  
                            <td class="product__actions">
                                <button class="product__action-btnDetail-Select" onclick="selectOrder('${order._id}')">
                                   </i><i class="fa-solid fa-check"></i>
                                </button>             
                            </td>
                        </tr>`
        tableBody2.innerHTML += tableRow;

    });

}

function renderizarUsuariosSelect(arrayUser) {

    let selectUser1 = document.getElementById("selectUser1")
    arrayUser.forEach((user, index) => {

        selectUser1.innerHTML = arrayUser.map(user => `<option value="${user._id}">${user.fullName}</option>`)
    });
}

function obtenerOrden(arrayUser) {

    console.log(arrayUser)

    let selectOrderId = document.getElementById("selectOrderId")
    arrayUser.forEach((user, index) => {

        selectOrderId.innerHTML = arrayUser.map(order => `<option value="${order._id}">${order._id}</option>`)
    });
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




async function obtenerUsuarios2() {
    try {
        const token = localStorage.getItem('token'); // no hay que hacer json|pars pq eltoken es una key y una string
        // console.log(token)
        const response = await axios.get(`${URL5}/users`, {
            headers: {
                Authorization: token
            }
        });
        // console.log(response)
        users = response.data.users;
        // console.log(users)
        renderizarUsuariosSelect(users)

    } catch (error) {
        console.log(error);
    }

}

obtenerUsuarios2()


async function obtenerUsuarios() {
    try {
        const token = localStorage.getItem("token"); // no hay que hacer jsonpars pq eltoken es una key y una string
        const response = await axios.get(`${URL}/users`, {
            headers: {
                Authorization: token
            }
        });
        console.log(response)
        users = response.data.users;
        console.log(users)
        renderizarTablaUser(users)
    } catch (error) {
        console.log(error);
    }
}
// router.get("/orders/user/:id", ordersController.getUserOrders);

async function obtenerOrdenUsuario(id) {
    console.log(id)
    try {
        // const token = localStorage.getItem("token");
        const response = await axios.get(`${URL5}/orders/user/${id}`, {
            // headers: {
            //     Authorization: token
            // }

        });
        console.log(response)
        users = response.data.userOrders;
        console.log(users)
        renderizarTablaOrdenes(users)

    } catch (error) {
        console.log(error);
    }
}

let editIndex;

//----------precargar formulario-----------------//
async function editOrder(idx) {
    console.log(idx)
    const userFormOrder = document.getElementById('edit-order');
    console.log(userFormOrder.elements)
    try {

        const orderEdit = await axios.get(`${URL5}/orders/${idx}`)
        // console.log(orderEdit)
        let orderStatus = orderEdit.data.order.status
        // let orderPrecio= orderEdit.data.order.totalPrice
        // console.log(orderPrecio)
        const el = userFormOrder.elements;  
        // console.log(el.role.value)
        el.status.value =orderStatus;
        // el.priceOrder.value =orderPrecio;
        console.log(orderStatus)
        editIndex = idx


    } catch (error) {
        console.log(error);

    }
}

// editStatusOrder(event)


async function editStatusOrder(evt){
    try {
        // console.log(editIndex)
        evt.preventDefault();
        // const formFile = new FormData(evt.target);
        const elements = evt.target.elements;
        // console.log(elements)

        if (editIndex) { // es para cuando el producto es nuevo. 0 es undefined
            const updatedOrder = {
                status: elements.StatusOrder.value,
                // totalPrice: elements.priceOrder.value,
            }

            console.log(updatedOrder)
            const res = await axios.put(`${URL5}/orders/${editIndex}`, updatedOrder,{new:true});
            // console.log(res)
            swal({
                title: `Se ha editado el status`,
                icon: 'success'
            })
            renderizarTablaOrdenes(res)
  
        editIndex = undefined;

    }     } catch (error) {
        console.log(error)
    }
}






