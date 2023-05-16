const Product = require("./../schemas/product.schema")
const { responseCreator } = require("../utils/utils")

async function getAllProducts (req, res)  {
    try {
        const itemLimit = 5; // cuantos elementos me muestra
        const itemsToSkip = itemLimit * (req.query.skip-1) || 0; // cuantos elementos voy a saltear         // item a saltear por limite de pagina = 5 * 0

            const productos = await Product.find()
                                            // .limit(itemLimit)// le pongo un limite cuanto quiero que me traiga
                                            // .skip(itemsToSkip) // le pongo un limite cuanto quiero que me saltee. Si quiero que me traiga a partir del 5, le pongo 5
            const total= await Product.countDocuments();

        if (!productos) return res.status(404).send({ msg: "No se encontraron productos" })

        return responseCreator(res, 200, "productos obtenidos correctamente", {productos, total})
    } catch (error) {
        console.log(error);
        return responseCreator(res, 500,"Error al encontrar los productos" )
    }

    // Product.find().then(function (productos) { //Find me devuelve los productos, busca de la coleccion productos, una vez que logre leerlos vamos a ejecutar una funcion. La funcion me devuelve los productos que hay obtenido. Esquema que armamos en mongoose product. Find lo busca en mongoatlas.
    //     return responseCreator(res, 200, `Productos obtenidos correctamente`, { productos })// devuelvo los productos. Viene un array de los productos
    // }).catch((error) => {
    //     console.log(error)
    // })
}

function addProduct(req, res) {

    // console.log("body")
    // console.log(req.body); // obtengo la info del metodo body, viene con POST nomas
    const product = new Product(req.body);
    // console.log(product)
    // console.log(product)
    product.save()

        .then(function (product) {// es una peticion ascincrona, tengo que esperar. El metodo save me devuelve el producto guardado.
            // if(!producto){
            //     console.log("no espero")
            //     return res.status(200).send(`Algo va a fallar`) // con return no se sigue leyendo lo de abajo
            // }
            // console.log("termino el guardado del producto")
            res.status(200).send({
                msg: "Producto guardado correctamente",
                product
            })

        })
        .catch(error => {
            console.log(error);
            res.status(500).send(" El producto no se pudo guardar")
        })
    //     console.log("no espero")
    // res.status(200).send(`Algo va a fallar`)

}


function deleteProduct(req, res) {
    const id = req.params.id;
    Product.findByIdAndDelete(id)
        .then((deleted) => {
            if (!deleted) {
                return res.status(404).send("No se encontro el producto a borrar")
            }
            return res.status(200).send({
                msg: "Producto borrado correctamente",
                deleted
            })
        })
        .catch(error => {
            console.log(error);
            return res.status(500).send({
                msg: "Error al borrar el producto",
            })
        })

}

function getProduct(req, res) {
    // console.log(req.query)
    const idParam = req.query.id;

    if (!idParam) {
        return res.status(400).send({
            msg: "Es necesario que mande un ID"
        })
    }
    Product.findById(idParam).then((product) => {
        //Dos casos posibles en una peticion correcta

        //a-El ide proporcionado no corresponde a ningun producto
        if (!product) {
            return res.status(404).send({
                msg: "No se encontro el producto"
            })
        }
        //b- Se encontro el producto
        return res.status(200).send({
            msg: "Producto encontrado!",
            product
        })
        //si el producto no tiene los caracteres adecuados
    }).catch((error) => {
        console.log(error);
        return res.status(500).send({
            msg: "Error al obtener producto"
        })
    })
}

async function updateProduct(req, res) {
    try {
        const id = req.query.id;
        if (id !== req.user._id) {
            return responseCreator(res, 401, "No puede modificar este usuario")
        }
        const data = req.body
        // return res.status(200).send(`Id obtenido por query param${id}`)

        const newProduct = await Product.findByIdAndUpdate(id, data, { new: true })  //espera el objeto nuevo. El data es lo que viene del body mandado desde el postman.  Con el await se espera. Peticion asincrona
        // console.log(newProduct)
        if (!newProduct) {
            return res.status(404).send({ // con el return se corta
                msg: "El producto no se actualizo"
            })
        }
        return res.status(200).send({
            msg: "Producto actualizado",
            newProduct: newProduct
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: " No se pudo actualizar el producto",
        })

    }


}
module.exports = {
    getAllProducts, // igual a getAllProduct : getAllProduct
    deleteProduct,
    addProduct,
    getProduct,
    updateProduct
}