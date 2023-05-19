const express = require("express");
const router = express.Router();
const categoryController=require("../controllers/category.controllers.js");// dos puntos es para volver para atras. El punto solo es para partir desde donde estas

//Leer categorias
router.get("/category", categoryController.getCategories);

//Crear categoria
router.post("/category", categoryController.createCategory);

module.exports = router