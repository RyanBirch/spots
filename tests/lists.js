// database
const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/spots'
mongoose.connect(MONGODB_URI, { 
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})

// location
const Schema = mongoose.Schema 

const LocationSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String },
  address: { type: String },
  phone: { type: String },
  category: { type: String },
  price: { type: String },
  rating: { type: String },
  reviewCount: { type: Number },
  url: { type: String },
  coordinates: { 
    latitude: { type: Number },
    longitude: { type: Number }
  }
})

// list
const ListSchema = new Schema({
  locations: [LocationSchema]
})

// user
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  lists: [ListSchema]
})

const User = mongoose.model('user', UserSchema)


// create user with favorites list
User.create({
  name: 'user',
  email: 'userTest@hotmail.com',
  password: '123456',
  lists: 
  [
    {
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
        }
      ]
    },
    {
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
        }
      ]
    }
  ]
})
.then(user => console.log(user))
.catch(err => console.log(err))