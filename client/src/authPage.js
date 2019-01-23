import React, { Component } from 'react';

import LoginForm from './login.js';

class AuthPage extends Component {
  constructor(props) {
    super(props)
  }

  submit = function(values) {
    let url = window.location.href + 'api/login';
    console.log(url);
    fetch(url)
  }

  render() {
    return(
        <LoginForm onSubmit={this.submit} className='authPage'/>
    )
  }
}

export default AuthPage;