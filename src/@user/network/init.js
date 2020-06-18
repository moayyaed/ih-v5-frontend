import core from 'core';


core.network.request('init', (send, context) => {
  // send({ method: 'getmeta', type: 'components' });
})


core.network.response('init', (answer, res, context) => {
  // answer({ list: res.data });
})