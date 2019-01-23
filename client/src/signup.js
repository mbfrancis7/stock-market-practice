import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

function SignupForm(props) {
  const { handleSubmit } = props;

  return(
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" component="input" type="text" />
        </div>
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
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <Field name='confirmPassword' component='input' type='password' />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

SignupForm = reduxForm({form: 'signup'})(SignupForm)

export default SignupForm;