import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updatePortfolio } from './actions.js';

const mapDispatchToProps = dispatch => ({
  updatePortfolio: (portfolioInfo) => {
    dispatch({
      type: updatePortfolio,
      payload: portfolioInfo
    })
  }
})

class Portfolio extends Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    // fetch(`http://127.0.0.1:3333/contentapi/portfolio/${this.props.}`)
    // .then(res => res.json())
    // .then(portfolio => this.props.updatePortfolio(portfolio))
    // .catch(err => console.log(err))
  }

  render() {
    return(
      <div>
        <h1>Stocks</h1>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Portfolio);