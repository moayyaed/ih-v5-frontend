import { APP_PAGE_SET_DATA, APP_PAGE_SET_VALUE_FORM } from './constants';


const defaultState = {
  id: null,
  save: false,
  saveData: {},
  scheme: {},
  data: [],
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_PAGE_SET_DATA:
      return { ...state, ...action.data };
    case APP_PAGE_SET_VALUE_FORM:
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
    default:
      return state;
  }
}


export default reducer;
