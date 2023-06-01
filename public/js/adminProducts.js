let products = [];
const token = localStorage.getItem('token');

const selectCategoryHTML = document.getElementById("category")
const productForm2 = document.getElementById("add-product");
const inputImg=document.getElementById("uploadImageInput");

let productsCargados = JSON.parse(localStorage.getItem('products')) || [];
let nombreImagen = document.getElementById("imgLabel")
let productID1 = JSON.parse(localStorage.getItem('products')) ;
let editIndex;
// console.log(editIndex)

const URL = 'http://localhost:4000/api';
const URL_public = 'http://localhost:4000';

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

        products = respuesta.data.productos
        // console.log(products)
        // localStorage.setItem("products", JSON.stringify(products))

        // console.log(products)
        renderizarTabla(products)

    } catch (error) {
        console.log(error);

    }


}
cargarProductos()


// async function arrayCateories(){
//     const response = await axios.get(`${URL}/category`)
//     const categories = response.data.categories;
//     selectCategoryHTML.innerHTML=`<option value="" selected></option>`;
//     categories.forEach((cat)=>{
//         console.log(cat)
//         selectCategoryHTML.innerHTML += `<option value="${cat._id}">${cat.name}</option>`
//     })}
// arrayCateories()



// console.log(products)


const productForm = document.getElementById("add-product");
const submitBtn1 = document.getElementById("submit-btn");


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

                            
                            </td>
                        </tr>`
        tableBody.innerHTML += tableRow;

    });

}

cargarProductos();

//****ADD EDIT PRODUCT*** */




    // ** VAMOS A MANDAR ESTE OBJETO AL BACKEND AL ENDPOINT DE HACER EL PUT, UNA VEZ RESUELTO EL LLAMADO (AWAIT), VUELVEN A PEDIR LOS PRODUCTOS.
    // ** DESPUES LLAMO A LA FUNCION CARGARPRODUCTOS. LO MANDO A LA BASE DE DATOS Y DESPUES HAGO UNA PETICION A AXIOS AL EDPOINT QUE ME DEVUELVE LOS PRODUCTOS Y COMO HAY UNO QUE SE ACTUALIZO, VAN A VENIR TODOS Y UNO SE ACTUALIZO

async function addProduct(evt){
    try {
        evt.preventDefault();
        const elements = evt.target.elements;
        const formFile = new FormData(evt.target);
        console.log(editIndex) // si cargo un producto  de 0 es undefined, si cargo un producto precargado me trae el ID
        // const idProd = editIndex;
        // console.log(idProd)

        if (editIndex) { // es para cuando el producto es nuevo. 0 es undefined
            const productUpdate = {
                name: elements.name.value,
                description: elements.description.value,
                // image: elements.image.value,
                detail:elements.detail.value,
                price: elements.price.value,
            }
            // console.log( productUpdate)
            const res = await axios.put(`${URL}/product/${editIndex}`,productUpdate,{
            headers: {Authorization: token}
        });
            // console.log(res)
            if(!res)
            swal ({
                title:"El producto no pudo ser editado",
                icon: 'error',
            })  
            else      
            swal ({
                title:"el producto se edito correctamente",
                icon: 'success',
            })
        }else {
            const res = await axios.post(`${URL}/product`,formFile,{
            headers: { Authorization: token } });
            if(!res)
            swal ({
                title:"El producto no pudo ser añadido",
                icon: 'error',
            })  
            else      
            swal ({
                title:"Produdcto añadido correctamente",
                icon: 'success',
            })  
        }

    editIndex = undefined;
    submitBtn1.classList.remove('edit-btn');
    submitBtn1.innerText = 'Cargar Producto'

    cargarProductos();
    cleanTable();
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
                const respuesta = await axios.delete(`${URL}/product/${id}`,{
                    headers: { Authorization: token } });
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
    console.log(idx)
    try {


        submitBtn1.classList.add("edit-btn");
        submitBtn1.innerText = "Modificar Producto";
        const indice = await axios.get(`${URL}/product/${idx}`)
        // console.log(indice.data.product)
        let productoElegido = indice.data.product
        // console.log(productoElegido)

        const el = productForm2.elements;  
        el.description.value = productoElegido.description;
        el.name.value = productoElegido.name;
        el.price.value = productoElegido.price;
        inputImg.style.display="none";
        el.detail.value = productoElegido.detail;
        

        editIndex = idx; // id del producto
        // console.log(editIndex)
        const productoEditar = await axios.get(`${URL}/product/${editIndex}`)
        // console.log(productoEditar)

    } catch (error) {
        console.log(error);

    }
}

function cleanTable(){
    const el = productForm.elements;
    el.name.value = '';
    el.detail.value = '';
    el.description.value = '';
    el.price.value = '';

   
  }




