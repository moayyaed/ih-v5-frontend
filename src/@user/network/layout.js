import core from 'core';
import css from 'css';

import { createValueFunc, options } from 'components/tools';

function preparationData(data) {
  
  // animation start
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
                          const id = `${values[0]}_${templateId}_${stateId}_${value}`;

                          values[0] = id;
                          data.templates[templateId].state[stateId].values[value][elemId][property].value = values.join(' ');

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
                      })
                  })
              })
          });
      })
  // animation end

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
              data.containers[key].elements[id].states[stateId] = data.states[key][id].states[stateId] || 0;
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
              data.containers[key].elements[id].elements[elemId] = { 
                ...renderState[elemId], 
                ...masterState[elemId],
                ...curentStateElem,
              }
              Object
                .keys(data.containers[key].elements[id].elements[elemId])
                .forEach(propId => {
                  if (data.containers[key].elements[id].elements[elemId][propId].enabled) {
                    const value = data.states[key][id].states[data.containers[key].elements[id].elements[elemId][propId]._bind] || 0;
                    try {
                      const f = createValueFunc(data.containers[key].elements[id].elements[elemId][propId].func)
                      data.containers[key].elements[id].elements[elemId][propId].func = f.body;
                      data.containers[key].elements[id].elements[elemId][propId].value = data.containers[key].elements[id].elements[elemId][propId].func.call(null, value, data.containers[key].elements[id].states);
                    } catch {
                      data.containers[key].elements[id].elements[elemId][propId].value = value;
                    }
                  }
                })
            })
          }
        }
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
  ]);
})


core.network.response('applayout', (answer, res, context) => {
  answer(preparationData({
    layout: res[0].data,
    containers: res[1].data,
    templates: res[2].data,
    states: res[3].data,
  }));
})