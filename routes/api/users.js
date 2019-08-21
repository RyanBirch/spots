const router = require('express').Router()
const usersController = require('../../controllers/usersController')
const isAuthenticated = require('../../middleware/isAuthenticated')
const User = require('../../models/User')

// /api/users

// signup
router.post('/register', usersController.registerNewUser)

// add to a user's favorites list
router.post('/list/add', isAuthenticated, usersController.addToFav)

// get user's favorites
router.get('/list/get', isAuthenticated, usersController.getFavs)

// delete location from favorites list
router.delete('/list/delete/:spotID', isAuthenticated, usersController.deleteFav)



// create a new custom list
router.post('/lists/create/:listName', isAuthenticated, (req, res) => {
  let id = req.user.id 
  let newList = {
    name: req.params.listName,
    list: []
  }

  User.findByIdAndUpdate(id)
    .then(user => {
      user.lists.push(newList)
      user.save()
      res.send(user)
    })
    .catch(err => res.send(err))
})

router.post('/lists/add/:listName', isAuthenticated, (req, res) => {
  let id = req.user.id 
  let listName = req.params.listName 

  User.update({ 
    _id: id,
    'lists.name': [listName]
  },{ 
    $push: { 'lists.$.list': req.body } 
  }) 
  .then(user => res.send(user))
  .catch(err => res.send(err))

})

module.exports = router