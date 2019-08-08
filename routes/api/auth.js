const router = require('express').Router()
const authController = require('../../controllers/authController')

// /api/auth
router.route('/')
  .post(authController.authenticateUser)

module.exports = router