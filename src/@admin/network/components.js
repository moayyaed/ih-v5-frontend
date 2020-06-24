import core from 'core';
import { generateOptions, generateCache } from './tools';


core.network.request('components_tabs_form', (send, context) => {
  if (context.params.id === 'formViscont') {
    send([
      { method: 'getmeta', type: context.params.type, id: context.params.id, nodeid: context.params.nodeid },
      { method: 'get', type: context.params.type, id: context.params.id, nodeid: context.params.nodeid },
      { api: 'templates', containerid: context.params.nodeid }
    ]);
  } else if (context.params.id === 'formLayout') {
    send([
      { method: 'getmeta', type: context.params.type, id: context.params.id, nodeid: context.params.nodeid },
      { method: 'get', type: context.params.type, id: context.params.id, nodeid: context.params.nodeid },
      { api: 'containers', layoutid: context.params.nodeid },
      { api: 'templates', layoutid: context.params.nodeid }
    ]);
  } else {
    send([
      { method: 'getmeta', type: context.params.type, id: context.params.id, nodeid: context.params.nodeid },
      { method: 'get', type: context.params.type, id: context.params.id, nodeid: context.params.nodeid },
    ]);
  }
})

core.network.response('components_tabs_form', (answer, res, context) => {
  if (context.params.id === 'formViscont') {
    res[1].data.p1.container.templates = res[2].data;
  }
  if (context.params.id === 'formLayout') {
    res[1].data.p1.layout.containers = res[2].data;
    res[1].data.p1.layout.templates = res[3].data;
  }
  answer({ 
    options: generateOptions(res[0].data), 
    data: res[1].data,
    cache: generateCache(res[0].data)
  });
})


core.network.request('components_tabs_form_save', (send, context) => {
  send({ 
    method: 'update', 
    type: 'form',
    id: context.params.formid,
    nodeid: context.params.nodeid,
    payload: context.payload,
  });
})

core.network.response('components_tabs_form_save', (answer, res, context) => {
  answer(res);
})


core.network.request('droplist', (send, context) => {
  send({ 
    method: 'get', 
    type: 'droplist',
    id: context.params.data, 
    nodeid: context.props.nodeid,
    rowid: context.props.rowid,
  });
})


core.network.response('droplist', (answer, res, context) => {
  answer(res.data);
})

core.network.request('tags', (send, context) => {
  send({ 
    method: 'get', 
    type: 'tags',
    id: context.params.data, 
  });
})


core.network.response('tags', (answer, res, context) => {
  answer(res.data);
})

