import context from 'context';


context.events.on('app:menu:init', () => {
  console.log('app:menu:init');
})

context.events.on('app:menu:select', (id, values) => {
  context.actions.appmenu.setSelect(id, values.id);
})