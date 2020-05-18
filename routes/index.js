var express = require('express');
var router = express.Router();
var userModel = require('../models/users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', async function(req, res, next) {
  var result = false
  var autorise = false
  if(req.body.userName && req.body.pw && req.body.email){
    autorise = true
    console.log('autorise')
  }
  var alreadyExist = await userModel.findOne({userName:req.body.userName})
  console.log(alreadyExist)
  if(autorise && !alreadyExist ){
    var newUser = await new userModel({
      userName: req.body.userName,
      pw:req.body.pw,
      email:req.body.email
    })
    await newUser.save()
    result = true
  }else{
    res.redirect('/')
  }
  res.json({result});
});

router.post('/signin', async function(req, res, next) {
  var result = false
  var findUser = await userModel.findOne({
    pw:req.body.pw,
    email:req.body.email, 
  })
  console.log(findUser)
 if(findUser !== undefined){
   result = true
 }
  res.json({result});
});

router.get('/users', async function(req, res, next) {
  var users =  await userModel.find()

  res.json({users});
});

module.exports = router;
