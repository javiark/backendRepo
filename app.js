const express = require(`express`);
const app = express();
//Rutas de las vistas
const viewsRoutes=require("./routes/views.routes")
const productRoutes=require("./routes/product.routes")
const userRoutes = require("./routes/user.routes")
const orderRoutes=require("./routes/orders.routes")
const categoryRoutes=require("./routes/category.routes")
const upload_routes = require('./routes/upload.routes');
const cors = require ("cors");

//Cargar configuracion de plantillas de Javascript
app.set("view engine", "ejs");
app.use(express.static("public"));
//middlewares
app.use(express.json());
// app.use(express.urlencoded({ extended:true}))
//Evitar CORS error
app.use(cors());

// app.get("/", (request, response) => {
//     response.send({
//         msg: `Bienvenidos a mi servidor express`,
//         ok: true
//     })
// });

//que las vistas no llamen a api
app.use(viewsRoutes)

//Definir rutas a usar por mi app express
app.use("/api",[
                productRoutes,
                userRoutes, 
                orderRoutes,
                categoryRoutes,
                upload_routes
            ])



module.exports = app;
//Definir rutas a usar por mi app express