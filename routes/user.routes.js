const express = require("express")
const router = express.Router();
const userController=require("../controllers/user.controller")

//POST- Crear usuario
router.post("/user", userController.postUser);
//GET-Leer usuario
router.get("/user/:id", userController.getUser)
//GET-Leer usuario
router.get("/users", userController.getAllUser)



//DELETE - Borrar usuario
//PUT-Actualizar usuario

module.exports = router;