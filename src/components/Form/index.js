import React, { Component } from 'react';
import core from 'core';

import Prism from 'prismjs';
import './prism.css';

class Form extends Component {
  
  componentDidMount() {
    // console.log('new');
    Prism.highlightAll (); 
  }

  render({ state } = this.props) {
    // console.log('render')
    return (
      <>
        <pre> 
          <code className = "language-javascript"> 
            {JSON.stringify(state.scheme, null, 2)}
          </ code> 
        </ pre>
        <pre> 
          <code className = "language-javascript"> 
          {JSON.stringify(state.data, null, 2)}
          </ code> 
        </ pre>
      </>
    )
  }
}


export default Form;