import actionsAppMenu from 'components/AppMenu/actions';
import reducerAppMenu from 'components/AppMenu/reducer';

import actionsExplorer from 'components/Explorer/actions';
import reducerExplorer from 'components/Explorer/reducer';

import actionsTable from 'components/Table/actions';
import reducerTable from 'components/Table/reducer';


const actions = {
  appmenu: actionsAppMenu,
  explorer: actionsExplorer,
  table: actionsTable,
}

const reducers = {
  appmenu: reducerAppMenu,
  explorer: reducerExplorer,
  table: reducerTable,
}


export default {
  actions,
  reducers
};