const router = require('express').Router()
const authController = require('../../controllers/authController')
const isAuthenticated = require('../../middleware/isAuthenticated')

// /api/auth

// login
router.post('/authenticate', authController.authenticateUser)

// get user data 
router.get('/user', isAuthenticated, authController.getUserData)

module.exports = router