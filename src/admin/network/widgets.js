import core from 'core';


core.network.request('widget_container', (send, context) => {
  send({
    api: 'container', 
    id: context.params, 
  });
})


core.network.response('widget_container', (answer, res, context) => {
  answer(res.data);
})