import { 
  APP_PROGRESS_SET_DATA, 
} from './constants';


export function data(data) {
  return {
    type: APP_PROGRESS_SET_DATA,
    data,
  };
}


export default {
  data,
}