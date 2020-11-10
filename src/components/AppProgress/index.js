import React, { Component } from 'react';
import core from 'core';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withStyles, makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Backdrop from '@material-ui/core/Backdrop';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Checkbox from '@material-ui/core/Checkbox';

import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import { Scrollbars } from 'react-custom-scrollbars';

import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import SwipeableViews from 'react-swipeable-views';

import Script from 'components/@Form/types/@Script';


const styles = {
  root: {
    width: '50%',
    height: '50%',
    // padding: '12px 18px',
    display: 'flex',
    flexDirection: 'column',
  },
  root2: {
    width: '50%',
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
  },
  container1: {
    borderBottom: '3px solid #EEEEEE',
    display: 'flex',
    justifyContent: 'center',
    flexShrink: 0,
    marginBottom: 25,
  },
  container4: {
    borderBottom: '3px solid #EEEEEE',
    display: 'flex',
    justifyContent: 'center',
    flexShrink: 0,
  },
  container2: {
    height: '100%',
    display: 'flex',
  },
  container3: {
    flexShrink: 0,
    height: 35,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container5: {
    height: '100%',
    display: 'flex',
    backgroundColor: '#fff',
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    flexShrink: 0,
    flexDirection: 'column',
    paddingBottom: 8.5,
  },
  list: {
    width: '100%',
    paddingLeft: 24,
  },
  list2: {
    width: '100%',
    paddingLeft: 24,
    paddingRight: 24,
  },
  row: {
    width: '100%',
    height: 65,
    margin: '4px 0px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #EEEEEE',
  },
  icon: {
    width: 50,
    height: 50,
    flexShrink: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },
  title: {
    marginLeft: 18,
    width: '100%',
  },
  size: {
    width: 90,
    flexShrink: 0,
  },
  fab: {
    width: 100,
    height: 100,
    backgroundColor: 'rgb(220, 0, 78)',
  },
  checkbox: {
    paddingLeft: 8,
    marginBottom: 4,
  },
  stepper: {
    paddingTop: 12,
    paddingBottom: 6,
  }
}

const classes = theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  appBar: {
    position: 'relative',
    backgroundColor: 'rgb(96, 125, 139)',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  title2: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color: '#757575',
  },
  title3: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color: '#F44336',
  },
  label: {
    // marginTop: 8,
    fontSize: '0.75rem'
  }
});

const useStylesFacebook = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  top: {
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
  circle: {
    strokeLinecap: 'round',
  },
}));

function Upload({ state }) {
  return (
    <div style={styles.container5}>
      <div style={styles.progress}>
        <Box position="relative" display="inline-flex">
        {state.message === 'error' ? <Fab style={styles.fab} ><ErrorOutlineIcon style={{ fontSize: 42, color: '#fff' }} /></Fab> :
        <FacebookCircularProgress value={state.progress}  />}
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="caption" component="div" color="textSecondary">{state.message === 'error' ? '' : `${state.progress}%`}</Typography>
          </Box>
        </Box>
        <div style={{ marginTop: 20 }}>
          {state.message === 'submit' ? '' : state.message}
        </div>
      </div>
      <div style={styles.list2}>
        <Scrollbars >
          {state.list.map((i, key) =>
            <div key={key} style={styles.row}>
              <div style={{  ...styles.icon }} />
              <div style={styles.title}>
                {i.name}
              </div>
              <div style={styles.size}>
                {`${i.size} mb`}
              </div>
            </div>
          )}
        </Scrollbars>
      </div>
    </div>
  )
}

function DownToolbar({ classes, step, complete, error }) {
  return (
    <div>
      <Stepper style={styles.stepper} activeStep={step} alternativeLabel>
        <Step key="0" completed={false}>
          <StepLabel active classes={{ alternativeLabel: classes.label}}>Upload</StepLabel>
        </Step>
        <Step key="1">
          <StepLabel error={error} optional={error ? <div></div> : null}>Install</StepLabel>
        </Step>
        <Step key="2" completed={complete}>
          <StepLabel>Complete</StepLabel>
        </Step>
      </Stepper>
    </div>
  )
}

function FacebookCircularProgress(props) {
  const classes = useStylesFacebook();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={100}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="static"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        value={props.value}
        size={100}
        thickness={4}
        {...props}
      />
    </div>
  );
}

function handleCancel(state) {
  core.transfer.send('form_progress', state);
}

function AppProgress(props) {
  if (props.state.open) {
    if (props.state.type === 'download') {
      return (
        <Backdrop className={props.classes.backdrop} open={props.state.open} >
          <Paper style={styles.root}>
            <div style={styles.container1}>
              <AppBar className={props.classes.appBar}>
                <Toolbar>
                  <IconButton edge="start" color="inherit" onClick={() => handleCancel()} >
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" className={props.classes.title}>
                    Export
                  </Typography>
                </Toolbar>
              </AppBar>
            </div>
            <div style={styles.container2}>
              <div style={styles.progress}>
                <Box position="relative" display="inline-flex">
                {props.state.message === 'error' ? <Fab style={styles.fab} ><ErrorOutlineIcon style={{ fontSize: 42, color: '#fff' }} /></Fab> :
                <FacebookCircularProgress value={props.state.progress}  />}
                  <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography variant="caption" component="div" color="textSecondary">{props.state.message === 'error' ? '' : `${props.state.progress}%`}</Typography>
                  </Box>
                </Box>
                <div style={{ marginTop: 20 }}>
                  {props.state.message === 'submit' ? '' : props.state.message}
                </div>
              </div>
              <div style={{ }}>
                <Typography variant="h6" className={props.classes.title}>
                  {props.state.title}
                </Typography>
                <Typography variant="subtitle1" className={props.classes.title2}>
                  {props.state.title2}
                </Typography>
                <Typography variant="subtitle1" className={props.classes.title3}>
                  {props.state.error ? `error: ${props.state.error}` : ''}
                </Typography>
              </div>
            </div>
          </Paper>
        </Backdrop>
      )
    }
    if (props.state.type === 'import') {
      return (
        <Backdrop className={props.classes.backdrop} open={props.state.open} >
          <Paper style={styles.root2}>
            <div style={styles.container4}>
              <AppBar className={props.classes.appBar}>
                <Toolbar>
                  <IconButton disabled={props.state.message === 'uploading'} edge="start" color="inherit" onClick={() => handleCancel({ complete: true, message: null })} >
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" className={props.classes.title}>
                    Import Package
                  </Typography>
                  <Button color="inherit" onClick={() => handleCancel(props.state)}>
                    {props.state.complete ? 'ok' : props.state.message === 'submit' ? 'submit' : 'abort'}
                  </Button>
                </Toolbar>
              </AppBar>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ flexShink: 0, height: '100%' }}>
                <SwipeableViews
                  index={props.state.step}
                  containerStyle={{ height: '100%'}}
                  style={{ height: '100%'}}
                >
                  <div index={0} style={{ padding: 24, height: '100%' }} >
                    <Upload state={props.state} />
                  </div>
                  <div index={1} style={{ padding: 12, height: '100%' }} >
                    <Script options={{ title: 'Installation process...' }} data={props.state.log} />
                  </div>
                </SwipeableViews>
              </div>
              <DownToolbar
                classes={props.classes} 
                step={props.state.step} 
                complete={props.state.stepComplete}
                error={props.state.stepError}
              />
            </div>
          </Paper>
        </Backdrop>
      )
    }
    return (
      <Backdrop className={props.classes.backdrop} open={props.state.open} >
         <Paper style={styles.root}>
            <div style={styles.container1}>
              <AppBar className={props.classes.appBar}>
                <Toolbar>
                  <IconButton disabled={props.state.message === 'uploading'} edge="start" color="inherit" onClick={() => handleCancel({ complete: true, message: null })} >
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" className={props.classes.title}>
                    File Upload
                  </Typography>
                  <Button color="inherit" onClick={() => handleCancel(props.state)}>
                    {props.state.complete ? 'ok' : props.state.message === 'submit' ? 'submit' : 'abort'}
                  </Button>
                </Toolbar>
              </AppBar>
            </div>
            <div style={styles.container2}>
              <div style={styles.progress}>
                <Box position="relative" display="inline-flex">
                {props.state.message === 'error' ? <Fab style={styles.fab} ><ErrorOutlineIcon style={{ fontSize: 42, color: '#fff' }} /></Fab> :
                <FacebookCircularProgress value={props.state.progress}  />}
                  <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography variant="caption" component="div" color="textSecondary">{props.state.message === 'error' ? '' : `${props.state.progress}%`}</Typography>
                  </Box>
                </Box>
                <div style={{ marginTop: 20 }}>
                  {props.state.message === 'submit' ? '' : props.state.message}
                </div>
              </div>
              <div style={styles.list}>
                <Scrollbars >
                  {props.state.list.map((i, key) =>
                    <div key={key} style={styles.row}>
                      <div style={{ backgroundImage: `url(${i.src})`,  ...styles.icon }} />
                      <div style={styles.title}>
                        {i.name}
                      </div>
                      <div style={styles.size}>
                        {`${i.size} mb`}
                      </div>
                    </div>
                  )}
                </Scrollbars>
              </div>
            </div>
            
            <div style={styles.checkbox}>
              <Checkbox
                size="small"
                color="primary"
                checked={props.state.replace}
                onChange={(e) => core.actions.appprogress.data({ replace: e.target.checked})} 
              />
              Replace duplicate files
            </div>
         </Paper>
      </Backdrop>
    );
  }
  return null;
}


const mapStateToProps = createSelector(
  state => state.appprogress,
  (state) => ({ state })
)

export default connect(mapStateToProps)(withStyles(classes)(AppProgress));