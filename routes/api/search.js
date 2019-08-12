const router = require('express').Router()
const axios = require('axios')

// /api/search

// search yelp api
router.get('/:term/:location/:offset', (req, res) => {
  let { term, location, offset } = req.params
  let url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&offset=${offset}`
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

// get yelp reviews
router.get('/reviews/:id', (req, res) => {
  let { id } = req.params 
  let url = `https://api.yelp.com/v3/businesses/${id}/reviews`
  let config = {
    headers: {
      Authorization: `Bearer: ${process.env.YELP_KEY}`,
    }
  }

  axios.get(url, config)
    .then(response => {
      res.json(response.data)
    })
    .catch(err => {
      res.json(err)
    })
})

module.exports = router