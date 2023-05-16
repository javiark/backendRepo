const express = require(`express`);
const app = express();
const productRoutes=require("./routes/product.routes")
const userRoutes = require("./routes/user.routes")
const orderRoutes=require("./routes/orders.routes")
const cors = require ("cors");

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


//Definir rutas a usar por mi app express
app.use("/api",[productRoutes,userRoutes, orderRoutes])



module.exports = app;
//Definir rutas a usar por mi app express