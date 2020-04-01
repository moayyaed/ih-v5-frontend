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
    { method: 'get', type: 'subtree', id: context.params.id, nodeid: context.params.navnodeid },
    { method: 'getmeta', type: 'subtree', id: context.params.id, nodeid: context.params.navnodeid },
  ]);
})


core.network.response('plugin_tree', (answer, res, context) => {
  answer({ 
    list: res[0].data, 
    options: res[1].data,
    selects: { lastItem: null, contextMenu: null, data: {} },
  });
})

core.network.request('plugin_tree_form', (send, context) => {
  send([
    { method: 'getmeta', type: 'form', id: context.params.component, nodeid: context.params.curent },
    { method: 'get', type: 'form', id: context.params.component, nodeid: context.params.curent },
  ]);
})


core.network.response('plugin_tree_form', (answer, res, context) => {
  answer({ 
    scheme: res[0].data, 
    data: res[1].data,
    cache: res[0].data.grid
      .reduce((p, c) => {
        return { 
          ...p, [c.id]: 
          res[0].data[c.id]
            .reduce((p, c) => {
              return { ...p, [c.prop]: {} }
            }, {}) 
        };
      }, {})
  });
})

core.network.request('plugin_tree_form_save', (send, context) => {
  send({ 
    method: 'update', 
    type: 'form',
    id: context.params.component,
    nodeid: context.params.curent,
    payload: context.payload,
  });
})

core.network.response('plugin_tree_form_save', (answer, res, context) => {
  answer(res);
})


core.network.request('plugin_tree_new_node', (send, context) => {
  send({ 
    method: 'insert', 
    type: 'subtree',
    id: context.params.id,
    navnodeid: context.params.navnodeid,
    parentid: context.params.parentid,
    previd: context.params.previd,
    payload: context.payload,
  });
})

core.network.response('plugin_tree_new_node', (answer, res, context) => {
  answer(res);
})

core.network.request('plugin_tree_remove_node', (send, context) => {
  send({ 
    method: 'remove', 
    type: 'subtree',
    id: context.params.id,
    navnodeid: context.params.navnodeid,
    payload: context.payload,
  });
})

core.network.response('plugin_tree_remove_node', (answer, res, context) => {
  answer(res);
})

core.network.request('plugin_tree_move_node', (send, context) => {
  send({ 
    method: 'update', 
    type: 'subtree',
    id: context.params.id,
    navnodeid: context.params.navnodeid,
    parentid: context.params.parentid,
    previd: context.params.previd,
    payload: context.payload,
  });
})

core.network.response('plugin_tree_move_node', (answer, res, context) => {
  answer(res);
})

core.network.request('plugin_tree_paste_node', (send, context) => {
  send({ 
    method: 'copypaste', 
    type: 'subtree',
    id: context.params.id,
    navnodeid: context.params.navnodeid,
    parentid: context.params.parentid,
    previd: context.params.previd,
    payload: context.payload,
  });
})

core.network.response('plugin_tree_paste_node', (answer, res, context) => {
  answer(res);
})



