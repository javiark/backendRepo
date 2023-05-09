const express = require(`express`);
const app = express();



app.get("/", (request, response) => {
    response.send({
        msg: `Bienvenidos a mi servidor express`,
        ok: true
    })
});

app.get("/products", (req,res)=>{
    res.status(200).send(`Productos solicitados correctamente`);
})

module.exports = app;