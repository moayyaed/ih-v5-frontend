import core from 'core';


core.network.request('init', (send, context) => {
  send({ method: 'getmeta', type: 'components' });
})


core.network.response('init', (answer, res, context) => {
  core.options.componentsScheme = {
    ...core.options.componentsScheme,
    ...res.data,
  }
  answer({ list: res.data });
})