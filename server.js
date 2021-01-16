const express = require('express')
const mongoose = require('mongoose')

const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

app.use(express.json())
app.use(express.static('public'))

const restaurantController = require('./controllers/restaurant_controller.js')
app.use('/restaurant', restaurantController)

const userController = require('./controllers/user_controller.js')
app.use('/user', userController)

const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController)

const user_sessionsController = require('./controllers/user_sessions.js')
app.use('/user_sessions', user_sessionsController)

const postController = require('./controllers/post_controller.js')
app.use('/post', postController)


mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

mongoose.connection.on('error', (error) => {
  console.log(
      error.message,
      'is mongod not running/Problem with atlas connection?'
  )
})
mongoose.connection.on('connected', () => {
  console.log('mongo connected', MONGODB_URI)
})
mongoose.connection.on('disconnnected', () => {
  console.log('mongo disconnected')
})
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
})
