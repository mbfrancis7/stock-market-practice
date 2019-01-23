import React, { Component } from 'react';

import SignupForm from './signup.js';

class AuthPage extends Component {
  constructor(props) {
    super(props)
  }

  signup = function(values) {
    if(values.password !== values.confirmPassword) {
      return window.alert('Passwords do not match')
    } else {
      console.log(values)
      let url = 'http://127.0.0.1:3000/api/signup';
      fetch(url, {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(values)
      })
      .then(res => res.json())
      .then(res => {
        if(res.auth) {
        console.log('Get Posts')
      }})
      .catch(err => console.log(err))
    }
  }

  signin = function(values) {
    console.log(values)
  }

  render() {
    return(
        <SignupForm onSubmit={this.signup} className='authPage'/>
    )
  }
}

export default AuthPage;