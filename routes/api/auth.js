const router = require('express').Router()
const authController = require('../../controllers/authController')
const isAuthenticated = require('../../middleware/isAuthenticated')
const User = require('../../models/User')

// /api/auth

// login
router.post('/authenticate', authController.authenticateUser)

// get user data 
router.get('/user', isAuthenticated, authController.getUserData)



// test protected routes
router.get('/test', isAuthenticated, (req, res) => {
  res.send('You made it to the protected route')
})

module.exports = router