import React, { PureComponent } from 'react';
import core from 'core';

const styles = {
  root: {
    top: 35,
    position: 'absolute',
    width: '100%',
    height: 'calc(100% - 35px)',
  },
  frame: {
    width: '100%',
    height: '100%',
    border: 'unset',
  },
}


class AppHelp extends PureComponent {

  render() {
    return (
      <div style={styles.root}>
        <iframe key={this.props.id} style={styles.frame} src={`${window.location.protocol}//docs.ih-systems.com/ru_${this.props.id}`} />
      </div>)
    ;
  }
}


export default AppHelp;
