const express = require('express')
const post = express.Router()

const Post = require('../models/posts.js')
const Restaurant = require('../models/restaurant.js')

post.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (error, foundRestaurant) => {
    Post.find({}, (error, foundPosts) => {
      console.log(foundPosts);
          res.json(foundPosts)
    })
  })
})

post.post('/:userid', (req, res) => {
  Restaurant.findById(req.params.userid, (err, foundRestaurant) => {
    Post.create(req.body, (error, createdPost) => {
      if(error) {
        console.log(error);
      } else {
        foundRestaurant.posts.unshift(createdPost)
        foundRestaurant.save((err, data) => {
          Restaurant.find({}, (err, foundRestaurants) => {
            res.json(foundRestaurants)
          })
        })
      }
    })
  })
})
post.put('/:userid/:postid', (req, res) => {
  Restaurant.findById(req.params.userid, (error, foundRestaurant) => {
      Post.findByIdAndUpdate(
        req.params.postid,
        req.body,
        {new: true},
        (error, updatedPost) => {
          if(error){
            res.send(error)
          } else {
              res.json(updatedPost)
          }
        })
        })
    })
post.delete('/:userid/:postid', (req, res) => {
  Restaurant.findById(req.params.userid, (error, foundRestaurant) => {
    Post.findByIdAndRemove(req.params.postid, (error, deletedUser) => {
      foundRestaurant.save((err,data) => {
        res.json(foundRestaurant)
      })
    })
  })
})

module.exports = post
