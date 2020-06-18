import actionsApp from 'components/App/actions';
import reducerApp from 'components/App/reducer';

import App from './pages/App';
import Login from '../@admin/pages/Login';


import routeParse from './routeParse';

import './network';



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

  componentsScheme: {

  },

  components: {
    default: null,
  },
  
  routePrefix: '/',
  routeParse: routeParse,
}


export default options;