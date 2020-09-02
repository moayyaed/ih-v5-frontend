import core from 'core';


core.network.request('applayout_dialog', (send, context) => {
  send({ api: 'dialog', id: context.params.id },);
})


core.network.response('applayout_dialog', (answer, res, context) => {
  answer(res.data);
})