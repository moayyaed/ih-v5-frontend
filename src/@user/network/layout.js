import core from 'core';
import css from 'css';

import { createValueFunc, options } from 'components/tools';

function mergeData(data1, data2) {
  const temp = { ...data1, ...data2 };
  Object
    .keys(temp)
    .forEach(key => {
      temp[key] = {  ...data1[key], ...data2[key] };
    });
  return temp;
}

function preparationData(data, clearAnimation = true) {

  if (data.contextId != undefined) {
    core.cache.contexts[data.contextContainerId] = data.contextId;
  } else {
    core.cache.contexts = {};
  }
  
  // set local vars 
    Object
      .keys(core.cache.vars)
      .forEach(key => {
        Object
          .keys(core.cache.vars[key])
          .forEach(prop => {
            if (data.states[key] === undefined) {
              data.states[key] = {}
            }
            data.states[key][prop] = core.cache.vars[key][prop]
          });
      });

    try {
      data.states.__syslocal_layout = {};
      data.states.__syslocal_username = {};
      data.states.__syslocal_layout.layout = data.layoutId;
      data.states.__syslocal_username.username = data.username;
    } catch {

    }

   // set local vars 

  // clear animation
  if (clearAnimation) {
    const temp = []

    Object
      .keys(document.styleSheets[0].rules)
      .forEach(id => {
        if (document.styleSheets[0].rules[id].type === CSSRule.KEYFRAMES_RULE) {
          temp.push(id)
        }
      })
    temp
      .reverse()
      .forEach(id => {
        document.styleSheets[0].deleteRule(id);
     })
  }
  // clear animation

  // clear chart
    core.cache.chart.l = null;
    core.cache.chart.c = {};
  // clear chart


  // layout start
  Object
    .keys(data.layout.elements)
    .forEach(id => {
      if (data.layout.elements[id].type === 'container') {
        if (
          data.layout.elements[id].widgetlinks && 
          data.layout.elements[id].widgetlinks.link &&
          data.layout.elements[id].widgetlinks.link.value &&
          data.layout.elements[id].widgetlinks.link.value.device &&
          data.layout.elements[id].widgetlinks.link.value.device.id
        ) {
          core.cache.contexts[data.layout.elements[id].widgetlinks.link.id] = data.layout.elements[id].widgetlinks.link.value.device.id;
        }
      }

      Object
      .keys(data.layout.elements[id])
      .forEach(propId => {
        const item = data.layout.elements[id][propId];

        if (
          propId === 'animation' &&
          item.active &&
          item.keyframes &&
          item.value
        ) {
          const values = item.value.split(' ');
          const old_id = values[0];
          const _id = `${values[0]}_${id}`;

          values[0] = _id;
          data.layout.elements[id][propId].value = values.join(' ');
          if (item && item.enabled) {
            data.layout.elements[id][propId].func = item.func.replace(RegExp(old_id, 'g'), _id)                 
          }
          
          const styles = css.parse(item.keyframes);

          try {
            styles.stylesheet.rules
              .forEach(item => {
                item.name = `${item.name}_${id}`
                if (item.type === 'keyframes') {
                  const style = css.stringify({
                    stylesheet: {
                      rules: [item]
                    },
                    type: 'stylesheet',
                  });
                  try {
                    document.styleSheets[0].insertRule(style, document.styleSheets[0].cssRules.length);
                  } catch {
                  }
                }
              })
          } catch {
            console.warn('Animation not work, wrong css styles!')
          }
        }
        // bind
        if (item && item.enabled) {
          try {
            data.layout.elements[id][propId].func = createValueFunc(item.func).body;
            if (
              data.states[item.did] && 
              data.states[item.did][item.prop] !== undefined
            ) {
              if (propId === 'w2' || propId === 'h2') {
                const prop1 = propId === 'w2' ? 'x': 'y';
                const prop2 = propId === 'w2' ? 'w': 'h';

                const v = data.layout.elements[id][propId].func(data.states[item.did][item.prop], {});
                const curentValue = v;
                const delta = curentValue - data.layout.elements[id][prop2].value;
              

                data.layout.elements[id][prop1].value = data.layout.elements[id][prop1].value - delta;
                data.layout.elements[id][prop2].value = v;
                data.layout.elements[id][propId].value = v;
              } else {
                data.layout.elements[id][propId].value = data.layout.elements[id][propId].func(data.states[item.did][item.prop], {})
              }
            }
          } catch {

          }
        }
        // bind
      })
      // widget data
      if (data.layout.elements[id].widget && data.widgets[id] !== undefined) {
        data.layout.elements[id].data = data.widgets[id];
      } // widget data
    });

  // layout

  // containers animation start
    Object
      .keys(data.templates)
      .forEach(templateId => {
        ['master']
          .concat(data.templates[templateId].listState)
          .forEach(stateId => {
            Object
              .keys(data.templates[templateId].state[stateId].values)
              .forEach(value => {
                Object
                  .keys(data.templates[templateId].state[stateId].values[value])
                  .forEach(elemId => {
                    Object
                      .keys(data.templates[templateId].state[stateId].values[value][elemId])
                      .forEach(property => {
                        const item = data.templates[templateId].state[stateId].values[value][elemId][property];

                        if (
                          property === 'animation' &&
                          item.active &&
                          item.keyframes &&
                          item.value
                        ) {
                          const values = item.value.split(' ');
                          const old_id = values[0];
                          const id = `${values[0]}_${templateId}_${stateId}_${value}`;
                    
                          values[0] = id;
                          data.templates[templateId].state[stateId].values[value][elemId][property].value = values.join(' ');
                          if (item && item.enabled) {
                            data.templates[templateId].state[stateId].values[value][elemId][property].func = item.func.replace(RegExp(old_id, 'g'), id)                 
                          }

                          const styles = css.parse(item.keyframes);

                          try {
                            styles.stylesheet.rules
                              .forEach(item => {
                                item.name = `${item.name}_${templateId}_${stateId}_${value}`
                                if (item.type === 'keyframes') {
                                  const style = css.stringify({
                                    stylesheet: {
                                      rules: [item]
                                    },
                                    type: 'stylesheet',
                                  });
                                  try {
                                    document.styleSheets[0].insertRule(style, document.styleSheets[0].cssRules.length);
                                  } catch {
                                  }
                                }
                              })
                          } catch {
                            console.warn('Animation not work, wrong css styles!')
                          }
                        }
                          // bind
                          if (item && item.enabled) {
                            try {
                              data.templates[templateId].state[stateId].values[value][elemId][property].func = createValueFunc(item.func).body;
                            } catch {

                            }
                          }
                          // bind
                      })
                  })
              })
          });
      })
  // containers animation end

  Object
    .keys(data.containers)
    .forEach(key => {
      Object
      .keys(data.containers[key].elements)
      .forEach(id => {
        if (data.containers[key].elements[id].type === 'template') {
          const templateId = data.containers[key].elements[id].templateId;

          data.containers[key].elements[id].elements = {};
          data.containers[key].elements[id].states = {
            master: 0,
          };
          
          if (data.templates[templateId]) {
            data.templates[templateId].listState.forEach(stateId => {
              const item = data.containers[key].elements[id].links[stateId];
              if (item && (item.did === '__device' || item.did === '__devstat')) {
                if (core.cache.contexts[key] !== undefined) {
                  item.did = core.cache.contexts[key];
                }
              }
              if (item && data.states[item.did] && data.states[item.did][item.prop] !== undefined) {
                data.containers[key].elements[id].states[stateId] = data.states[item.did][item.prop] || 0;
              } else {
                data.containers[key].elements[id].states[stateId] = 0;
              }
            })

            const masterState = data.templates[templateId].state.master.values[0];
            const renderState = data.templates[templateId].elements;
            
            Object
            .keys(masterState)
            .forEach(elemId => {
              const curentStateElem = data.templates[templateId].listState
                .reduce((p, c) => {
                  const state = data.templates[templateId].state[c].values[data.containers[key].elements[id].states[c]];
                  if (state && state[elemId]) {
                    return { ...p, ...state[elemId] }
                  }
                  return p;
                }, {});   

              const tempState = { 
                ...renderState[elemId], 
                ...masterState[elemId],
                ...curentStateElem,
              }; 
              data.containers[key].elements[id].elements[elemId] = Object
                .keys(tempState)
                .reduce((p, c) => {
                  if (typeof tempState[c] === 'string' || tempState[c] === null) {
                    return { ...p, [c]: tempState[c] }
                  }
                  return { 
                    ...p, 
                    [c]: Object
                      .keys(tempState[c])
                      .reduce((p2, c2) => {
                        return { ...p2, [c2]: tempState[c][c2] }
                      }, {}) 
                  }
                }, {})
                
              Object
                .keys(data.containers[key].elements[id].elements[elemId])
                .forEach(propId => {
                  if (data.containers[key].elements[id].elements[elemId][propId] && data.containers[key].elements[id].elements[elemId][propId].enabled) {
                    const bind = data.containers[key].elements[id].elements[elemId][propId]._bind;
                    if (data.containers[key].elements[id].links[bind]) {
                      const item = data.containers[key].elements[id].links[bind];
                      const value = data.states[item.did] && data.states[item.did][item.prop] !== undefined ? data.states[item.did][item.prop] : 0;
                      try {
                        if (propId === 'w2' || propId === 'h2') {
                          const prop1 = propId === 'w2' ? 'x': 'y';
                          const prop2 = propId === 'w2' ? 'w': 'h';
  
                          const v = data.containers[key].elements[id].elements[elemId][propId].func.call(null, value, data.containers[key].elements[id].states);
                          const curentValue = v;
                          const delta = curentValue - data.containers[key].elements[id].elements[elemId][prop2].value;
                       
                          
                          data.containers[key].elements[id].elements[elemId][prop1].value = data.containers[key].elements[id].elements[elemId][prop1].value - delta;
                          data.containers[key].elements[id].elements[elemId][prop2].value = v;
                          data.containers[key].elements[id].elements[elemId][propId].value = v;
                        } else {
                          data.containers[key].elements[id].elements[elemId][propId].value = data.containers[key].elements[id].elements[elemId][propId].func.call(null, value, data.containers[key].elements[id].states);
                          // console.log(key, id, elemId, propId, data.containers[key].elements[id].elements[elemId][propId].value)
                        }
                        
                      } catch {
                        data.containers[key].elements[id].elements[elemId][propId].value = value;
                      }
                    }
                  }
                })
              
            })
          }
        }
        Object
        .keys(data.containers[key].elements[id])
        .forEach(propId => {
          const item = data.containers[key].elements[id][propId];

          if (
            propId === 'animation' &&
            item.active &&
            item.keyframes &&
            item.value
          ) {
            const values = item.value.split(' ');
            const old_id = values[0];
            const _id = `${values[0]}_${key}_${id}`;

            values[0] = _id;
            data.containers[key].elements[id][propId].value = values.join(' ');
            if (item && item.enabled) {
              data.containers[key].elements[id][propId].func = item.func.replace(RegExp(old_id, 'g'), _id)                 
            }
            
            const styles = css.parse(item.keyframes);

            try {
              styles.stylesheet.rules
                .forEach(item => {
                  item.name = `${item.name}_${key}_${id}`
                  if (item.type === 'keyframes') {
                    const style = css.stringify({
                      stylesheet: {
                        rules: [item]
                      },
                      type: 'stylesheet',
                    });
                    try {
                      document.styleSheets[0].insertRule(style, document.styleSheets[0].cssRules.length);
                    } catch {
                    }
                  }
                })
            } catch {
              console.warn('Animation not work, wrong css styles!')
            }
          }

          // link
          if (item && item.link && item.link.id === '__device') {
            item.link.id = core.cache.contexts[key];
          }

          // bind
          if (item && item.enabled) {
            try {
              if (item && (item.did === '__device' || item.did === '__devstat')) {
                if (core.cache.contexts[key] !== undefined) {
                  item.did = core.cache.contexts[key];
                }
              }
              data.containers[key].elements[id][propId].func = createValueFunc(item.func).body;
              if (data.states[item.did] && data.states[item.did][item.prop] !== undefined) {
                if (propId === 'w2' || propId === 'h2') {
                  const prop1 = propId === 'w2' ? 'x': 'y';
                  const prop2 = propId === 'w2' ? 'w': 'h';

                  const v = data.containers[key].elements[id][propId].func(data.states[item.did][item.prop], {})
                  const curentValue = v;
                  const delta = curentValue - data.containers[key].elements[id][prop2].value;
    
  
                  data.containers[key].elements[id][prop1].value = data.containers[key].elements[id][prop1].value - delta;
                  data.containers[key].elements[id][prop2].value =  v;
                  data.containers[key].elements[id][propId].value = v;
                } else {
                  data.containers[key].elements[id][propId].value = data.containers[key].elements[id][propId].func(data.states[item.did][item.prop], {})
                }
              }
            } catch {

            }
          }
          // bind
        })

        // widget data
        if (data.widgets[key] && data.containers[key].elements[id].widget && data.widgets[key][id] !== undefined) {
          data.containers[key].elements[id].data = data.widgets[key][id];
        } // widget data

      });
    });

    Object
      .keys(data.templates)
      .forEach(key => {
        data.templates[key].listState = ['master'].concat([...data.templates[key].listState].reverse());
      });
  return data;
}


core.network.request('applayout', (send, context) => {
  send([
    { api: 'layout', id: context.params.layoutId },
    { api: 'containers', layoutid: context.params.layoutId },
    { api: 'templates', layoutid: context.params.layoutId },
    { api: 'containers', layoutid: context.params.layoutId, rt: 1 },
    { api: 'layout', id: context.params.layoutId, rt: 1 },
    { api: 'layout', id: context.params.layoutId, widgetdata: 1 },
    { api: 'containers', layoutid: context.params.layoutId, widgetdata: 1 },
  ]);
})


core.network.response('applayout', (answer, res, context) => {
  answer(preparationData({
    layout: res[0].data,
    containers: res[1].data,
    templates: res[2].data,
    states: mergeData(res[3].data, res[4].data),
    widgets: mergeData(res[5].data, res[6].data),
    layoutId: context.params.layoutId,
    username: context.params.username, 
  }));
})


core.network.request('get_container', (send, context) => {
  send([
    { api: 'container',  id: context.params.containerId },
    { api: 'templates', containerid: context.params.containerId },
    { api: 'container',  id: context.params.containerId, contextId: context.params.contextId, rt: 1 },
    { api: 'container',  id: context.params.containerId, contextId: context.params.contextId, widgetdata: 1 },
  ]);
})


core.network.response('get_container', (answer, res, context) => {
  answer(preparationData({
    layout: { list: [], elements: {} },
    containers: { [context.params.containerId]: res[0].data } ,
    templates: res[1].data,
    states: res[2].data,
    widgets: { [context.params.containerId]: res[3].data },
    contextContainerId: context.params.containerId,
    contextId: context.params.contextId, 
  }, false));
})