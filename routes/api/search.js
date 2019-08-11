const router = require('express').Router()
const axios = require('axios')

// /api/search

// search yelp api
router.get('/:term/:location', (req, res) => {
  let { term, location } = req.params
  let url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`
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