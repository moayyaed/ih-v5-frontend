import { APP_SET_DATA, APP_SET_ROUTE, APP_SET_AUTH, APP_ALERT_OPEN, APP_ALERT_CLOSE, APP_DIALOG_RESTART } from './constants';


const defaultState = {
  alert: {
    open: false,
    severity: 'info',
    message: '',
  },
  route: {},
  auth: false,
  restart: false,
};


function reducer(state = defaultState, action) {
  switch (action.type) {
    case APP_SET_DATA:
      return { ...state, ...action.data };
    case APP_SET_ROUTE:
      return { ...state, route: action.params };
    case APP_SET_AUTH:
      return { ...state, auth: action.value };
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
    case APP_DIALOG_RESTART:
      return { ...state, restart: action.mode };
    default:
      return state;
  }
}


export default reducer;
