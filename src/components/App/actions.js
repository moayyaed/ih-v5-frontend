import { APP_SET_DATA  } from './constants';


export function setData(data) {
  return {
    type: APP_SET_DATA,
    data,
  };
}


export default {
  setData,
}