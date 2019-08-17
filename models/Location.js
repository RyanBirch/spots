const mongoose = require('mongoose')
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

module.exports = LocationSchema