import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

function LoginForm(props) {
  const { handleSubmit, switchAuth } = props;

  return(
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="email" />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <Field name='password' component='input' type='password' />
        </div>
        <button type="submit">Sign In</button>
        <button onClick={switchAuth} >Sign Up </button>
      </form>
    </div>
  )
}

LoginForm = reduxForm({form: 'login'})(LoginForm)

export default LoginForm;