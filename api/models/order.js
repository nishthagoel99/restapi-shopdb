var mongoose=require('mongoose');

var orderSchema=mongoose.Schema({
     quantity:{type:Number},
     _id:mongoose.Schema.Types.ObjectId,
     product:{type:mongoose.Schema.Types.ObjectId, ref:'Product'}
});

module.exports=mongoose.model('Order',orderSchema);