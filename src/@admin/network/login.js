import core from 'core';


core.network.request('login', (send, context) => {
  send({ 
    method: 'auth', 
    username: 'admin', 
    password: '1234' 
  });
})


core.network.response('login', (answer, res, context) => {
  core.network.realtime.start(res.token);
  answer(null);
})
