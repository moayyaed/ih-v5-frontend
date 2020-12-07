import actionsApp from 'components/App/actions';
import reducerApp from 'components/App/reducer';

import actionsAppLayout from 'components/AppLayout/actions';
import reducerAppLayout from 'components/AppLayout/reducer';

import actionsAppLayoutDialog from 'components/AppLayoutDialog/actions';
import reducerAppLayoutDialog from 'components/AppLayoutDialog/reducer';

import './network';
import routeParse from './routeParse';

import App from './pages/App';
import Login from '../@admin/pages/Login';


const options = {
  type: 'user',
  actions: {
    app: actionsApp,
    layout: actionsAppLayout,
    layoutDialog: actionsAppLayoutDialog,
  },
  reducers: {
    app: reducerApp,
    layout: reducerAppLayout,
    layoutDialog: reducerAppLayoutDialog,
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
  
  routePrefix: '',
  routeParse: routeParse,
}


export default options;