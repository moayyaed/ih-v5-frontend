import shortid from 'shortid';

import { 
  TEMPLATE_SET_DATA,
  TEMPLATE_FORCE_DATA,
  TEMPLATE_SET_POSITION_LAYOUT, 
  TEMPLATE_SET_POSITION_CONTAINER,
  TEMPLATE_SET_PROPERTIES_CONTAINER,
  TEMPLATE_SET_POSITION_GROUP_CONTAINER,
  TEMPLATE_SET_RESIZE_GROUP_CONTAINER,
  TEMPLATE_SET_SETTINGS_CONTAINER,

  TEMPLATE_ADD_CONTAINER,
  TEMPLATE_SELECT_ONE_CONTAINER,
  TEMPLATE_SELECT_MULTI_CONTAINERS,
  TEMPLATE_SELECT_BLOCK,
  TEMPLATE_CLEAR_ALL_SELECTS,

  TEMPLATE_SET_GROUP,
  TEMPLATE_UNSET_GROUP,
} from './constants';


export function setData(data) {
  return {
    type: TEMPLATE_SET_DATA,
    data,
  };
}

export function forceData(data) {
  return {
    type: TEMPLATE_FORCE_DATA,
    data,
  };
}

export function setPositionLayout(x, y, scale) {
  return {
    type: TEMPLATE_SET_POSITION_LAYOUT,
    x,
    y,
    scale
  };
}

export function setPositionContainer(itemid, x, y) {
  return {
    type: TEMPLATE_SET_POSITION_CONTAINER,
    itemid,
    x,
    y,
  };
}

export function setPropertiesContainer(items, name, value) {
  return {
    type: TEMPLATE_SET_PROPERTIES_CONTAINER,
    items,
    name,
    value,
  };
}

export function setSettingsContainer(itemid, settings) {
  return {
    type: TEMPLATE_SET_SETTINGS_CONTAINER,
    itemid,
    settings,
  };
}


export function addContainer(position, data) {
  if (Array.isArray(data) && data.length !== 0) {
    const mapingid = {}
    data.forEach(i => {
      const id = shortid.generate();
      mapingid[i.settings.id] = id;
    });
    let rx = data[0].settings.x - position.nx;
    let ry = data[0].settings.y - position.ny;
    return {
      type: TEMPLATE_ADD_CONTAINER,
      data: data.reduce((p, n) => {
        if (n.settings.group !== undefined) {
          return {
            ...p,
            [mapingid[n.settings.id]]: {
              ...n,
              settings: {
                ...n.settings,
                id: mapingid[n.settings.id],
                x: n.settings.x - rx,
                y: n.settings.y - ry,
                group: Object.keys(n.settings.group).reduce((p, c) => ({ ...p, [mapingid[c]]: true }), {}),
              }
            },
          }
        }
        return {
          ...p,
          [mapingid[n.settings.id]]: {
            ...n,
            settings: {
              ...n.settings,
              id: mapingid[n.settings.id],
              x: n.settings.x - rx,
              y: n.settings.y - ry,
            }
          },
        }
      }, {}),
    };
  }
  const id = shortid.generate();
  return {
    type: TEMPLATE_ADD_CONTAINER,
    data: {
      [id]: {
        ...data,
        settings: {
          ...data.settings,
          id: id,
          x: position.nx,
          y: position.ny,
        }
      }
    },
  };
}

export function selectOneContainer(itemid) {
  return {
    type: TEMPLATE_SELECT_ONE_CONTAINER,
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
    type: TEMPLATE_SELECT_MULTI_CONTAINERS,
    itemid,
    selecttype: 'multi',
    selects: items,
    group: {
      enabled: true,
      x, y, w: w - x, h: h - y,
    }
  };
}

export function setPositionGroupContainer(data, select, map) {
  const dx = data.x - select.group.x;
  const dy = data.y - select.group.y;
  const temp = Object
    .keys(map)
    .reduce((p, c) => {
      if (select.data[c]) {
        return { 
          ...p, 
          [c]: {
            settings: { 
              ...map[c].settings,
              x: map[c].settings.x + dx,
              y: map[c].settings.y + dy,
            },
          } 
        };
      }
      return { ...p, [c]: map[c] };
    }, {});
  return {
    type: TEMPLATE_SET_POSITION_GROUP_CONTAINER,
    x: data.x,
    y: data.y,
    map: temp,
  };
}

export function setResizeGroupContainer(e, position, selects, map) {
  const lgp = selects.group;

  const h = position.w / lgp.w;
  const v = position.h / lgp.h; 

  const temp = Object
  .keys(map)
  .reduce((p, c) => {
    if (selects.data[c]) {
      const s = map[c].settings;
      return { 
        ...p, 
        [c]: {
          settings: { 
            ...map[c].settings,
            x: position.x + ((s.x - lgp.x) * h),
            y: position.y + ((s.y - lgp.y) * v),
            w: (s.x + s.w) * h - (s.x * h),
            h: (s.y + s.h) * v - (s.y * v),
          },
        } 
      };
    }
    return { ...p, [c]: map[c] };
  }, {});
  return {
    type: TEMPLATE_SET_RESIZE_GROUP_CONTAINER,
    position,
    map: temp,
  };
}

export function selectBlock(value) {
  return {
    type: TEMPLATE_SELECT_BLOCK,
    value,
  };
}

export function clearAllSelects() {
  return {
    type: TEMPLATE_CLEAR_ALL_SELECTS,
  };
}

export function setGroup(state) {
  const id = shortid.generate();
  const group = state.selects.group;
  const items = state.selects.data;
  const groupitem = {
    settings: {
      id,
      x: group.x,
      y: group.y,
      w: group.w,
      h: group.h,
      color: 'transparent',
      group: items,
    }
  }
  
  const map = Object
    .keys(state.map)
    .reduce((p, c) => {
      if (items[c] !== undefined && !state.map[c].settings.parent) {
        return { ...p, [c]: {
          ...state.map[c],
          settings: {
            ...state.map[c].settings,
            parent: id,
          }
        } };
      }

      return { ...p, [c]: state.map[c] };
    }, { [id]: groupitem });
  return { 
    type: TEMPLATE_SET_GROUP,
    map,
    selects: { ...items, [id]: true }
  }
}

export function unsetGroup(group, data) {
  const selects = {}
  let groupid = false;
  let parent = {}
  let childrens = {}
  data.forEach(item => {
    selects[item.settings.id] = true;
    if (item.settings.group !== undefined) {
      parent[item.settings.id] = true;
      childrens = { ...childrens, ...item.settings.group} 
    }
  })
  Object
    .keys(parent)
    .forEach(key => {
      if (childrens[key] === undefined) {
        groupid = key;
      }
    })
    if (selects[groupid] !== undefined) {
      delete selects[groupid];
    }
  return {
    type: TEMPLATE_UNSET_GROUP,
    groupid,
    selects,
  };
}


export default {
  setData,
  forceData,
  setPositionLayout,
  setPropertiesContainer,
  setPositionContainer,
  setPositionGroupContainer,
  setResizeGroupContainer,
  setSettingsContainer,
  addContainer,
  selectOneContainer,
  selectMultiContainers,
  selectBlock,
  clearAllSelects,
  setGroup,
  unsetGroup,
}
