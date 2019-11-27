

function action() {
  const temp = this.action.apply(null, arguments);
  temp.id = this.id;
  this.dispatch(temp);
}


function preparation(id, actions, dispatch) {
  const temp2 = Object
    .keys(actions)
    .reduce((l, n) => {
      return { ...l, [n]: action.bind({ id, dispatch, action: actions[n] }) };
    }, { });
  return temp2;
}


function bindActions(app, actions, dispatch) {
  return Object
    .keys(actions)
    .reduce((l, n) => {
      return { ...l, [n]: preparation(n, actions[n], dispatch) };
    }, { app });
}

export default bindActions;