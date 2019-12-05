import React, { Component } from 'react';
import core from 'core';

import Panel from 'components/#basic/Panel';
import Explorer from 'components/Explorer';


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
    // core.event('app:nav', this.props.params.navid);
  }

  render({ params, onClick } = this.props) {
    return (
      <Panel width={200} position="right" style={styles.box}>
        APP_NAV
        <Explorer />
      </Panel>
    );
  }
}

export default AppNav;