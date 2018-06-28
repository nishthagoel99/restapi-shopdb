var mongoose=require('mongoose');

var productSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    Name:{type:String},
    Price:{type:Number}
});

module.exports=mongoose.model('Product',productSchema);