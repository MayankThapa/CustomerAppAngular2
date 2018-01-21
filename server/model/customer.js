const mongoose = require('mongoose');

const newCustomer = mongoose.Schema({
    name:{type:String,trim:true},
    mobile:{type:String,trim:true},
    phone:{type:String,trim:true},
    email:{type:String,trim:true},
    dob: {type:String,trim:true},
    address:[{
        flat:{type:String,trim:true},
        street:{type:String,trim:true},
        state:{type:String,trim:true},
        pincode:{type:String,trim:true}
    }],
    created_at:{type:Date,default:Date.now()}
})

module.exports =  mongoose.model('Customer', newCustomer);