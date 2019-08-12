import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Search from './pages/Search'

class App extends Component {

  state = {
    userData: {}
  }

  getUserData = () => {
    if (localStorage['token']) {
      // do something
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <div className="container" style={{ paddingTop: "6em", paddingBottom: "3em" }}>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/search" component={Search} />
          </div>
        </Switch>
      </Router>
    )
  }
}

export default App
