var mongoose = require('mongoose')

var articlesSchema = mongoose.Schema({
    title : String,
    description : String,
    content : String,
    urlToImage : String,
})

var userSchema = mongoose.Schema({
    userName : String,
    pw:String,
    email:String,
    salt:String,
    token: String,
    articlesUser : [articlesSchema]
})

var userModel = mongoose.model('users', userSchema)

module.exports = userModel