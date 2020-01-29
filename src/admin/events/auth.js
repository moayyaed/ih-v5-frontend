import core from 'core';


core.events.on('app:auth', (id, params) => {
 core.app.login('1234');
});


  /*
  core.fetch({ method: 'auth', username: 'admin', password: '1234' })
  .then(res => {
    core.app.login(res.token);
  })
  */