const router = require('express').Router()
const path = require('path');
const apiRoutes = require('./api')

// api routes
router.use('/api', apiRoutes)

// Send every other request to the React app
router.use('*', (req, res) => res.sendFile(path.join(__dirname, '../client/build/index.html')))

module.exports = router