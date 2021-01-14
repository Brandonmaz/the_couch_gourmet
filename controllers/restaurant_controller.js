const express = require('express')
const restaurant = express.Router()

const Restaurant = require('../models/restaurant.js')

restaurant.get('/', (req, res) => {
  Restaurant.find({}, (error, foundRestaurant) => {
    res.json(foundRestaurant)
  })
})
restaurant.post('/', (req, res) => {
  Restaurant.create(req.body, (error, createRestaurant) => {
    if(error) {
      console.log(error);
    } else {
      Restaurant.find({}, (error, foundRestaurant) => {
        res.json(foundRestaurant)
      })
    }
  })
})
restaurant.put('/:id', (req, res) => {
  Restaurant.findByIdAndUpdate(
    rew.params.id,
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
