var express = require('express');
var router = express.Router();
var userModel = require('../models/users')

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

  if(req.body.userName && req.body.pw && req.body.email){
    console.log(req.body.userName ,req.body.pw ,req.body.email)

    autorise = true
    console.log('autorise')
  }
  var alreadyExist = await userModel.findOne({userName:req.body.userName})
  console.log(alreadyExist)
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
    pw:req.body.pw,
    email:req.body.email
  })
  saveUser = await newUser.save()
}
  if(saveUser){
    result = true
  }
  res.json({result, error});
});

router.post('/signin', async function(req, res, next) {
  var result = false
  var error = []
  var autorise = false

  if(req.body.pw && req.body.email){
    autorise = true
    console.log('autorise')
  }else{
    error.push('Remplissez tout les champs')
  }
  
  if(error.length === 0){
    var findUser = await userModel.findOne({
      pw:req.body.pw,
      email:req.body.email, 
    })
  }
  console.log(findUser)
 
  if(findUser !== null){
   result = true
 }else{
   error.push('Email et/ou mot de passe incorects !')
 }
  res.json({result, error});
});

// router.get('/users', async function(req, res, next) {
//   var users =  await userModel.find()

//   res.json({users});
// });

module.exports = router;
