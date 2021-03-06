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
  },


  // get a users' favorites
  getFavs: function(req, res) {
    User.findOne({ _id: req.user.id })
      .then(user => res.send(user.list.locations))
      .catch(err => res.send(err))
  },


  // delete from favorites list
  deleteFav: function(req, res) {
    let spotID = req.params.spotID
    User.findOne({ _id: req.user.id }, (err, user) => {
      user.list.locations.pull({ _id: spotID })
      user.save()
    })
    .then(() => res.sendStatus(200))
    .catch(err => res.send(err))
  },


  // create a custom list
  createList: function(req, res) {
    let id = req.user.id 
    let newList = {
      name: req.body.listName,
      list: []
    }

    User.findByIdAndUpdate(id)
      .then(user => {
        user.lists.push(newList)
        user.save()
        res.send(user)
      })
      .catch(err => res.send(err))
  },


  // delete a custom list
  deleteList: function(req, res) {
    let userID = req.user.id 
    let listID = req.params.listID 

    User.findByIdAndUpdate(userID) 
      .then(user => {
        user.lists.pull(listID)
        user.save()
        res.send(user)
      })
      .catch(err => res.send(err))
  },


  // get custom lists
  getLists: function (req, res) {
    let id = req.user.id

    User.findById(id)
      .then(user => {
        res.send(user.lists)
      })
      .catch(err => res.send(err))
  },


  // add an item to a custom list
  addToCustomList: function(req, res) {
    let id = req.user.id 
    let listName = req.params.listName 

    User.updateOne({ 
      _id: id,
      'lists.name': [listName]
    },{ 
      $push: { 'lists.$.list': req.body } 
    }) 
    .then(user => res.send(user))
    .catch(err => res.send(err))
  },
  

  // delete an item from a custom list
  deleteFromCustomList: function(req, res) {
    let userID = req.user.id 
    let listName = req.params.listName
    let spotID = req.params.spotID
    
    User.updateOne({
      _id: userID,
      'lists.name': [listName]
    }, {
      $pull: { 'lists.$.list': { _id: spotID } }
    })
    .then(user => res.send(user))
    .catch(err => res.send(err))
  }

}