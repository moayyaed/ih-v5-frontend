import core from 'core';


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
