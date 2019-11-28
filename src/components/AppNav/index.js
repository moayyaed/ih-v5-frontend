import React, { Component } from 'react';
import core from 'core';


const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  }
};


class AppNav extends Component {

  componentDidMount() {
    core.event('app:nav', null, this.props.navid);
  }

  render() {
    return (
      <div style={styles.root}>
      
      </div>
    );
  }
}

export default AppNav;