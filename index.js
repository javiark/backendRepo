const app = require("./app")
const port = 5000;
const dbURL = `mongodb+srv://javier778:javiark778@javiark.qbwamon.mongodb.net/?retryWrites=true&w=majority` // me conecto a mongodv
const mongoose = require ("mongoose"); // llamo a la libreria mongoose

mongoose.connect(dbURL)
    .then(function(){ //cuando esto se conecte entonces se ejecuta la funcion
         console.log(`Conexion a la DB satisfactoria`) // si sale bien la conexion a datos. 

        //Poner en marcha mi servidor express
         app.listen(port, ()=>{ // llamada asincrona, demora mas de lo normal
            console.log(`servidor funcionando en puerto ${port}`)
        });
        // console.log("Linea ejecutada");
        // setTimeout(()=>{
        //     console.log("time out")
        // },2000)


}).catch(function(error){ // nose ejecuta el then y se ejecuta el catch
         console.log(error) // muestra los errores
})





