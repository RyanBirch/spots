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

// create a new custom list
router.post('/lists/create', isAuthenticated, usersController.createList)

// delete a custom list
router.delete('/lists/deleteList/:listID', isAuthenticated, usersController.deleteList)

// get custom lists
router.get('/lists/get', isAuthenticated, usersController.getLists)

// add an item to a custom list
router.post('/lists/add/:listName', isAuthenticated, usersController.addToCustomList)

// delete an item from a custom list
router.delete('/lists/delete/:listName/:spotID', isAuthenticated, usersController.deleteFromCustomList)

module.exports = router