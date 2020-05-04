import React, { Component } from 'react';

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
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
});

function getHeight(height, calc, heightOffset) {
  if (height === undefined) {
    return '100%';
  }
  if (height === 'fill') {
    return window.innerHeight - heightOffset + (calc || 0);
  }
  return height;
}

function getPadding(padding) {
  if (padding === undefined) {
    return 16;
  }
  return padding;
}


class Form extends Component {

  getGridContent = (id) => {
    const scheme = this.props.scheme[id];
    const data = this.props.data[id];
    const cache = this.props.cache[id];
    const route = this.props.route;

    return scheme.map((item) => {
      if (item.hide !== undefined) {
        if (item.hide(this.props.data)) {
          return null;
        }
      }
      return components(id, item, data[item.prop], cache[item.prop], this.props.data, route, this.props.onChange);
    });
  }

  getGridComponent = (item) => {
    if (item.hide !== undefined && item.hide(this.props.data)) {
        return null;
    }
    if (item.class === 'main') {
      return (
        <Grid key={item.id} item xs={item.xs}>
          <Paper 
            style={{ height: getHeight(item.height, item.calc, this.props.heightOffset), padding: getPadding(item.padding) }} 
            className={this.props.classes.paper}
          >
            {this.getGridContent(item.id)}
          </Paper>
        </Grid>
      )
    }
    return (
      <Grid key={item.id} item xs={item.xs}>
        {this.getGridContent(item.id)}
      </Grid>
    )
  }

  render({ debug, scheme, data, cache, classes } = this.props) {
    if (debug) {
      return <Debug scheme={scheme} data={data} cache={cache} />
    }
    if (scheme && scheme.grid && data) {
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
