const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = {

  registerNewUser: async function(req, res) {
    const { name, email, password } = req.body

    // validation
    if (!name || !email || !password) res.status(400).json({ msg: 'Please enter all fields' })

    // Check for existing user
    let user = await User.findOne({ email })
    if (user) return res.status(400).json({ msg: 'user already exists' })

    // create new user
    const newUser = new User({ name, email, password })

    // create salt and hash
    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(newUser.password, salt)

    // save new user to database with hashed password
    newUser.password = hash 

    let userModel = await newUser.save()
    res.json({
      id: userModel.id,
      name: userModel.name,
      email: userModel.email
    })
  }




  // registerNewUser: function(req, res) {
  //   const { name, email, password } = req.body

  // // validation
  // if (!name || !email || !password) {
  //    res.status(400).json({ msg: 'Please enter all fields' })
  // }

  // // Check for existing user
  // User.findOne({ email })
  //   .then(user => {
  //     if (user) return res.status(400).json({ msg: 'user already exists' })

  //     // create new user
  //     const newUser = new User({ name, email, password })

  //     // create salt and hash
  //     bcrypt.genSalt(10, (err, salt) => {
  //       if (err) throw err

  //       bcrypt.hash(newUser.password, salt, (err, hash) => {
  //         if (err) throw err 

  //         // save new user to database with hashed password
  //         newUser.password = hash 
  //         newUser.save()
  //           .then(user => {
  //             res.json({
  //               user: {
  //                 id: user.id,
  //                 name: user.name,
  //                 email: user.email
  //               }
  //             })
  //           })
  //       })
  //     })
  //   })
  // }

}