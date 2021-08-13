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

function getUrl() {
  if (core.cache.conf === 1) {
    return 'docs.intrahouse.ru';
  }
  if (core.cache.conf === 2) {
    return 'docs.intrascada.com';
  }
  return 'docs.intrahouse.ru';
}

class AppHelp extends PureComponent {

  render() {
    return (
      <div style={styles.root}>
        <iframe id="__help" key={this.props.id} style={styles.frame} src={`${window.location.protocol}//${getUrl()}/ru_${this.props.id}`} />
      </div>)
    ;
  }
}


export default AppHelp;
