const express = require("express");
const router = express.Router();
const categoryController=require("../controllers/category.controllers.js");

//Leer categorias
router.get("/category", categoryController.getCategories);

//Crear categoria
router.post("/category", categoryController.getCategories);

module.exports = router