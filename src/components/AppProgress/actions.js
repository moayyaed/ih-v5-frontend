import { 
  APP_PROGRESS_SET_DATA, 
  APP_PROGRESS_LOG,
} from './constants';


export function data(data) {
  return {
    type: APP_PROGRESS_SET_DATA,
    data,
  };
}

export function log(mes) {
  return {
    type: APP_PROGRESS_LOG,
    mes,
  };
}


export default {
  data,
  log,
}