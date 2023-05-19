// DEFINIR LAS RUTAS DE NUESTRAS VISTAS. EJ: PAGES, ROUTES. RUTAS QUE CARGAN UNA VISTA

const express = require("express")
const router = express.Router();
const viewsController = require("../controllers/views.controllers")

// La Definicion de todas las rutas y vistas y sus respectivos controladores

//ruta index
router.get("/", (req, res) =>
    res.render("index", {  title: "Index Template EJS" })) // devuelve la pagina index. Le puedo mandar variables

router.get("/contact", (req, res) => {

    return res.render("contact")

}); // devuelve la pagina index

// para chequear si esta logueada o no la persona. Proteguemos la ruta
// router.get("/admin-product", (req, res)={return res.render("admi-product")})

module.exports = router;