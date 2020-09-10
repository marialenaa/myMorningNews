var express = require('express');
var router = express.Router();
var userModel = require('../models/users')
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");
var uid2 = require("uid2")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', async function(req, res, next) {
  var result = false
  var error = []
  var autorise = false
  var saveUser
  var newUser
  var salt = uid2(32)

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
  
  if(error.length === 0){
    console.log('no error')
    newUser = await new userModel({
    userName: req.body.userName,
    pw: SHA256(req.body.pw + salt).toString(encBase64),
    email:req.body.email,
    salt: salt,
    token: uid2(32)
  })
  saveUser = await newUser.save()
}
let token = newUser.token
  if(saveUser){
    result = true
  }
  res.json({result, error, token});
});

router.post('/signin', async function(req, res, next) {
  var result = false
  var error = []
  var autorise = false

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
 let token = findUser.token
  res.json({result, error, token});
});

// router.get('/users', async function(req, res, next) {
//   var users =  await userModel.find()

//   res.json({users});
// });

module.exports = router;
