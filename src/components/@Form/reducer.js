import { 
  FORM_SET_ERRORS,

  FORM_SET_VALUE_BASIC,
  FORM_SET_VALUE_TABLE,

  FORM_ADD_ROW_TABLE,
  FORM_REMOVE_ROW_TABLE,
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
    case FORM_ADD_ROW_TABLE:
      return { 
        ...state, 
        data: {
          ...state.data,
          [action.id]: {
            ...state.data[action.id],
            [action.prop]: state.data[action.id][action.prop].concat(action.row)
          }
        }
      };
    case FORM_REMOVE_ROW_TABLE:
      return { 
        ...state, 
        cache: {
          ...state.cache,
          [action.id]: {
            ...state.cache[action.id],
            [action.prop]: { 
              ...state.cache[action.id][action.prop],
              remove: {
                ...state.cache[action.id][action.prop]['remove'],
                [action.rowid]: action.value
              }
            },
          }
        }
      };
    default:
      return state;
  }
}


export default reducer;
