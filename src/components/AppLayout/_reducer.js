import { 
  APP_LAYOUT_SET_DATA,
  APP_LAYOUT_UPDATE_ELEMENTS_ALL,
  APP_LAYOUT_CHANGE_CONTAINER,


  APP_LAYOUT_UPDATE_TEMPLATES, 
  APP_LAYOUT_UPDATE_ELEMENTS,
  APP_LAYOUT_SYNC_CHARTS_LAYOUT,
  APP_LAYOUT_SYNC_CHARTS_CONTAINER,

  APP_LAYOUT_SYNC_CHARTS_LAYOUT_HOME_ALL,
  APP_LAYOUT_SYNC_CHARTS_CONTAINER_HOME_ALL, 
} from './constants';

import { getZoomInterval } from 'components/@Elements/@Chart/utils';

const defaultState = { layoutid: null };

const ELEMENT_LINK = 1;
const TEMPLATE_LINK = 2;

function mergeStates(c3, p3, s, v) {
  if (s[v[c3]]) {
    return Object
    .keys(p3)
    .reduce((p4, c4) => {
      if (s[v[c3]][c4]) {
        return { ...p4, [c4]: { ...p3[c4], ...s[v[c3]][c4] } }
      }
      return { ...p4, [c4]: p3[c4] }
    }, {});
  }
  return p3;
}

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
      const changesLayers = template.changesLayers;
  
      Object
        .keys(masterLayer)
        .forEach(id => {
          Object
          .keys(masterLayer[id])
          .forEach(propid => {
            const elementid = item.frameid + '_' + item.containerid + '_' + item.id + '_' + id;
            if (state.elements[elementid][propid] !== masterLayer[id][propid]) {
             if (state.elements[elementid][propid].value !== masterLayer[id][propid].value) {
              if (changesTemplates[elementid] === undefined) {
                changesTemplates[elementid] = {}
              }
              changesTemplates[elementid][propid] = { value: masterLayer[id][propid].value };
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
        linkid: action.containerid,
        list: action.data.list,
      } 
    },
    templates: {
      ...state.templates,
      ...action.data.templates
    } 
  };
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_LAYOUT_SET_DATA:
      return { ...state, ...action.data };
    case APP_LAYOUT_UPDATE_ELEMENTS_ALL:
      const x = Date.now();
      const temp = updateElementsAll(state, action);
      console.log('data', Date.now() - x)
      return temp;
    case APP_LAYOUT_CHANGE_CONTAINER:
      const xx = Date.now();
      const temp2 = changeContainer(state, action);
      console.log('data', Date.now() - xx)
      return temp2;
    case APP_LAYOUT_UPDATE_ELEMENTS:
      return { 
        ...state,
        states: Object
          .keys(state.states)
          .reduce((p, c) => {
            return { 
              ...p, 
              [c]: Object
                .keys(state.states[c])
                .reduce((p2, c2) => {
                  if (action.data[c] && action.data[c][c2] !== undefined) {
                    return { ...p2, [c2]: action.data[c][c2] }
                  }
                  return { ...p2, [c2]: state.states[c][c2] }
                }, {})
            }
          }, {}),
        layout: {
          ...state.layout,
          elements: Object
          .keys(state.layout.elements)
          .reduce((p2, c2) => {
            return  { 
              ...p2, 
              [c2]: Object
                .keys(state.layout.elements[c2])
                .reduce((p3, c3) => {
                  if (c3 === 'data' && state.layout.elements[c2].type === 'devicelog' && action.data[c2]) {
                    return { ...p3, [c3]: action.data[c2].concat(state.layout.elements[c2][c3]) }
                  }
                  if (
                    state.layout.elements[c2][c3] &&
                    state.layout.elements[c2][c3].enabled && 
                    action.data[state.layout.elements[c2][c3].did] &&
                    action.data[state.layout.elements[c2][c3].did][state.layout.elements[c2][c3].prop] !== undefined 
                  ) {
                    try  {
                      return { 
                        ...p3, 
                        [c3]: {
                          ...state.layout.elements[c2][c3],
                          value: state.layout.elements[c2][c3].func.call(null, action.data[state.layout.elements[c2][c3].did][state.layout.elements[c2][c3].prop], {}),
                        }
                      }
                    } catch (e) {
                      return { ...p3, [c3]: state.layout.elements[c2][c3] }
                    }
                  }
                  return { ...p3, [c3]: state.layout.elements[c2][c3] }
                }, {}),
            }
          }, {}),
        },
      };
    case APP_LAYOUT_SYNC_CHARTS_LAYOUT:
      return { 
        ...state,
        layout: {
          ...state.layout,
          elements: Object
          .keys(state.layout.elements)
          .reduce((p, c) => {
            if (state.layout.elements[c].type === 'chart_timeline' || state.layout.elements[c].type === 'chart' || state.layout.elements[c].type === 'chart_multi') {
              return { 
                ...p, 
                [c]: {
                  ...state.layout.elements[c],
                  data: {
                    ...state.layout.elements[c].data,
                    range: action.range,
                    forceRealtime: action.realtime,
                    triger: Date.now(),
                  }
                }
              }
            }
            return { ...p, [c]: state.layout.elements[c] }
          }, {}),
        }
      };
    case APP_LAYOUT_SYNC_CHARTS_CONTAINER:
      return { 
        ...state,
        containers: {
          ...state.containers,
          [action.containerId]: {
            ...state.containers[action.containerId],
            elements: Object
              .keys(state.containers[action.containerId].elements)
              .reduce((p, c) => {
                if (state.containers[action.containerId].elements[c].type === 'chart_timeline' || state.containers[action.containerId].elements[c].type === 'chart' || state.containers[action.containerId].elements[c].type === 'chart_multi') {
                  return { 
                    ...p, 
                    [c]: {
                      ...state.containers[action.containerId].elements[c],
                      data: {
                        ...state.containers[action.containerId].elements[c].data,
                        range: action.range,
                        forceRealtime: action.realtime,
                        triger: Date.now(),
                      }
                    }
                  }
                }
                return { ...p, [c]: state.containers[action.containerId].elements[c] }
              }, {}),
          }
        }
      };
    case APP_LAYOUT_SYNC_CHARTS_LAYOUT_HOME_ALL:
      return { 
        ...state,
        layout: {
          ...state.layout,
          elements: Object
          .keys(state.layout.elements)
          .reduce((p, c) => {
            if (state.layout.elements[c].type === 'chart_timeline' || state.layout.elements[c].type === 'chart' || state.layout.elements[c].type === 'chart_multi') {
              var ns, ne, forceRealtime;
              if (typeof action.position === 'string') {
                forceRealtime = false;
                const [s, e] = state.layout.elements[c].data.range;
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
                  const { start, end } = getZoomInterval(state.layout.elements[c].interval.value.id);
                  s = start;
                  e = end;
                  pp = state.layout.elements[c].positionCurentTime.value;
                  n = Date.now();
                } else {
                  const times = state.layout.elements[c].data.range;
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
                  ...state.layout.elements[c],
                  data: {
                    ...state.layout.elements[c].data,
                    range: [ns, ne],
                    forceRealtime: forceRealtime,
                    triger: Date.now(),
                  }
                }
              }
            }
            return { ...p, [c]: state.layout.elements[c] }
          }, {}),
        }
      };
    case APP_LAYOUT_SYNC_CHARTS_CONTAINER_HOME_ALL:
      return { 
        ...state,
        containers: {
          ...state.containers,
          [action.containerId]: {
            ...state.containers[action.containerId],
            elements: Object
              .keys(state.containers[action.containerId].elements)
              .reduce((p, c) => {
                if (state.containers[action.containerId].elements[c].type === 'chart_timeline' || state.containers[action.containerId].elements[c].type === 'chart' || state.containers[action.containerId].elements[c].type === 'chart_multi') {
                  var ns, ne, forceRealtime;
                  if (typeof action.position === 'string') {
                    forceRealtime = false;
                    const [s, e] = state.containers[action.containerId].elements[c].data.range;
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
                      const { start, end } = getZoomInterval(state.containers[action.containerId].elements[c].interval.value.id);
                      s = start;
                      e = end;
                      pp = state.containers[action.containerId].elements[c].positionCurentTime.value;
                      n = Date.now();
                    } else {
                      const times = state.containers[action.containerId].elements[c].data.range;
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
                      ...state.containers[action.containerId].elements[c],
                      data: {
                        ...state.containers[action.containerId].elements[c].data,
                        range: [ns, ne],
                        forceRealtime: forceRealtime,
                        triger: Date.now(),
                      }
                    }
                  }
                }
                return { ...p, [c]: state.containers[action.containerId].elements[c] }
              }, {}),
          }
        }
      };
    case APP_LAYOUT_UPDATE_ELEMENTS_ALL:
      return {
        ...state,
        ...reducer(state, { type: APP_LAYOUT_UPDATE_ELEMENTS, data: action.data }),
        ...reducer(state, { type: APP_LAYOUT_UPDATE_TEMPLATES, data: action.data }),
      }
    case APP_LAYOUT_UPDATE_TEMPLATES:
      return {
        ...state,
        states: Object
          .keys(state.states)
          .reduce((p, c) => {
            return { 
              ...p, 
              [c]: Object
                .keys(state.states[c])
                .reduce((p2, c2) => {
                  if (action.data[c] && action.data[c][c2] !== undefined) {
                    return { ...p2, [c2]: action.data[c][c2] }
                  }
                  return { ...p2, [c2]: state.states[c][c2] }
                }, {})
            }
          }, {}),
        containers: Object
          .keys(state.containers)
          .reduce((p, c) => {
            if (action.containerId === undefined || c === action.containerId) {
              return { 
                ...p, [c]: {
                  ...state.containers[c],
                  elements: Object
                    .keys(state.containers[c].elements)
                    .reduce((p2, c2) => {
                      const elements = Object
                        .keys(state.containers[c].elements[c2])
                        .reduce((p3, c3) => {
                          if (c3 === 'data' && state.containers[c].elements[c2].type === 'devicelog' && action.data[c2]) {
                            return { ...p3, [c3]: action.data[c2].concat(state.containers[c].elements[c2][c3]) }
                          }
                          if (
                            state.containers[c].elements[c2][c3] &&
                            state.containers[c].elements[c2][c3].enabled && 
                            action.data[state.containers[c].elements[c2][c3].did] &&
                            action.data[state.containers[c].elements[c2][c3].did][state.containers[c].elements[c2][c3].prop] !== undefined 
                          ) {
                            try  {
                              if (c3 === 'w2' || c3 === 'h2') {
                                const prop1 = c3 === 'w2' ? 'x': 'y';
                                const prop2 = c3 === 'w2' ? 'w': 'h';

                                const curentValue = state.containers[c].elements[c2][c3].func.call(null, action.data[state.containers[c].elements[c2][c3].did][state.containers[c].elements[c2][c3].prop], {});
                                const delta = curentValue - state.containers[c].elements[c2][prop2].value;

                                return { 
                                  ...p3, 
                                  [prop1]: { ...state.containers[c].elements[c2][prop1], value: state.containers[c].elements[c2][prop1].value - delta },
                                  [prop2]: { ...state.containers[c].elements[c2][prop2], value: curentValue },
                                  [c3]: { ...state.containers[c].elements[c2][c3], value: curentValue }
                                }
                              }
                              return { 
                                ...p3, 
                                [c3]: {
                                  ...state.containers[c].elements[c2][c3],
                                  value: state.containers[c].elements[c2][c3].func.call(null, action.data[state.containers[c].elements[c2][c3].did][state.containers[c].elements[c2][c3].prop], {}),
                                }
                              }
                            } catch (e) {
                              return { ...p3, [c3]: state.containers[c].elements[c2][c3] }
                            }
                          }
                          return { ...p3, [c3]: state.containers[c].elements[c2][c3] }
                        }, {});
                      if (state.containers[c].elements[c2].type !== 'template') {
                        return { 
                          ...p2, 
                          [c2]: elements,
                        }
                      }
                      const statesValue = state.templates[state.containers[c].elements[c2].templateId].listState
                        .reduce((last, stateId) => {
                          if (state.containers[c].elements[c2].links[stateId]) {
                            const item = state.containers[c].elements[c2].links[stateId];
                            if (action.data[item.did] && action.data[item.did][item.prop] !== undefined) {
                              return { ...last, [stateId]: action.data[item.did][item.prop] }
                            }
                          }
                          return last;
                        }, state.containers[c].elements[c2].states)

                      return { 
                        ...p2, [c2]: {
                          ...state.containers[c].elements[c2],
                          ...elements,
                          states: statesValue,
                          elements: state.templates[state.containers[c].elements[c2].templateId].listState
                            .reduce((p3, c3) => {
                              const s = state.templates[state.containers[c].elements[c2].templateId].state[c3].values;
                              const data = mergeStates(c3, p3, s, statesValue);
                              return Object
                                .keys(data)
                                .reduce((p5, c5) => {
                                  return { 
                                    ...p5, 
                                    [c5]: Object
                                      .keys(data[c5])
                                      .reduce((p6, c6) => {
                                        if (data[c5][c6] && data[c5][c6].enabled) {
                                          try  {
                                            if (c6 === 'w2' || c6 === 'h2') {
                                              const prop1 = c6 === 'w2' ? 'x': 'y';
                                              const prop2 = c6 === 'w2' ? 'w': 'h';

                                              const curentValue = data[c5][c6].func.call(null, statesValue[data[c5][c6]._bind], statesValue);
                                              const delta = curentValue - data[c5][prop2].value;

                                              return { 
                                                ...p6, 
                                                [prop1]: { ...data[c5][prop1], value: data[c5][prop1].value - delta },
                                                [prop2]: { ...data[c5][prop2], value: curentValue },
                                                [c6]: { ...data[c5][c6], value: curentValue }
                                              }
                                            }
                                            return { 
                                              ...p6, 
                                              [c6]: {
                                                ...data[c5][c6],
                                                value: data[c5][c6].func.call(null, statesValue[data[c5][c6]._bind], statesValue),
                                              }
                                            }
                                          } catch {
                                            return { ...p6, [c6]: data[c5][c6]}
                                          }
                                        }
                                        return { ...p6, [c6]: data[c5][c6]}
                                      },)
                                  }
                                }, {}) 
                            }, state.containers[c].elements[c2].elements),
                        }
                      }
                    }, {}),
                } 
              }
            }
            return { ...p, [c]: state.containers[c] }
          }, {}),
      };
    default:
      return state;
  }
}


export default reducer;
