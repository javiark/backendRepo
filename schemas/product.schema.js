const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const proudctSchema = new Schema({
    name: String,
    price: Number,
    description: String
}) //propiedades que quiero q se guarden. Si sobran cosas las va a quitar

module.exports = mongoose.model("Product", proudctSchema) // nombre del modelo "products" ( se cambia a minuscula y con s ). Se hace una tabla