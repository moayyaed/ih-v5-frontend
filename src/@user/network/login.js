import core from 'core';


core.network.request('login', (send, context) => {
  if (context.params.token) {
    send({
      payload: true,
      method: 'auth', 
    });
  } else {
    send({
      payload: true,
      method: 'auth', 
      username: context.params.username, 
      password: core.tools.sha256(`intrahouse${context.params.password === '' ? Date.now() : context.params.password}`),  
    });
  }
})


core.network.response('login', (answer, res, context) => {
  core.cache.lang = res.lang;
  core.cache.conf = res.conf;
  core.cache.docs = res.docs;
  core.cache.portal = res.portal;
  core.cache.project =  res.project;
  core.cache.modules =  res.modules;
  
  if (res.token) {
    core.cache.token = res.token;
    
    if (context.params.rememberme) {
      window.localStorage.setItem('token', res.token);
    } else {
      window.localStorage.removeItem('token');
    }
  }
  
  core.network.realtime.start();

  answer(res);
})
