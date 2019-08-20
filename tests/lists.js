// database
const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/spots'
mongoose.connect(MONGODB_URI, { 
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
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
  lists: {
    type: Object,
    strict: false
  }
})

const User = mongoose.model('user', UserSchema)


User.create({
  name: 'user',
  email: 'userTest@hotmail.com',
  password: '123456',
  lists: {
    pizza: [
      {
        name: 'pizza 1',
        image: 'no image',
        address: '123 Main St',
        phone: '555-555-5555',
        category: 'bars',
        price: '$$',
        rating: '4.5/5',
        reviewCount: 500
      },
      {
        name: 'pizza 2',
        image: 'no image',
        address: '123 Main St',
        phone: '555-555-5555',
        category: 'bars',
        price: '$$',
        rating: '4.5/5',
        reviewCount: 500
      }
    ],
    bars: [
      {
        name: 'bar 1',
        image: 'no image',
        address: '123 Main St',
        phone: '555-555-5555',
        category: 'bars',
        price: '$$',
        rating: '4.5/5',
        reviewCount: 500
      },
      {
        name: 'bar 2',
        image: 'no image',
        address: '123 Main St',
        phone: '555-555-5555',
        category: 'bars',
        price: '$$',
        rating: '4.5/5',
        reviewCount: 500
      }
    ],
    burgers: [
      {
        name: 'burger 1',
        image: 'no image',
        address: '123 Main St',
        phone: '555-555-5555',
        category: 'bars',
        price: '$$',
        rating: '4.5/5',
        reviewCount: 500
      },
      {
        name: 'burger 2',
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