import React from 'react';
import core from 'core';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = {
  root: {
    fontFamily: 'Roboto Condensed, sans-serif',
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'auto',
  },
  page: {
    position: 'relative',
    width: 575,
    height: 425,
    borderRadius: 3,
    backgroundColor: 'white',
    backgroundSize: 'cover',
    overflow: 'hidden',
    boxShadow: '0px 53px 37px -39px rgba(0, 0, 0, 0.7)',
  },
  panel: {
    display: 'flex',
    position: 'absolute',
    width: '50%',
    height: '100%',
    right: 0,
    padding: 25,
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: '#ffffff',
    backgroundSize: 'auto',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  form: {

  },
  header: {
    color: '#252525',
    fontSize: 18,
  }
}

function Login() {
  return (
    <div style={styles.root}>
      <div style={styles.page}>
        <div style={styles.panel}>
          <div style={styles.header}>
            Sign in
          </div>
          <div style={styles.form}>
            <TextField variant="outlined" style={{ marginTop: 6, marginBottom: 6 }} fullWidth id="username" label="Username" />
            <TextField
              fullWidth
              variant="outlined"
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              style={{ marginTop: 6, marginBottom: 6 }}
            />
            <Button fullWidth style={{ marginTop: 24, marginBottom: 24 }} variant="outlined">Enter</Button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Login;