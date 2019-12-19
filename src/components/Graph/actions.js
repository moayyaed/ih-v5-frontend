import { 
  GRAPH_SET_DATA, 
  GRAPH_SET_POSITION_LAYOUT, 
  GRAPH_SET_POSITION_CONTAINER,
  GRAPH_SET_SETTINGS_CONTAINER
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


export default {
  setData,
  setPositionLayout,
  setPositionContainer,
  setSettingsContainer,
}
