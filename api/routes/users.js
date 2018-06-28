var mongoose=require('mongoose');
var express=require('express');
var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken');
var router=express.Router();
var User=require('../models/user');

router.post('/signup',function(req,res){
    User.find({email:req.body.email},function(err,res1){
        if(err){
            res.send(404).json({message:'error in finding'});
        }else{
            if(res1.length>0){
                res.status(409).json({message:'Mail exists'});
            }else{
                bcrypt.hash(req.body.password,10,function(error,hash){
                    if(error){
                        res.status(404).json({message:'error'});
                    }else{
                var user=new User({
                    email:req.body.email,
                    password:hash,
                    _id:new mongoose.Types.ObjectId()
                });
                user.save(function(err,result){
                    if(err){
                        res.status(404).json({message:'error in saving'});
                    }else{
                        res.status(200).json({
                            message:'Post request user',
                            details:result
                             });
                         }
                      });
                    }
                });
            }
        }
    });
});

router.get('/signup',function(req,res){
    User.find(function(err,result){
        if(err){
            res.status(404).json({message:'error in get request'});
        }else{
            res.status(200).json({
                message:'get request of users',
                details:result
            });
        }
    });
});

router.delete('/:userid',function(req,res){
    User.remove({_id:req.params.userid},function(error,result){
        if(error){
            res.status(404).json({message:'error in deleting'});
        }else{
            res.status(200).json({
                message:'deleting in users'
            });
        }
    }); 
});

router.post('/login',function(req,res){
    User.find({email:req.body.email},function(err,result){
        if(err){
            res.status(404).json({message:'error in login'});
        }else{
            if(result.length>0){
                bcrypt.compare(req.body.password,result[0].password,function(error,result2){
                    if(error){
                        res.status(404).json({message:'login unsuccessful!'});
                     }else{
                         if(result2){
                                jwt.sign({
                                    email:result[0].email,
                                    id:result[0]._id
                                },
                                  'secretkey',
                                    function(error2,token){
                                        if(error2){
                                            res.status(404).json({message:'error in token'});
                                        }else{
                                            res.status(200).json({
                                                message:'login successful!',
                                                token:token
                                             });
                                        }
                                    }
                                ); 
                             }else{
                                 res.status(404).json({message:'incorrect password'});
                             }
                        }
                     });
             }else{
                 res.status(409).json({message:'no user with that mailid'});
             }
        }
    });
});


module.exports=router;