const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [
        {    
            product:{ type: Schema.Types.ObjectId, ref:"Product", require: true}, // con el ID me traigo todos los datos del producto. El nombre Product como lo tenemos definido en product schema
            quantity: { type: Number, require: true, default: 1},
            price: { type: Number, require: true},

        },
    ],
    total: { type: Number, require: true, min:1},
    userId:{ type:Schema.Types.ObjectId, ref: "User", require: true },
    createdAt: { type: Date, require: true, default: Date.now}, // al tener default lo crea por defecto
    status:{ type: String, enum: ["onhold","inprogress", "done"], default:"onhold" }, // si esta en proceso, si esta despachado o entregado. Con enum defino los status q pueden cargar, si mandan otro tira error
    // updatedAt //cuando se cambio el status
    // metodo de pago
    // estado del pago
    // direccion de delivery
})
module.exports=mongoose.model("Order", orderSchema) // en mongodb me lo crea en singular y minuscula