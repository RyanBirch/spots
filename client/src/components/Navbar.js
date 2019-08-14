import React from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

class Navbar extends React.Component {

  state = {
    redirectToLogin: false,
  }

  handleClick = event => {
    if (event.target.textContent === 'Log out') {
      localStorage.removeItem('token')
      this.forceUpdate()
    } else {
      this.setState({ redirectToLogin: true })
    }
  }

  render() {

    if (this.state.redirectToLogin) return <Redirect to="/login" />

    return (
      // <nav className="navbar navbar-dark bg-dark fixed-top" style={{ lineHeight: '2em' }}>
      //   <span className="navbar-brand mb-0 h1" style={{ fontSize: "2em", marginLeft: "2em" }}>
      //     <Link to="/" style={{ textDecoration: "none", color: "white", fontFamily: "Lobster, cursive", fontSize: "1.25em" }}>
      //       <i className="fa fa-coffee" style={{ color: "white" }}></i> Spots
      //     </Link>
      //   </span>
      //   <button className="btn btn-light" style={{ marginRight: '1em' }} onClick={this.handleClick}>{localStorage['token'] ? "Log out" : "Log in"}</button>
      // </nav>



      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{ lineHeight: '2em' }}>

        <span className="navbar-brand mb-0 h1 mx-auto pl-4" style={{ fontSize: "2em", marginLeft: "2em" }}>
          <Link to="/" style={{ textDecoration: "none", color: "white", fontFamily: "Lobster, cursive", fontSize: "1.25em" }}>
             <i className="fa fa-coffee" style={{ color: "white" }}></i> Spots
           </Link>
         </span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto pull-right">
            <li className="nav-item active">
              <button className="btn btn-light" style={{ marginRight: '1em' }} onClick={this.handleClick}>{localStorage['token'] ? "Log out" : "Log in"}</button>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar
