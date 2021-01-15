const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const Restaurant = require('../models/restaurant.js')

sessions.post('/', (req, res) => {
  User.findOne({username:req.body.username}, (err, foundUser) => {
    if(err) {
      console.log(err);
      res.json({})
    } else if (!foundUser) {
      console.log('username does not exist');
      res.json({})
    } else {
      if(bcrypt.compareSync(req.body.password, foundUser.password)) {
        res.json(foundUser)
      } else {
        console.log('We don\'t recognize that password. Try again');
        res.json({})
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
