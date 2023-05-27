const Product = require("../schemas/product.schema")
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
}


//-------------------
async function addProduct(req, res) {
    console.log(req.body);
    console.log(req.file);
   // lo asigno yo al generar el nombre de la imagen uuid


    try {
        const product = new Product(req.body);
        // product.image=req.image;

        await product.save();
    
        return res.status(200).send({
            ok: true,
            msg: `Producto agregado correctamente`,
            product
        })
        
    } catch (error) {
        return res.status(500).send({
            ok: false,
            msg: `No se agregó el producto`,
            error
        })
    }
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

async function getProduct(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        return res.status(200).send({
            msg: `Producto encontrado`,
            ok: true,
            product
        });
    } catch (error) {
    console.log(error);
     return responseCreator(res, 400, `Error al obtener productos` )
    }
}

//Acordarse de llamar con queryparams. Mandarlo por Body raw y Jason

async function updateProduct(req, res) {
    try {
        const id =  req.params.id;
        const data = req.body
        console.log(data)
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
    getAllProducts, 
    deleteProduct,
    addProduct,
    getProduct,
    updateProduct
}
