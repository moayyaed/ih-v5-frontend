import core from 'core';


core.network.request('folder', (send, context) => {
  send({ 
    method: 'get', 
    type: 'menu',
    id: 'pmmenu', 
  });
})


core.network.response('folder', (answer, res, context) => {
  answer({
    tabs: [
      { id: 'properties', title: 'Свойства' },
    ],
    defaultTab: 'properties',
  });
})


core.network.request('options', (send, context) => {
  send({ 
    method: 'get', 
    type: 'menu',
    id: 'pmmenu', 
  });
})


core.network.response('options', (answer, res, context) => {
  answer({
    tabs: [
      { id: 'properties', title: 'Свойства' },
      { id: 'channels', title: 'Каналы' },
      { id: 'db', title: 'БД' },
    ],
    defaultTab: 'properties',
  });
})
