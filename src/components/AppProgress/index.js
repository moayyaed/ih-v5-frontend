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

import { Scrollbars } from 'react-custom-scrollbars';

import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

import CheckIcon from '@material-ui/icons/Check';

import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';


const styles = {
  root: {
    width: '50%',
    height: '50%',
    // padding: '12px 18px',
    display: 'flex',
    flexDirection: 'column',
  },
  container1: {
    borderBottom: '3px solid #EEEEEE',
    display: 'flex',
    justifyContent: 'center',
    flexShrink: 0,
    marginBottom: 25,
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
  progress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    flexShrink: 0,
  },
  list: {
    width: '100%',
    paddingLeft: 24,
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
    flexShrink: 0,
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
    // backgroundColor: '#4caf50',
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

function handleCancel() {
  core.actions.appprogress.data({ open: false, list: [], progress: 0, compleate: false })
}

function AppProgress(props) {
  if (props.state.open) {
    return (
      <Backdrop className={props.classes.backdrop} open={props.state.open} >
         <Paper style={styles.root}>
            <div style={styles.container1}>
              <AppBar className={props.classes.appBar}>
                <Toolbar>
                  <Typography variant="h6" className={props.classes.title}>
                    File Upload
                  </Typography>
                  <Button color="inherit" onClick={handleCancel}>
                    {props.state.compleate ? 'ok' : 'abort'}
                  </Button>
                </Toolbar>
              </AppBar>
            </div>
            <div style={styles.container2}>
              <div style={styles.progress}>
                <Box position="relative" display="inline-flex">
                {props.state.compleate ?
                <Fab color="primary" style={styles.fab}>
                  <CheckIcon />
                </Fab> :
                <FacebookCircularProgress value={props.state.progress}  />
                }
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
                    <Typography variant="caption" component="div" color="textSecondary">{props.state.compleate ? '' : `${props.state.progress}%`}</Typography>
                  </Box>
                </Box>
              </div>
              <div style={styles.list}>
                <Scrollbars >
                  {props.state.list.map((i, key) =>
                    <div key={key} style={styles.row}>
                      <IconButton style={styles.icon}>
                        <PanoramaOutlinedIcon style={{ fontSize: 42 }} />
                      </IconButton>
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