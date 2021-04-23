import core from 'core';


core.network.request('button_command', (send, context) => {
  send({ 
    method: 'command', 
    type: 'form',
    id: context.params.id,
    command: context.params.command,
    param: context.params.param,
    nodeid: context.params.nodeid,
    subnodeid: context.params.subnodeid,
    payload: context.payload,
  });
})


core.network.response('button_command', (answer, res, context) => {
  answer(res);
})