import React from 'react';
import icon from 'components/icons'

const styles = {
  box: {
    display: 'flex',
  },
  logo: {
    width: 60,
    height: 60,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    zIndex: 1000,
  },
  stub: {
    width: 60,
    height: 35,
    backgroundColor: '#607D8B',
    flexShrink: 0,
    zIndex: 101,
  },
  container: {
    width: '100%',
    height: 35,
    backgroundColor: '#607D8B',
    boxShadow: 'rgba(0, 0, 0, 0.157) 0px 3px 10px, rgba(0, 0, 0, 0.227) 0px 3px 10px',
    overflow: 'hidden',
    zIndex: 100,
  },
  icon: {
    color: '#64b4d7',
    fontSize: 40,
  }
};

function AppBar() {
  return (
    <div style={styles.box}>
      <div style={styles.stub}/>
      <div style={styles.logo}>
        {icon('logo2', styles.icon)}
      </div>
      <div style={styles.container}/>
    </div>
  );
}


export default AppBar;