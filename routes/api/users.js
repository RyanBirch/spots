const router = require('express').Router()
const usersController = require('../../controllers/usersController')
const isAuthenticated = require('../../middleware/isAuthenticated')
const User = require('../../models/User')

// /api/users

// signup
router.post('/register', usersController.registerNewUser)

// add to a user's favorites list
router.post('/list/add', isAuthenticated, usersController.addToFav)

// get user's favorites
router.get('/list/get', isAuthenticated, (req, res) => {
  User.findOne({ _id: req.user.id })
    .then(user => res.send(user.list.locations))
    .catch(err => res.send(err))
})

module.exports = router