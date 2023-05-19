require("dotenv").config();
const app = require("./app");


const port = process.env.PORT;
const DB_URL= process.env.MONGODB_CONNECTION;

const mongoose = require ("mongoose"); // llamo a la libreria mongoose

mongoose.connect(DB_URL)
    .then(()=>{ //cuando esto se conecte entonces se ejecuta la funcion
        
        console.log(`\x1b[93m Conexión a la DB correcta!!! \x1b[37m`);
        app.listen(port, ()=> {
            console.log(`\x1b[95m Servidor express escuchando en el puerto ${port} \x1b[37m`)
        })
    })
        // console.log("Linea ejecutada");
        // setTimeout(()=>{
        //     console.log("time out")
        // },2000)


.catch((error)=>{ // nose ejecuta el then y se ejecuta el catch
         console.log(error) // muestra los errores
})



