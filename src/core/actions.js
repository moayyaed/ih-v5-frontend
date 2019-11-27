
function superAction() {
  const action = this.action.apply(null, arguments);
  action.id = this.id;
  this.dispatch(action);
}

function preparation(id, actions, dispatch) {
  const temp = Object
    .keys(actions)
    .reduce((p, c) => {
      return { ...p, [c]: superAction.bind({ id, dispatch, action: actions[c] }) };
    }, {});
  return temp;
}


function actions(deps, dispatch) {
  const temp = Object
    .keys(deps)
    .reduce((p, c) => {
      const item = deps[c];
      if (p[item.id] === undefined) {
        return { ...p, [item.id || c]: preparation(item.id || c, item.actions, dispatch) };
      }
      return p;
    }, {});
  return temp;
}


export default actions;