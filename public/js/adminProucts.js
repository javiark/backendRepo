let products = [];
const token = localStorage.getItem('token');
const selectCategoryHTML = document.getElementById("category")

const URL = 'http://localhost:5000/api';
const URL_public ='http://localhost:5000';

// (async function cargarCategorias() {
//     try {
//         const response = await axios.get(`${URL}/category`)
//         console.log(response) //los elementos estan en response.data.categories. 
//         console.log(response.data.categories)
//         const categories = response.data.categories;   
//     } catch (error) {
//         console.log(error);
//     }

// })()

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

// async function arrayCateories(){
//     const response = await axios.get(`${URL}/category`)
//     const categories = response.data.categories;
//     selectCategoryHTML.innerHTML=`<option value="" selected></option>`;
//     categories.forEach((cat)=>{
//         console.log(cat)
//         selectCategoryHTML.innerHTML += `<option value="${cat._id}">${cat.name}</option>`
//     })}
// arrayCateories()






console.log(products)


const productForm=document.getElementById("add-product");
const submitBtn = document.getElementById("submit-btn");


//1- Obtener el body de la tabla para poder modificarlo desde JS
const tableBody = document.querySelector('#table-body');

let editIndex;


//2- Definir una función para iterar el array
function renderizarTabla(products) {
    tableBody.innerHTML = '';
    if(products.length===0){
        tableBody.innerHTML="<p class='disabled'>NO SE ENCONTRARON PRODUCTOS</p>"
        return
    }
    //3- Iterar el array para acceder a cada producto

    products.forEach((producto, index) => {

        let imageSrc = producto.image ? `${URL_public}/upload/product/${producto.image}` : '/assets/images/no-product.png';
        //4- Introducir dentro del tbody una fila por producto con sus respectivas celdas
        const tableRow = `<tr class="product">
                            <td class="product__img-cell"><img class="product__img" src="${imageSrc}" alt="${producto.name}"></td>
                            <td class="product__name" onclick="editName(${index}")>${producto.name}</td>
                            <td class="product__desc">${producto.description}</td>
                            <td class="product__price">$ ${producto.price}</td>
                            <td class="product__desc">${producto.detail}</td>
                            <td class="product__actions">
                                <button class="product__action-btnDetail" onclick="deleteProduct(${index})">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                           
                                <button class="product__action-btn product__btn-edit"  onclick="editProduct(${index})">
                                    <i class="fa-solid fa-pencil " ></i>
                                </button>
                                <button class="product__action-btn btn-favorite ${producto.favorite===true ? 'active':''}" onclick="setFavoriteProduct(${index})">
                                    <i class="fa-regular fa-star"></i>
                                </button>
                            
                            </td>
                        </tr>`
        tableBody.innerHTML += tableRow;

    });

}

renderizarTabla();

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
        const { data} = await axios.post(`${URL}/product`, formFile);
        console.log(data)
        cargarProductos();
        showAlert("Producto agregado correctamente", "succes" )

    } catch (error) {
        console.log(error)
        showAlert("No se pudo agregar el producto", "error" )
    }
   

}











function deleteProduct(indice) {
    products.splice(indice, 1);
    localStorage.setItem("products",JSON.stringify(products))
    showAlert("El producto se ha borrado", "succes")
    renderizarTabla();



}



function editProduct(idx){
    submitBtn.classList.add("edit-btn");
    submitBtn.innerText = "Modificar Producto"

    let product = products[idx];
    console.log("indice:",idx)
    console.log("product:",product)
    


    // console.table(product);
    const el=productForm.elements;
    el.description.value = product.description;
    el.name.value=product.name;
    el.price.value=product.price;
    el.image.value=product.image;
    el.detail.value=product.detail;
    el.stock.checked=product.stock;
    // console.log("indice", idx)
    // console.log("product:", product)
    editIndex=idx;
}