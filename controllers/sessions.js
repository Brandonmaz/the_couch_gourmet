const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const Restaurant = require('../models/restaurant.js')

sessions.post('/', (req, res) => {
  Restaurant.findOne({username:req.body.username}, (err, foundUser) => {
    if(err) {
      res.json("There was an error. Please try again.")
    } else if (!foundUser) {
      res.json('Username or password is incorrect. Please try again.')
    } else {
      if(bcrypt.compareSync(req.body.password, foundUser.password)) {
        res.json(foundUser)
      } else {
        res.json('We don\'t recognize that username or password. Please try again.')
      }
    }
  })
})




module.exports = sessions
