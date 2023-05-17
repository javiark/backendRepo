const express=require("express");
const router=express.Router();

const uploadController = require("./../controllers/upload.controller");

// Cargar image de producto
router.post('/product/upload/image', uploadController.uploadProduct);




// router.post("/upload", uploadController.upload, uploadController.uploadFile);

// router.get("/file/:id", uploadController.getImage);

// router.get("/file", uploadController.getImage);

module.exports=router;