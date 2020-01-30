import app from 'components/App/link';
import appmenu from 'components/AppMenu/link';
import appbody from 'components/AppBody/link';
import apptabs from 'components/AppTabs/link';
import appcontextmenu from 'components/AppContextMenu/link';

import explorer from 'components/Explorer/link';
import table from 'components/Table/link';
import options from 'components/Options/link';
import template from 'components/Template/link';
import layout from 'components/Layout/link';


import App from './pages/App';
import Login from './pages/Login';


const _options = {
  pages: {
    main: App,
    login: Login,
  },
  components: {
    app: app,
    appmenu: appmenu,
    apptabs: apptabs,
    appbody: appbody,
    appcontextmenu: appcontextmenu,
  
    explorer: explorer,
    table: table,
    options: options,
    layout: layout,
    template: template,
  }
};


export default _options;