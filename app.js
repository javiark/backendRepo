const express = require("express");
const app = express();



app.get("/", (request, response)=>{
    response.send({
        msg:"bienvenido a mi servidor expresso",
        on:true

    })
});

app.get("/products", (req,res)=>{
    res.status(200).send(`Productos solicitados correctamente`);
})

module.exports = app;