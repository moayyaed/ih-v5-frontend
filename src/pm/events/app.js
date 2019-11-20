import context from 'context';

context.events.on('app:init', () => {
})

context.events.on('app:menu:init', (id) => {
  context.network.fetch({ component: 'appmenu' })
  .then(data => {
    context.actions.appmenu.data(data);
  });
})

context.events.on('app:navigator', (id, routeid) => {
  context.actions.explorer.clear();
  context.request('navigator', routeid)
  .load(() => {
    context.actions.explorer.load();
  })
  .ok((data) => {
    context.actions.explorer.data(id, data);
  })
})

context.events.on('app:navigator:exit', (id, routeid) => {
  context.actions.table.load();
})

context.events.on('app:table', (id, tableid) => {
  context.request('table', tableid)
  .load(() => {
    context.actions.table.load();
  })
  .ok((data) => {
    context.actions.table.data(data);
  })
})


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
})

context.events.on('app:navigator:select', (id, value) => {
  context.network.fetch({ component: 'table', value })
  .then(data => {
    context.actions.table.setData('table', data);
  });

})

*/