import { 
  APP_PAGE_SET_DATA, 
  APP_PAGE_SET_VALUE_FORM_BASIC,
  APP_PAGE_SET_VALUE_FORM_TABLE,
} from './constants';


const defaultState = {
  id: null,
  save: false,
  scheme: {},
  data: [],
  cache: {}
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_PAGE_SET_DATA:
      return { ...state, ...action.data };
    case APP_PAGE_SET_VALUE_FORM_BASIC:
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
    case APP_PAGE_SET_VALUE_FORM_TABLE:
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
