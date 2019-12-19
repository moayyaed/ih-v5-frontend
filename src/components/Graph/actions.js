import shortid from 'shortid';

import { 
  GRAPH_SET_DATA, 
  GRAPH_SET_POSITION_LAYOUT, 
  GRAPH_SET_POSITION_CONTAINER,
  GRAPH_SET_SETTINGS_CONTAINER,
  GRAPH_ADD_CONTAINER,
} from './constants';


export function setData(data) {
  return {
    type: GRAPH_SET_DATA,
    data,
  };
}

export function setPositionLayout(x, y) {
  return {
    type: GRAPH_SET_POSITION_LAYOUT,
    x,
    y,
  };
}

export function setPositionContainer(itemid, x, y) {
  return {
    type: GRAPH_SET_POSITION_CONTAINER,
    itemid,
    x,
    y,
  };
}

export function setSettingsContainer(itemid, settings) {
  return {
    type: GRAPH_SET_SETTINGS_CONTAINER,
    itemid,
    settings,
  };
}

export function addContainer(position, data) {
  return {
    type: GRAPH_ADD_CONTAINER,
    data: {
      ...data,
      settings: {
        ...data.settings,
        id: shortid.generate(),
        x: position.nx,
        y: position.ny,
      }
    },
  };
}


export default {
  setData,
  setPositionLayout,
  setPositionContainer,
  setSettingsContainer,
  addContainer,
}
