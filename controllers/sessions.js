const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const Restaurant = require('../models/restaurant.js')

sessions.post('/', (req, res) => {
  console.log(req.body.username);
  Restaurant.findOne({username:req.body.username}, (err, foundUser) => {
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

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.json({})
  })
})


module.exports = sessions
