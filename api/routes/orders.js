var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var Order=require('../models/order');

router.get('/',function(req,res){
    Order.find(function(err,result){
        if(err){
            res.status(404).json({
                message:'Eroorrrr'
            });
        }else{
            res.status(200).json({
                message:'GET REQUESTS FROM ORDERSS',
                order:result
            });
        }
    });
});

router.post('/',function(req,res){
    var order=new Order({
        quantity:req.body.quantity,
        _id:new mongoose.Types.ObjectId(),
        product:req.body.productid
    });
    order.save(function(err,result){
        if(err){
            res.status(404).json({message:'ERROR'});
        }else{
            res.status(200).json({
            message:'POST request for /orders',
            order:order
           });
        }
    }); 
});


router.get('/:orderid',function(req,res){
    var id=req.params.orderid;
    Order.findById(id,function(err,result){
        if(err){
            res.status(404).json({
                message:'not a valid id'
            });
        }else{
            if(result){
                res.status(200).json({
                    message:'GET REQUEST FROM ID',
                    productid: result
                });
            }else{
                res.status(500).json({
                    message:'no user with this id '
                });
            }
        }
    });
});

router.delete('/:orderid',function(req,res){
    var id=req.params.orderid;
    Order.remove({_id:id},function(err,result){
        if(err){
            res.status(404).json({message:'EROR IN DELETING'});
        }else{
            if(result){
                res.status(200).json({
                    message:'DELETE REQUEST IN PRODUCTID'
                });
            }else{
                res.status(500).json({
                    message:'no user with this id '
                });
            }
        }
    });
});



module.exports=router;