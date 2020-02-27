import React from 'react';
import icon from 'components/icons'

const styles = {
  box: {
    display: 'flex',
  },
  logo: {
    width: 70,
    height: 70,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 5,
    zIndex: 1000,
  },
  stub: {
    width: 70,
    height: 35,
    backgroundColor: '#37474f',
    flexShrink: 0,
    zIndex: 101,
  },
  container: {
    width: '100%',
    height: 35,
    backgroundColor: '#37474f',
    boxShadow: 'rgba(0, 0, 0, 0.157) 0px 3px 10px, rgba(0, 0, 0, 0.227) 0px 3px 10px',
    overflow: 'hidden',
    zIndex: 100,
  },
  icon: {
    color: '#fafafa'
  }
};

function AppBar() {
  return (
    <div style={styles.box}>
      <div style={styles.stub}/>
      <div style={styles.logo}>
        {icon('logo', styles.icon)}
      </div>
      <div style={styles.container}/>
    </div>
  );
}


export default AppBar;