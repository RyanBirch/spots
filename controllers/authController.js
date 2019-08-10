const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {

  // authenticate user
  authenticateUser: async function(req, res) {
    let { email, password } = req.body

    // validation
    if (!email || !password) res.status(400).json({ msg: 'Please enter all fields' })

    // Check for existing user
    let user = await User.findOne({ email })
    if (!user) return res.status(400).json({ msg: 'User does not exist' })

    let isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })

    // sign the token
    jwt.sign(
      { id: user.id }, // payload
      process.env.JWT_SECRET, // jwt secret
      (err, token) => {
        if (err) throw err 
        
        // send the token and user information
        res.json({
          token: token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        })
      }
    )
  },

  // get user data from database
  getUserData: function(req, res) {
    User.findById(req.user.id)
      .select('-password')
      .then(user => res.json(user))
  }

}