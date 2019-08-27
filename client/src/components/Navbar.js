import React from 'react'
import { Redirect, Link } from 'react-router-dom'

class Navbar extends React.Component {

  state = {
    redirectToLogin: false,
    redirectToHome: false
  }

  handleLog = event => {
    if (event.target.textContent === 'Log out') {
      localStorage.removeItem('token')
      if (window.location.pathname !== '/') {
        this.setState({ redirectToHome: true })
      } else {
        window.location.reload()
      }
    } else {
      this.setState({ redirectToLogin: true })
    }
  }

  render() {

    if (this.state.redirectToLogin) return <Redirect to="/login" />
    if (this.state.redirectToHome) return <Redirect to="/" />

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{ lineHeight: '2em' }}>

        <span className="navbar-brand mb-0 h1 mx-auto pl-4" style={{ fontSize: "2em", marginLeft: "2em" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#F7A216", fontFamily: "Lobster, cursive", fontSize: "1.25em" }}>
             <i className="fa fa-coffee" style={{ color: "#F7A216" }}></i> Spots
           </Link>
         </span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link to="/search"><button className="btn" style={{ marginRight: '1em', color: '#F7A216', border: 'none' }}> Search</button></Link>
            </li>
            <li className="nav-item active">
              {localStorage['token'] ? <Link to="/profile"><button className="btn" style={{ marginRight: '1em', color: '#F7A216', border: 'none' }}>My Spots</button></Link> : ''}
            </li>
            <li className="nav-item active">
              <button className="btn" style={{ marginRight: '1em', color: '#F7A216', border: 'none' }} onClick={this.handleLog}>{localStorage['token'] ? "Log out" : "Log in"}</button>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar
