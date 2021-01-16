const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const Posts = require('./posts.js')


const userSchema = new Schema ({
  username:{type:String, unique: true, required: true, validate: {
                          validator: (str) => {
                            let length = str.length
                            if(length < 5 || length > 50) {
                              return false
                            } else {
                              return true
                            }}, message: 'Your name must be between 5 and 16 characters long.'}},
  password:{type:String, required:true},
  about:{type:String, required:true},
  favorites:{type:String, required:true}
})


const User = mongoose.model('User', userSchema)

module.exports = User
