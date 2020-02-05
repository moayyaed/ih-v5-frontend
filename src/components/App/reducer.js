import { APP_SET_DATA, APP_ALERT_OPEN, APP_ALERT_CLOSE } from './constants';


const defaultState = {
  alert: {
    open: false,
    severity: 'info',
    message: '',
  },
  auth: false,
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_SET_DATA:
      return { ...state, ...action.data };
    case APP_ALERT_OPEN:
      return { 
        ...state, 
        alert: { 
          ...state.alert, 
          open: true, 
          severity: action.severity, 
          message: action.message 
        } 
    };
    case APP_ALERT_CLOSE:
      return { ...state, alert: { ...state.alert, open: false } };
    default:
      return state;
  }
}


export default reducer;
