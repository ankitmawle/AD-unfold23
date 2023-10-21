const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated} = require("../config/auth.js");

router.get('/:id',ensureAuthenticated,(req,res)=>{
    res.render('payment',{
        user: req.user,
        payee : req.params.id
        });
    })

    module.exports  = router;