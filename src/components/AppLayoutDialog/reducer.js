import { APP_LAYOUT_DIALOG_SET_DATA, APP_LAYOUT_DIALOG_UPDATE_ELEMENTS, APP_LAYOUT_DIALOG_SYNC_CHARTS_LAYOUT } from './constants';


const defaultState = {
  open: false,
  list: [],
  containers: {},
  templates: {},
  elements: {},
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_LAYOUT_DIALOG_SET_DATA:
      return { ...state, ...action.data };
    case APP_LAYOUT_DIALOG_UPDATE_ELEMENTS:
      return { 
        ...state,
        static: Object
          .keys(state.static)
          .reduce((p, c) => {
            return { 
              ...p, 
              [c]: Object
                .keys(state.static[c])
                .reduce((p2, c2) => {
                  if (action.data[c] && action.data[c][c2] !== undefined) {
                    return { ...p2, [c2]: action.data[c][c2] }
                  }
                  return { ...p2, [c2]: state.static[c][c2] }
                }, {})
            }
          }, {}),
        elements: Object
          .keys(state.elements)
          .reduce((p2, c2) => {
            return  { 
              ...p2, 
              [c2]: Object
                .keys(state.elements[c2])
                .reduce((p3, c3) => {
                  if (
                    state.elements[c2][c3].enabled && 
                    action.data[state.elements[c2][c3].did] &&
                    action.data[state.elements[c2][c3].did][state.elements[c2][c3].prop] !== undefined 
                  ) {
                    try  {
                      return { 
                        ...p3, 
                        [c3]: {
                          ...state.elements[c2][c3],
                          value: state.elements[c2][c3].func.call(null, action.data[state.elements[c2][c3].did][state.elements[c2][c3].prop], {}),
                        }
                      }
                    } catch (e) {
                      return { ...p3, [c3]: state.elements[c2][c3] }
                    }
                  }
                  return { ...p3, [c3]: state.elements[c2][c3] }
                }, {}),
            }
          }, {}),
      };
    case APP_LAYOUT_DIALOG_SYNC_CHARTS_LAYOUT:
      return { 
        ...state,
        elements: Object
        .keys(state.elements)
        .reduce((p, c) => {
          if (state.elements[c].type === 'chart') {
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
          return { ...p, [c]: state.elements[c] }
        }, {}),
      };
    default:
      return state;
  }
}


export default reducer;
