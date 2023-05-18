const multer = require('multer');
const fs = require('fs');
// const { v4: uuidv4 } = require('uuid');
const { responseCreator } = require("../utils/utils");




const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/upload/product') // en esta carpeta estan los archivos
    },
    filename: (req, file, callback) => {
        console.log(file);
        callback(null, ""+Date.now()) //transforma el datenow en string
    }
})

const uploadProduct = multer({storage}).single("image")

module.exports={
    uploadProduct
}