import React from 'react'

class Navbar extends React.Component {

  handleClick = event => {
    if (event.target.textContent === 'Log out') {
      localStorage.removeItem('token')
      this.forceUpdate()
    }
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <span className="navbar-brand mb-0 h1" style={{ fontSize: "2em", marginLeft: "2em" }}>App</span>
        <button className="btn btn-light" onClick={this.handleClick}>{localStorage['token'] ? "Log out" : "Log in"}</button>
      </nav>
    )
  }
}

export default Navbar
