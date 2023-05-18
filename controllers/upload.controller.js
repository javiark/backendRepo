const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
// const { responseCreator } = require("../utils/utils");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/upload/product') // en esta carpeta estan los archivos
    },
    filename: (req, file, callback) => {
                // console.log(file);
        const fileExt=file.originalname.split(".").at(-1); //saca el .jpg
        // const fileName=`${Date.now()}.${fileExt}`
        
        const fileName=`${uuidv4()}.${fileExt}` // va a ser un numero random con la extension jpg. la libreria uuidv4 genera un id unico
        req.body.image = fileName; // de aca saco la imagen, el nombre
        callback(null,fileName) //transforma el datenow en string
    }
})

const uploadMulter = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 10 }, // limita al archivo a 10 megas
    fileFilter: (req, file, callback) => {  //filtra que el file sea de tipo imagen
        const type = file.mimetype.split('/')[0] //corta en la barra image/foto.jpg. Me quedo con la posicion 0
        type === 'image' ? callback(null, true)  : callback(null, false); //si es image lo deja pasar. Si es true pasa, despues del : es falso, y devuelve un false
    }
})

const uploadProduct = uploadMulter.single("file");


module.exports = {
    uploadProduct
    // uploadFile,
    // getImage,
    // getImages
}













// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, 'public/upload/product') // en esta carpeta estan los archivos
//     },
//     filename: (req, file, callback) => {
//         // console.log(file);
//         const fileExt=file.originalname.split(".").at(-1); //saca el .jpg
//         // const fileName=`${Date.now()}.${fileExt}` // va a ser un numero random con la extension jpg
//         const fileName=`${uuidv4()}.${fileExt}` // va a ser un numero random con la extension jpg. la libreria uuidv4 genera un id unico
//         req.image = fileName;
//         callback(null,fileName) //transforma el datenow en string
//     }
// })

// //Filtro para controlar las imagenes

// const uploadMulter = multer({
//     storage,
//     limits: { fileSize: 1024 * 1024 * 10 }, // limita al archivo a 10 megas
//     fileFilter: (req, file, callback) => {  //filtra que el file sea de tipo imagen
//         const type = file.mimetype.split('/')[0] //corta en la barra image/foto.jpg. Me quedo con la posicion 0
//         type === 'image' ? callback(null, true)  : callback(null, false); //si es image lo deja pasar. Si es true pasa, despues del : es falso, y devuelve un false
//     }
// })



// const uploadProduct = multer({storage}).single("file")


// module.exports = {
//     uploadProduct,
//     // uploadFile,
//     // getImage,
//     // getImages
// }