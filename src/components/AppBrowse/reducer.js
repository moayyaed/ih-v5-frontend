import { 
  APP_BROWSE_SET_DATA, 
} from './constants';


const defaultState = {
  open: false,
  width: 300, 
  options: { popupdelete: true, columns: [] },
  data: [],
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_BROWSE_SET_DATA:
      return { ...state, ...action.data };
    default:
      return state;
  }
}


export default reducer;
