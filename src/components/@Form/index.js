import React, { Component } from 'react';
import core from 'core';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import Debug from './Debug';
import components from './types';


const classes = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
});


class Form extends Component {

  getGridContent = (data) => {
    return data.map(components);
  }

  getGridComponent = (item) => {
    if (item.class === 'main') {
      return (
        <Grid key={item.id} item xs={item.xs}>
          <Paper className={this.props.classes.paper}>
            {this.getGridContent(this.props.scheme[item.id])}
          </Paper>
        </Grid>
      )
    }
    return (
      <Grid key={item.id} item xs={item.xs}>
        {this.getGridContent(this.props.scheme[item.id])}
      </Grid>
    )
  }

  render({ debug, scheme, data, classes } = this.props) {
    if (debug && scheme && data) {
      return <Debug scheme={scheme} data={data} />
    }
    if (scheme && data) {
      return (
        <Grid container spacing={3 || scheme.spacing}>
          {scheme.grid.map(this.getGridComponent)}
        </Grid>
      )
    }
    return null;
  }
}


export default withStyles(classes)(Form);
