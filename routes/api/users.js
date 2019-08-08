const router = require('express').Router()
const usersController = require('../../controllers/usersController')

// /api/users
router.route('/')
  .post(usersController.registerNewUser)

module.exports = router