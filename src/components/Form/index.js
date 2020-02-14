import React, { Component } from 'react';
import core from 'core';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Prism from 'prismjs';
import './prism.css';


const classes = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Form extends Component {
  
  componentDidMount() {
    Prism.highlightAll (); 
  }

  render({ scheme, data, classes } = this.props) {
    return (
      <>
        <pre> 
          <code className = "language-javascript"> 
            {JSON.stringify(scheme, null, 2)}
          </ code> 
        </ pre>
        <pre> 
          <code className = "language-javascript"> 
          {JSON.stringify(data, null, 2)}
          </ code> 
        </ pre>
      </>
    )
  }
}


export default withStyles(classes)(Form);