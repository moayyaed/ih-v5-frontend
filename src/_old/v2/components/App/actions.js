import { APP_SET_DATA, APP_ALERT_OPEN, APP_ALERT_CLOSE } from './constants';


export function setData(data) {
  return {
    type: APP_SET_DATA,
    data,
  };
}

export function setAlertOpen(severity, message) {
  return {
    type: APP_ALERT_OPEN,
    severity,
    message,
  };
}

export function setAlertClose() {
  return {
    type: APP_ALERT_CLOSE,
  };
}


export default {
  setData,
  setAlertOpen,
  setAlertClose,
}
