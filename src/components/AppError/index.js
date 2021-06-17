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
    marginLeft: 12,
    marginRight: 12,
    background: '#ffebee',
    padding: 18,
    whiteSpace: 'pre-wrap',
    maxHeight: 200,
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
            img: 'data:image/png;base64,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',
          }),
          method: 'POST',
        })
        .then(res => res.json())
        .then(data => {
          if (data.res) {
            core.actions.app.alertOpen('info', 'Спасибо за ваш отзыв!');
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
        <Typography style={styles.error2} variant="body2" gutterBottom>
          {props.error.info}
        </Typography>
        <Divider />
        <Typography style={styles.text} variant="body1" gutterBottom>
          {'Для возобновления работы приложения нажмите кнопку "Переазпустить".' + '\n' + 'Данная операция перезапустит интерфейс пользователя и никак не повлияет на работоспособность сервера.'}
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