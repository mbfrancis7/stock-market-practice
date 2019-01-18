import React, { Component } from 'react';

import Body from './body.js';
import Footer from './footer.js';

class Wrapper extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Body />
        <Footer />
      </div>
    )
  }
}

export default Wrapper;