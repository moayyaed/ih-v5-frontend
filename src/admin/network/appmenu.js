import core from 'core';


core.network.request('appmenu', (send, context) => {
  send({ 
    method: 'get', 
    type: 'menu',
    id: 'pmmenu', 
  });
})


core.network.response('appmenu', (answer, res, context) => {
  answer({ list: res.data });
})
