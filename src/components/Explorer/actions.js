import { EXPLORER_SET_DATA } from './constants';


export function setData(id, data) {
  return {
    id,
    type: EXPLORER_SET_DATA,
    data,
  };
}


export default {
  setData,
}
