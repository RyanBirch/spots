import axios from 'axios'

export default {

  register: function(name, email, password) {
    return axios.post('/api/users/register', { name, email, password })
  }
}