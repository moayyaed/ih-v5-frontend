import { GRAPH_SET_DATA } from './constants';


export function setData(data) {
  return {
    type: GRAPH_SET_DATA,
    data,
  };
}


export default {
  setData,
}
