import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './header.js';
import AuthPage from './authPage.js';
import Home from './home.js';

const mapStateToProps = state => ({
  user: state.user
})

class App extends Component {
  constructor(props) {
    super(props);
  }

  // componentWillUpdate() {
  //   if(this.props.user.auth) {
  //     fetch('http://127.0.0.1:3333/api/portfolio')
  //   }
  // }
  
  render() {
    console.log('app',this.props.user)
    return(
      <div className='app'>
      <Header />
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path='/' render={() => this.props.user.auth ? <Redirect to='/home'/> : <AuthPage/>}/>
              <Route exact path='/home' component={Home}/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(App);