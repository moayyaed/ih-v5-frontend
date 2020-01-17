import React, { Component } from 'react';
import core from 'core';

import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

import { withStyles } from '@material-ui/core/styles';

import css from './main.module.css';

const styles = {
  page: {
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
      <div>
        123
      </div>
    );
  }

}



export default core.connect(withStyles(classes)(Layout));