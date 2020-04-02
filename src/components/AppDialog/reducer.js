import { 
  APP_DIALOG_SET_DATA, 
  APP_DIALOG_CLOSE, 
  APP_DIALOG_SET_COMPONENT,
  APP_DIALOG_SET_FORM,

  APP_DIALOG_FORM_SET_ERRORS,
  APP_DIALOG_FORM_SET_VALUE_BASIC,
  APP_DIALOG_FORM_SET_VALUE_TABLE,
  APP_DIALOG_FORM_ADD_ROW_TABLE,
  APP_DIALOG_FORM_REMOVE_ROW_TABLE,
} from './constants';


const defaultState = {
  open: false,
  title: '',
  transfer: null,
  template: { type: null, id: null },
  component: { type: null, id: null },
  form: {
    id: null,
    save: false,
    scheme: {},
    data: {},
    cache: {}
  }
};


function formReducer(state, action) {
  switch (action.type) {
    case APP_DIALOG_FORM_SET_ERRORS:
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
    case APP_DIALOG_FORM_SET_VALUE_BASIC:
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
    case APP_DIALOG_FORM_SET_VALUE_TABLE:
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
    case APP_DIALOG_FORM_ADD_ROW_TABLE:
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
    case APP_DIALOG_FORM_REMOVE_ROW_TABLE:
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

function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_DIALOG_SET_DATA:
      return { ...state, ...action.data };
    case APP_DIALOG_CLOSE:
      return { ...defaultState };
    case APP_DIALOG_SET_COMPONENT:
      return { ...state, component: action.data };
    case APP_DIALOG_SET_FORM:
      return { ...state, form: action.data };
    case APP_DIALOG_FORM_SET_ERRORS:
    case APP_DIALOG_FORM_SET_VALUE_BASIC:
    case APP_DIALOG_FORM_SET_VALUE_TABLE:
    case APP_DIALOG_FORM_ADD_ROW_TABLE:
    case APP_DIALOG_FORM_REMOVE_ROW_TABLE:
      return { ...state, form: formReducer(state.form, action) };
    default:
      return state;
  }
}


export default reducer;
