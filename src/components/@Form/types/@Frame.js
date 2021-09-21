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
    return 'docs.intrahouse.ru';
  }
  if (core.cache.conf === 2) {
    return 'docs.intrascada.com';
  }
  return 'docs.intrahouse.ru';
}

function Frame(props) {
  return <iframe style={styles.frame} src={`${window.location.protocol}//${getUrl()}/${core.cache.lang}/changelog`} />
}


export default React.memo(Frame);