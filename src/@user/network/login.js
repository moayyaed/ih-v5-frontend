import core from 'core';


core.network.request('login', (send, context) => {
  send({ 
    method: 'auth', 
    username: context.params.username, 
    password: core.tools.sha256('intrahouse' + context.params.password || ''),  
  });
})


core.network.response('login', (answer, res, context) => {
  // window.localStorage.setItem('token', res.token);
  
  core.cache.token = res.token;
  core.network.realtime.start();

  answer(res);
})
