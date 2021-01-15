const express = require('express')
const bcrypt = require('bcrypt')
const restaurant = express.Router()

const Restaurant = require('../models/restaurant.js')

restaurant.get('/', (req, res) => {
  Restaurant.find({}, (error, foundRestaurant) => {
    res.json(foundRestaurant)
  })
})

restaurant.post('/', (req, res) => {
  Restaurant.create(req.body, (error, createdRestaurant) => {
    if(error) {
      console.log(error);
    } else {
      console.log(createdRestaurant.password, req.body.password);
      createdRestaurant.password = (bcrypt.hashSync(createdRestaurant.password, bcrypt.genSaltSync(10)))
      console.log(createdRestaurant.password);
      createdRestaurant.save((err, data) =>{
        if(err){console.log(err);}
        Restaurant.find({}, (error, foundRestaurant) => {
          res.json(foundRestaurant)
        })
      })
    }
  })
})
restaurant.put('/:id', (req, res) => {
  Restaurant.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (error, updateRestaurant) => {
      if(error){
        res.send(error)
      } else {
        Restaurant.find({}, (error, foundRestaurant) => {
          res.json(foundRestaurant)
        })
      }
    }
  )
})
restaurant.delete('/:id', (req, res) => {
  Restaurant.findByIdAndRemove(req.params.id, (error, deletedRestaurant) => {
    Restaurant.find({}, (error, foundRestaurant) => {
      res.json(foundRestaurant)
    })
  })
})
restaurant.get('/', (req, res) => {
  res.send('index')
})
module.exports = restaurant
