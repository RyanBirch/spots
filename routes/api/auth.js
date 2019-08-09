const router = require('express').Router()
const authController = require('../../controllers/authController')
const isAuthenticated = require('../../middleware/isAuthenticated')
const User = require('../../models/User')

// /api/auth

// router.route('/authenticate')
//   .post(authController.authenticateUser)

// login
router.post('/authenticate', authController.authenticateUser)

// get user data
router.get('/user', isAuthenticated, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
})



// test protected routes
router.get('/test', isAuthenticated, (req, res) => {
  res.send('You made it to the protected route')
})

module.exports = router