import { EXPLORER_DATA } from './constants';


export function data(id, data) {
  return {
    id,
    type: EXPLORER_DATA,
    data,
  };
}


export default {
  data,
}
