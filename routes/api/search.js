const router = require('express').Router()
const axios = require('axios')
const scrape = require('../../scripts/reviewScrape')

// /api/search

// search yelp api
router.get('/:term/:location/:offset/:sort_by', (req, res) => {
  let { term, location, offset, sort_by } = req.params
  let url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&offset=${offset}&sort_by=${sort_by}`
  let config = {
    headers: {
      Authorization: `Bearer ${process.env.YELP_KEY}`
    }
  }

  axios.get(url, config)
    .then(response => {
      res.json(response.data)
    })
    .catch(err => console.log(err))
})

// get reviews
router.get('/reviews', (req, res) => {
  let { url } = req.query 
  scrape(url).then(response => res.send(response))
})

// filter search
router.get('/filter/:term/:location/:offset/:sort_by/:price', (req, res) => {
  let { term, location, offset, sort_by, price } = req.params
  let url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&offset=${offset}&sort_by=${sort_by}&price=${price}`
  let config = {
    headers: {
      Authorization: `Bearer ${process.env.YELP_KEY}`
    }
  }

  axios.get(url, config)
    .then(response => {
      res.json(response.data)
    })
    .catch(err => console.log(err))
})

module.exports = router