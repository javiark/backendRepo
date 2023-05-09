const express=require("express");
const router=express.Router();

//Obtener todos los productos

router.get("/products", (req,res)=>{
    res.status(200).send(`Productos solicitados correctamente`);
})

// Obtener un producto especifico (por categoria)
//Añadir producto
//Eliminar producto
//Modificar producto

module.exports=router;