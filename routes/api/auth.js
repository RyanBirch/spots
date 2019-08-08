const router = require('express').Router()
const authController = require('../../controllers/authController')
const isAuthenticated = require('../../middleware/isAuthenticated')

// /api/auth
router.route('/')
  .post(authController.authenticateUser)

router.get('/test', isAuthenticated, (req, res) => {
  res.send('You made it to the protected route')
})

module.exports = router