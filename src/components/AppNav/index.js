import React, { Component } from 'react';

import Panel from 'components/Panel';


const styles = {
  box: {
    height: '100%',
    backgroundColor: '#ECEFF1',
    padding: 0,
    flexShrink: 0,
    overflow: 'hidden',
    borderRight: '1px solid #d3d3d3',
  }
};


function AppNav (props) {
  if (true) {
    return (
      <Panel width={200} position="right" style={styles.box}>
        APP_NAV
      </Panel>
    );
  }
  return null;
}


export default AppNav;