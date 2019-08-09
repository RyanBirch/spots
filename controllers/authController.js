const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {

  authenticateUser: async function(req, res) {
    let { email, password } = req.body

    // validation
    if (!email || !password) res.status(400).json({ msg: 'Please enter all fields' })

    // Check for existing user
    let user = await User.findOne({ email })
    if (!user) return res.status(400).json({ msg: 'user does not exist' })

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
  }

}