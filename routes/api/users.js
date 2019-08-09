const router = require('express').Router()
const usersController = require('../../controllers/usersController')

// /api/users

// signup
router.post('/register', usersController.registerNewUser)

module.exports = router