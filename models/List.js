const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const LocationSchema = require('./Location')

const ListSchema = new Schema({
  locations: [LocationSchema]
})

module.exports = ListSchema