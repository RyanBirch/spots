const router = require('express').Router()
const axios = require('axios')
const scrape = require('../../scripts/reviewScrape')

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

// router.post('/reviews', (req, res) => {
//   let { url } = req.body
//   console.log('url in route: ' + url)
//   scrape(url).then(response => res.send(response))
// })

router.get('/reviews', (req, res) => {
  let { url } = req.query 
  scrape(url).then(response => res.send(response))
})

module.exports = router