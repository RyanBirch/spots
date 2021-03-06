import axios from 'axios'

export default {

  register: function(name, email, password) {
    return axios.post('/api/users/register', { name, email, password })
  },

  login: function(email, password) {
    return axios.post('/api/auth/authenticate', { email, password })
  },

  search: function(term, location, offset, sort_by) {
    return axios.get(`/api/search/${term}/${location}/${offset}/${sort_by}`)
  },

  getReviews: function(url) {
    let params = { 
      url 
    }
    return axios.get(`/api/search/reviews`, { params })
  },

  filterPrice: function(term, location, offset, sort_by, price) {
    return axios.get(`/api/search/filterPrice/${term}/${location}/${offset}/${sort_by}/${price}`)
  },

  addToList: function(spot) {
    let url = '/api/users/list/add'
    let config = {
      headers: {
        'x-auth-token': localStorage['token']
      }
    }
    return axios.post(url, spot, config)
  },

  getFavs: function() {
    let url = '/api/users/list/get'
    let config = {
      headers: {
        'x-auth-token': localStorage['token']
      }
    }
    return axios.get(url, config)
  },

  deleteFav: function(spotID) {
    let url = `/api/users/list/delete/${spotID}`
    let config = {
      headers: {
        'x-auth-token': localStorage['token']
      }
    }
    return axios.delete(url, config)
  },

  createCustomList: function(listName) {
    let url = `/api/users/lists/create`
    let config = {
      headers: {
        'x-auth-token': localStorage['token']
      }
    }
    return axios.post(url, { listName }, config)
  },

  getCustomLists: function() {
    let url = `/api/users/lists/get`
    let config = {
      headers: {
        'x-auth-token': localStorage['token']
      }
    }
    return axios.get(url, config)
  },

  addToCustomList: function(listName, spot) {
    let url = `/api/users/lists/add/${listName}`
    let config = {
      headers: {
        'x-auth-token': localStorage['token']
      }
    }
    return axios.post(url, spot, config)
  },

  deleteFromCustomList: function(listName, spotID) {
    let url = `/api/users/lists/delete/${listName}/${spotID}`
    let config = {
      headers: {
        'x-auth-token': localStorage['token']
      }
    }
    return axios.delete(url, config)
  },

  deleteList: function(listID) {
    let url = `/api/users/lists/deleteList/${listID}`
    let config = {
      headers: {
        'x-auth-token': localStorage['token']
      }
    }
    return axios.delete(url, config)
  }
}