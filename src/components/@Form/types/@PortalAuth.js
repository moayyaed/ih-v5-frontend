import React, { Component } from 'react';
import core from 'core';

import NProgress from 'nprogress';

import icon from 'components/icons';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import anim1 from '../../../assets/anim1.mp4'
import anim2 from '../../../assets/anim2.mp4'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  signin: {
    width: 448,
    height: 500,
    padding: '48px 40px 36px',
  },
  signup: {
    display: 'flex',
    width: 748,
    height: 572,
    padding: '48px 40px 36px',
  },
  confirm: {
    display: 'flex',
    width: 748,
    height: 480,
    padding: '48px 40px 36px',
  },
  icon: {
    width: 138,
    height: 32,
  },
  icon2: {
    width: 125,
    height: 125,
    marginBottom: 32,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    color: '#202124',
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 1.3333,
  },
  logo2: {
    display: 'flex',
    alignItems: 'center',
  },
  title2: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 16,
    color: '#202124',
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 1.3333,
  },
  subtitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#202124',
    fontSize: 16,
    fontWeight: 400,
    letterSpacing: 0.1,
    lineHeight: 1.5,
    paddingBottom: 0,
    paddingTop: 8,
  },
  content: {
    display: 'inline-block',
    fontSize: 14,
    padding: '24px 0px 0px',
    verticalAlign: 'top',
    whiteSpace: 'normal',
    width: '100%',
  },
  content2: {
    display: 'flex',
    fontSize: 14,
    padding: '24px 0px 0px',
    width: 355,
    height: 420,
    flexDirection: 'column',
  },
  text2: {
    marginTop: 22,
  },
  text3: {
    color: '#5f6368',
    fontSize: 14,
    lineHeight: 1.4286,
    marginTop: 12,
    marginBottom: 12,
    display: 'flex',
    justifyContent: 'space-between',
  },
  text4: {
    marginLeft: 8,
  },
  text5: {
    marginLeft: 14,
    marginRight: 14,
    marginTop: 4,
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '0.75rem',
    textAlign: 'left',
    fontWeight: 400,
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
  },
  text6: {
    lineHeight: 1.625,
    fontSize: 16,
    letterSpacing: 0,
    color: '#202124',
    cursor: 'auto',
    fontFamily: 'Roboto,Arial,Helvetica,sans-serif',
    fontStyle: 'normal',
    fontWeight: 300,
  },
  text7: {
    marginTop: 38,
  },
  buttons: {
    marginTop: 38,
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttons2: {
    marginTop: 48,
    display: 'flex',
    justifyContent: 'space-between',
  },
  body1: {
    width: 402,
    height: 508,
  },
  body2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  boxPass: {
    marginTop: 24,
    display: 'flex',
  },
  title3: {
    width: 244,
    fontSize: 16,
    fontWeight: 300,
    textAlign: 'center',
  },
  video: {
    width: 285,
  },
}


function getUrl() {
  if (core.cache.conf === 1) {
    return 'intrahouse.ru';
  }
  if (core.cache.conf === 2) {
    return 'intrascada.com';
  }
  return 'intrahouse.ru';
}

class PortalAuth extends Component {
  state = { 
    step: 'signin', 
    showpass: false, 
    showpass2: false,
    email: '',
    login: '',
    pass: '',
    pass2: '',
    pass3: '',
    userid: null,
    code: '',
  }

  componentDidMount() {
    if (this.props.data.message) {
      core.actions.app.alertOpen('warning', this.props.data.message);
    }
  }

  req = (url, body) => {
    const fetch = window.__ihp2p ? window.__ihp2p.fetch : window.fetch;
    return new Promise((resolve, reject) => {
      NProgress.start();
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res => res.json())
      .then(data => {
        NProgress.done();
        if (data.res) {
          if (data.status) {
            resolve(data.payload);
          } else {
            core.actions.app.alertOpen('warning', data.message || '');
            reject();
          }
        } else {
          core.actions.app.alertOpen('warning', data.message);
          reject();
        }
      })
      .catch(() => {
        NProgress.done();
        core.actions.app.alertOpen('error', 'Не удается выполнить запрос. Попробуйте повторить попытку позже');
        reject();
      }) 
    }); 
  }
 
  handleSignUp = () => {
    this.setState({ 
      step: 'signup',
      showpass: false, 
      showpass2: false,
      login: '',
      pass: '',
      pass2: '',
      pass3: '',
      userid: null,
      code: '',
    })
  }

  handleSignIn = () => {
    this.setState({ 
      step: 'signin', 
      showpass: false, 
      showpass2: false,
      login: '',
      pass: '',
      pass2: '',
      pass3: '',
      userid: null,
      code: '',
    })
  }

  handleSignSubmit = () => {
    if (this.isFailEmail(this.state.email)) {
      core.actions.app.alertOpen('warning', 'Указан некорректный адрес электронный почты.');
    } else {
      this.req('/portal/auth/signin', { 
        email: this.state.email, 
        pass: this.state.pass, 
      })
      .then(res => {
        core.transfer.send('refresh_content');
      });
    }
  }

  handleConfirm = () => {
    if (this.isFailEmail(this.state.email)) {
      core.actions.app.alertOpen('warning', 'Указан некорректный адрес электронный почты.');
    } else if (this.state.pass2 !== this.state.pass3) {
      core.actions.app.alertOpen('warning', 'Введённые пароли не совпадают.');
    } else {
      this.req('/portal/auth/signup', { 
        email: this.state.email, 
        login: this.state.login, 
        pass: this.state.pass2, 
      })
      .then(res => {
        this.setState({ step: 'confirm', userid : res.userid })
      });
    }
  }

  handleConfirmCode = () => {
    this.req('/portal/auth/confirm', { 
      userid: this.state.userid,
      code: core.tools.sha256(`intra_code_${this.state.code}`),
    })
    .then(res => {
      core.transfer.send('refresh_content');
    });
  }

  isFailEmail = (email) => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return !re.test(String(email).toLowerCase());
  }

  handleChangeInput = (key, value) => {
    this.setState({ [key]: value });
  }

  handleChangePassVis = (e) => {
    this.setState({ showpass: e.target.checked })
  }

  handleChangePassVis2 = (e) => {
    this.setState({ showpass2: e.target.checked })
  }

  render() {
    if (this.state.step === 'signin') {
      return (
        <div style={styles.root}>
          <Paper style={styles.signin} >
            <div style={styles.logo}>
             {icon('logo4', styles.icon)}
            </div>
            <div style={styles.title}>
               Вход
            </div>
            <div style={styles.subtitle}>
              
            </div>
            <div style={styles.content}>
              <TextField 
                autoFocus 
                label="E-mail" 
                variant="outlined" 
                fullWidth 
                onChange={(e) => this.handleChangeInput('email', e.target.value)}
              />
              <TextField 
                style={styles.text2} 
                type={this.state.showpass ? 'text' : 'password'} 
                label="Password" 
                variant="outlined" 
                fullWidth
                onChange={(e) => this.handleChangeInput('pass', e.target.value)}
              />
              <FormControlLabel
                  control={<Checkbox color="primary" onChange={this.handleChangePassVis} />}
                  label="Показать пароль"
                  labelPlacement="end"
                />
              <div style={styles.text3}>
                <Link target="_blank" href={`https://${getUrl()}/my-account/lost-password/`}>
                  Забыли пароль?
                </Link>
                <Link target="_blank" href={`https://docs.${getUrl()}/ru_account_question`}>
                  Зачем нужен аккаунт?
                </Link>
              </div>
            </div>
            <div style={styles.buttons}>
              <Button color="primary" disableElevation onClick={this.handleSignUp}>
                Создать аккаунт
              </Button>
              <Button variant="contained" color="primary" disableElevation onClick={this.handleSignSubmit}>
                 Войти
              </Button>
            </div>
          </Paper>
        </div>
      )
    }
    if (this.state.step === 'signup') {
      return (
        <div style={styles.root}>
          <Paper style={styles.signup}>
            <div style={styles.body1}>
              <div style={styles.logo2}>
              {icon('logo4', styles.icon)}
              </div>
              <div style={styles.title2}>
                Создайте аккаунт
              </div>
              <div style={styles.subtitle}>
                
              </div>
              <div style={styles.content2}>
                <TextField
                  autoFocus
                  label="E-mail" 
                  size="small" 
                  variant="outlined"
                  value={this.state.email}
                  onChange={(e) => this.handleChangeInput('email', e.target.value)}
                />
                <TextField
                  style={styles.text2} 
                  label="Login" 
                  size="small" 
                  variant="outlined"
                  value={this.state.login}
                  helperText="Логин должен начинаться с буквы и состоять не менее чем из 6 символов; при создании логина можно использовать латинские буквы, цифры и тире" 
                  onChange={(e) => this.handleChangeInput('login', e.target.value)}
                />
                <div style={styles.boxPass}>
                  <TextField
                    type={this.state.showpass2 ? 'text' : 'password'}
                    label="Пароль" 
                    size="small" 
                    variant="outlined"
                    value={this.state.pass2}
                    onChange={(e) => this.handleChangeInput('pass2', e.target.value)}
                  />
                  <TextField
                    type={this.state.showpass2 ? 'text' : 'password'}
                    style={styles.text4} 
                    label="Подтвердить" 
                    size="small" 
                    variant="outlined"
                    value={this.state.pass3}
                    onChange={(e) => this.handleChangeInput('pass3', e.target.value)}
                  />
                </div>
                <div style={styles.text5}>
                  Пароль должен состоять как минимум из 8 символов и включать одну цифру. 
                </div>
                <FormControlLabel
                  control={<Checkbox color="primary" onChange={this.handleChangePassVis2} />}
                  label="Показать пароль"
                  labelPlacement="end"
                />
                <div style={styles.buttons}>
                  <Button color="primary" disableElevation onClick={this.handleSignIn}>
                    Войти
                  </Button>
                  <Button variant="contained" color="primary" disableElevation onClick={this.handleConfirm}>
                     Далее
                  </Button>
                </div>
              </div>
            </div>
            <div style={styles.body2}>
              <div style={styles.logo}>
                <video style={styles.video} autoPlay loop muted inline src={anim1} type="video/mp4" />
              </div>
              <div style={styles.title3}>
                Добро пожаловать в Сообщество INTRA!
              </div>
            </div>
          </Paper>
        </div>
      )
    }

    if (this.state.step === 'confirm') {
      return (
        <div style={styles.root}>
          <Paper style={styles.confirm}>
            <div style={styles.body1}>
              <div style={styles.logo2}>
              {icon('logo4', styles.icon)}
              </div>
              <div style={styles.title2}>
                 Подтвердите почту
              </div>
              <div style={styles.subtitle}>
                
              </div>
              <div style={styles.content2}>
                <div style={styles.text6}>
                  В целях безопасности мы должны убедиться, что это действительно вы.
                  Мы отправили вам письмо с 4-значным кодом потверждения на почту <Link href="#">{this.state.email}</Link> 
                </div>
                <TextField 
                  autoFocus 
                  style={styles.text7} 
                  label="Введите код подтверждения"
                  value={this.state.code}
                  onChange={(e) => this.handleChangeInput('code', e.target.value)} 
                />
                <div style={styles.buttons2}>
                  <Button color="primary" disableElevation onClick={this.handleSignUp}>
                    назад
                  </Button>
                  <Button variant="contained" color="primary" disableElevation onClick={this.handleConfirmCode}>
                    подтвердить
                  </Button>
                </div>
              </div>
            </div>
            <div style={styles.body2}>
              <div style={styles.logo}>
                <video style={styles.video} autoPlay loop muted inline src={anim2} type="video/mp4" />
              </div>
              <div style={styles.title3}>
              </div>
            </div>
          </Paper>
        </div>
      )
    }

    return null;
  }
}


export default React.memo(PortalAuth);