// const { response } = require("express");

let products = [];
const token = localStorage.getItem('token');
const selectCategoryHTML = document.getElementById("category")
const productForm2 = document.getElementById("add-product");
let productsCargados = JSON.parse(localStorage.getItem('products')) || [];
let nombreImagen = document.getElementById("imgLabel")
let productID1 = JSON.parse(localStorage.getItem('products'));
let editIndex = undefined; // para que se vacie
console.log(editIndex)

const URL = 'http://localhost:9000/api';
const URL_public = 'http://localhost:9000';

(async function cargarCategorias() {
    try {
        const response = await axios.get(`${URL}/category`)
        // console.log(response) //los elementos estan en response.data.categories. 
        // console.log(response.data.categories)
        const categories = response.data.categories;
    } catch (error) {
        console.log(error);
    }

})()

async function cargarProductos() {
    try {
        const respuesta = await axios.get(`${URL}/products`);
        // Products = data.products;
        // console.log(respuesta.data.productos.name)
        products = respuesta.data.productos
        renderizarTabla(products)
    } catch (error) {
        console.log(error);

    }


}




const productForm = document.getElementById("add-product");
const submitBtn = document.getElementById("submit-btn");


//1- Obtener el body de la tabla para poder modificarlo desde JS
const tableBody = document.querySelector('#table-body');

// let editIndex;


//2- Definir una función para iterar el array
function renderizarTabla(arrayProductos) {
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
                                <button class="product__action-btn btn-favorite ${producto.favorite === true ? 'active' : ''}" onclick="setFavoriteProduct(${index})">
                                    <i class="fa-regular fa-star"></i>
                                </button>
                            
                            </td>
                        </tr>`
        tableBody.innerHTML += tableRow;

    });

}
cargarProductos()

// renderizarTabla();

//****ADD EDIT PRODUCT*** */



async function addProduct(evt) {

    try {

        evt.preventDefault();
        const elements = evt.target.elements;
        const formFile = new FormData(evt.target)


        if (editIndex) { //el indice 0 sino lo toma falso, el 0 es undifaned (falso)
            const newProduct = {
                name: elements.name.value,
                description: elements.description.value,
                detail: elements.detail.value,
                price: elements.price.valueAsNumber,
                detail: elements.detail.value,
            };
            console.log(newProduct)
            const response = await axios.put(`${URL}/products/${editIndex}`,newProduct,{
                headers: {Authorization: token}});
            if (!response)
                showAlert("El producto no se pudo editar", "error")
            else
                showAlert("El producto se edito correctamente", "succes")
        } else {
            const response = await axios.post(`${URL}/product`, formFile);
            if (!response)
                showAlert("El producto no se pudo agregar", "error")
            else
                showAlert("El producto se agrego correctamenteo", "succes")


        }
        // console.log(productID1)
        cargarProductos()
        editIndex = undefined;

    } catch (error) {
        console.log(error)

    }
}





async function deleteProduct(id) {
    console.log(id)
    swal({
        title: `Borrar producto`,
        text: `Esta seguro que desea borrar el producto   `,
        icon: 'warning',
        buttons: {
            cancel: `Cancelar`,
            delete: `Borrar`
        }
    }).then(async function (value) {
        if (value === `delete`) {
            // ? LLAMADA AL BACKEND axios.delete
            try {
                const respuesta = await axios.delete(`${URL}/product/${id}`)
                cargarProductos()
            } catch (error) {
                console.log(error)
            }
            swal({
                title: `Elemento borrado correctamente`,
                icon: 'error'
            })
            renderizarTabla();
        }
    })


}




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
// const { data } = await axios.post(`${URL}/product`, formFile);
// console.log(data)

//-----------PRECARGO EL PRODUCTO EN EL FORMULARIO------------//
async function editProduct1(idx) {
    try {
        // console.log(idx)

        submitBtn.classList.add("edit-btn");
        submitBtn.innerText = "Modificar Producto";
        response = await axios.get(`${URL}/product/${idx}`,{
            headers: {
                Authorization: token
            }
           });
        // console.log(indice.data.product)
        const productoElegido = response.data.product;
        // console.log(productoElegido)
        const el = productForm2.elements;
        
        el.description.value = productoElegido.description;
        el.name.value = productoElegido.name;
        el.price.value = productoElegido.price;
        el.detail.value = productoElegido.detail;


        editIndex = idx;
        console.log(editIndex)


    } catch (error) {
        console.log(error);

    }
}



const actualBtn = document.getElementById('actual-btn');

const fileChosen = document.getElementById('file-chosen');

actualBtn.addEventListener('change', function () {
    fileChosen.textContent = this.files[0].name
})