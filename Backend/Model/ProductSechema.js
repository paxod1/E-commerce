const mongoose=require('mongoose')

const ProductSlice=new mongoose.Schema({
    image:{type:String,required:true},
    companyname:{type:String,required:true},
    productprice:{type:Number,required:true},
    productofferprice:{type:Number,required:true},
    productname:{type:String,required:true},
    productdocs:{type:String,required:true},
    ComapanyID:{type:String,required:true}
}
);
module.exports=mongoose.model("products",ProductSlice)