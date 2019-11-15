import context from 'context';


context.events.on('app:init', () => {
  // console.log('app:init');
})

context.events.on('app:route', (routeid, values) => {
  /*
  context.network.fetch({ component: 'route', route: routeid })
  .then(data => {
    context.actions.app.setRoute(routeid);
    context.actions.table.setData('table', {
      id: '',
      selects: {
        scrollToIndex: undefined,
        lastIndex: null,
        data: {},
      },
      columns: [],
      data: [],
    });
    context.actions.explorer.setData('explorer', data);
  });
  */
})

context.events.on('app:navigator:select', (id, value) => {
  /*
  context.network.fetch({ component: 'table', value })
  .then(data => {
    context.actions.table.setData('table', data);
  });
  */
})
