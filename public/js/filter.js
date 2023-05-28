let productos =JSON.parse(localStorage.getItem('products')) || [];
// console.log(productos)

//-------------BUSCARLO CON ENTER---------------//

function metodoFilter(evt){
        //frenando la busqueda si la tecla no es la que tiene codigo 13 ( enter )
    if(evt.keyCode !== 13){
        console.log("no apreto enter");
        return;
    }
    const text=evt.target.value.toLowerCase().trim();
    // console.dir(text)

    const productosFiltrado =productos.filter((prod)=>{
        
        // console.log(`el usuario filtrado es ${prod}`)

        const filtra = prod.name.toLowerCase().includes(text);

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
    let resultFind = productos.filter((el)=>{
        return el.name.toLowerCase().includes(foundProduct)       
    })
    if (resultFind.length>0){
        document.getElementById("productsCount").innerHTML=(`Se encontraron ${resultFind.length} productos`);
    }else{
        document.getElementById("productsCount").innerHTML=(`No se han encontrado productos`)
    }

    renderizarProductos(resultFind)
}



