const currentUserOrders = JSON.parse(localStorage.getItem('currentUser'));
const URL5 = 'http://localhost:4000/api';
const URL_public5 = 'http://localhost:4000';
const token = localStorage.getItem('token');

const orderCont = document.getElementById('orders-cont');
const userForm = document.getElementById('my-account-form');
const tableBody = document.querySelector('#table-body');

async function cargarOrdenes() {
    try {

        const respuesta = await axios.get(`${URL5}/orders/user/${currentUserOrders._id}`)
        console.log(respuesta)
        const orderUser = respuesta.data.userOrders;
        // renderizarTabla(orders)
        console.log(orderUser)
        renderizarTablaOrdenes(orderUser)

    } catch (error) {
        console.log(error)
    }
}
cargarOrdenes()

function renderizarTablaOrdenes(arrayProductos) {
    tableBody.innerHTML = '';
    if (arrayProductos.length === 0) {
        tableBody.innerHTML = "<p class='disabled'>NO SE ENCONTRARON PRODUCTOS</p>"
        return
    }
    //3- Iterar el array para acceder a cada producto

    arrayProductos.forEach((producto, index) => {

        let imageSrc = producto.image ? `${URL_public}/upload/product/${producto.image}` : '/assets/images/no-product.png';
        //4- Introducir dentro del tbody una fila por producto con sus respectivas celdas
        const tableRow = `<tr class="product">
                            <td class="product__img-cell"><img class="product__img" src="${imageSrc}" alt="${producto.name}"></td>
                            <td class="product__name" onclick="editName(${index}")>${producto.name}</td>
                            <td class="product__desc">${producto.description}</td>
                            <td class="product__price">$ ${producto.price}</td>
                            <td class="product__desc">${producto.detail}</td>
                            <td class="product__actions">
                                <button class="product__action-btnDetail" onclick="deleteProduct('${producto._id}')">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                           
                                <button class="product__action-btn product__btn-edit"  onclick="editProduct1('${producto._id}')">
                                    <i class="fa-solid fa-pencil " ></i>
                                </button>

                            
                            </td>
                        </tr>`
        tableBody.innerHTML += tableRow;

    });

}



