import context from 'context';


context.events.on('network:navigator', (id, ok, error) => {
  context.network.fetch({ component: 'navigator', id })
  .then(data => {
    ok(data);
  });
})

context.events.on('network:table', (id, ok, error) => {
  context.network.fetch({ component: 'table', id })
  .then(data => {
    ok(data);
  });
})
