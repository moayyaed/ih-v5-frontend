import React, { Component } from 'react';
import core from 'core';

import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Test from './Test'
import MTable from './MTable'


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

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const AntTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#8da2ac',
      opacity: 1,
    },
    '&$selected': {
      color: '#607d8b',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#8da2ac',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#8fa4ae',
  },
})(Tabs);


function getTab(v) {
  if (v === 0) {
    return <Test />;
  }
  if (v === 1) {
    return <MTable />;
  }
  if (v === 2) {
    return <Test />;
  }
  return null;
}

class Table extends Component {

  state = { value: 0 }

  static defaultProps = {
    id: 'table'
  };

  componentDidMount() {
  }

  handleChange = (e, v) => {
    this.setState((state) => {
      return { ...state, value: v }
    });
  }

  render({ id, state, match, classes, onClick } = this.props) {
    return (
      <div style={styles.box}>
        <div className={classes.demo1}>
          <AntTabs value={this.state.value} onChange={this.handleChange} aria-label="ant example">
            <AntTab label="Свойства" />
            <AntTab label="Каналы" />
            <AntTab label="БД" />
          </AntTabs>
          <Typography className={classes.padding} />
        </div>
        <div style={{ width: '100%', height: '100%', backgroundColor: '#f5f5f5', padding: 20 }}>
          {getTab(this.state.value)}
        </div>
      </div>
    );
  }
}



export default core.connect(withStyles(classes)(Table));