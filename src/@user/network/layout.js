import core from 'core';


core.network.request('applayout', (send, context) => {
  send([
    { api: 'layout', id: context.params.layoutId },
    { api: 'containers', layoutid: context.params.layoutId },
    { api: 'templates', layoutid: context.params.layoutId }
  ]);
})


core.network.response('applayout', (answer, res, context) => {
  answer({
    layout: res[0].data,
    containers: res[1].data,
    templates: res[2].data,
  });
})