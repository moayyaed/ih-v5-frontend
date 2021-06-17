import React, { Component } from 'react';
import core from 'core';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { red } from '@material-ui/core/colors';


const styles = {
  root: {
    width: '100%',
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 24,
    paddingRight: 24,
  },
  error1: {
    marginTop: 18,
    marginBottom: 24,
    marginLeft: 12,
    marginRight: 12,
    background: '#ffebee',
    padding: 18,
    whiteSpace: 'pre-wrap',
    maxHeight: 250,
    overflowY: 'auto',
  },
  error2: {
    marginTop: 18,
    marginBottom: 24,
    marginLeft: 12,
    marginRight: 12,
    background: '#fffde7',
    padding: 18,
    whiteSpace: 'pre-wrap',
    maxHeight: 200,
    overflowY: 'auto',
  },
  text: {
    marginTop: 18,
    whiteSpace: 'pre-wrap',
  },
  button: {
    marginTop: 12,
  },
  button2: {
    marginTop: 12,
    position: 'absolute',
    right: 18,
  }
}

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(Button);

function getInfo(data) {
  let text = ''
  Object
    .keys(data)
    .forEach(key => {
      text = text + '- ' + key + '\n';
      Object
        .keys(data[key])
          .forEach(key2 => {
            text = text + '  - ' + key2 + ': ' + data[key][key2] + '\n';
          });
    });
  return text;
}


class AppError extends Component {
  state = { disabled: false }

  handleClick = () => {
    window.location = window.location.origin
  }

  handleReport = () => {
    const url = window.location.protocol === 'https:' ?
        'https://forum.ih-systems.com:40001/bug-report' : 'http://forum.ih-systems.com:40000/bug-report'
    const fetch = window.__ihp2p ? window.__ihp2p.fetch : window.fetch;
    
    this.setState({ disabled: true })

    fetch('/api/info', { headers: { token: core.cache.token } })
      .then(res => res.json())
      .then(json => {
        const info =  json.response ? json.data : {}
        fetch(url, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({ 
            title: `Error: ${this.props.error.title}`,
            comment: `${this.props.error.stack}\n\n${this.props.error.info}`,
            userAgent: getInfo({ ...core.whois, ...info }),
            img: ' ',
          }),
          method: 'POST',
        })
        .then(res => res.json())
        .then(data => {
          if (data.res) {
            core.actions.app.alertOpen('info', 'Cообщение отправлено!');
          } else {
            this.setState({ disabled: false })
            core.actions.app.alertOpen('warning', data.message);
          }
        })
        .catch(e => {
          this.setState({ disabled: false })
          core.actions.app.alertOpen('error', e.message);
        })
      })        
  }
  
  render() {
    const props = this.props;
    return (
      <div style={styles.root}>
        <Typography style={{ color: '#e53935' }} variant="h5" gutterBottom>
          Ошибка приложения
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {props.error.title}
        </Typography>
        <Divider />
        <Typography style={styles.error1} variant="body2" gutterBottom>
          {props.error.stack}
        </Typography>
        <Divider />
        <Typography style={styles.text} variant="body1" gutterBottom>
          {'Для возобновления работы приложения нажмите кнопку "Перезапустить".' + '\n' + 'Данная операция перезапустит интерфейс пользователя и никак не повлияет на работоспособность сервера.'}
        </Typography>
        <Button style={styles.button} variant="contained" color="primary" onClick={this.handleClick}>
          перезапустить
        </Button>
        <ColorButton disabled={this.state.disabled} style={styles.button2} variant="contained" color="primary" onClick={this.handleReport}>
          Cообщить о проблеме
        </ColorButton>
      </div>
    )
  }
}


export default AppError