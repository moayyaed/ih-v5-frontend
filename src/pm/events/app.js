import context from 'context';


context.events.on('app:init', () => {
  console.log('app:init');
})

context.events.on('app:route', (routeid, data) => {
  context.actions.app.setRoute(routeid);
  console.log('app:route', routeid, data);
})
