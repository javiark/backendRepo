const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema=new Schema({
    name:{type:String, require:true, unique:true},
    description: String,
});

module.exports=mongoose.model("Category", CategorySchema); // se va a llamar categories
