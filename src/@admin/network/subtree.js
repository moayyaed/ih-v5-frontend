import core from 'core';
import { generateOptions, generateCache } from './tools';


core.network.request('subtree', (send, context) => {
  send([
    { method: 'get', type: 'subtree', id: context.params.id, nodeid: context.params.navnodeid },
    { method: 'getmeta', type: 'subtree', id: context.params.id, nodeid: context.params.navnodeid },
  ]);
})


core.network.response('subtree', (answer, res, context) => {
  answer({ 
    list: res[0].data, 
    options: res[1].data,
    selects: { lastItem: null, contextMenu: null, data: {} },
  });
})

core.network.request('subtree_form', (send, context) => {
  send([
    { method: 'getmeta', type: 'form', id: context.params.component, nodeid: context.params.curent },
    { method: 'get', type: 'form', id: context.params.component, nodeid: context.params.curent },
  ]);
})


core.network.response('subtree_form', (answer, res, context) => {
  answer({ 
    scheme: generateOptions(res[0].data), 
    data: res[1].data,
    cache: generateCache(res[0].data)
  });
})

core.network.request('subtree_form_update', (send, context) => {
  send([
    { method: 'getmeta', type: 'form', id: context.params.id, nodeid: context.params.nodeid, rowid: context.params.rowid },
    { method: 'get', type: 'form', id: context.params.id, nodeid: context.params.nodeid, rowid: context.params.rowid },
  ]);
})


core.network.response('subtree_form_update', (answer, res, context) => {
  answer({ 
    scheme: generateOptions(res[0].data), 
    data: res[1].data,
    cache: generateCache(res[0].data)
  });
})

core.network.request('subtree_form_save', (send, context) => {
  send({ 
    method: 'update', 
    type: 'form',
    id: context.params.component,
    nodeid: context.params.curent,
    payload: context.payload,
  });
})

core.network.response('subtree_form_save', (answer, res, context) => {
  answer(res);
})


core.network.request('subtree_new_node', (send, context) => {
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

core.network.response('subtree_new_node', (answer, res, context) => {
  answer(res);
})

core.network.request('subtree_remove_node', (send, context) => {
  send({ 
    method: 'remove', 
    type: 'subtree',
    id: context.params.id,
    navnodeid: context.params.navnodeid,
    payload: context.payload,
  });
})

core.network.response('subtree_remove_node', (answer, res, context) => {
  answer(res);
})

core.network.request('subtree_move_node', (send, context) => {
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

core.network.response('subtree_move_node', (answer, res, context) => {
  answer(res);
})

core.network.request('subtree_paste_node', (send, context) => {
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

core.network.response('subtree_paste_node', (answer, res, context) => {
  answer(res);
})



