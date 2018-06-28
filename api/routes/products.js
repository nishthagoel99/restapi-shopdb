var express=require('express');
var app=express();
var router=express.Router();
var mongoose=require('mongoose');

var Product=require('../models/product');

router.post('/',function(req,res){
    var product = new Product({
        _id:new mongoose.Types.ObjectId(),
        Name:req.body.name,
        Price:req.body.price
    });
    product.save(function(err,result){
        if(err){
            res.status(404).json({message:'ERROR'});
        }else{
            res.status(200).json({
            message:'POST request for /products',
            createdproduct:product
           });
        }
    }); 
});

router.get('/',function(req,res){
    Product.find(function(err,result){
        if(err){
            res.status(404).json({
                message:'Eroorrrr'
            });
        }else{
            res.status(200).json({
                message:'GET REQUESTS FROM PRODUCTS',
                product:result
            });
        }
    });
});

router.get('/:productid',function(req,res){
    var id=req.params.productid;
    Product.findById(id,function(err,result){
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

router.patch('/:productid',function(req,res){
    var id=req.params.productid;
    Product.update({_id:id},{$set:{Name:req.body.Name}},function(err,result){
        if(err){
            res.status(404).json({message:'error in patching product id'});
        }else{
            if(result){
            res.status(200).json({message:'Updated in productid',product:result});
        }else{
            res.status(500).json({message:'no user with that id'});
        }
    }
    });
});

router.delete('/:productid',function(req,res){
    var id=req.params.productid;
    Product.remove({_id:id},function(err,result){
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
