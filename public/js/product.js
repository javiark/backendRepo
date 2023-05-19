

let products = [];
const token = localStorage.getItem('token');
const selectCategoryHTML = document.getElementById("category")

const URL = 'http://localhost:5000/api';
const URL_public ='http://localhost:5000';

(async function cargarCategorias() {
    try {
        const response = await axios.get(`${URL}/category`)
        console.log(response) //los elementos estan en response.data.categories. 
        console.log(response.data.categories)
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
        products=respuesta.data.productos
        renderizarTabla(products)
    } catch (error) {
        console.log(error);

    }

}

cargarProductos()


async function arrayCateories(){
    const response = await axios.get(`${URL}/category`)
    const categories = response.data.categories;
    selectCategoryHTML.innerHTML=`<option value="" selected></option>`;
    categories.forEach((cat)=>{
        console.log(cat)
        selectCategoryHTML.innerHTML += `<option value="${cat._id}">${cat.name}</option>`
    })}
arrayCateories()


let favorites = [];

// const editButtons = document.querySelectorAll(".btn-edit");

// productForm.addEventListener("click", ()=> {
// console.log(" se hizo click en el formulario") })
// swal({
//     title: localStorage.getItem("Products")
// })

const productForm = document.getElementById("add-product");
const submitBtn = document.getElementById("submit-btn");


//1- Obtener el body de la tabla para poder modificarlo desde JS
const tableBody = document.querySelector('#table-body');

let editIndex;


//2- Definir una función para iterar el array
function renderizarTabla(arrayProductos) {
    console.log(arrayProductos.length)
    tableBody.innerHTML = '';
    if (arrayProductos.length === 0) {
        tableBody.innerHTML = "<p class='disabled'>NO SE ENCONTRARON PRODUCTOS</p>"
        return
    }
    //3- Iterar el array para acceder a cada producto
    arrayProductos.forEach((producto, index) => {
        // let imageSrc = '/assets/images/no-product.png';

        // if(producto.image) {
        //     imageSrc = producto.image;
        // }

        // si hay product.image buscamos en upload/product la imagen, sino ponemos la imagen no product.png
        let imageSrc = producto.image ? `${URL_public}/upload/product/${producto.image}` : '/assets/images/no-product.png';
        //4- Introducir dentro del tbody una fila por producto con sus respectivas celdas
        // "${product.image ? URL+`/`+product.image}" pregunta si tiene esa imagen la renderiza, sino pinta con la imagen no-product.png
        // para borrar toma espera el id del producto ${producto._id}
        // va con dos comillas pq no se interpreta como un numer 
        const tableRow = `<tr class="product">
                            <td class="product__img-cell"><img class="product__img" 
                            src="${imageSrc}" 
                            alt="${producto.name}">
                            </td>
                            <td class="product__name" onclick="editName(${index}")>${producto.name}</td>
                            <td class="product__desc">${producto.description}</td>
                            <td class="product__price">$ ${producto.price}</td>
                            <td class="product__info">
                                <span 
                                    class="
                                            product__info-icon 
                                            ${producto.stock ? '' : 'disabled'}
                                    "
                                > 
                                  📦
                                </span>
                                <span class="product__info-icon  ${producto.joystick ? '' : 'disabled'}">
                                    🎮
                                </span>
                            </td>
                            <td class="product__actions">
                                <button class="product__action-btn" onclick="deleteProduct('${producto._id}')"> 
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                           
                                <button class="product__action-btn btn-edit"  onclick="editProduct(${index})">
                                    <i class="fa-solid fa-pencil"></i>
                                </button>
                                <button class="product__action-btn btn-favorite ${producto.favorite === true ? 'active' : ''}" onclick="setFavoriteProduct(${index})">
                                    <i class="fa-regular fa-star"></i>
                                </button>
                            
                            </td>
                        </tr>`
        tableBody.innerHTML += tableRow;

    });

}

renderizarTabla();

//****ADD EDIT PRODUCT*** */

// async function addProduct(evt) {

//     try {
//         evt.preventDefault();
//         console.dir(evt.target);
//         const elements = evt.target.elements;

//         // console.log(elements.stock.checked);
//         // console.dir(elements.name);
//         // console.dir(elements.price)
//         const formFile = new FormData(evt.target);

//         // TODO: remover Observar que tengo
//         const obj = Object.fromEntries(formFile);
//         console.log(obj);

//         // la envio a axios en el metodo post
//         const { data} = await axios.post(`${URL}/product`, formFile, {
//             headers: {
//                 Authorization: token
//             }
//         });
//         console.log(data)
//         cargarProductos();

//     } catch (error) {
//         console.log(error)
//     }
   

// }

async function addProduct(evt) {

    try {
        evt.preventDefault();
        console.dir(evt.target);
        const elements = evt.target.elements;

        // console.log(elements.stock.checked);
        // console.dir(elements.name);
        // console.dir(elements.price)
        const formFile = new FormData(evt.target);

        // TODO: remover Observar que tengo
        const obj = Object.fromEntries(formFile);
        console.log(obj);

        // la envio a axios en el metodo post
        const { data} = await axios.post(`${URL}/product`, formFile);
        console.log(data)
        cargarProductos();

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
    }).then(async function(value) {
        if(value === `delete`) {
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


function editProduct(idx) {
    submitBtn.classList.add("edit-btn");
    submitBtn.innerText = "Modificar Prodcuto"

    let product = products[idx];


    // console.table(product);
    const el = productForm.elements;
    el.description.value = product.description;
    el.name.value = product.name;
    el.price.value = product.price;
    el.image.value = product.image;
    el.stock.checked = product.stock;
    el.joystick.checked = product.joystick;
    // console.log("indice", idx)
    // console.log("product:", product)
    editIndex = idx;

    // ** VAMOS A MANDAR ESTE OBJETO AL BACKEND AL ENDPOINT DE HACER EL PUT, UNA VEZ RESUELTO EL LLAMADO (AWAIT), VUELVEN A PEDIR LOS PRODUCTOS.
    // ** DESPUES LLAMO A LA FUNCION CARGARPRODUCTOS. LO MANDO A LA BASE DE DATOS Y DESPUES HAGO UNA PETICION A AXIOS AL EDPOINT QUE ME DEVUELVE LOS PRODUCTOS Y COMO HAY UNO QUE SE ACTUALIZO, VAN A VENIR TODOS Y UNO SE ACTUALIZO
}

function setFavoriteProduct(index) {
    //Checkear si en el array productos hay algun producto cuyo indice sea distinto al elegido con la propiedad favorite: true tenemos que setearla en falso.
    // Setear el producto elegido como favorite: true
    products.forEach((prod, idx) => {
        if (index === idx) prod.favorite = true;
        else prod.favorite = false;
    });

    localStorage.setItem("favorites", JSON.stringify(favorites))
    renderizarTabla();
}












// product
//     name
//     description
//     price
//     imagen
//     stock?
//     joystick?
//     games?