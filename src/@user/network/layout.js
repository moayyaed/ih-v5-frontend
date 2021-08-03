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
  const containersElements = getContainersElements(layoutid, layoutElements, data.containers, templates, values);

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

function preparationDataContainer(data, params, context) {
  const layoutid = context.layoutid;
  const containerid = params.containerid;

  const templates = data.templates;
  const values = data.states;

  const links = {};

  const list = data.containers[containerid].list.map(id => containerid + '_' + id);
  const elements = getContainersElements(layoutid, data.containers, data.templates, data.states);
  
  Object
    .keys(elements)
    .forEach(key => {
      elements[key] = createElement(elements[key], data.states, links);
    });
  return { list, elements, templates, values, links };
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


core.network.request('GET_CONTAINER', (send, { context, params }) => {
  send([
    { api: 'container',  id: params.containerid },
    { api: 'templates', containerid: params.containerid },
    { api: 'container',  id: params.containerid, contextId: params.contextid, rt: 1 },
    { api: 'container',  id: params.containerid, contextId: params.contextid, widgetdata: 1 },
  ]);
})


core.network.response('GET_CONTAINER', (answer, res, { context, params }) => {
  answer(preparationDataContainer({
    containers: { [params.containerid]: res[0].data },
    templates: res[1].data,
    states: res[2].data,
    widgets: res[3].data,
  }, params, context));
})