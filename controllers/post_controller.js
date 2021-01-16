const express = require('express')
const post = express.Router()

const Post = require('../models/posts.js')
const Restaurant = require('../models/restaurant.js')

post.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (error, foundRestaurant) => {
    Post.find({}, (error, foundPosts) => {
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
    if(error) {
      console.log(error);
    }else{
      console.log('en route');
      for(let i = 0 ; i < foundRestaurant.posts.length; i++){
        let thisPost = foundRestaurant.posts[i]._id.toString()
        console.log(thisPost);

        if(thisPost === req.params.postid.toString()){
          console.log(true);
          let foundPost = foundRestaurant.posts[i]
          foundPost.title = req.body.title
          foundPost.stars = req.body.stars
          foundPost.body = req.body.body
          foundPost.save((err, data) => {
            foundRestaurant.save((err, data) => {
              Post.findByIdAndUpdate(req.params.postid, foundPost, {new:true}, (err, updatedPost) => {
                Restaurant.find({}, (err, foundRestaurants) => {
                  console.log(foundRestaurants);
                  res.json(foundRestaurants)
                })
              })
            })
          })
        }
      }
    }
  })
})
post.delete('/:userid/:postid', (req, res) => {
  console.log('accessed');
  Restaurant.findById(req.params.userid, (error, foundRestaurant) => {
    if(error) {
      console.log(error);
    }else{
      console.log('en route');
      for(let i = 0 ; i < foundRestaurant.posts.length; i++){
        let thisPost = foundRestaurant.posts[i]._id.toString()
        if(thisPost === req.params.postid.toString()){
          foundRestaurant.posts.splice(i, 1)
          foundRestaurant.save((err, data) => {
              Post.findByIdAndRemove(req.params.postid, (err, removedPost) => {
                Restaurant.find({}, (err, foundRestaurants) => {
                  console.log(foundRestaurants);
                  res.json(foundRestaurants)
                })
              })
            })
        }
      }
    }
  })
})

module.exports = post
