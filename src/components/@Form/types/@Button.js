import React from 'react';
import core from 'core';

import ButtonMui from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    margin: 12,
  }
}

const classes = theme => ({
  root: {
    height: '100%',
  },
  input: {
    height: '100%!important'
  },
});

function handleClick(props) {
  if (props.options.command === 'playsound') {
    core.sound(null, [props.global.p1._id]);
  } else {
    const store = core.store.getState().apppage;
    const params = {
      subnodeid: props.route.channel,
      nodeid: props.route.nodeid,
      command: props.options.command,
      param: props.options.param,
      id: store.component[0].id,
    };
    core
    .request({ method: 'button_command', params, payload: props.global })
    .ok(res => {
      if (res.alert) {
        core.actions.app.alertOpen(res.alert || 'info', res.message || '');
      }
      if (res.refresh) {
        if (store.data !== props.global) {
          core.transfer.send('refresh_sub_tree_content');
        } else {
          core.transfer.send('refresh_content');
        }
      }
      if (res.restart) {
        core.actions.app.restart(true);
      }
    });
  }
}

function Button(props) {
  return (
    <ButtonMui style={styles.root} variant="contained" color="primary" onClick={() => handleClick(props)}>
      {props.options.title}
    </ButtonMui>
  )
}


export default withStyles(classes)(React.memo(Button));