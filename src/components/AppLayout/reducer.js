import { APP_LAYOUT_SET_DATA, APP_LAYOUT_UPDATE_TEMPLATES } from './constants';


const defaultState = {
  layout: { list: [] },
  containers: {},
  templates: {},
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_LAYOUT_SET_DATA:
      return { ...state, ...action.data };
    case APP_LAYOUT_UPDATE_TEMPLATES:
      return { 
        ...state,
        templates: Object
          .keys(state.templates)
          .reduce((p, c) => {
            if (action.data[c]) {
              return { 
                ...p, 
                [c]: {
                  ...state.templates[c],
                  elements: Object
                    .keys(state.templates[c].elements)
                    .reduce((p2, c2) => {
                      return { 
                        ...p2, 
                        [c2]: ['master']
                          .concat([...state.templates[c].listState].reverse())
                          .reduce((p3, c3) => {
                            const v = action.data[c][c3] || 0;
                            return p3;
                          }, state.templates[c].elements[c2])
                      }
                    }, {})
                }  
              }
            }
            return { ...p, [c]: state.templates[c] }
          }, {})
      };
    default:
      return state;
  }
}


export default reducer;
