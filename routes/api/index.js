const router = require('express').Router()
const userRoutes = require('./users')
const authRoutes = require('./auth')
const searchRoutes = require('./search')

router.use('/users', userRoutes)
router.use('/auth', authRoutes)
router.use('/search', searchRoutes)


module.exports = router