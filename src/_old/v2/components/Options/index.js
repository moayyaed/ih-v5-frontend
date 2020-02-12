import React, { Component } from 'react';
import core from 'core';

import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Tabs from './Tabs';
import Tab from './Tab';


const styles = {
  box: {
    width: '100%',
    height: '100%',
  },
};

const classes = theme => ({
  root: {
  },
});


class Options extends Component {

  static defaultProps = {
    id: 'options'
  };

  componentDidMount() {
  }

  handleChange = (e, v) => {
    const nav = core.nav.state;
    core.nav.push(`${core._options.route}/${nav.menuid}/${nav.navcomponent}/${nav.navid}/${v}`);
  }

  render({ id, state, match, classes, onClick } = this.props) {
    return (
      <div style={styles.box}>
        <div >
          <Tabs value={this.props.state.selectid} onChange={this.handleChange} >
            {this.props.state.tabs.map(i => <Tab key={i.id} value={i.id} label={i.title} />)}
          </Tabs>
          <Typography className={classes.padding} />
        </div>
        <div style={{ width: '100%', height: '100%', backgroundColor: '#f5f5f5', padding: 20 }}>
          CONTENT
        </div>
      </div>
    );
  }
}



export default core.connect(withStyles(classes)(Options));