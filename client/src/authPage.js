import React, { Component } from 'react';

import LoginForm from './login.js';

class AuthPage extends Component {
  constructor(props) {
    super(props)
  }

  submit = function(values) {
    console.log(values)
  }

  render() {
    return(
        <LoginForm onSubmit={this.submit} className='authPage'/>
    )
  }
}

export default AuthPage;