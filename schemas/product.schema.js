const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const proudctSchema = new Schema({
    name: {type: String, required:true, minLength:5, maxLength:30 },
    price: {type: Number, required:true, min:0, max:1000000},
    description: String
}) //propiedades que quiero q se guarden. Si sobran cosas las va a quitar


 //coleccion de productos
module.exports = mongoose.model("Product", proudctSchema) // nombre del modelo "products" ( se cambia a minuscula y con s ). Se hace una tabla
