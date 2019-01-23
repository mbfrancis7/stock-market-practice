import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

function LoginForm(props) {
  const { handleSubmit } = props;

  return(
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="email" />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <Field name='password' component='input' type='password' />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

LoginForm = reduxForm({form: 'login'})(LoginForm)

export default LoginForm;