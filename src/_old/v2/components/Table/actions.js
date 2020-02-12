import { TABLE_SET_DATA } from './constants';


export function setData(data) {
  return {
    type: TABLE_SET_DATA,
    data,
  };
}


export default {
  setData,
}
