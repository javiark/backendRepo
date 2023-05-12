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
    console.log(product)
    // console.log(product)
                product.save()

                    .then(function(product){// es una peticion ascincrona, tengo que esperar. El metodo save me devuelve el producto guardado.
                        // if(!producto){
                        //     console.log("no espero")
                        //     return res.status(200).send(`Algo va a fallar`) // con return no se sigue leyendo lo de abajo
                        // }
                        // console.log("termino el guardado del producto")
                        res.status(200).send({
                            msg:"Producto guardado correctamente",
                            product
                        })

        })
        .catch (error=>{
            console.log(error);
            res.status(500).send(" El producto no se pudo guardar")
        })
    //     console.log("no espero")
    // res.status(200).send(`Algo va a fallar`)

}

function deleteProduct(req, res){
    const id = req.params.id;
    Product.findByIdAndDelete(id)
        .then((deleted)=>{
            if(!deleted){
                return res.status(404).send("No se encontro el producto a borrar")
            }
            return res.status(200).send({
                msg:"Producto borrado correctamente",
                deleted
            })
        })
        .catch(error=>{
            console.log(error);
            return res.status(500).send({
                msg:"Error al borrar el producto",
            })
        })

}

function getProduct(req, res){
    // console.log(req.query)
    const idParam= req.query.id; // con query param puedo mandar lo que quiero, en el orden que quiero

    if(!idParam){
        return res.status(400).send ({
              msg:"Es necesario que mande un ID"
         })
    }   
    Product.findById(idParam).then((product)=>{
        //Dos casos posibles en una peticion correcta

            //a-El ide proporcionado no corresponde a ningun producto
            if(!product){
                return res.status(404).send({
                    msg:"No se encontro el producto"
                })
            }
            //b- Se encontro el producto
            return res.status(200).send({
                msg:"Producto encontrado!",
                product
            })
                //si el producto no tiene los caracteres adecuados
    }).catch((error)=>{
        console.log(error);
        return res.status(500).send({
            msg:"Error al obtener producto"
        })
    })
}

module.exports={
    getAllProducts, // igual a getAllProduct : getAllProduct
    deleteProduct,
    addProduct,
    getProduct
}