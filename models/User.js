const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ListSchema = require('./List')
const LocationSchema = require('./Location')

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
  // list: ListSchema
  lists: [{
    name: String,
    // list: [ListSchema]
    list: [LocationSchema]
  }]
})

// lists: [
//   {
//     name: 'bars',
//     list: [
//       {
//         // data about location
//       },
//       {
//         // second location
//       }
//     ]
//   },
//   {
//     // second list
//   }
// ]

module.exports = User = mongoose.model('user', UserSchema)