import React, { Component } from 'react';
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

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import background from '../../assets/background.png'


const styles = {
  root: {
    fontFamily: 'Roboto Condensed, sans-serif',
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f5f5f5',
    backgroundSize: 'cover',
  },
  container: {
    position: 'relative',
    width: 575,
    height: 425,
    borderRadius: 3,
    backgroundColor: 'white',
    overflow: 'hidden',
    boxShadow: '0px 53px 37px -39px rgba(0, 0, 0, 0.7)',
    background: `#405c68`,
    backgroundSize: 'cover',
  },
  page: {
    position: 'absolute',
    width: 575,
    height: 425,
    overflow: 'hidden',
    background: `url(${window.__ihp2p ? '/background.png' : background}) no-repeat center center`,
    backgroundSize: 'cover',
    opacity: 0.2,
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
    width: 116,
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

function setRememberme(rememberme) {
  if (window.localStorage !== undefined) {
    if (rememberme) {
      window.localStorage.setItem('rememberme', 'true');
    } else {
      window.localStorage.removeItem('rememberme');
    }
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

function getRememberme() {
  if (window.localStorage !== undefined) {
    const rememberme = window.localStorage.getItem('rememberme');
    if (rememberme !== null) {
      return true;
    }
  }
  return false;
}


function requestAuth(params) {
  core
  .request({ method: 'login', params })
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

function getParams(path) {
  const temp = {};
  const temp2 = path.slice(1).split('&');

  temp2.forEach(i => {
    const temp3 = i.split('=');
    if (temp3.length === 2) {
      temp[temp3[0]] = temp3[1];
    }
  });

  return temp;
}

const params = getParams(window.location.search)

const username = params.username;
const password = params.password;

if (username) {
  requestAuth({ username, password, memberme: getRememberme() })
} else {
  if (core.cache.token) {
    requestAuth({ rememberme: true, token: true })
  }
}

class Login extends Component {
  state = {
    username: getUsername(),
    password: '',
    rememberme: getRememberme(),
    showPassword: false,
    loading: !core.cache.token,
    version: '',
    header: '',
    title: '',
  }

  componentDidMount() {
    if (!core.cache.token) {
      const fetch = window.__ihp2p ? window.__ihp2p.fetch : window.fetch;

      fetch('/info')
        .then(res => res.json())
        .then(json => {
          this.setState({ loading: false, ...json })
        })
    }
  }

  handleChange = prop => event => {
    this.setState({ ...this.state, [prop]: event.target.value });
  };

  handleChange2 = prop => event => {
    this.setState({ ...this.state, [prop]: event.target.checked });
  };


  handleClickShowPassword = () => {
    this.setState({ ...this.state, showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleSubmit = (event) => {
    event.preventDefault();

    requestAuth(this.state);

    setUsername(this.state.username);
    setRememberme(this.state.rememberme)
  }
  
  render() {
    if (this.state.loading || core.cache.token) {
      return (
        <Backdrop style={{ background: 'unset', color: '#607d8b', zIndex: 10000 }} open >
          <CircularProgress color="inherit" />
        </Backdrop>
      )
    }
    
    return (
      <div style={styles.root}>
        <div style={styles.container}>
          <div style={styles.page} />
            <div style={styles.panel1}>
              <div style={styles.logoText1}>Добро пожаловать в</div>
              <div style={styles.logoText2}>{this.state.header}</div>
              <div style={styles.logoText3}><div style={styles.url}>{`${this.state.title} ${this.state.version}`}</div></div>
            </div>
            <div style={styles.panel2}>
              <div style={styles.header}>
                <div style={styles.headerText}>Авторизация</div>
                <div style={styles.headerBorder} />
              </div>
              <div style={styles.form}>
                <form onSubmit={this.handleSubmit}>
                  <TextField 
                    variant="filled"  
                    fullWidth 
                    name="username" 
                    label="Пользователь" 
                    value={this.state.username}
                    onChange={this.handleChange('username')}
                    style={styles.text} 
                  />
                  <FormControl style={styles.text} fullWidth variant="filled">
                    <InputLabel htmlFor="standard-adornment-password">Пароль</InputLabel>
                    <FilledInput
                      style={styles.passText}
                      className="inputpass"
                      name="password"
                      type={this.state.showPassword ? 'text' : 'password'}
                      value={this.state.password}
                      onChange={this.handleChange('password')}
                      endAdornment={
                        <InputAdornment style={styles.adornment} position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                          >
                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControlLabel
                    value="end"
                    control={<Checkbox checked={this.state.rememberme} color="primary" onChange={this.handleChange2('rememberme')} />}
                    label="Запомнить меня"
                  />
                  <Button 
                    fullWidth
                    type='submit'
                    variant="outlined"
                    style={styles.button}
                  >
                    Вход
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
    );
  }
}


export default Login;