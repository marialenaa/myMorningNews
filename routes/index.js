var express = require('express');
var router = express.Router();
var connect = require('../models/connection')
//crypto.js
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");
var uid2 = require("uid2");

//db models
var userModel = require('../models/users');

/* POST users SIGN UP. */
router.post('/signup', async function(req, res, next) {
  var result = false
  var error = []
  var autorise = false
  var saveUser

  if(req.body.userName && req.body.pw && req.body.email){
    autorise = true
  }
  var alreadyExist = await userModel.findOne({userName:req.body.userName})
  if(!autorise){
    error.push('tout les champs de saisies doivent être renseignés')
  }
  if(alreadyExist !== null){
    error.push('Utilisateur deja enregistré')
  }
  
  // if(error.length === 0){
    var salt = uid2(32)
    var newUser = new userModel({
      userName: req.body.userName,
      pw: SHA256(req.body.pw + salt).toString(encBase64),
      email:req.body.email,
      salt: salt,
      token: uid2(32),
    })

  saveUser = await newUser.save()
  console.log('est enregistré : ',saveUser)
let token = saveUser.token
  if(saveUser){
    result = true
  }
  res.json({result, error, token});
});


/* POST users SIGN IN. */
router.post('/signin', async function(req, res, next) {
  var result = false
  var error = []
  let autorise = false

  if(req.body.pw && req.body.email){
    autorise = true
  }else{
    error.push('Remplissez tout les champs')
  }
  if(error.length === 0){
    var findUser = await userModel.findOne({
      email:req.body.email, 
    })
    var hash = SHA256(req.body.pw + findUser.salt).toString(encBase64);
    if(hash === findUser.pw){
      result = true
    }
  }else{
   error.push('Email et/ou mot de passe incorects !')
 } 
  res.json({result, error, findUser});
});

/* POST users ADD-ARTICLE. */
router.post('/add-article', async function(req, res, next) {
    let result = false
var alreadyExist = await userModel.findOne({token:req.body.token, 'articlesUser':{title: req.body.title}})
  if(alreadyExist){
  }    
var wishlist = await userModel.updateOne(
      {token: req.body.token},
      {
        $addToSet: {'articlesUser': {
          title : req.body.title, 
          description : req.body.description, 
          content : req.body.content, 
          urlToImage : req.body.urlToImage
        }}
  })

  if(wishlist.n && wishlist.ok === 1){
    result = true
  }
    res.json({wishlist, result});
  });
  
  /* POST users DELETE-ARTICLE. */
  router.delete('/delete', async function (req,res,next){
    let result = false
    var findUser = await userModel.findOne({token: req.body.token})
  
    var findWishlist = await userModel.update({token: req.body.token},
      {$pull : {'articlesUser' : {'title' : req.body.title}}}
      )
    res.json({result})
  });


module.exports = router;
