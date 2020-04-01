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


core.network.request('appnav', (send, context) => {
  send([
    { method: 'get', type: 'tree', id: context.props.requestId },
    { method: 'getmeta', type: 'tree', id: context.props.requestId },
  ]);
})


core.network.response('appnav', (answer, res, context) => {
  answer({ 
    list: res[0].data, 
    options: transformData(res[0].data, res[1].data),
    selects: { lastItem: null, contextMenu: null, data: {} },
  });
})


core.network.request('appnav_new_node', (send, context) => {
  send({ 
    method: 'insert', 
    type: 'tree',
    id: context.props.requestId,
    parentid: context.params.parentid,
    previd: context.params.previd,
    payload: context.payload,
  });
})

core.network.response('appnav_new_node', (answer, res, context) => {
  answer(res);
})

core.network.request('appnav_remove_node', (send, context) => {
  send({ 
    method: 'remove', 
    type: 'tree',
    id: context.props.requestId,
    payload: context.payload,
  });
})

core.network.response('appnav_remove_node', (answer, res, context) => {
  answer(res);
})

core.network.request('appnav_move_node', (send, context) => {
  send({ 
    method: 'update', 
    type: 'tree',
    id: context.props.requestId,
    payload: context.payload,
  });
})

core.network.response('appnav_move_node', (answer, res, context) => {
  answer(res);
})

core.network.request('appnav_paste_node', (send, context) => {
  send({ 
    method: 'copypaste', 
    type: 'tree',
    id: context.props.requestId,
    targetid: context.params.parentid,
    order: context.params.order,
    payload: context.payload,
  });
})

core.network.response('appnav_paste_node', (answer, res, context) => {
  answer(res);
})

core.network.request('contextmenu', (send, context) => {
  send({ 
    method: 'get', 
    type: 'popup',
    id: context.params.id,
    nodeid: context.props.route.nodeid, 
  });
})


core.network.response('contextmenu', (answer, res, context) => {
  answer(res.data);
})



