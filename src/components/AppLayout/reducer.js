import { 
  APP_LAYOUT_SET_DATA,
  APP_LAYOUT_UPDATE_ELEMENTS_ALL,
  APP_LAYOUT_CHANGE_CONTAINER,

  APP_LAYOUT_SYNC_CHARTS_LAYOUT,
  APP_LAYOUT_SYNC_CHARTS_CONTAINER,
  APP_LAYOUT_SYNC_CHARTS_LAYOUT_HOME_ALL,
  APP_LAYOUT_SYNC_CHARTS_CONTAINER_HOME_ALL, 
} from './constants';

import { getZoomInterval } from 'components/@Elements/@Chart/utils';

const defaultState = { 
  layoutid: null, 
  elements: {}, 
  list: [],
  values: {},
  links: {}, 
};

const ELEMENT_LINK = 1;
const TEMPLATE_LINK = 2;


function createElement(item, values, links, templates) {
  if (links[item.uuid] !== undefined || templates[item.uuid]) {
    return Object
    .keys(item)
    .reduce((p, id) => {
      const prop = item[id];
      if (prop && prop.enabled && values[prop.did] && values[prop.did][prop.prop] !== undefined) {
        try {
          return { ...p, [id]: { ...prop, value: prop.func(values[prop.did][prop.prop], {}) } };
        } catch {
          
        }
      }
      if (templates[item.uuid] && templates[item.uuid][id]) {
        return { ...p, [id]: { ...prop, value: templates[item.uuid][id].value } };
      }
      return { ...p, [id]: prop };
    }, {});
  }
  return item;
}

function updateElementsAll(state, action) {
  let isChange = false;

  const elements = {};
  const linksElements = {};
  const linksTemplates = [];
  const changesValues = {};

  const list = Object.keys(state.elements);
  const values = action.data;

  Object
    .keys(values)
    .forEach(did => {
      let isChangeDid = false;
      Object
      .keys(values[did])
      .forEach(propid => {
        if (state.values[did] === undefined) {
          state.values[did] = {};
        }
        if (state.values[did][propid] !== values[did][propid]) {
          isChange = true;
          isChangeDid = true;
          
          if (changesValues[did] === undefined) {
            changesValues[did] = {};
          }

          state.values[did][propid] = values[did][propid];
          changesValues[did][propid] = values[did][propid];
        }
      });

      if (isChangeDid && state.links[did]) {
        Object
          .keys(state.links[did])
          .forEach(uuid => {
            if (state.links[did][uuid] === ELEMENT_LINK) {
              linksElements[uuid] = true;
            }
            if (state.links[did][uuid] === TEMPLATE_LINK ) {
              linksTemplates.push(uuid);
            }
          });
      }
    });
  
  if (isChange === false) {
    return state;
  }
 
  const changesTemplates = {};

  linksTemplates.forEach(id => {
    const item = state.elements[id];
    if (item !== undefined) {
      const template = state.templates[item.linkid];

      const masterLayer = template.masterLayer;
      const curentLayer = {};
      const changesLayers = template.changesLayers;

      template.listState.forEach(stateid => {
        let value = 0;
        const link = item.links[stateid];
        if (link && state.values[link.did] && state.values[link.did][link.prop] !== undefined) {
          value = state.values[link.did][link.prop];
        }
        
        const uuid = stateid + '_' + value;

        if (changesLayers[uuid]) {
          Object
            .keys(changesLayers[uuid])
            .forEach(elementid => {
              Object
              .keys(changesLayers[uuid][elementid])
              .forEach(propid => {
                if (curentLayer[elementid] === undefined) {
                  curentLayer[elementid] = {}
                }
                curentLayer[elementid][propid] = { value: changesLayers[uuid][elementid][propid].value };
              });
            });
        }  
      });
      
      Object
        .keys(masterLayer)
        .forEach(id => {
          Object
          .keys(masterLayer[id])
          .forEach(propid => {
            const elementid = item.frameid + '_' + item.containerid + '_' + item.id + '_' + id;
            if (curentLayer[id] && curentLayer[id][propid]) {
              if (state.elements[elementid][propid].value !== curentLayer[id][propid].value) {
                if (changesTemplates[elementid] === undefined) {
                  changesTemplates[elementid] = {}
                }
                changesTemplates[elementid][propid] = { value: curentLayer[id][propid].value };
              }
            } else {
              if (state.elements[elementid][propid] !== masterLayer[id][propid]) {
                if (state.elements[elementid][propid].value !== masterLayer[id][propid].value) {
                  if (changesTemplates[elementid] === undefined) {
                    changesTemplates[elementid] = {}
                  }
                  changesTemplates[elementid][propid] = { value: masterLayer[id][propid].value };
                }
              }
            }
          })
        })

        template.listState.forEach(stateid => {
          if (item.links[stateid] && item.links[stateid].did) {
              const did = item.links[stateid].did;
              const propid = item.links[stateid].prop;
              if (changesValues[did] !== undefined && changesValues[did][propid] !== undefined) {
                const uuid = stateid + '_' + changesValues[did][propid];
                if (changesLayers[uuid] !== undefined) {
                  Object
                    .keys(changesLayers[uuid])
                    .forEach(id => {
                      Object
                        .keys(changesLayers[uuid][id])
                        .forEach(propid => {
                          const elementid = item.frameid + '_' + item.containerid + '_' + item.id + '_' + id;
                          if (changesTemplates[elementid] === undefined) {
                            changesTemplates[elementid] = {}
                          }
                          changesTemplates[elementid][propid] = changesLayers[uuid][id][propid];
                        })
                    })
                }
              }
          }
        });
    }
  });

  list.forEach(id => {
    elements[id] = createElement(state.elements[id], action.data, linksElements, changesTemplates);
  });
  
  return { ...state, elements };
}

function changeContainer(state, action) {  
  const elements = {};
  const item = state.elements[action.elementid];

  Object.keys(state.elements)
    .forEach(id => {
      if (item.linkid === state.elements[id].containerid) {
      } else {
        elements[id] = state.elements[id];
      }    
    });

  Object.keys(action.data.values)
    .forEach(did => {
      Object.keys(action.data.values)
        .forEach(propid => {
          if (state.values[did] === undefined) {
            state.values[did] = {}
          }
          state.values[did][propid] = action.data.values[did][propid];
        });
    });
 
  Object.keys(action.data.links)
    .forEach(did => {
      Object.keys(action.data.links[did])
      .forEach(id => {
        if (state.links[did] === undefined) {
          state.links[did] = {}
        }
        state.links[did][id] = action.data.links[did][id];
      });
    });
  
  return { 
    ...state, 
    elements: { 
      ...elements, 
      ...action.data.elements,
      [action.elementid]: {
        ...item,
        settings: action.data.settings,
        contextid: action.contextid,
        linkid: action.containerid,
        list: action.data.list,
      },
    },
    templates: {
      ...state.templates,
      ...action.data.templates
    },
    widgets: {
      ...state.widgets,
      ...action.data.widgets
    },  
  };
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_LAYOUT_SET_DATA:
      return { ...state, ...action.data };
    case APP_LAYOUT_UPDATE_ELEMENTS_ALL:
      return updateElementsAll(state, action);
    case APP_LAYOUT_CHANGE_CONTAINER:
      return changeContainer(state, action);
    case APP_LAYOUT_SYNC_CHARTS_LAYOUT:
      return { 
        ...state,
        elements: Object
          .keys(state.elements)
          .reduce((p, c) => {
            if (state.elements[c].containerid === undefined) {
              if (state.elements[c].type === 'chart_timeline' || state.elements[c].type === 'chart' || state.elements[c].type === 'chart_multi') {
                return { 
                  ...p, 
                  [c]: {
                    ...state.elements[c],
                    data: {
                      ...state.elements[c].data,
                      range: action.range,
                      forceRealtime: action.realtime,
                      triger: Date.now(),
                    }
                  }
                }
              }
            }
            return { ...p, [c]: state.elements[c] }
          }, {}),
      };
    case APP_LAYOUT_SYNC_CHARTS_CONTAINER:
      return { 
        ...state,
        elements: Object
          .keys(state.elements)
          .reduce((p, c) => {
            if (state.elements[c].frameid === action.containerId) {
              if (state.elements[c].type === 'chart_timeline' || state.elements[c].type === 'chart' || state.elements[c].type === 'chart_multi') {
                return { 
                  ...p, 
                  [c]: {
                    ...state.elements[c],
                    data: {
                      ...state.elements[c].data,
                      range: action.range,
                      forceRealtime: action.realtime,
                      triger: Date.now(),
                    }
                  }
                }
              }
            }
            return { ...p, [c]: state.elements[c] }
          }, {}),
      };
    case APP_LAYOUT_SYNC_CHARTS_LAYOUT_HOME_ALL:
      return { 
        ...state,
        elements: Object
          .keys(state.elements)
          .reduce((p, c) => {
            if (state.elements[c].containerid === undefined) {
              if (state.elements[c].type === 'chart_timeline' || state.elements[c].type === 'chart' || state.elements[c].type === 'chart_multi') {
                var ns, ne, forceRealtime;
                if (typeof action.position === 'string') {
                  forceRealtime = false;
                  const [s, e] = state.elements[c].data.range;
                  if (action.position === 'next') {
                    const i = e - s;
                    ns = e;
                    ne = e + i;
                  } else {
                    const i = e - s;
                    ns = s - i;
                    ne = e - i;
                  }
                } else {
                  if (action.position) {
                    forceRealtime = true;
                  } else {
                    forceRealtime = false;
                  }
  
                  let s, e, pp, n;
  
                  if (action.position) {
                    const { start, end } = getZoomInterval(state.elements[c].interval.value.id);
                    s = start;
                    e = end;
                    pp = state.elements[c].positionCurentTime.value;
                    n = Date.now();
                  } else {
                    const times = state.elements[c].data.range;
                    s = times[0];
                    e = times[1];
                    pp = 0;
                    n = action.date;
                  }
              
                  const i = e - s;
                  const d = (i / 100) * pp;
                  ns = n - d;
                  ne = n + i - d;
                }
                return { 
                  ...p, 
                  [c]: {
                    ...state.elements[c],
                    data: {
                      ...state.elements[c].data,
                      range: [ns, ne],
                      forceRealtime: forceRealtime,
                      triger: Date.now(),
                    }
                  }
                }
              }
            }
            return { ...p, [c]: state.elements[c] }
          }, {}),
      };
    case APP_LAYOUT_SYNC_CHARTS_CONTAINER_HOME_ALL:
      return { 
        ...state,
        elements: Object
          .keys(state.elements)
          .reduce((p, c) => {
            if (state.elements[c].frameid === action.containerId) {
              if (state.elements[c].type === 'chart_timeline' || state.elements[c].type === 'chart' || state.elements[c].type === 'chart_multi') {
                var ns, ne, forceRealtime;
                if (typeof action.position === 'string') {
                  forceRealtime = false;
                  const [s, e] = state.elements[c].data.range;
                  if (action.position === 'next') {
                    const i = e - s;
                    ns = e;
                    ne = e + i;
                  } else {
                    const i = e - s;
                    ns = s - i;
                    ne = e - i;
                  }
                } else {
                  if (action.position) {
                    forceRealtime = true;
                  } else {
                    forceRealtime = false;
                  }
  
                  let s, e, pp, n;
  
                  if (action.position) {
                    const { start, end } = getZoomInterval(state.elements[c].interval.value.id);
                    s = start;
                    e = end;
                    pp = state.elements[c].positionCurentTime.value;
                    n = Date.now();
                  } else {
                    const times = state.elements[c].data.range;
                    s = times[0];
                    e = times[1];
                    pp = 0;
                    n = action.date;
                  }
  
                  const i = e - s;
                  const d = (i / 100) * pp;
                  ns = n - d;
                  ne = n + i - d;
                }
                return { 
                  ...p, 
                  [c]: {
                    ...state.elements[c],
                    data: {
                      ...state.elements[c].data,
                      range: [ns, ne],
                      forceRealtime: forceRealtime,
                      triger: Date.now(),
                    }
                  }
                }
              } 
            }
            return { ...p, [c]: state.elements[c] }
          }, {}),
      };
    default:
      return state;
  }
}


export default reducer;
