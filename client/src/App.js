import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Search from './pages/Search'
import Profile from './pages/Profile'

class App extends Component {

  render() {
    return (
      <Router>
        <div style={{ paddingTop: "6em", paddingBottom: "3em", backgroundColor: '#474747', minHeight: '100vh' }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
