import React, { Component } from 'react';
import core from 'core';

import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

import { withStyles } from '@material-ui/core/styles';

import css from './main.module.css';
import Properties from './Properties';

const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  body: {
    width: '100%',
    height: '100%',
    padding: 20,
  },
  paper: {
    width: '100%',
    height: '100%',
  },
};

const classes = theme => ({
  root: {
  },
});


class Layout extends Component {

  componentDidMount() {

  }

  componentWillUnmount() {
 
  }

  render({ id, state, match, classes, onClick } = this.props) {
    return (
      <div style={styles.root} >
        <div style={styles.body} >
          <Paper style={styles.paper} elevation={2} >

          </Paper>
        </div>
        <Properties />
      </div>

    );
  }

}



export default core.connect(withStyles(classes)(Layout));