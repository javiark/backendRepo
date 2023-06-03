// let productos =JSON.parse(localStorage.getItem('products')) || [];
// console.log(productos)
// let productos = [];
const URL4 = 'http://localhost:4000/api';
const URL_public4 = 'http://localhost:4000';


async function cargarProductosFilter() {
    try {
        const respuesta = await axios.get(`${URL4}/products`);
        products = respuesta.data.productos
        // metodoFilter(products)
        // renderizarProductos(products)
        // console.log(products)

      

    } catch (error) {
        console.log(error);
    }
}
cargarProductosFilter()

async function cargaOrdenes() {
    try {
        const respuesta = await axios.get(`${URL4}/getOrders`);
        ordersArray = respuesta.data.orders
        // metodoFilter(products)
        // renderizarProductos(products)
        console.log(ordersArray)

      

    } catch (error) {
        console.log(error);
    }
}
cargaOrdenes()








//-------------BUSCARLO CON ENTER---------------//

function metodoFilter(evt){
        //frenando la busqueda si la tecla no es la que tiene codigo 13 ( enter )
    if(evt.keyCode !== 13){
        console.log("no apreto enter");
        return;
    }
    const text=evt.target.value.toLowerCase().trim();
    // console.dir(text)

    const productosFiltrado =products.filter((prod)=>{
        
        // console.log(`el usuario filtrado es ${prod}`)

        const filtra = prod.name.includes(text);

        return filtra;

})
    console.log("producto filtrados", productosFiltrado)
    if (productosFiltrado.length>0){
        document.getElementById("productsCount").innerHTML=(`Se encontraron ${productosFiltrado.length} productos`);
    }else{
        document.getElementById("productsCount").innerHTML=(`No se han encontrado productos`)
    }
    renderizarProductos(productosFiltrado)
};

//-------------BUSCARLO POR BOTON----------------//

function searchProduct(evt){
    if(evt.keyCode !==13 && evt.target.id !== 'productId'){
        return
    }
    const foundProduct=document.getElementById('searchProductBtn').value.toLowerCase()
    let resultFind = products.filter((el)=>{
        return el.name.toLowerCase().includes(foundProduct)       
    })
    if (resultFind.length>0){
        document.getElementById("productsCount").innerHTML=(`Se encontraron ${resultFind.length} productos`);
    }else{
        document.getElementById("productsCount").innerHTML=(`No se han encontrado productos`)
    }

    renderizarProductos(resultFind)
}

//-------------BUSCARLO POR ORDENES----------------//

function searchProduct(evt){
    if(evt.keyCode !==13 && evt.target.id !== 'productId'){
        return
    }
    const foundOrder=document.getElementById('searchProductBtnOrder').value.toLowerCase()
    let resultFind = products.filter((el)=>{
        return el.name.toLowerCase().includes(foundProduct)       
    })
    if (resultFind.length>0){
        document.getElementById("productsCount").innerHTML=(`Se encontraron ${resultFind.length} productos`);
    }else{
        document.getElementById("productsCount").innerHTML=(`No se han encontrado productos`)
    }

    renderizarProductos(resultFind)
}




