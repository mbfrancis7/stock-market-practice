import React, { Component } from 'react';
import { connect } from 'react-redux';

import SignupForm from './signup.js';
import LoginForm from './login.js';
import { authorized } from './actions.js';


const mapDispatchToProps = dispatch => ({
  authorized: function(payload) {
    dispatch({
      type: authorized,
      payload
    })
  }
})


class AuthPage extends Component {
  constructor(props) {
    super(props)
    this.state ={
      login: true,
      auth: false
    }
    this.switchAuth = this.switchAuth.bind(this)
  }

  switchAuth = function() {
    this.setState({login: !this.state.login})
  }

  signup = (values) => {
    if(values.password !== values.confirmPassword) {
      return window.alert('Passwords do not match')
    } else {
      fetch('http://127.0.0.1:3333/auth/signup', {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(values)
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if(res.auth) {
          this.props.authorized({name: res.name, id: res.id});
        }
      })
      .catch(err => console.log(err))
    }
  }

  login = values => {
    fetch('http://127.0.0.1:3333/auth/login', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(values)
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      if(res.auth) {
        this.props.authorized({name: res.name, id: res.id})
      }
    })
    .catch(err => {
      console.log('error', err)
    })
  }

  render() {
    if(this.state.login) {
      return(
        <LoginForm onSubmit={this.login} switchAuth={this.switchAuth} className='authPage'/>
      )
    } else {
      return(
        <SignupForm onSubmit={this.signup} switchAuth={this.switchAuth} className='authPage'/>
      )
    } 
  }
}

export default connect(null, mapDispatchToProps)(AuthPage);