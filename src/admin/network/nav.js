import core from 'core';


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
    options: res[1].data 
  });
})


