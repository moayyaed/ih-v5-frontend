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
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.95) 50%), url(https://cdn.nextgov.com/media/img/upload/2020/01/14/NGiot20200114/860x394.jpg) no-repeat center center',
    backgroundSize: 'cover',
  },
  page: {
    position: 'relative',
    width: 575,
    height: 425,
    borderRadius: 3,
    backgroundColor: 'white',
    overflow: 'hidden',
    boxShadow: '0px 53px 37px -39px rgba(0, 0, 0, 0.7)',
    background: 'linear-gradient(45deg, rgba(96, 125, 139, 0.6) 0%, rgba(96, 125, 139, 0.9) 100%), url(https://cdn.nextgov.com/media/img/upload/2020/01/14/NGiot20200114/860x394.jpg) no-repeat center center',
    backgroundSize: 'cover',
  },
  panel1: {
    display: 'flex',
    position: 'absolute',
    width: '50%',
    height: '100%',
    left: 0,
    padding: 25,
    flexDirection: 'column',
  },
  logoText1: {
    color: '#fff',
    fontSize: 18,
  },
  logoText2: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  logoText3: {
    position: 'absolute',
    bottom: 6,
  },
  url: {
    color: '#e8e8e8',
  },
  panel2: {
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
    marginTop: 18,
    marginBottom: 18,
  },
  headerText: {
    color: '#878787',
    fontSize: 18,
    height: 28,
    // borderBottom: '2px solid #e8e8e8',
  },
  headerBorder: {
    background: '#9E9E9E',
    height: 4,
    width: 46,
  },
  button: {
    marginTop: 24, 
    marginBottom: 24,
  },
  text: {
    marginTop: 6, 
    marginBottom: 6,
  }
}

function Login() {
  return (
    <div style={styles.root}>
      <div style={styles.page}>
        <div style={styles.panel1}>
          <div style={styles.logoText1}>Welcome to</div>
          <div style={styles.logoText2}>IH-SYSTEMS</div>
          <div style={styles.logoText3}><a style={styles.url}>ih-systems.com | 5.1.0</a></div>
        </div>
        <div style={styles.panel2}>
          <div style={styles.header}>
            <div style={styles.headerText}>Login</div>
            <div style={styles.headerBorder} />
          </div>
          <div style={styles.form}>
            <TextField 
              variant="filled"  
              fullWidth 
              id="username" 
              label="Username" 
              style={styles.text} 
            />
            <TextField
              fullWidth
              variant="filled"
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              style={styles.text}
            />
            <Button 
              fullWidth
              variant="outlined"
              style={styles.button}
              onClick={() => core.init()}
            >
              Enter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Login;