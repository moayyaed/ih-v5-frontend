import core from 'core';


function transformContextMenu(tree, options) {
  const body = options.common && options.common.popup ? options.common.popup : null;

  return tree.reduce((p, c) => {
    if (options[c.root] && options[c.root].popup) {
      return {
        ...p,
        [c.id]: options[c.root].popup
      }
    }
    return { ...p, [c.id]: null }
  }, { body });
}


core.network.request('nav', (send, context) => {
  send([
    { method: 'get', type: 'tree', id: context.params.menuid },
    { method: 'getmeta', type: 'tree', id: context.params.menuid },
  ]);
})


core.network.response('nav', (answer, res, context) => {
  answer({ 
    loading: false,
    selectid: context.params.menuid,
    list: res[0].data, 
    contextmenu: transformContextMenu(res[0].data, res[1].data) 
  });
})


