require('dotenv').config()

const axios = require('axios')
console.log('key: ' + process.env.YELP_KEY)
let id = `yk_6-PxGurJKz6JRIN3H0g`
let url = `https://api.yelp.com/v3/businesses/${id}/reviews`
let config = {
  headers: {
    // Authorization: `Bearer: ${process.env.YELP_KEY}`,
    Authorization: `Bearer: nQG0wR9yVtF-Ew4_uQLAJHsU_-lSl3JTqs3ZaZpPOI6lQHnP5nmiNzX5Jh0dBmlYwfaCs_-eM2rzFgAUt445sXF0XP-k8pHFsC6OMTewb2zU8ITA0yU8Pa07G_E7XHYx`,
  }
}

axios.get(url, config)
  .then(response => {
    console.log(response)
  })
  .catch(err => {
    console.log('error')
  })