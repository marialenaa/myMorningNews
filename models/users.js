var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    userName : String,
    pw:String,
    email:String
})

var userModel = mongoose.model('users', userSchema)

module.exports = userModel