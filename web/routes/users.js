var url=require('url');
const express = require('express');
const mongoose = require('mongoose');
const User = require("../models/user.js")
const Transactions=require("../models/transactions.js")
const bcrypt=require('bcrypt');
const passport = require('passport');
const {unauth} = require("../config/una.js");
const {ensureAuthenticated} = require("../config/auth.js");
var bsv=require('bsv');

const router  = express.Router();

//logout
router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg','Now logged out');
    res.redirect('/users/login');

 })
 
router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    res.render('dashboard',{
        user: req.user,
        });
    })

router.get('/history/:id',ensureAuthenticated,(req,res)=>{
   var op={}
    Transactions.find({sender:req.params.id},(err,data)=>{
        op["sent"]=data;
        console.log(op)
        Transactions.find({receiver:req.params.id},(err,data)=>{
            op["received"]=data;
            console.log(op);
            res.send(JSON.stringify(op))
        })
    })
    

    
 
})

router.get('/pay',ensureAuthenticated,(req,res)=>{
        res.render('pay',{
            user: req.user
            });
        })

router.get('/withdraw',ensureAuthenticated,(req,res)=>{
    res.render('withdraw',{
        user: req.user
        });
    })


router.get('/registerApi',ensureAuthenticated,(req,res)=>{
    var q = url.parse(adr, true);
    var qdata = q.query;
    User.findOne({email : email}).then((user)=>{
        user.wallets[qdata.walletAddress]=qdata.username;
        User.findOneAndUpdate({email : email},{wallets:user.wallets});
    })
    res.send(true);
})

router.get('/payApi',ensureAuthenticated,(req,res)=>{
    var q = url.parse(req.url, true);
    var qdata = q.query;
    const newTransaction= new Transactions({
        sender:qdata.sender,
        receiver:qdata.receiver,
        amount:qdata.amount,
        hash:qdata.hash,
        chain:qdata.chain,
    })
    newTransaction.save()
    res.send(true);
})


module.exports  = router;