import { APP_PAGE_SET_DATA } from './constants';


const defaultState = {
  id: null,
  scheme: {},
  data: [],
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_PAGE_SET_DATA:
      return { ...state, ...action.data };
    default:
      return state;
  }
}


export default reducer;
