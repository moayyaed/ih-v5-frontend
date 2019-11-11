import context from 'context';


context.events.on('app:menu:init', (id) => {
  const data = {
    select: '1',
    list: [
      { id: '1', route: 'menu1', label: 'Menu 1', tooltip: 'App Menu 1', icon: '' },
      { id: '2', route: 'menu2', label: 'Menu 2', tooltip: 'App Menu 2', icon: '' },
      { id: '3', route: 'menu3', label: 'Menu 3', tooltip: 'App Menu 3', icon: '' },
    ],
  }
  if (context.actions.app.getRoute(1)) {
    const value = data.list.find(i => i.route === context.actions.app.getRoute(1));
    context.event('app:menu:select', id, value);
  } else {
    if (data.select) {
      const value = data.list.find(i => i.id === data.select);
      context.event('app:menu:select', id, value);
    }
  }
  context.actions.appmenu.setData(id, data);
})

context.events.on('app:menu:select', (id, values) => {
  context.network.fetch({ route: values.route })
    .then(data => {
      context.actions.appmenu.setSelect(id, values.id);
      context.event('app:route', values.route, data)
    });
})