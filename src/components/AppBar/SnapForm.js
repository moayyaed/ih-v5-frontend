import React from 'react';
import core from 'core';

import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';

import CircularProgress from '@material-ui/core/CircularProgress';


const styles = {
  container: {
    top: 64, 
    width: '100%', 
    height: 'calc(100% - 64px)',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
  },
  container1: {
    width: '100%',
    height: '100%',
    padding: 24,
    paddingRight: 12,
    // backgroundColor: 'purple',
  },
  container2: { 
    width: 400, 
    flexShrink: 0,
    padding: 24,
    paddingLeft: 12,
    // backgroundColor: 'blue' 
  },
  paper: {
    width: '100%',
    height: '100%',
    padding: 8, 
  },
  paper2: {
    width: '100%',
    height: '100%',
    padding: 12,
    display: 'flex',
    flexDirection: 'column',
  },
  img: {
    width: '100%',
    height: '100%', 
    backgroundSize: 'contain',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
  },
  loading: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    height: 90,
  },
  text2: {
    height: '100%',
  }
}

const classes = theme => ({
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  dialog: {
      position: 'relative',
      minHeight: '80vh',
      maxHeight: '80vh',
  },
  appBar: {
    position: 'relative',
    backgroundColor: 'rgb(96, 125, 139)',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  dialog: {
      position: 'relative',
      minHeight: '80vh',
      maxHeight: '80vh',
  },
  input: {
    height: '100%!important'
  },
  root: {
    height: '100%',
  },
});

function SnapForm(props) {
  return (
    <Dialog 
      fullWidth 
      maxWidth="lg"
      open={props.state.open}
      classes={{ paper: props.classes.dialog }}  
    >
      <AppBar className={props.classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={props.onClose} >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={props.classes.title}>
            Bug Report
          </Typography>
          <Button autoFocus color="inherit" onClick={() => {}} >submit</Button>
        </Toolbar>
      </AppBar>
      <div style={styles.container} >
        <div style={styles.container1} >
          <Paper style={styles.paper} >
            {props.state.data ? 
              (<div style={{ ...styles.img, backgroundImage: `url(${props.state.data})` }} />) 
                :
              (
                <div style={styles.loading}>
                  <CircularProgress />
                  <div style={{ marginTop: 24 }}>Create screen snapshot, please wait...</div>
                </div>
              )
            }
            
          </Paper>
        </div>
        <div style={styles.container2} >
          <Paper style={styles.paper2} >
            <TextField 
              InputLabelProps={{ shrink: true }} 
              style={styles.text1} 
              fullWidth 
              label="Title" 
              variant="outlined"
              placeholder="What happened?"
            />
            <TextField 
              InputLabelProps={{ shrink: true }}
              InputProps={{ classes: { root: props.classes.root, input: props.classes.input } }}
              style={styles.text2} 
              multiline 
              label="Comment" 
              variant="outlined"
              placeholder="Leave a comment..." 
            />
          </Paper>
        </div>
      </div>
    </Dialog>
  );
}


export default withStyles(classes)(SnapForm);