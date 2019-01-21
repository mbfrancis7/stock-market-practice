import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import "./styles.css";
import store from './store';
import App from "./app.js";

render(
  <Provider store={store}>
    <App />
  </Provider>,document.getElementById("root")
);