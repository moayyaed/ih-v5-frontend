import { 
  APP_LAYOUT_SET_DATA,
  APP_LAYOUT_UPDATE_ELEMENTS_ALL,
  APP_LAYOUT_CHANGE_CONTAINER,
} from './constants';


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
        contextid: action.contextid,
        linkid: action.containerid,
        list: action.data.list,
      } 
    },
    templates: {
      ...state.templates,
      ...action.data.templates
    },
    widgets: {
      ...state.widgets,
      ...action.data.widgets
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
    default:
      return state;
  }
}


export default reducer;
