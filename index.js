const express = require("express");

const app = express();
const port = 6000;

app.get("/", (request, response)=>{
    response.send({
        msg:"bienvenido a mi servidor expresso",
        on:true

    })
})

app.listen(port, ()=>{
    console.log(`servidor funcionando en puerto ${port}`)
})
