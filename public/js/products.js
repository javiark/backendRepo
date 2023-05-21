let products =JSON.parse(localStorage.getItem('products')) || [];
let favorites = [];
let favoritesStar=JSON.parse(localStorage.getItem('favorites')) ;

console.log(products)


const productForm=document.getElementById("add-product");
const submitBtn = document.getElementById("submit-btn");


//1- Obtener el body de la tabla para poder modificarlo desde JS
const tableBody = document.querySelector('#table-body');

let editIndex;


//2- Definir una función para iterar el array
function renderizarTabla() {
    tableBody.innerHTML = '';
    if(products.length===0){
        tableBody.innerHTML="<p class='disabled'>NO SE ENCONTRARON PRODUCTOS</p>"
        return
    }
    //3- Iterar el array para acceder a cada producto
    products.forEach((producto, index) => {


        let imageSrc = producto.image ? producto.image : '/assets/images/no-product.png';
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

function addProduct(evt) {
    evt.preventDefault();
    console.dir(evt.target);
    const elements = evt.target.elements;

    const newProduct = {
        name: elements.name.value,
        description: elements.description.value,
        price: elements.price.valueAsNumber,
        image: elements.image.value,
        detail:elements.detail.value,
        stock: elements.stock.checked,
    };




    if (editIndex >= 0) { //el indice 0 sino lo toma falso, el 0 es undifaned (falso)
        products[editIndex]=newProduct
        // alert("se edito correctamente")
        showAlert("El producto se edito correctamente", "succes")
    } else {
        products.push(newProduct);
        showAlert("El producto se agrego correctamente", "succes")

    }
    console.log(products)
  

    //Guardarlo en el localStorage
    localStorage.setItem('products', JSON.stringify(products))
                        //(nombreKey, dataValue)

    editIndex=undefined; // para que se vacie
    submitBtn.classList.remove("edit-btn");
    submitBtn.innerText = "Cargar Producto"
    // showAlert("El producto se edito correctamente", "succes")
 
    renderizarTabla();

    evt.target.reset()
    elements.name.focus();
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

// function setFavoriteProduct(index) {
//     //Checkear si en el array productos hay algun producto cuyo indice sea distinto al elegido con la propiedad favorite: true tenemos que setearla en falso.
//     // Setear el producto elegido como favorite: true


//     products.forEach((prod,idx)=>{
//         console.log(products)
//         if(index===idx) prod.favorite = true;
//         else prod.favorite = false;
//     });

//     //--------------------------------------------------------
//     // const favCount = 0;
//     // const prodFiltradosFavoritos= products.forEach(prod => {
//     //     if(prod.favorite) {
//     //         favCount++
//     //     }
//     // })

//     // //     if (favCount >= 3){
//     // //     favorites.shift();
//     // // }
//     // // favorites.push(index)
//     // //---------------------------------------------
//     // //otra forma
//     // prodFiltradosFavoritos.length >=3

//     // console.log(index)

//     // if (favorite.length >= 3){
//     //     favorite.shift();
//     // }
//     // const count2=0;
//     // products.forEach(products => {
//     //     count2 += parseInt(products.quantity)
//     //     })
//     favorites.push(products[index])
//     if (favoritesStar.length >= 2){


//     localStorage.setItem("favorites", JSON.stringify(favorites))
//     renderizarTabla();
// }
// }




// function deleteProduct(indice) {
//     swal({
//         title: "Borrar producto",
//         text: `Esta seguro que desea borrar el producto ${products[indice].name}`,
//         icon: `warning`,
//         buttons: {
//             cancel:"Cancelar",
//             delete:"Borrar",
//         }
//     }).then(value => {
//         if (value==="delete"){
//             products.splice(indice, 1);
//             localStorage.setItem("products",JSON.stringify(products))
//             swal({
//                 title:"Elemento borrado correctamente",
//                 icon:"error"
        
//             });
//             renderizarTabla(); 

//         }else {
//             return ; //return null
//         }
//     })


// }





