const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {

  // register a new user
  registerNewUser: async function(req, res) {
    let { name, email, password } = req.body

    // validation
    if (!name || !email || !password) res.status(400).json({ msg: 'Please enter all fields' })

    // Check for existing user
    let user = await User.findOne({ email })
    if (user) return res.status(400).json({ msg: 'User already exists' })

    // create new user
    let newUser = new User({ name, email, password })

    // create salt and hash
    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(newUser.password, salt)

    // save new user to database with hashed password
    newUser.password = hash 
    let userModel = await newUser.save()
 
    // sign the token
    jwt.sign(
      { id: userModel.id }, // payload
      process.env.JWT_SECRET, // jwt secret
      (err, token) => {
        if (err) throw err 
        
        // send the token and user information
        res.json({
          token: token,
          user: {
            id: userModel.id,
            name: userModel.name,
            email: userModel.email
          }
        })
      }
    )
  },


  // add a location to a user's favorites list
  addToFav: function(req, res) {
    User.findOneAndUpdate({ _id: req.user.id }, {
      $push: { 'list.locations': req.body }, 
    }, { new: true })
    .then(() => res.sendStatus(200))
    .catch(err => res.send(err))
  }

}