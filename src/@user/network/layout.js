import core from 'core';


core.network.request('applayout', (send, context) => {
  console.log(context)
  send([
    { api: 'layout', id: context.params.layoutId },
    { api: 'containers', layoutid: context.params.layoutId },
    { api: 'templates', layoutid: context.params.layoutId }
  ]);
})


core.network.response('applayout', (answer, res, context) => {
  console.log(res);
  answer({});
})