import core from 'core';


core.network.request('components_tabs', (send, context) => {
  send([
    { method: 'getmeta', type: context.params.type, id: context.params.id, nodeid: context.params.nodeid },
    { method: 'get', type: context.params.type, id: context.params.id, nodeid: context.params.nodeid },
  ]);
})

core.network.response('components_tabs', (answer, res, context) => {
  answer({ options: res[0].data, data: res[1].data });
})


core.network.request('components_tabs_form_save', (send, context) => {
  send({ 
    method: 'update', 
    type: 'form',
    id: context.params.formid,
    nodeid: context.params.nodeid,
    payload: context.payload,
  });
})

core.network.response('components_tabs_form_save', (answer, res, context) => {
  answer(res);
})


core.network.request('droplist', (send, context) => {
  send({ 
    method: 'get', 
    type: 'droplist',
    id: context.params.data, 
  });
})


core.network.response('droplist', (answer, res, context) => {
  answer(res.data);
})
