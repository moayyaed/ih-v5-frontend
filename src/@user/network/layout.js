import core from 'core';

import {
  getItemSettings, 
  getLayoutElements, 
  getContainersElements, 
  createElement,
  mergeData,
} from './tools';


function preparationDataLayout(data, params, context) { 
  const layoutid = params.layoutid;

  const templates = data.templates;
  const values = data.states;

  const settings = getItemSettings(data.layout.settings);
  const layoutElements = getLayoutElements(layoutid, data.layout, data.containers);
  const containersElements = getContainersElements(layoutid, data.containers, templates, values);

  const list = data.layout.list.map(id =>  layoutid + '_' + id);
  const elements = { ...layoutElements, ...containersElements };
  const links = {};
  const realtime = [];

  Object
    .keys(elements)
    .forEach(key => {
      elements[key] = createElement(elements[key], values, links, realtime);
    });
  return { layoutid, settings, list, elements, templates, values, links, realtime };
}

function preparationDataContainer(data) {
  const layoutid = data.layoutid;
  const containerid = data.contextContainerId;

  const links = {};

  const list = data.containers[containerid].list.map(id => containerid + '_' + id);
  const elements = getContainersElements(layoutid, data.containers, data.templates, data.states);
  
  Object
    .keys(elements)
    .forEach(key => {
      elements[key] = createElement(elements[key], data.states, links);
    });
  return { ...data, list, elements };
}

core.network.request('GET_LAYOUT', (send, { context, params }) => {
  send([
    { api: 'layout', id: params.layoutid, frames: context.uframes },
    { api: 'containers', layoutid: params.layoutid, frames: context.uframes },
    { api: 'templates', layoutid: params.layoutid, frames: context.uframes },
    { api: 'containers', layoutid: params.layoutid, frames: context.uframes, rt: 1 },
    { api: 'layout', id: params.layoutid, frames: context.uframes, rt: 1 },
    { api: 'layout', id: params.layoutid, frames: context.uframes, widgetdata: 1 },
    { api: 'containers', layoutid: params.layoutid, frames: context.uframes, widgetdata: 1 },
  ]);
})

core.network.response('GET_LAYOUT', (answer, res, { context, params }) => {
  answer(preparationDataLayout({
    layout: res[0].data,
    containers: res[1].data,
    templates: res[2].data,
    states: mergeData(res[3].data, res[4].data),
    widgets: mergeData(res[5].data, res[6].data),
  }, params, context));
})




core.network.request('get_container', (send, context) => {
  send([
    { api: 'container',  id: context.params.containerId },
    { api: 'templates', containerid: context.params.containerId },
    { api: 'container',  id: context.params.containerId, contextId: context.params.contextId, rt: 1 },
    { api: 'container',  id: context.params.containerId, contextId: context.params.contextId, widgetdata: 1 },
  ]);
})


core.network.response('get_container', (answer, res, context) => {
  answer(preparationDataContainer({
    containers: { [context.params.containerId]: res[0].data },
    templates: res[1].data,
    states: res[2].data,
    widgets: res[3].data,
    contextContainerId: context.params.containerId,
    contextId: context.params.contextId, 
  }));
})