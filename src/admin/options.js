import actionsApp from 'components/App/actions';
import reducerApp from 'components/App/reducer';

import actionsAppMenu from 'components/AppMenu/actions';
import reducerAppMenu from 'components/AppMenu/reducer';

import actionsAppTabs from 'components/AppTabs/actions';
import reducerAppTabs from 'components/AppTabs/reducer';

import App from './pages/App';
import Login from './pages/Login';


import './network';


const options = {
  actions: {
    app: actionsApp,
    appmenu: actionsAppMenu,
    apptabs: actionsAppTabs,
  },
  reducers: {
    app: reducerApp,
    appmenu: reducerAppMenu,
    apptabs: reducerAppTabs,
  },

  pages: {
    main: App,
    login: Login,
  },
  
  routePrefix: '/admin',
}


export default options;