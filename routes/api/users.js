const router = require('express').Router()
const usersController = require('../../controllers/usersController')
const isAuthenticated = require('../../middleware/isAuthenticated')

// /api/users

// signup
router.post('/register', usersController.registerNewUser)

// add to a user's favorites list
router.post('/list/add', isAuthenticated, usersController.addToFav)

// get user's favorites
router.get('/list/get', isAuthenticated, usersController.getFavs)

// delete location from favorites list
router.delete('/list/delete/:spotID', isAuthenticated, usersController.deleteFav)

module.exports = router