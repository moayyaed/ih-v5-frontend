import core from 'core';

import {
  getItemSettings, 
  getLayoutElements, 
  getContainersElements, 
  createElement,
  mergeData,
  mergeLocal,
} from './tools';


function preparationDataLayout(data, params, context) { 
  const layoutid = params.layoutid;

  const templates = data.templates;
  const values = data.states;
  const widgets = data.widgets;
  
  const settings = getItemSettings(data.layout.settings);
  const layoutElements = getLayoutElements(layoutid, data.layout, data.containers, widgets, context);
  const containersElements = getContainersElements(layoutid, layoutElements, data.containers, templates, values, widgets);

  const list = data.layout.list.map(id =>  layoutid + '_' + id);
  const __layout = {
    uuid: '__layout',
    image: settings.image2,
  }
  const elements = { 
    ...layoutElements, 
    ...containersElements,
    __layout,
  };
  const links = {};

  mergeLocal(values, context);

  Object
    .keys(elements)
    .forEach(key => {
      elements[key] = createElement(elements[key], values, widgets, links );
    });
  return { layoutid, settings, list, elements, templates, values, links, widgets };
}

function preparationDataContainer(data, params, context) {
  const layoutid = context.layoutid;
  const containerid = params.containerid;
  const elementid = params.elementid;

  const templates = data.templates;
  const values = { ...data.states, ...core.cache.vars}
  const widgets = data.widgets;

  const links = {};
  const layoutElements = {
    [elementid]: { 
      type: 'container', 
      uuid: elementid, 
      linkid: containerid,
      id: elementid,
    }
  };
  
  const settings = getItemSettings(data.containers[containerid].settings);
  const list = data.containers[containerid].list.map(id => elementid + '_' + containerid + '_' + id);
  const elements = getContainersElements(layoutid, layoutElements, data.containers, data.templates, data.states, { [elementid]: data.widgets});
  
  elements['__' + elementid] = {
    uuid: '__' + elementid,
    linkid: elementid, 
    image: settings.image2 
  } 
  
  Object
    .keys(elements)
    .forEach(key => {
      elements[key] = createElement(elements[key], values, widgets, links);
    });

  return { settings, list, elements, templates, values, links, widgets };
}

core.network.request('GET_LAYOUT', (send, { context, params }) => {
  send([
    { api: 'layout', id: params.layoutid, frames: context.uframes },
    { api: 'containers', layoutid: params.layoutid, frames: context.uframes },
    { api: 'templates', layoutid: params.layoutid, frames: context.uframes },
    { api: 'containers', layoutid: params.layoutid, frames: context.uframes, rt: 1 },
    { api: 'layout', id: params.layoutid, frames: context.uframes, rt: 1 },
    { api: 'layout', id: params.layoutid, frames: context.uframes, widgetdata: 1 },
  ]);
})

core.network.response('GET_LAYOUT', (answer, res, { context, params }) => {
  answer(preparationDataLayout({
    layout: res[0].data,
    containers: res[1].data,
    templates: res[2].data,
    states: mergeData(res[3].data, res[4].data),
    widgets: res[5].data,
  }, params, context));
})


core.network.request('GET_CONTAINER', (send, { context, params }) => {
  send([
    { api: 'container',  id: params.containerid },
    { api: 'templates', containerid: params.containerid },
    { api: 'container',  id: params.containerid, contextId: params.contextid || null, rt: 1 },
    { api: 'container',  id: params.containerid, contextId: params.contextid || null, frames: context.uframes, widgetdata: 1 },
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