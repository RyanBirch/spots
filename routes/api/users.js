const router = require('express').Router()
const usersController = require('../../controllers/usersController')
const isAuthenticated = require('../../middleware/isAuthenticated')
const User = require('../../models/User')

// /api/users

// signup
router.post('/register', usersController.registerNewUser)

// add to a user's favorites list
router.post('/list/add', isAuthenticated, (req, res) => {
  console.log(req.user.id)
  console.log(req.body)
})

module.exports = router