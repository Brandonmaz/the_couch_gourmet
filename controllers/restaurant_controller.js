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
      createdRestaurant.password = (bcrypt.hashSync(createdRestaurant.password, bcrypt.genSaltSync(10)))
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
    (error, updatedRestaurant) => {
      if(error){
        res.send(error)
      } else {
        updatedRestaurant.password = (bcrypt.hashSync(updatedRestaurant.password, bcrypt.genSaltSync(10)))
        updatedRestaurant.save((err, data) => {
          Restaurant.find({}, (error, foundRestaurant) => {
            res.json([foundRestaurant, updatedRestaurant])
          })
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

module.exports = restaurant
