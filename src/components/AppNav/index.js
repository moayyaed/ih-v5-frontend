import React, { Component } from 'react';
import core from 'core';


const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 200,
    height: '100%',
    backgroundColor: 'red',
  }
};


class AppNav extends Component {

  componentDidMount() {
    core.event('app:nav', this.props.navid);
  }

  render() {
    return (
      <div style={styles.root}>
      
      </div>
    );
  }
}

export default AppNav;