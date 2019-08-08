const router = require('express').Router()
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const usersController = require('../../controllers/usersController')

// @route: /api/users
// @desc: register new user
// @access public
router.route('/')
  .post(usersController.registerNewUser)

// router.post('/', (req, res) => {
//   const { name, email, password } = req.body

//   // validation
//   if (!name || !email || !password) {
//      res.status(400).json({ msg: 'Please enter all fields' })
//   }

//   // Check for existing user
//   User.findOne({ email })
//     .then(user => {
//       if (user) return res.status(400).json({ msg: 'user already exists' })

//       // create new user
//       const newUser = new User({ name, email, password })

//       // create salt and hash
//       bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(newUser.password, salt, (err, hash) => {
//           if (err) throw err 

//           // save new user to database with hashed password
//           newUser.password = hash 
//           newUser.save()
//             .then(user => {
//               res.json({
//                 user: {
//                   id: user.id,
//                   name: user.name,
//                   email: user.email
//                 }
//               })
//             })
//         })
//       })
//     })
// })

module.exports = router