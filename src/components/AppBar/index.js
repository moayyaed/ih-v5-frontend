import React from 'react';
import core from 'core';

import icon from 'components/icons';

import IconButton from '@material-ui/core/IconButton';

import WebIcon from '@material-ui/icons/Web';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
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
  },
  button: {
    marginRight: 12,
    color: '#fafafa',
  },
};

function handleClick() {
  core.route('');
}

function handleClickUserInterface() {
  window.open('/', '_blank');
}

function handleClickSettings(menuid) {
  if (menuid === 'settings') {
    core.route('');
  } else {
    core.route('settings');
  }
}

function handleClickExit() {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('rememberme');
  
  core.network.realtime.destroy();
  core.actions.app.auth(false);
  
  window.location.href = "/admin";
}

function AppBar(props) {
  return (
    <div style={styles.box}>
      <div style={styles.stub}/>
      <div style={styles.logo}>
        <IconButton onClick={handleClick}>
          {icon('logo2', styles.icon)}
        </IconButton>
      </div>
      <div style={styles.container}>
        <IconButton style={styles.button} size="small" onClick={handleClickUserInterface}>
          <WebIcon fontSize="small" />
        </IconButton>
        <IconButton style={styles.button} size="small" onClick={() => handleClickSettings(props.menuid)}>
          <SettingsIcon style={{ color: props.menuid === 'settings' ? '#03A9F4' : 'unset' }} fontSize="small" />
        </IconButton>
        <IconButton style={styles.button} size="small" onClick={handleClickExit}>
          <ExitToAppIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
}


export default AppBar;