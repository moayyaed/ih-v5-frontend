import { bindActionCreators } from 'redux';


function bindActions(actions, dispatch) {
  return Object
    .keys(actions)
    .reduce((l, n) => {
      return { ...l, [n]: bindActionCreators(actions[n], dispatch) };
    }, {});
}

export default bindActions;