
var url=require('url');
const express = require('express');
const mongoose = require('mongoose');
const User = require("../models/user.js")
const bcrypt=require('bcrypt');
const passport = require('passport');
const {unauth} = require("../config/una.js");
var bsv=require('bsv');

const router  = express.Router();


//register page
router.get('/', (req,res)=>{
    res.redirect('/register');
})


//register page
router.get('/register', unauth,(req,res)=>{
    res.render('register',{layout:false});
})


//Register handle
router.post('/register',(req,res)=>{
    const {name, email, password, password2} = req.body;
    let errors = [];
    console.log(' Name ' + name+ ' email :' + email+ ' pass:' + password);
    if(!name ||  !email || !password || !password2) {
        errors.push({msg : "Please fill in all fields"})
    }
    //check if match
    if(password !== password2) {
        errors.push({msg : "passwords dont match"});
    }

    //check if password is more than 6 characters
    if(password.length < 6 ) {
        errors.push({msg : 'password atleast 6 characters'})
    }
    if(errors.length > 0 ) {
    res.render('register', {
        errors : errors,
        name : name,
        email : email,
        password : password,
        password2 : password2})
    } else {
        //validation passed
    User.findOne({email : email}).then((user)=>{
        console.log(user);   
        if(user) {
            errors.push({msg: 'email already registered'});
            res.render('register',{errors,name,email,password,password2});
            
        } else {
            const newUser = new User({
                name : name,
                email : email,
                password : password
            });

            bcrypt.genSalt(10,(err,salt)=> 
                bcrypt.hash(newUser.password,salt,
                    (err,hash)=> {
                        if(err) throw err;
                            //save pass to hash
                            newUser.password = hash;
                        //save user
                        newUser.save()
                        .then((value)=>{
                            console.log(value)
                        res.redirect('/login');
                        })
                        .catch(value=> console.log(value));     
                    })
                );
            }
        })
    }
})

//login handle
router.get('/login',unauth,(req,res)=>{
    res.render('login',{layout:false});
})

router.post('/login',(req,res,next)=>{
    
    passport.authenticate('local',{
        successRedirect : '/users/dashboard',
        failureRedirect : '/login',
        failureFlash : true,
        })(req,res,next);

  })

  
module.exports  = router;