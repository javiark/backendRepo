const multer = require('multer');
const fs = require('fs');


const storage = multer.diskStorage({ // disk storage permite tener unas configuraciones q necesitamos
    destination:(req, file,callback)=>{
        callback(null, "public/upload/product") // el null es para ver si hay un error
    },
    filename:(req, file, callback)=>{ //seteo el nombre del archivo. El nombre que le pongo es la fecha actual por ahora ( no es la mejor forma)
        console.log(file);
        callback(null, Date.now()) 
    }
})

const uploadProduct = multer({storage}).single


module.exports = {
    uploadProduct,

}