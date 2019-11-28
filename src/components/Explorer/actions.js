import { EXPLORER_SET_DATA } from './constants';


export function setData(data) {
  return {
    type: EXPLORER_SET_DATA,
    data,
  };
}


export default {
  setData,
}
