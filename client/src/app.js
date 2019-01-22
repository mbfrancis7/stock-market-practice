import React, { Component } from 'react';
import {hot} from "react-hot-loader";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './header.js';
import AuthPage from './authPage.js';
import Home from './home.js';

class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div className='app'>
      <Header />
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path='/' component={AuthPage}/>
              <Route exact path='/home' component={Home}/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default hot(module)(App);
// export default App;