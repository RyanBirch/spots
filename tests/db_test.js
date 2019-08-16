// database
const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/spots'
mongoose.connect(MONGODB_URI, { 
  useNewUrlParser: true,
  useCreateIndex: true
})

// create user with favorites list
const User = require('../models/User')
User.create({
  name: 'user',
  email: 'user@hotmail.com',
  password: '123456',
  list: {
    locations: [
      {
        name: 'The bar',
        image: 'no image',
        address: '123 Main St',
        phone: '555-555-5555',
        category: 'bars',
        price: '$$',
        rating: '4.5/5',
        reviewCount: 500
      },
      {
        name: 'The bar',
        image: 'no image',
        address: '123 Main St',
        phone: '555-555-5555',
        category: 'bars',
        price: '$$',
        rating: '4.5/5',
        reviewCount: 500
      }
    ]
  }
})
.then(user => console.log(user))
.catch(err => console.log(err))