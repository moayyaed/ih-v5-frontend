import actionsApp from 'components/App/actions';
import reducerApp from 'components/App/reducer';

import actionsAppMenu from 'components/AppMenu/actions';
import reducerAppMenu from 'components/AppMenu/reducer';

import actionsAppNav from 'components/AppNav/actions';
import reducerAppNav from 'components/AppNav/reducer';

import actionsAppTabs from 'components/AppTabs/actions';
import reducerAppTabs from 'components/AppTabs/reducer';

import actionsAppPage from 'components/AppPage/actions';
import reducerAppPage from 'components/AppPage/reducer';

import actionsAppDialog from 'components/AppDialog/actions';
import reducerAppDialog from 'components/AppDialog/reducer';

import actionsForm from 'components/@Form/actions';
import reducerForm from 'components/@Form/reducer';

import Tabs from 'components/@Tabs';

import App from './pages/App';
import Login from './pages/Login';


import routeParse from './routeParse';

import './network';



const options = {
  actions: {
    app: actionsApp,
    appmenu: actionsAppMenu,
    appnav: actionsAppNav,
    apptabs: actionsAppTabs,
    apppage: actionsAppPage,
    appdialog: actionsAppDialog,
    form: actionsForm,
  },
  reducers: {
    app: reducerApp,
    appmenu: reducerAppMenu,
    appnav: reducerAppNav,
    apptabs: reducerAppTabs,
    apppage: [{}, reducerAppPage, reducerForm],
    appdialog: reducerAppDialog,

    msgboxtree: reducerAppNav,
  },

  pages: {
    main: App,
    login: Login,
  },

  componentsScheme: {

  },

  components: {
    default: Tabs,
  },
  
  routePrefix: '/admin',
  routeParse: routeParse,
}


export default options;