import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Prism from 'prismjs';
import './prism.css';


const classes = theme => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
});

class Debug extends Component {
  componentDidMount() {
    Prism.highlightAll (); 
  }

  render({ classes, scheme, data, cache } = this.props) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Scheme
            </Typography>
            <pre> 
              <code className="language-javascript"> 
                {JSON.stringify(scheme, null, 2)}
              </ code> 
            </ pre>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Data
            </Typography>
            <pre> 
              <code className="language-javascript"> 
              {JSON.stringify(data, null, 2)}
              </ code> 
            </ pre>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Cache
            </Typography>
            <pre> 
              <code className="language-javascript"> 
              {JSON.stringify(cache, null, 2)}
              </ code> 
            </ pre>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}


export default withStyles(classes)(Debug);
