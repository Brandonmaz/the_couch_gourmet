const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Posts = require('./posts.js')


const userSchema = new Schema ({
  username:{type:String, unique: true, required: true, validate: {
                          validator: (str) => {
                            let length = str.length
                            if(length < 5 || length > 16) {
                              return false
                            } else {
                              return true
                            }}, message: 'Your username must be between 5 and 16 characters long.'}},
  password:{type:String, required:true, validate: {
                          validator: (str) => {
                            let length = str.length
                            if(length < 7 || length > 16) {
                              return false
                            } else {
                              return true
                            }}, message: 'Your password must be between 7 and 16 characters.'}},
  about:{type:String, validate: {
                            validator: (str) => {
                              for(let i = 0; i < str.length-4; i++) {
                                let thisThree= str.slice(i, (i+4))
                                if (thisThree === ('http')) {
                                  return false
                                }
                              }
                              return true
                            }, message: 'Your about me section cannot contain any links or images.'}}
})


const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant
