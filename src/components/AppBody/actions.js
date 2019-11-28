import { APP_BODY_SET_DATA } from './constants';


export function setData(data) {
  return {
    type: APP_BODY_SET_DATA,
    data,
  };
}


export default {
  setData,
}
