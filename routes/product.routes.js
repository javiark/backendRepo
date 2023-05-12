const express=require("express");
const router=express.Router();
const productController = require("./../controllers/product.controller");

//Obtener todos los productos


router.get("/products", productController.getAllProducts) // cuando se llame esa ruta, vas a ejecutar dentro de product controller la funcion get all products. Con get solcitio informacion al servidor

// Obtener un producto especifico 
router.get("/product/:id", productController.getProduct) // nose si va sin :id. Chequear

//Añadir producto
router.post("/product", productController.addProduct)

// router.get("/product/:idParam/:name?", productController.deleteProduct) // con ? le digo que es opcional. name seria opcional, hay que mantener el orden

//Eliminar producto
router.delete("/product", productController.deleteProduct) // llamo a delete en postman. nombreDeParam seria el id del producto a borrar
//Modificar producto
router.put("/product", productController.updateProduct)



module.exports=router;