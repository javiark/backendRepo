const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const UserSchema = new Schema({
    fullName : {type: String, required: true, minlenght:3, maxlength:80},
    surname : {type: String, required: true, minlenght:3, maxlength:80},
    email : {
        type: String, 
        required: true,
        minlenght:6,
        maxlength:150,
        unique: true, // que no se repita
        index: true,
        validate:{ // para validar si lo que me ingresa es un email
            validator: function(value){
                return /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(value)  // el test verificia si lo cumple. El value es el mail ingresado
            },
            message: props=>`${props.value} no es un email valido`
        }
    },
        password:{type: String, required: true, minlenght:6, maxlength:150},
        role : {type: String, 
            required: true, 
            default: "CLIENT_ROLE", 
            enum:[
                "SUPERADMIN_ROLE", "ADMIN_ROLE", "USER_ROLE", "CLIENT_ROLE"
            ]},
            // gender: {type:String, required:true}
            date:{ type: Date},
            image:{type: String},
            createdAt:{type: Date, default: Date.now}
})