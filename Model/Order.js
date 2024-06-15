const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    newOrder: {
        _id: mongoose.Schema.Types.ObjectId,
        image: { type: String, required: true },
        companyname: { type: String, required: true },
        productprice: { type: Number, required: true },
        productofferprice:{type:Number,required:true},
        productname: { type: String, required: true },
        productdocs: { type: String, required: true },
        ComapanyID:{type:String,required:true},
        __v: Number,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    pin: { type: Number, required: true },
    address: { type: String, required: true },
    userID:{type:String,required:true}
});

module.exports = mongoose.model('Order', orderSchema);
