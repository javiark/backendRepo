const express = require(`express`);
const app = express();
const productRoutes=require("./routes/product.routes")
const userRoutes = require("./routes/user.routes")

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended:true}))

app.get("/", (request, response) => {
    response.send({
        msg: `Bienvenidos a mi servidor express`,
        ok: true
    })
});

//Definir rutas a usar por mi app express
app.use([
    productRoutes,
    userRoutes

])



module.exports = app;