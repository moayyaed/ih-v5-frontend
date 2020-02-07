import core from 'core';


core.network.request('menu', (send, context) => {
  send({ 
    method: 'get', 
    type: 'menu',
    id: 'pmmenu', 
  });
})


core.network.response('menu', (answer, res, context) => {
  answer({ list: res.data });
})
