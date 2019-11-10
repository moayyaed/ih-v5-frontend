import { bindActionCreators } from 'redux';


function bindActions(app, actions, dispatch) {
  return Object
    .keys(actions)
    .reduce((l, n) => {
      return { ...l, [n]: bindActionCreators(actions[n], dispatch) };
    }, { app });
}

export default bindActions;