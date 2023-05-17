require("dotenv").config();
const app = require("./app");


const port = process.env.PORT;
const DB_URL= process.env.MONGODB_CONNECTION;

const mongoose = require ("mongoose"); // llamo a la libreria mongoose

mongoose.connect(DB_URL)
    .then(()=>{ //cuando esto se conecte entonces se ejecuta la funcion
        console.log(`\x1b[35m Conexión a la DB satisfactoria \x1b[37m`); // si sale bien la conexion a datos. 

        //Poner en marcha mi servidor express
        app.listen(port, () => { // llamada asincrona
            console.log(`\x1b[36m Servidor funcionando en puerto ${port} \x1b[37m`);
        })
    })
        // console.log("Linea ejecutada");
        // setTimeout(()=>{
        //     console.log("time out")
        // },2000)


.catch((error)=>{ // nose ejecuta el then y se ejecuta el catch
         console.log(error) // muestra los errores
})



