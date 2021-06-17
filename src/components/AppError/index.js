import React from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


const styles = {
  root: {
    width: '100%',
    padding: 24,
  },
  error1: {
    marginTop: 24,
    marginLeft: 12,
    marginRight: 12,
    background: '#ffebee',
    padding: 18,
    whiteSpace: 'pre-wrap',
    maxHeight: 200,
    overflowY: 'auto',
  },
  error2: {
    marginTop: 24,
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
    marginTop: 24,
    whiteSpace: 'pre-wrap',
  },
  button: {
    marginTop: 24,
  }
}

function handleClick() {
  window.location = window.location.origin
}

function AppError(props) {
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
      <Button style={styles.button} variant="contained" color="primary" onClick={handleClick}>
        перезапустить
      </Button>
    </div>
  )
}


export default AppError