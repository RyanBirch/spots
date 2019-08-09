import React from 'react'
import SignupForm from '../components/SignupForm'
import API from '../utils/API'
import Navbar from '../components/Navbar'

class Signup extends React.Component {

  state = {
    name: '',
    email: '',
    password: '',
  }

  handleSubmit = event => {
    event.preventDefault()

    let { name, email, password } = this.state
    API.register(name, email, password)
      .then(res => {
        console.log(res.data)
        localStorage['token'] = res.data.token
        this.forceUpdate()
      })
  }

  handleInputChange = event => {
    let { name, value } = event.target
    this.setState({ [name]: value })
  }

  render() {
    return (
      <div>
        <Navbar />
        <SignupForm 
          name={this.state.name}
          email={this.state.email}
          password={this.state.password}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit} 
        />
      </div>
    )
  }
}

export default Signup