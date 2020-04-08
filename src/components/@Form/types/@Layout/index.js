import React, { PureComponent } from 'react';
import core from 'core';

const styles = {
  root: {
    width: '100%',
    height: '100%',
  }
}


class Layout extends PureComponent {
  render() {
    return (
      <div style={styles.root}>
        LAYOUT
      </div>
    )
  }
}

export default Layout;