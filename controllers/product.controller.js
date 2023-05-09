const Product=require("./../schemas/product.schema")
const getAllProducts = (req,res)=>{

    Product.find().then(function(productos){ //Find me devuelve los productos, busca de la coleccion productos, una vez que logre leerlos vamos a ejecutar una funcion. La funcion me devuelve los productos que hay obtenido
        res.status(200).send({
            msg: `Productos obtenidos correctamente`,
            productos: productos // devuelvo los productos
        });
    })


}

function deleteProduct(req, res){
    res.status(200).send("Producto borrado correctamente!!!")

}


module.exports={
    getAllProducts, // igual a getAllProduct : getAllProduct
    deleteProduct
}