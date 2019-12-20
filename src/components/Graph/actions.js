import shortid from 'shortid';

import { 
  GRAPH_SET_DATA, 
  GRAPH_SET_POSITION_LAYOUT, 
  GRAPH_SET_POSITION_CONTAINER,
  GRAPH_SET_POSITION_GROUP_CONTAINER,
  GRAPH_SET_SETTINGS_CONTAINER,

  GRAPH_ADD_CONTAINER,
  GRAPH_SELECT_ONE_CONTAINER,
  GRAPH_SELECT_MULTI_CONTAINERS,
  GRAPH_CLEAR_ALL_SELECTS,
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

export function setPositionGroupContainer(items, x, y) {
  return {
    type: GRAPH_SET_POSITION_GROUP_CONTAINER,
    items,
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

export function selectOneContainer(itemid) {
  return {
    type: GRAPH_SELECT_ONE_CONTAINER,
    itemid,
    selecttype: 'one',
  };
}

export function selectMultiContainers(itemid, items, map) {
  const selects = {
    ...items,
    [itemid]: true,
  }
  
  let x = map[itemid].settings.x;
  let y = map[itemid].settings.y;
  let w = 0
  let h = 0;

  Object
    .keys(selects)
    .forEach(key => {
      const item = map[key];
      if (x > item.settings.x) {
        x = item.settings.x;
      }
      if (y > item.settings.y) {
        y = item.settings.y;
      }
      if (w < item.settings.x + item.settings.w) {
        w = (item.settings.x + item.settings.w);
      }
      if (h < item.settings.y + item.settings.h) {
        h = (item.settings.y + item.settings.h);
      }
    });
 
  return {
    type: GRAPH_SELECT_MULTI_CONTAINERS,
    itemid,
    selecttype: 'multi',
    group: {
      enabled: true,
      x, y, w: w - x, h: h - y,
    }
  };
}

export function clearAllSelects() {
  return {
    type: GRAPH_CLEAR_ALL_SELECTS,
  };
}


export default {
  setData,
  setPositionLayout,
  setPositionContainer,
  setPositionGroupContainer,
  setSettingsContainer,
  addContainer,
  selectOneContainer,
  selectMultiContainers,
  clearAllSelects,
}
