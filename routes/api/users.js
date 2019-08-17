const router = require('express').Router()
const usersController = require('../../controllers/usersController')
const isAuthenticated = require('../../middleware/isAuthenticated')
const User = require('../../models/User')

// /api/users

// signup
router.post('/register', usersController.registerNewUser)

// add to a user's favorites list
router.post('/list/add', isAuthenticated, (req, res) => {
  User.findOneAndUpdate({ _id: req.user.id }, {
    $push: { 'list.locations': req.body }, 
  }, { new: true })
  .then(() => res.send(200).json({ msg: 'Insert successful' }))
  .catch(err => res.send(err))
})

module.exports = router