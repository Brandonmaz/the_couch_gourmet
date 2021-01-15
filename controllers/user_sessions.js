const bcrypt = require('bcrypt')
const express = require('express')
const user_sessions = express.Router()
const User = require('../models/user.js')

user_sessions.post('/', (req, res) => {
  console.log(req.body.username);
  User.findOne({username:req.body.username}, (err, foundUser) => {
    if(err) {
      console.log(err);
      res.json("There was an error. Please try again.")
    } else if (!foundUser) {
      console.log('username does not exist');
      res.json('Username or password is incorrect. Please try again.')
    } else {
      if(bcrypt.compareSync(req.body.password, foundUser.password)) {
        res.json(foundUser)
      } else {
        console.log('We don\'t recognize that password. Try again');
        res.json('We don\'t recognize that username or password. Please try again.')
      }
    }
  })
})

user_sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.json({})
  })
})


module.exports = user_sessions
