import { APP_LAYOUT_SET_DATA, APP_LAYOUT_UPDATE_TEMPLATES } from './constants';


const defaultState = {
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
                        return { 
                          ...p2, [c2]: {
                            ...state.containers[c].elements[c2],
                            states: { ...state.containers[c].elements[c2].states, ...action.data[c2] },
                            elements: state.templates[state.containers[c].elements[c2].templateId].listState
                              .reduce((p3, c3) => {
                                const s = state.templates[state.containers[c].elements[c2].templateId].state[c3].values;
                                const v = { ...state.containers[c].elements[c2].states, ...action.data[c2] };
                                const data = mergeStates(c3, p3, s, v);
                                return Object
                                  .keys(data)
                                  .reduce((p5, c5) => {
                                    if (data[c5].text._bind) {
                                      return { 
                                        ...p5, 
                                        [c5]: { 
                                          ...data[c5],
                                          text: {
                                            ...data[c5].text,
                                            value: v[data[c5].text._bind]
                                          } 
                                        } 
                                      }
                                    }
                                    return { ...p5, [c5]: data[c5] }
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
