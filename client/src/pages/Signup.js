import React from 'react'
import SignupForm from '../components/SignupForm'
import API from '../utils/API'
import { Link, Redirect } from 'react-router-dom'
import Error from '../components/Error'
import Navbar from '../components/Navbar'

class Signup extends React.Component {

  state = {
    name: '',
    email: '',
    password: '',
    redirect: false,
    error: false,
    errorMessage: ''
  }

  handleSubmit = event => {
    event.preventDefault()

    let { name, email, password } = this.state
    API.register(name, email, password)
      .then(res => {
        localStorage['token'] = res.data.token
        this.setState({ redirect: true })
      })
      .catch(err => {
        console.log(err.response.data.msg)
        this.setState({ errorMessage: err.response.data.msg})
      })
  }

  handleInputChange = event => {
    let { name, value } = event.target
    this.setState({ [name]: value })
  }

  render() {

    if (this.state.redirect) return <Redirect to="/" />

    return (
      <div>
        <Navbar />
        <Error message={this.state.errorMessage} />
        <SignupForm 
          name={this.state.name}
          email={this.state.email}
          password={this.state.password}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit} 
        />

        <h3 className="text-center">If you already have an account, you can <Link to="/login">log in</Link></h3>
      </div>
    )
  }
}

export default Signup