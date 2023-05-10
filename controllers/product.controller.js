const Product=require("./../schemas/product.schema")
const getAllProducts = (req,res)=>{

    Product.find().then(function(productos){ //Find me devuelve los productos, busca de la coleccion productos, una vez que logre leerlos vamos a ejecutar una funcion. La funcion me devuelve los productos que hay obtenido. Esquema que armamos en mongoose product. Find lo busca en mongoatlas.
        res.status(200).send({
            msg: `Productos obtenidos correctamente`,
            productos: productos // devuelvo los productos. Viene un array de los productos
        });
    }).catch((error)=>{
        console.log(error)
    })
}

function addProduct(req,res){
    // console.log("body")
    // console.log(req.body); // obtengo la info del metodo body, viene con POST nomas
    const product = new Product(req.body);
    // console.log(product)
    product.save().then(function(product){// es una peticion ascincrona, tengo que esperar. El metodo save me devuelve el producto guardado.

    }).catch (error=>{
        console.log(error);
        res.status(500).send("El producto no se pudo guardar")
    })
    res.status(200).send("Añadir producto")

}

function deleteProduct(req, res){
    res.status(200).send("Producto borrado correctamente!!!")
}




module.exports={
    getAllProducts, // igual a getAllProduct : getAllProduct
    deleteProduct,
    addProduct
}