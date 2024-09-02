const mongoose=require('mongoose')

const CartSlice=new mongoose.Schema({
    image:{type:String,required:true},
    companyname:{type:String,required:true},
    productprice:{type:Number,required:true},
    productofferprice:{type:Number,required:true},
    productname:{type:String,required:true},
    productdocs:{type:String,required:true},
    userID :{type:String,required:true},
    ComapanyID:{type:String,required:true},
    productID:{type:String,required:true},
    Quantity:{type:Number}
}
);
module.exports=mongoose.model("cart",CartSlice)