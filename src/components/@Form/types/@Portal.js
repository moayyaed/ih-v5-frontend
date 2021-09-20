import React from 'react';
import core from 'core';


const styles = {
  frame: {
    width: '100%',
    height: '100%',
    border: 'unset',
  },
}

function getUrl() {
  if (core.cache.conf === 1) {
    return 'portal.intrahouse.ru';
  }
  if (core.cache.conf === 2) {
    return 'portal.intrascada.com';
  }
  return 'portal.intrahouse.ru';
}

function Portal(props) {
  return <iframe style={styles.frame} src={`${window.location.protocol}//${getUrl()}/ru_changelog`} />
}


export default React.memo(Portal);