import core from 'core';


core.events.on('app:menu', (id, params) => {
  core.req({ method: 'data', type: 'menu' })
    .ok((res) => {
      console.log(res);
    })
    .loading(() => console.log('loading'))
    .error(e => console.log(e));
});


  /*
  core.fetch({ method: 'data', type: 'menu' })
  .then(res => {
    core.app.menu.data(res.data)
  })
  */
