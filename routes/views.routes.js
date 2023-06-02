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
}); 

router.get("/location", (req, res) => {
    return res.render("location")
}); 

router.get("/order", (req, res) => {
    return res.render("order")
}); 

router.get("/product-detail", (req, res) => {
    return res.render("product-detail")
});

router.get("/register", (req, res) => {
    return res.render("register")
}); 

router.get("/about-us", (req, res) => {
    return res.render("about-us")
}); 

router.get("/admin-product", (req, res) => {
    return res.render("admin-product")
}); 

router.get("/admin-user", (req, res) => {
    return res.render("admin-user")
}); 

router.get("/admin-orders", (req, res) => {
    return res.render("admin-orders")
}); 

router.get("/login", (req, res) => {
    return res.render("login")
}); 


// para chequear si esta logueada o no la persona. Proteguemos la ruta
// router.get("/admin-product", (req, res)={return res.render("admi-product")})

module.exports = router;