import { 
  FORM_SET_ERRORS,
  FORM_SET_CACHE,
  FORM_SET_VALUE_BASIC,
  FORM_SET_VALUE_TABLE,
} from './constants';


function reducer(state, action) {
  switch (action.type) {
    case FORM_SET_ERRORS:
      return { 
          ...state,
          cache: Object
            .keys(state.cache)
            .reduce((p, c) => {
              if (action.errors[c] !== undefined) {
                return { 
                  ...p, 
                  [c]: Object
                    .keys(state.cache[c])
                    .reduce((l, n) => {
                      if (action.errors[c][n] !== undefined) {
                        return { ...l, [n]: { ...state.cache[c][n], error: action.errors[c][n] } };
                      }
                      return { ...l, [n]: state.cache[c][n] };
                    }, {})
                };
              }
              return { ...p, [c]: state.cache[c] }
            }, {})
       };
    case FORM_SET_CACHE:
      return { 
        ...state, 
        cache: {
          ...state.cache,
          [action.id]: {
            ...state.cache[action.id],
            [action.prop]: { 
              ...state.cache[action.id][action.prop],
              [action.key]: {
                ...state.cache[action.id][action.prop][action.key],
                ...action.value
              }
            },
          }
        }
      };
    case FORM_SET_VALUE_BASIC:
      return { 
        ...state, 
        data: {
          ...state.data,
          [action.id]: {
            ...state.data[action.id],
            [action.prop]: action.value,
          }
        }
      };
    case FORM_SET_VALUE_TABLE:
      return { 
        ...state, 
        data: {
          ...state.data,
          [action.id]: {
            ...state.data[action.id],
            [action.prop]: state.data[action.id][action.prop].map(row => {
              if (row.id === action.rowid) {
                return { ...row, [action.name]: action.value };
              }
              return row;
            })
          }
        }
      };
    default:
      return state;
  }
}


export default reducer;
