import shortid from 'shortid';

import { 
  GRAPH_SET_DATA,
  GRAPH_FORCE_DATA,
} from './constants';


export function setData(data) {
  return {
    type: GRAPH_SET_DATA,
    data,
  };
}

export function forceData(data) {
  return {
    type: GRAPH_FORCE_DATA,
    data,
  };
}


export default {
  setData,
  forceData,
}
