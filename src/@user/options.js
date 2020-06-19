import actionsApp from 'components/App/actions';
import reducerApp from 'components/App/reducer';

import actionsAppLayout from 'components/AppLayout/actions';
import reducerAppLayout from 'components/AppLayout/reducer';

import App from './pages/App';
import Login from '../@admin/pages/Login';


import routeParse from './routeParse';

import './network';



const options = {
  actions: {
    app: actionsApp,
    layout: actionsAppLayout,
  },
  reducers: {
    app: reducerApp,
    layout: reducerAppLayout,
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