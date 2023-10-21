const mongoose = require('mongoose');
const transactionSchema  = new mongoose.Schema({
    sender :{
        type  : String,
        required : true
    } ,

    receiver :{
        type  : String,
        required : true
    } ,
    
    amount :{
        type  : String,
        required : true
    } ,

    date :{
        type : Date,
        default : Date.now()
    } ,
    hash :{
        type  : String,
        required : true
    } ,
    chain:{
        type:String,
        required:true
    }

});
const Transactions= mongoose.model('Wallet',transactionSchema);

module.exports = Transactions;