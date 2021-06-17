const { Schema, model } = require("mongoose");
const Cloths=new Schema({
    title:{type:String,required:true},
    category:{type:String,required:true},
    price:{type:Number,default:0},
    selectedFile:{type:String,required:true},
})
module.exports = model("cloths", Cloths);