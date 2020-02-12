import actionsApp from 'components/App/actions';
import reducerApp from 'components/App/reducer';


import App from './App';
import Login from './Login';


const options = {
  actions: {
    app: actionsApp,
  },
  reducers: {
    app: reducerApp,
  },

  pages: {
    main: App,
    login: Login,
  },
  
  routePrefix: '/admin',
}


export default options;