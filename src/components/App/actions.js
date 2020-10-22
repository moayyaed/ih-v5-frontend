import core from 'core';
import { APP_SET_DATA, APP_SET_ROUTE, APP_SET_AUTH, APP_ALERT_OPEN, APP_ALERT_CLOSE, APP_DIALOG_RESTART  } from './constants';


export function data(data) {
  return {
    type: APP_SET_DATA,
    data,
  };
}

export function route(params) {
  return {
    type: APP_SET_ROUTE,
    params,
  };
}

export function auth(value) {
  return {
    type: APP_SET_AUTH,
    value,
  };
}


export function alertOpen(severity, message) {
  return {
    type: APP_ALERT_OPEN,
    severity,
    message,
  };
}

export function alertClose() {
  return {
    type: APP_ALERT_CLOSE,
  };
}

export function restart(mode) {
  if (mode) {
    core.restart = true;
  } else {
    core.restart = false;
  }
  return {
    type: APP_DIALOG_RESTART,
    mode,
  };
}


export default {
  data,
  route,
  auth,
  restart,
  alertOpen,
  alertClose,
}