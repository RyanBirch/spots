import React from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

class Navbar extends React.Component {

  state = {
    redirect: false
  }

  handleClick = event => {
    if (event.target.textContent === 'Log out') {
      localStorage.removeItem('token')
      this.forceUpdate()

      // *** possibly send them back to the home page *** //

    } else {
      this.setState({ redirect: true })
    }
  }

  render() {

    if (this.state.redirect) return <Redirect to="/login" />

    return (
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <span className="navbar-brand mb-0 h1" style={{ fontSize: "2em", marginLeft: "2em" }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>App</Link>
        </span>
        <button className="btn btn-light" onClick={this.handleClick}>{localStorage['token'] ? "Log out" : "Log in"}</button>
      </nav>
    )
  }
}

export default Navbar
