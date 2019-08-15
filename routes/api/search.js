const router = require('express').Router()
const searchController = require('../../controllers/searchController')

// /api/search

// search yelp api
router.get('/:term/:location/:offset/:sort_by', searchController.getResults)

// get reviews from yelp
router.get('/reviews', searchController.getReviews)

// filter search
router.get('/filterPrice/:term/:location/:offset/:sort_by/:price', searchController.filterSearch)

module.exports = router