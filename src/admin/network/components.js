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
