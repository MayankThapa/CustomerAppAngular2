

const mongoose = require('mongoose');

const newBilling = mongoose.Schema({
    billNumber:{type:String,trim:true},
    billDate:{type:Number,trim:true},
    tax:{type:Number,trim:true},
    discount:{type:Number,trim:true},
    items:[{
        name:{type:String,trim:true},
        quantity:{type:Number,trim:true},
        rate:{type:Number,trim:true}
    }],
    customerId :{type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
})

module.exports =  mongoose.model('Billing', newBilling);