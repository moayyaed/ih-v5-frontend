import React, { Component } from 'react';

import icon from 'components/icons';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// import gif1 from '../../../assets/animation_1.gif'
// import gif2 from '../../../assets/animation_2.gif'
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
    marginTop: 22,
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

class PortalAuth extends Component {
  state = { step: 'signin', showpass: false, showpass2: false }
 
  handleSignUp = () => {
    this.setState({ step: 'signup' })
  }

  handleSignIn = () => {
    this.setState({ step: 'signin' })
  }

  handleConfirm = () => {
    this.setState({ step: 'confirm' });
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
              <TextField autoFocus label="E-mail" variant="outlined" fullWidth />
              <TextField 
                style={styles.text2} 
                type={this.state.showpass ? 'text' : 'password'} 
                label="Password" 
                variant="outlined" 
                fullWidth
              />
              <FormControlLabel
                  control={<Checkbox color="primary" onChange={this.handleChangePassVis} />}
                  label="Показать пароль"
                  labelPlacement="end"
                />
              <div style={styles.text3}>
                Используйте аккаунт <Link href="https://ih-systems.com/" target="_blank">ih-systems.com</Link> для получения обновления.
              </div>
            </div>
            <div style={styles.buttons}>
              <Button color="primary" disableElevation onClick={this.handleSignUp}>
                Создать аккаунт
              </Button>
              <Button variant="contained" color="primary" disableElevation>
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
                Создайте аккаунт IH-SYSTEMS
              </div>
              <div style={styles.subtitle}>
                
              </div>
              <div style={styles.content2}>
                <TextField
                  autoFocus
                  label="E-mail" 
                  size="small" 
                  variant="outlined" 
                />
                <TextField
                  style={styles.text2} 
                  label="Login" 
                  size="small" 
                  variant="outlined"
                  helperText="Можно использовать буквы латинского алфавита и цифры." 
                />
                <div style={styles.boxPass}>
                  <TextField
                    type={this.state.showpass2 ? 'text' : 'password'}
                    label="Пароль" 
                    size="small" 
                    variant="outlined"
                  />
                  <TextField
                    type={this.state.showpass2 ? 'text' : 'password'}
                    style={styles.text4} 
                    label="Подтвердить" 
                    size="small" 
                    variant="outlined"
                  />
                </div>
                <div style={styles.text5}>
                  Пароль должен содержать не менее восьми знаков, включать буквы верхнего регистроа и цифры 
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
                Тут должен быть крутой слоган
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
                  Мы отправили вам письмо с 6-значным кодом потверждения на почту <Link href="#">dev@ih-systems.com</Link> 
                </div>
                <TextField autoFocus style={styles.text7} label="Введите код подтверждения" />
                <div style={styles.buttons2}>
                  <Button color="primary" disableElevation onClick={this.handleSignUp}>
                    назад
                  </Button>
                  <Button variant="contained" color="primary" disableElevation>
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
                Где тексты лебовски???.
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