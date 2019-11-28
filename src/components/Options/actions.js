import { OPTIONS_SET_DATA } from './constants';


export function setData(data) {
  return {
    type: OPTIONS_SET_DATA,
    data,
  };
}


export default {
  setData,
}
