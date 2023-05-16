const express = require("express")
const router = express.Router();
const userController=require("../controllers/user.controller")
const jwVerify=require("../middlewares/jwtVerify");
const isAdmin =require("../middlewares/isAdmin")

//GET-Leer usuario
router.get("/users", [jwVerify, isAdmin ],userController.getAllUser) // solo me deja obtenerlos si es admin

//GET-Leer usuario
router.get("/users/:id", jwVerify,userController.getUser)

//POST- Crear usuario
router.post("/users", userController.postUser);

// POST - Login
router.post("/login", userController.login)

//DELETE - Borrar usuario
router.delete("/users/:id", [jwVerify, isAdmin ], userController.deleteUser)

//PUT-Actualizar usuario
router.put("/users/:id", userController.updateUser)

router.patch("/users/:id/password", userController.updatePassword)


module.exports = router;