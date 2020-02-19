import { APP_DIALOG_SET_DATA } from './constants';


const defaultState = {
  open: false,
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_DIALOG_SET_DATA:
      return { ...state, ...action.data };
    default:
      return state;
  }
}


export default reducer;
