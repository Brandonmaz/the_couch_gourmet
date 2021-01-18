const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Post = require('./posts.js')


const restaurantSchema = new Schema ({
  username:{type:String, unique: true, required: true, validate: {
                          validator: (str) => {
                            let length = str.length
                            if(length < 2 || length > 50) {
                              return false
                            } else {
                              return true
                            }}, message: 'Your name must be between 5 and 50 characters long.'}},
  password:{type:String, required:true},
  about:{type:String, required:true},
  img: {type:String, default:"https://i.imgur.com/BN3CHjAl.jpg"},
  posts: [Post.schema]
})


const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant
