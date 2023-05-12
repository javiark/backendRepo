const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const proudctSchema = new Schema({
    name: {type: String, required:true},
    description: {type:String, required:true},
    detail:{type:String, required:true},
    price: {type: Number, required:true},
    image:{type:String, required:true},
    stock:{type:Number, required:true, default:1},
    active:{type:Boolean, default:1, required:true},
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,
    },
    createAt:{type:Number, default:Date.now()},
    
}) //propiedades que quiero q se guarden. Si sobran cosas las va a quitar


 //coleccion de productos
module.exports = mongoose.model("Product", proudctSchema) // nombre del modelo "products" ( se cambia a minuscula y con s ). Se hace una tabla
