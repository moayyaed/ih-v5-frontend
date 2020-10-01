import React from 'react';
import core from 'core';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import IconButton from '@material-ui/core/IconButton';
import FilledInput from '@material-ui/core/FilledInput';

import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


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
    marginTop: 14, 
    marginBottom: 8,
  },
  text: {
    marginTop: 6, 
    marginBottom: 6,
  },
  adornment: {
    position: 'absolute',
    right: 4,
  },
  passText: {
    padding: 0,
  }
}

function setUsername(username) {
  if (window.localStorage !== undefined && username !== '') {
    window.localStorage.setItem('username', username);
  }
}

function getUsername() {
  if (window.localStorage !== undefined) {
    const username = window.localStorage.getItem('username');
    if (username !== null) {
      return username;
    }
  }
  return 'admin';
}

const token = window.localStorage.getItem('token');

if (token) {
  // core.network.realtime.start(token);
  // core.actions.app.auth(res)
}

function Login() {
  const [values, setValues] = React.useState({
    username: getUsername(),
    password: '',
    rememberme: false,
    showPassword: false,
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setUsername(values.username);

    core
    .request({ method: 'login', params: values })
    .ok((res) => {
      if (res) {
        core.actions.app.auth(res)
      } else {
        core
          .request({ method: 'init' })
          .ok(() => core.actions.app.auth(true));
      }
    });
  }

  if (token) {
    // return null;
  }

  return (
    <div style={styles.root}>
      <div style={styles.page}>
        <div style={styles.panel1}>
          <div style={styles.logoText1}>Welcome to</div>
          <div style={styles.logoText2}>IH-SYSTEMS</div>
          <div style={styles.logoText3}><a style={styles.url}>ih-systems.com | Platform 5.1.0</a></div>
        </div>
        <div style={styles.panel2}>
          <div style={styles.header}>
            <div style={styles.headerText}>Login</div>
            <div style={styles.headerBorder} />
          </div>
          <div style={styles.form}>
            <form onSubmit={handleSubmit}>
              <TextField 
                variant="filled"  
                fullWidth 
                name="username" 
                label="Username" 
                value={values.username}
                onChange={handleChange('username')}
                style={styles.text} 
              />
              <FormControl style={styles.text} fullWidth variant="filled">
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <FilledInput
                  style={styles.passText}
                  className="inputpass"
                  name="password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment style={styles.adornment} position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControlLabel
                value="end"
                control={<Checkbox value={values.rememberme} color="primary" onChange={handleChange('rememberme')} />}
                label="Remember Me"
              />
              <Button 
                fullWidth
                type='submit'
                variant="outlined"
                style={styles.button}
              >
                Enter
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Login;