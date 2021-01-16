const express = require('express')
const bcrypt = require('bcrypt')
const user = express.Router()

const User = require('../models/user.js')
const Restaurant = require('../models/restaurant.js')
const Post = require('../models/posts.js')

user.get('/', (req, res) => {
  User.find({}, (error, foundUser) => {
    res.json(foundUser)
  })
})

user.get('/posts/:userid', (req, res) => {
  Post.find({authorId: req.params.userid}, (err, foundPosts) => {
    res.json(foundPosts)
  })
})

user.post('/', (req, res) => {
  User.create(req.body, (error, createdUser) => {
    if(error) {
      console.log(error);
    } else {
      createdUser.password = (bcrypt.hashSync(createdUser.password, bcrypt.genSaltSync(10)))
      createdUser.save((err, data) =>{
        if(err){console.log(err);}
        Restaurant.find({}, (error, foundRestaurant) => {
          res.json(foundRestaurant)
        })
      })
    }
  })
})
user.put('/:id', (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (error, updateUser) => {
      if(error){
        res.send(error)
      } else {
        updateUser.password = (bcrypt.hashSync(updateUser.password, bcrypt.genSaltSync(10)))
        updateUser.save((err, data) => {
        Restaurant.find({}, (error, foundRestaurant) => {
          res.json([foundRestaurant, updateUser])
        })
      })
      }
    }
  )
})
user.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (error, deletedUser) => {
    User.find({}, (error, foundUser) => {
      res.json(foundUser)
    })
  })
})

module.exports = user
