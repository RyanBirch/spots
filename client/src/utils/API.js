import axios from 'axios'

export default {

  register: function(name, email, password) {
    return axios.post('/api/users/register', { name, email, password })
  },

  login: function(email, password) {
    return axios.post('/api/auth/authenticate', { email, password })
  },

  search: function(term, location, offset) {
    return axios.get(`/api/search/${term}/${location}/${offset}`)
  },

  getReviews: function(id) {
    return axios.get(`/api/search/reviews/${id}`)
  }
}