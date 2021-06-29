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

import actionsAppProgress from 'components/AppProgress/actions';
import reducerAppProgress from 'components/AppProgress/reducer';

import actionsAppBrowse from 'components/AppBrowse/actions';
import reducerAppBrowse from 'components/AppBrowse/reducer';

import actionsAppAlert from 'components/AppAlert/actions';

import actionsForm from 'components/@Form/actions';
import reducerForm from 'components/@Form/reducer';

import actionsLayout from 'components/@Form/types/@Layout/actions';
import reducerLayout from 'components/@Form/types/@Layout/reducer';

import actionsContainer from 'components/@Form/types/@Container/actions';
import reducerContainer from 'components/@Form/types/@Container/reducer';

import actionsTemplate from 'components/@Form/types/@Template/actions';
import reducerTemplate from 'components/@Form/types/@Template/reducer';

import actionsDialog from 'components/@Form/types/@Dialog/actions';
import reducerDialog from 'components/@Form/types/@Dialog/reducer';

import Tabs from 'components/@Tabs';

import './network';
import routeParse from './routeParse';

import App from './pages/App';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';


const options = {
  type: 'admin',
  actions: {
    app: actionsApp,
    appmenu: actionsAppMenu,
    appnav: actionsAppNav,
    apptabs: actionsAppTabs,
    apppage: actionsAppPage,
    appdialog: actionsAppDialog,
    appprogress: actionsAppProgress,
    form: actionsForm,
    layout: actionsLayout,
    container: actionsContainer,
    template: actionsTemplate,
    dialog: actionsDialog,
    appbrowse: actionsAppBrowse,
  },
  reducers: {
    app: reducerApp,
    appmenu: reducerAppMenu,
    appnav: reducerAppNav,
    apptabs: reducerAppTabs,
    apppage: [{}, reducerAppPage, reducerForm, reducerLayout, reducerContainer, reducerTemplate, reducerDialog],
    appdialog: reducerAppDialog,
    appprogress: reducerAppProgress,
    appbrowse: reducerAppBrowse,
    msgboxtree: reducerAppNav,
  },

  mergeActions: {
    alert: actionsAppAlert,
  },

  pages: {
    main: App,
    login: Login,
    dashboard: Dashboard
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