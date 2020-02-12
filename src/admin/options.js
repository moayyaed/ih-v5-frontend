import actionsApp from 'components/App/actions';
import reducerApp from 'components/App/reducer';


const options = {
  actions: {
    app: actionsApp,
  },
  reducers: {
    app: reducerApp,
  },
  
  routePrefix: '/admin',
}


export default options;