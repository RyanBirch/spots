import axios from 'axios'

export default {

  register: function(name, email, password) {
    return axios.post('/api/users/register', { name, email, password })
  },

  login: function(email, password) {
    return axios.post('/api/auth/authenticate', { email, password })
  },

  search: function(term, location) {
    // return axios.get(`/api/search/${term}/${location}`)
    axios.get(`/api/search/${term}/${location}`)
      .then(res => console.log(res.data.businesses))
  }
}