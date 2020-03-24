import core from 'core';

function transformData(list, meta) {
  const roots = {};
 
  list.forEach(i => {
    roots[i.id] = i.root;
  });

  return {
    ...meta,
    roots,
  };
}


core.network.request('plugin_tree', (send, context) => {
  send([
    { method: 'get', type: 'tree', id: context.params.id, nodeid: context.params.nodeid },
    { method: 'getmeta', type: 'tree', id: context.params.id, nodeid: context.params.nodeid },
  ]);
})


core.network.response('plugin_tree', (answer, res, context) => {
  answer({ 
    list: res[0].data, 
    options: res[1].data,
    selects: { lastItem: null, contextMenu: null, data: {} },
  });
})


core.network.request('plugin_tree_new_node', (send, context) => {
  send({ 
    method: 'insert', 
    type: 'tree',
    id: context.params.menuid,
    payload: context.payload,
  });
})

core.network.response('plugin_tree_new_node', (answer, res, context) => {
  answer(res);
})

core.network.request('plugin_tree_remove_node', (send, context) => {
  send({ 
    method: 'remove', 
    type: 'tree',
    id: context.params.menuid,
    payload: context.payload,
  });
})

core.network.response('plugin_tree_remove_node', (answer, res, context) => {
  answer(res);
})

core.network.request('plugin_tree_move_node', (send, context) => {
  send({ 
    method: 'update', 
    type: 'tree',
    id: context.params.menuid,
    payload: context.payload,
  });
})

core.network.response('plugin_tree_move_node', (answer, res, context) => {
  answer(res);
})

core.network.request('plugin_tree_paste_node', (send, context) => {
  send({ 
    method: 'copypaste', 
    type: 'tree',
    id: context.params.menuid,
    nodeid: context.params.parentid,
    order: context.params.order,
    payload: context.payload,
  });
})

core.network.response('plugin_tree_paste_node', (answer, res, context) => {
  answer(res);
})

core.network.request('contextmenu', (send, context) => {
  send({ 
    method: 'get', 
    type: 'popup',
    id: context.params, 
  });
})


core.network.response('contextmenu', (answer, res, context) => {
  answer(res.data);
})



