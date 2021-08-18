import core from 'core';

core.network.request('journal', (send, context) => {
  send({ api: 'get',  ...context.params });
})


core.network.response('journal', (answer, res, context) => {
  answer(res.data);
})

core.network.request('alertlog', (send, context) => {
  send({ api: 'get',  ...context.params });
})


core.network.response('alertlog', (answer, res, context) => {
  answer(res.data);
})

core.network.request('cctv', (send, context) => {
  send({ api: 'get',  type: 'table', id: 'channelsx', nodeid: 'cctv' });
})


core.network.response('cctv', (answer, res, context) => {
  answer(res.data);
})

