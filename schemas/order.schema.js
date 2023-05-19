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
    status:{ type: String, enum: ["onhold","inprogress", "done"], default:"onhold" }, // si esta en proceso, si esta despachado o entregado. Con enum     shippingAddress: { address: String, city: String,  postalCode: String },
    totalPrice: { type: Number, required: true },
    paymentMethod: String,
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String,
    },
})
module.exports=mongoose.model("Order", orderSchema) // en mongodb me lo crea en singular y minuscula