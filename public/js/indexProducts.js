let products = [];
const token = localStorage.getItem('token');
const selectCategoryHTML = document.getElementById("category")
const boton = document.getElementById("boton1")
const cardContainer=document.getElementById("card-container");
const productsLS = JSON.parse(localStorage.getItem("orderArrayFinal")) || [];
const productsLocal = JSON.parse(localStorage.getItem("products")) || [];

const URL = 'http://localhost:4000/api';
const URL_public ='http://localhost:4000';

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

// async function cargarProductos() {
//     try {
//         const respuesta = await axios.get(`${URL}/products`);
//         // Products = data.products;
//         // console.log(respuesta.data.productos.name)
//         products=respuesta.data.productos;
//         console.log(products)
//         renderizarProductos(products)
//     } catch (error) {
//         console.log(error);

//     }

// }

// cargarProductos()


function renderizarProductos(products){

    cardContainer.innerHTML=``;

    products.forEach((product, index)=>{ //index la posicion
        let imageSrc = product.image ? `${URL_public}/upload/product/${product.image}` : '/assets/images/no-product.png';

        const card= document.createElement("article");

        card.classList.add("card")

        card.innerHTML=`<div class="card__header">
        <img src="${imageSrc}" alt="${product.name}" class="card__img">
    </div>
    <div class="card__body">
        <div class="card__title">
        ${product.name}
        </div>
        <div class="card__description">
        ${product.description}
           
        </div>
        <div class="card__info">
            <div class="card__date">
            ${fecha}
            </div>
            <div class="card__price">
            $ ${product.price}
            </div>
        </div>
    </div>
    <div class="card__footerCard" onclick="showNotUser()" >
        
        <button class="card__btn-buy1"  onclick="addToOrder(${index}) " id=${index}>
            Comprar
        </button>

        <div class="card__btn-container">
            <a class="card__btn" href="/product-detail?id=${product._id}" >
                Ver mas
            </a>
        </div>
    </div>`
    cardContainer.appendChild(card);
    })

}
renderizarProductos(productsLocal);