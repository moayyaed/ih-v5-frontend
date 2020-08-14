import { APP_LAYOUT_SET_DATA, APP_LAYOUT_UPDATE_TEMPLATES, APP_LAYOUT_UPDATE_ELEMENTS } from './constants';
import elements from 'components/@Elements';


const defaultState = {
  layoutId: null,
  layout: { list: [] },
  containers: {},
  templates: {},
};

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


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_LAYOUT_SET_DATA:
      return { ...state, ...action.data };
    case APP_LAYOUT_UPDATE_ELEMENTS:
      return { 
        ...state,
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
                  if (
                    state.layout.elements[c2][c3].enabled && 
                    action.data[c2][state.layout.elements[c2][c3].did] &&
                    action.data[c2][state.layout.elements[c2][c3].did][state.layout.elements[c2][c3].prop] !== undefined 
                  ) {
                    try  {
                      return { 
                        ...p3, 
                        [c3]: {
                          ...state.layout.elements[c2][c3],
                          value: state.layout.elements[c2][c3].func.call(null, action.data[c2][state.layout.elements[c2][c3].did][state.layout.elements[c2][c3].prop], {}),
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
    case APP_LAYOUT_UPDATE_TEMPLATES:
      return {
        ...state,
        containers: Object
          .keys(state.containers)
          .reduce((p, c) => {
            if (c === action.containerId) {
              return { 
                ...p, [c]: {
                  ...state.containers[c],
                  elements: Object
                    .keys(state.containers[c].elements)
                    .reduce((p2, c2) => {
                      if (action.data[c2]) {
                        const elements = Object
                          .keys(state.containers[c].elements[c2])
                          .reduce((p3, c3) => {
                            
                            if (
                              state.containers[c].elements[c2][c3].enabled && 
                              action.data[c2][state.containers[c].elements[c2][c3].did] &&
                              action.data[c2][state.containers[c].elements[c2][c3].did][state.containers[c].elements[c2][c3].prop] !== undefined 
                            ) {
                              try  {
                                if (c3 === 'w2' || c3 === 'h2') {
                                  const prop1 = c3 === 'w2' ? 'x': 'y';
                                  const prop2 = c3 === 'w2' ? 'w': 'h';

                                  const curentValue = state.containers[c].elements[c2][c3].func.call(null, action.data[c2][state.containers[c].elements[c2][c3].did][state.containers[c].elements[c2][c3].prop], {});
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
                                    value: state.containers[c].elements[c2][c3].func.call(null, action.data[c2][state.containers[c].elements[c2][c3].did][state.containers[c].elements[c2][c3].prop], {}),
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
                        return { 
                          ...p2, [c2]: {
                            ...state.containers[c].elements[c2],
                            ...elements,
                            states: { ...state.containers[c].elements[c2].states, ...action.data[c2] },
                            elements: state.templates[state.containers[c].elements[c2].templateId].listState
                              .reduce((p3, c3) => {
                                const s = state.templates[state.containers[c].elements[c2].templateId].state[c3].values;
                                const v = { ...state.containers[c].elements[c2].states, ...action.data[c2] };
                                const data = mergeStates(c3, p3, s, v);
                                return Object
                                  .keys(data)
                                  .reduce((p5, c5) => {
                                    return { 
                                      ...p5, 
                                      [c5]: Object
                                        .keys(data[c5])
                                        .reduce((p6, c6) => {
                                          if (data[c5][c6].enabled) {
                                            try  {
                                              if (c6 === 'w2' || c6 === 'h2') {
                                                const prop1 = c6 === 'w2' ? 'x': 'y';
                                                const prop2 = c6 === 'w2' ? 'w': 'h';

                                                const curentValue = data[c5][c6].func.call(null, v[data[c5][c6]._bind], v);
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
                                                  value: data[c5][c6].func.call(null, v[data[c5][c6]._bind], v),
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
                      }
                      return { ...p2, [c2]: state.containers[c].elements[c2] }
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
