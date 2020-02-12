import core from 'core';


core.network.request('appnav', (send, context) => {
  send([
    { method: 'get', type: 'tree', id: context.params.menuid },
    { method: 'getmeta', type: 'tree', id: context.params.menuid },
  ]);
})


core.network.response('appnav', (answer, res, context) => {
  answer({ 
    list: res[0].data, 
  });
})

