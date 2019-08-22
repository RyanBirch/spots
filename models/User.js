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

  // favorites list
  list: ListSchema,
  
  // custom lists
  lists: [{
    name: String,
    list: [LocationSchema]
  }]
})

module.exports = User = mongoose.model('user', UserSchema)