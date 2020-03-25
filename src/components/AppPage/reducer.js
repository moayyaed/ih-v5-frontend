import { 
  APP_PAGE_SET_DATA,
  APP_PAGE_CLEAR_DATA,
} from './constants';


const defaultState = {
  id: null,
  save: false,
  scheme: {},
  data: {},
  cache: {}
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_PAGE_SET_DATA:
      return { ...state, ...action.data };
    case APP_PAGE_CLEAR_DATA:
      return { };
    default:
      return state;
  }
}


export default reducer;
