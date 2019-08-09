const router = require('express').Router()
const usersController = require('../../controllers/usersController')

// /api/users

// router.route('/register')
//   .post(usersController.registerNewUser)

// signup
router.post('/register', usersController.registerNewUser)

module.exports = router