import React, { Component } from 'react';

import Content from './content.js'
class Body extends Component {
  constructor(props) {
    super(props),
    this.state = {
      pictures: 'test'
    },
    this.method = this.method.bind(this)
  }

  method() {
    console.log(this.state);
  }

  render() {
    let arr = [1,2,3,4,5,6,7,8,9,10]
    let content = [];
    for(let i in arr) {
      content.push(<Content content={arr[i]}/>);
    }
    return(
      <div className='body'>
        {content}
      </div>
    )
  }
}

export default Body;