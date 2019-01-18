import React, { Component } from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './app.css';
import Wrapper from './wrapper.js';
import Header from './header.js';
import Login from './login.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      email: null,
      pwd: null,
      userProfile: null,
      posts: null
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePwdChange = this.handlePwdChange.bind(this)
    this.submitCreds = this.submitCreds.bind(this)
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    })
  }

  handlePwdChange(e) {
    this.setState({
      pwd: e.target.value
    })
  }

  submitCreds(e) {
    e.preventDefault()
    let creds = {
      email: this.state.email,
      password: this.state.pwd
    }
    fetch(`http://${window.location.hostname}:3000/login`, {
      method: 'POST',
      body: JSON.stringify(creds),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => {
        this.setState({
          posts: response,
          auth: true
        })
      }
    )
  }

  render() {
    // this feels like it defeats the point of react router
    if(this.state.auth) {
      return (
        <Router>
          <div>
            <Header userProfile={this.user}/>
            <Switch>
              {/* <Route exact path='/' render={(props) => <Login {...props} submitCreds={this.submitCreds} handleEmailChange={this.handleEmailChange} handlePwdChange={this.handlePwdChange}/>}/> */}
              {/* <Route exact path='/home' component={Wrapper}/> */}
              <Route exact path='/' component={Wrapper}/>
            </Switch>
          </div>
        </Router>
      )
    } else {
      return(
        <Router>
          <div>
            <Header userProfile={this.user}/>
            <Switch>
              <Route exact path='/' render={(props) => <Login {...props} submitCreds={this.submitCreds} handleEmailChange={this.handleEmailChange} handlePwdChange={this.handlePwdChange}/>}/>
              {/* <Route exact path='/home' component={Wrapper}/> */}
            </Switch>
          </div>
        </Router>
      )
    }
  }
}

const Application = hot(module)(App);


render (<Application />, document.getElementById('root'));