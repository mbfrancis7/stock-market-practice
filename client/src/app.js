import React, { Component } from 'react';
import {hot} from "react-hot-loader";
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './login.js';
import Home from './home.js';

class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div className='app'>
        <BrowserRouter>
          <Route exact path='/' component={Login}/>
        </BrowserRouter>
      </div>
    )
  }
}

export default hot(module)(App);