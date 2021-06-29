import { 
  APP_BROWSE_SET_DATA, 
} from './constants';


export function data(data) {
  return {
    type: APP_BROWSE_SET_DATA,
    data,
  };
}


export default {
  data,
}