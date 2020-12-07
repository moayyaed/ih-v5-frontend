function superAction() {
  const action = this.action.apply(null, arguments);
  if (action !== null) {
    this.dispatch(action);
  }
}

function preparation(actions, dispatch) {
  const temp = Object
    .keys(actions)
    .reduce((p, key) => {
      return { ...p, [key]: superAction.bind({ dispatch, action: actions[key] }) };
    }, {});
  return temp;
}


function actions(actionGroup, dispatch) {
  const temp = Object
    .keys(actionGroup)
    .reduce((prev, key) => {
      return { ...prev, [key]: preparation(actionGroup[key], dispatch) };
    }, {});
  return temp;
}


export default actions;
