import core from 'core';
import css from 'css';

import { createValueFunc, options } from 'components/tools';
import { getLayoutElements, getContainersElements, createElement } from './tools';

function mergeData(data1, data2) {
  const temp = { ...data1, ...data2 };
  Object
    .keys(temp)
    .forEach(key => {
      temp[key] = {  ...data1[key], ...data2[key] };
    });
  return temp;
}

function preparationData(data, clearAnimation = true) { 
  const x = Date.now();
  const layoutid = data.layoutId;

  const layoutElements = getLayoutElements(layoutid, data.layout, data.containers);
  const containersElements = getContainersElements(layoutid, data.containers, data.templates, data.states);

  const list = data.layout.list.map(id =>  layoutid + '_' + id);
  const elements = { ...layoutElements, ...containersElements };
  const links = {};

  Object
    .keys(elements)
    .forEach(key => {
      elements[key] = createElement(elements[key], data.states, links, clearAnimation);
    });
  console.log('layout render', Date.now() - x, )
  return { ...data, list, elements, links };
}


core.network.request('applayout', (send, context) => {
  send([
    { api: 'layout', id: context.params.layoutId, frames: context.params.uframes },
    { api: 'containers', layoutid: context.params.layoutId, frames: context.params.uframes },
    { api: 'templates', layoutid: context.params.layoutId, frames: context.params.uframes },
    { api: 'containers', layoutid: context.params.layoutId, frames: context.params.uframes, rt: 1 },
    { api: 'layout', id: context.params.layoutId, frames: context.params.uframes, rt: 1 },
    { api: 'layout', id: context.params.layoutId, frames: context.params.uframes, widgetdata: 1 },
    { api: 'containers', layoutid: context.params.layoutId, frames: context.params.uframes, widgetdata: 1 },
  ]);
})


core.network.response('applayout', (answer, res, context) => {
  answer(preparationData({
    layout: res[0].data,
    containers: res[1].data,
    templates: res[2].data,
    states: mergeData(res[3].data, res[4].data),
    widgets: mergeData(res[5].data, res[6].data),
    layoutId: context.params.layoutId,
    username: context.params.username,
    context: { frames: context.params.frames }, 
  }));
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
  answer(preparationData({
    layout: { list: [], elements: {} },
    containers: { [context.params.containerId]: res[0].data } ,
    templates: res[1].data,
    states: res[2].data,
    widgets: { [context.params.containerId]: res[3].data },
    contextContainerId: context.params.containerId,
    contextId: context.params.contextId, 
  }, false));
})