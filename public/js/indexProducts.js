// let products2 = [];
const token1 = localStorage.getItem('token');
const cardContainer = document.getElementById("card-container");

const URL3 = 'http://localhost:4000/api';
const URL_public3 = 'http://localhost:4000';


async function cargarProductos1() {
    try {
        const respuesta = await axios.get(`${URL3}/products`);
        products = respuesta.data.productos
        // console.log(products)
        renderizarProductos(products)

    } catch (error) {
        console.log(error);
    }
}
cargarProductos1()


function renderizarProductos(products) {

    cardContainer.innerHTML = ``;

    products.forEach((product, index) => { //index la posicion
        let imageSrc = product.image ? `${URL_public3}/upload/product/${product.image}` : '/assets/images/no-product.png';

        const card = document.createElement("article");

        card.classList.add("card")

        card.innerHTML = `<div class="card__header">
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
    <div class="card__footerCard"  >
        
        <button class="card__btn-buy"  onclick="addToOrder('${product._id}')")>
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
// renderizarProductos(productsLocal);






const button22 = document.querySelectorAll(".card__btn-buy1")
const button33 = document.querySelectorAll(".card__btn")
const button44 = document.querySelectorAll(".containerDetail__btn-add")
const button55 = document.querySelectorAll(".containerDetail__btn-buy")
const button66 = document.querySelectorAll(".containerDetail__containerBtn")
// const button7 = document.getElementById("idButton")
// console.log(button22)





if (currentUser) {
    button22.forEach((parametro) => {
        pam = parametro.classList.add("enable");
        console.log(pam)
    });
    button33.forEach((parametro) => {
        pam = parametro.classList.add("enable");
        // console.log(pam)
    });
    button44.forEach((parametro) => {
        pam = parametro.classList.add("enable2");
        console.log(pam)
    });
    button55.forEach((parametro) => {
        pam = parametro.classList.add("enable2");
        console.log(pam)
    });
    button66.forEach((parametro) => {
        pam = parametro.classList.add("enable2");
        console.log(pam)
    });

}



