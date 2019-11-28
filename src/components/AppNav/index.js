import React, { Component } from 'react';
import core from 'core';

import Panel from 'components/#basic/Panel';


const styles = {
  box: {
    height: '100%',
    backgroundColor: '#ECEFF1',
    padding: 6,
    flexShrink: 0,
    overflow: 'hidden',
    borderRight: '1px solid #d3d3d3',
  }
};


class AppNav extends Component {

  componentDidMount() {
    core.event('app:nav', this.props.navid);
  }

  render() {
    return (
      <Panel width={200} position="right" style={styles.box}>
        APP_NAV
      </Panel>
    );
  }
}

export default AppNav;