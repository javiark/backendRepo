const express=require("express");
const router=express.Router();
const productController = require("./../controllers/product.controller");

//Obtener todos los productos

router.get("/products", productController.getAllProducts) // cuando se llame esa ruta, vas a ejecutar dentro de product controller la funcion get all products. Con get solcitio informacion al servidor

// Obtener un producto especifico (por cate)
//Añadir producto

//Eliminar producto
router.delete("/products", productController.deleteProduct) // llamo a delete en postman
//Modificar producto

module.exports=router;