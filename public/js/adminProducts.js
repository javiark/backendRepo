let products = [];
const token = localStorage.getItem('token');
const selectCategoryHTML = document.getElementById("category")
const productForm2=document.getElementById("add-product");
let productsCargados =JSON.parse(localStorage.getItem('products')) || [];

const URL = 'http://localhost:5000/api';
const URL_public = 'http://localhost:5000';

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
        products = respuesta.data.productos
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
const submitBtn = document.getElementById("submit-btn");


//1- Obtener el body de la tabla para poder modificarlo desde JS
const tableBody = document.querySelector('#table-body');

let editIndex;


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

//****ADD EDIT PRODUCT*** */



async function addProduct(evt) {

    try {
        evt.preventDefault();
        // console.dir(evt.target);
        const elements = evt.target.elements;

        // console.log(elements.stock.checked);
        // console.dir(elements.name);
        // console.dir(elements.price)
        const formFile = new FormData(evt.target);

        // TODO: remover Observar que tengo
        const obj = Object.fromEntries(formFile);
        console.log(obj);

        // la envio a axios en el metodo post
        const { data } = await axios.post(`${URL}/product`, formFile);
        console.log(data)
        cargarProductos();
        showAlert("Producto agregado correctamente", "succes")

    } catch (error) {
        console.log(error)
        showAlert("No se pudo agregar el producto", "error")
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


async function editProduct(idx) {
    console.log(idx)
    try {
        const respuesta = await axios.get(`${URL}/product/${idx}`)
        console.log(respuesta)


    } catch (error) {
        console.log(error);

    }




    // console.table(product);
    // const el=productForm.elements;
    // el.description.value = product.description;
    // el.name.value=product.name;
    // el.price.value=product.price;
    // el.image.value=product.image;
    // el.detail.value=product.detail;
    // el.stock.checked=product.stock;
    // // console.log("indice", idx)
    // // console.log("product:", product)
    // editIndex=idx;
}








// function deleteProduct(indice) {
//     products.splice(indice, 1);
//     localStorage.setItem("products",JSON.stringify(products))
//     showAlert("El producto se ha borrado", "succes")
//     renderizarTabla();



// }


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


async function editProduct1(idx) {
    try {     
        console.log   
        submitBtn.classList.add("edit-btn");
        submitBtn.innerText = "Modificar Producto";
        
        const indice = await axios.get(`${URL}/product/${idx}`)
        console.log(indice.data.product)

        let productoElegido =indice.data.product
        console.log(productoElegido)
        

        const el=productForm2.elements;
        el.description.value = productoElegido.description;
        el.name.value=productoElegido.name;
        el.price.value=productoElegido.price;
        // el.file.value=productoElegido.image;
        el.detail.value=productoElegido.detail;

        // console.log("indice", idx)
        // console.log("product:", product)
        editIndex=idx;
    

    

        
    
    
        // console.table(product);
        // const el=productForm2.elements;
        // el.description.value = product.description;
        // el.name.value=product.name;
        // el.price.value=product.price;
        // el.image.value=product.image;
        // el.detail.value=product.detail;
        // el.stock.checked=product.stock;
        // console.log("indice", idx)
        // console.log("product:", product)
        // editIndex=idx;
    } catch (error) {
        console.log(error);


    }
}

// async function editProduct1(idx) {
//     try {
//         submitBtn.classList.add("edit-btn");
//         submitBtn.innerText = "Modificar Producto"



//         let product = products[idx];
//         console.log("indice:", idx)
//         const respuesta1 = await axios.get(`${URL}/product/${idx}`)
//         console.log("product:", respuesta1)

//         const el = productForm2.elements;
//         console.log(el)
   
//         el.name1 = respuesta1.data.product.name;
//         el.description1 = respuesta1.data.product.description;
//         el.price1 = respuesta1.data.product.price;
//         el.image1 = respuesta1.data.product.image;
//         el.detail1 = respuesta1.data.product.detail;
        
//         let nameProd= el.name1;
//         let descriptionProd=el.description1;
//         let priceProd=el.price1;
//         let imageProd=el.image1;
//         let detail1Prod=el.detail1;

//         let productForm1 = {nameProd, descriptionProd, priceProd, imageProd, detail1Prod}
//         console.log(productForm1)
        


//         editIndex = idx;
//     } catch (error) {
//         console.log(error);


//     }
// }




function editProduct(idx) {
    submitBtn.classList.add("edit-btn");
    submitBtn.innerText = "Modificar Producto"

    console.log(products)

    let product = products[idx];
    console.log("indice:", idx)
    console.log("product:", product)



    // console.table(product);
    const el = productForm.elements;
    console.log(el.name.value)
    // el.description.value = product.description;
    el.name.value = product.name;
    el.price.value = product.price;
    // el.image.value=product.image;
    el.detail.value = product.detail;
    el.stock.checked = product.stock;
    // console.log("indice", idx)
    // console.log("product:", product)
    editIndex = idx;
}