import core from 'core';

import css from 'css';
import { createValueFunc, options } from 'components/tools';


const ELEMENT_LINK = 1;
const TEMPLATE_LINK = 2;

function cloneObject(i) {
  if ((!!i) && (i.constructor === Object)) {
    return Object
      .keys(i)
      .reduce((p, c) => {
        return { ...p, [c]: cloneObject(i[c]) }
      }, {});
  }
  if (Array.isArray(i)) {
    return i.map(cloneObject);
  }
  return i;
}

export function mergeLocal(values, context) {
  if (core.cache.vars === null) {
    const local = sessionStorage.getItem('local');
    if (local) {
      core.cache.vars = JSON.parse(local);
    } else {
      core.cache.vars = {};
    }
  }

  Object
    .keys(core.cache.vars)
    .forEach(key => {
      Object
        .keys(core.cache.vars[key])
        .forEach(prop => {
          if (values[key] === undefined) {
            values[key] = {}
          }
          values[key][prop] = core.cache.vars[key][prop]
        });
    });
    
    values.__syslocal_layout = {};
    values.__syslocal_username = {};
    values.__syslocal_network = {};
    values.__syslocal_layout.layout = context.layoutid;
    values.__syslocal_username.username = context.username;
    values.__syslocal_network.network = 'online';
}

export function mergeData(data1, data2) {
  const temp = { ...data1, ...data2 };
  Object
    .keys(temp)
    .forEach(key => {
      temp[key] = {  ...data1[key], ...data2[key] };
    });
  return temp;
}

export function createContainerList(item, containers) {
  if (item.linkid) {
    item.list = containers[item.linkid].list
      .map(id => item.uuid + '_' + item.linkid + '_' + id);
  } else {
    item.list = [];
  }
}

function createTemplateList(item, templates) {
  item.list = templates[item.linkid].list
    .map(id => item.frameid + '_' + item.containerid + '_' + item.id + '_' + id)
}

function createItemLinks(item, template) {
  const links = {};
  if (item.links !== undefined) {
    Object
      .keys(item.links)
      .forEach(stateid => {
        if (item.links[stateid].value !== undefined) {
          if (item.links[stateid].value.did === '__device' || item.links[stateid].value.did === '__devstat') {
            if (core.cache.context[item.frameid] !== undefined) {
              item.links[stateid].value.did = core.cache.context[item.frameid];
            }
          }
          links[stateid] = item.links[stateid].value;
        }
      })
  }
  item.links = links;
}

function getCurentLayer(item, template, values) {
  const curentLayer = {};

  template.listState
    .concat('master')
    .reverse()
    .forEach(id => {
      let value = 0;

      if (id === 'master') {
        value = 0;
      } else {
        if (item.links[id]) {
          const did = item.links[id].did;
          const propid = item.links[id].prop;
          if (values[did] !== undefined && values[did][propid] !== undefined) {
            value = values[did][propid];
          } else {
            value = 0;
          }
        }
      }

      const layer = template.state[id].values[value];
      if (layer) {
        Object
        .keys(layer)
        .forEach(id => {
          Object
          .keys(layer[id])
          .forEach(propid => {
            if (curentLayer[id] === undefined) {
              curentLayer[id] = {}
              curentLayer[id].type = template.elements[id].type;
            }
            if (curentLayer[id][propid] === undefined) {
              curentLayer[id][propid] = {};
            }
            curentLayer[id][propid] = { ...curentLayer[id][propid], ...layer[id][propid] }
            if (propid === 'boxShadow' && !curentLayer[id][propid].active) {
              curentLayer[id][propid].value = 'unset';
            }
          });
        })
      }
    });
  return curentLayer;
}

function createMasterLayer(template) {
  if (template.masterLayer === undefined) {
    const masterLayer = {};

    ['master']
      .forEach(id => {
        const layer = template.state[id].values[0];

        if (layer) {
          Object
          .keys(layer)
          .forEach(id => {
            Object
            .keys(layer[id])
            .forEach(propid => {
              if (masterLayer[id] === undefined) {
                masterLayer[id] = {}
                masterLayer[id].type = template.elements[id].type;
              }
              if (masterLayer[id][propid] === undefined) {
                masterLayer[id][propid] = {};
              }
              masterLayer[id][propid] = { ...masterLayer[id][propid], ...layer[id][propid] }
              if (propid === 'boxShadow' && !masterLayer[id][propid].active) {
                masterLayer[id][propid].value = 'unset';
              }
            });
          })
        }
      });
    template.masterLayer = masterLayer;
  } 
}

function createChangesLayers(template) {
  if (template.changesLayers === undefined) {
    const temp = {};
    template.listState
      .reverse()
      .forEach(id => {
        const variants = template.state[id].values;
        Object
          .keys(variants)
          .forEach(value => {
            const layer = template.state[id].values[value];
              Object
              .keys(layer)
              .forEach(itemid => { 
                Object
                .keys(layer[itemid])
                .forEach(propid => { 
                  const uuid =  id + '_' + value;

                  if (temp[uuid] === undefined) {
                    temp[uuid] = {};
                  }
                  if (temp[uuid][itemid] === undefined) {
                    temp[uuid][itemid] = {};
                  }
                  temp[uuid][itemid][propid] = layer[itemid][propid];
                  if (propid === 'boxShadow' && !layer[itemid][propid].active) {
                    layer[itemid][propid].value = 'unset';
                  }
                });
              });
          });
      });
    template.changesLayers = temp;
  }  
}

function checkItemProps(item) {
  if (item.visible === undefined) {
    item.visible = {};
  }

  if (item.boxShadow === undefined) {
    item.boxShadow = {};
  }

  if (item.animation === undefined) {
    item.animation = {};
  }

  if (item.overflow === undefined) {
    item.overflow = {};
  }
}

function createAnimation(uuid, prop) {
 if (prop.active && prop.keyframes && prop.value) {
  const params = prop.value.split(' ');
  const oldid = params[0];
  const newid = uuid.replace('@', '');
  
  params[0] = newid;
  prop.value = params.join(' ');

  if (prop.enabled) {
    prop.func = prop.func.replace(RegExp(oldid, 'g'), newid)                
  }

  const styles = css.parse(prop.keyframes);
  try {  
    styles.stylesheet.rules
      .forEach(style => {
        style.name = newid;
        if (style.type === 'keyframes') {
          const styletext = css.stringify({
            stylesheet: {
              rules: [style]
            },
            type: 'stylesheet',
          });
          try {
            document.styleSheets[0].insertRule(styletext, document.styleSheets[0].cssRules.length);
          } catch {
          }
        }
      });
  } catch {
    console.warn('Animation function failed!')
  }
 }
}

function createBind(prop, values) {
  try {
    prop.func = createValueFunc(prop.func).body;
    if (values[prop.did] && values[prop.did][prop.prop] !== undefined) {
      prop.value = prop.func(values[prop.did][prop.prop], {});
    }
  } catch {
    console.warn('Bind function failed!')
  }
}

function createBindW2H2(name, item, values) {
  const prop = item[name];
  const name1 = name === 'w2' ? 'x': 'y';
  const name2 = name === 'w2' ? 'w': 'h';

  try {
    prop.func = createValueFunc(prop.func).body;

    if (values[prop.did] && values[prop.did][prop.prop] !== undefined) {
      const value = prop.func(values[prop.did][prop.prop], {});
      const delta = value - item[name2].value;

      item[name1].value = item[name1].value - delta;
      item[name2].value = value;
      item[name].value = value;
    }
  } catch {
    console.warn('Bind function failed!')
  }
}

export function createElement(item, values, widgets, links) {
  checkItemProps(item);
  if (item.type === 'template') {
    Object
      .keys(item.links)
      .forEach(id => {
        if (item.links[id].did) {
          if (links[item.links[id].did] === undefined) {
            links[item.links[id].did] = {};
          }
          links[item.links[id].did][item.uuid] = TEMPLATE_LINK; 
        }
      })
  }

  if (item.link) {
    if (item.link.id === '__device') {
      item.link.id = core.cache.context[item.frameid];
    }
  }
  
  if (item.widgetlinks && item.widgetlinks.link) {
    if (item.widgetlinks.link.id === '__device') {
      item.widgetlinks.link.id = core.cache.context[item.frameid];
    }
    if (core.cache.context2[item.frameid] !== undefined) {
      if (item.widgetlinks.link.id === '__chart') {
        item.widgetlinks.link.id = core.cache.context2[item.frameid].multichartid;
      }
      if (item.widgetlinks.link.id === '__timelinechart') {
        item.widgetlinks.link.id = core.cache.context2[item.frameid].timelineid;
      }
      if (item.widgetlinks.link.id === '__journal') {
        item.widgetlinks.link.id = core.cache.context2[item.frameid].journalid;
      }
      if (item.widgetlinks.link.id === '__alertjournal') {
        item.widgetlinks.link.id = core.cache.context2[item.frameid].alertjournalid;
      }
    }
  }

  Object
    .keys(item)
    .forEach(id => {
      const prop = item[id];

      if ((!!prop) && (prop.constructor === Object) && !Array.isArray(prop)) {
        if (id === 'animation') {
          createAnimation(item.uuid, prop)
        }

        if (prop.enabled) {
          if (prop.did === '__device' || prop.did === '__devstat') {
            if (core.cache.context[item.frameid] !== undefined) {
              prop.did = core.cache.context[item.frameid];
            }
          }
          if (links[prop.did] === undefined) {
            links[prop.did] = {};
          } 
          links[prop.did][item.uuid] = ELEMENT_LINK; 
          if (id === 'w2' || id === 'h2') {
            createBindW2H2(id, item, values)
          } else {
            createBind(prop, values)
          }
        }
      }
    }); 
  return item;
}

export function getItemSettings(settings) {
  if (settings) {
    const src = settings.backgroundImage.value;
    const type = settings.backgroundColor.type;
    const colorback = settings.backgroundColor.value; 
    const colorback2 = type === 'fill' ? '' : ', ' + settings.backgroundColor.value;
    const colorfront = settings.overlayColor.value;
    const image = encodeURI(src.indexOf('://') !== -1 ? src : '/images/' + src);
    const image2 = { ...settings.backgroundImage, value: src };
  
    return { image, image2, colorback, colorback2, colorfront, w: settings.w.value, h: settings.h.value };
  }
  return null;
}

export function getLayoutElements(id, data, containers, widgets, context) {
  const temp = {};
  Object
    .keys(data.elements)
    .forEach(key => {
      const item = data.elements[key];

      item.layoutid = id;
      item.id = key;
      item.uuid = id + '_' + key;

      if (widgets[key]) {
        item.key = item.uuid + Date.now();
        item.data = widgets[key];
      }
      
      if (item.type === 'group') {
        item.list = item.elements.map(id => item.layoutid + '_' + id);
      }

      if (item.type === 'container') {
        if (item.widgetlinks && item.widgetlinks.link) {
          if (item.widgetlinks.link.id) {
            item.linkid = item.widgetlinks.link.id;
          }
          if (item.widgetlinks.link.value && item.widgetlinks.link.value.device && item.widgetlinks.link.value.device.id) {
            item.contextid = item.widgetlinks.link.value.device.id;
            if (context.frames && context.frames[item.uuid]) {
              core.cache.context[item.uuid] = context.frames[item.uuid].linkid;
            } else {
              core.cache.context[item.uuid] = item.contextid;
            }
          }
          if (item.widgetlinks.link.value) {
            const d = item.widgetlinks.link.value.device;
            const m = item.widgetlinks.link.value.multichart_id;
            const t = item.widgetlinks.link.value.timelinechart_id;
            const j = item.widgetlinks.link.value.journal_id;
            const a = item.widgetlinks.link.value.alertjournal_id;
            core.cache.context2[item.uuid] = {
              linkid: d && d.id || null,
              multichartid: m && m.id || null,
              timelineid: t && t.id || null,
              journalid: j && j.id || null,
              alertjournalid: a && a.id || null,
            };
          }
          if (context.frames && context.frames[item.uuid]) {
            core.cache.context2[item.uuid] = context.frames[item.uuid];
          }
        }
        createContainerList(item, containers);
        item.settings = getItemSettings(containers[item.linkid].settings)
        temp['__' + item.uuid] = { linkid: item.uuid, image: { uuid: '__' + item.uuid, ...item.settings.image2 } }
      }

      temp[id + '_' + key] = item;;
    });
  return temp;
}

export function getContainersElements(layoutid, layoutElements, containers, templates, values, widgets) {
  const temp = {};

  Object
    .keys(layoutElements)
    .forEach(id => {
      const element = layoutElements[id];
      if (element.type === 'container' && containers[element.linkid] !== undefined) {
        const data = containers[element.linkid];
        const containerid = element.linkid;
        Object
          .keys(data.elements)
          .forEach(key => {
            const item = cloneObject(data.elements[key]);

            item.layoutid = layoutid;
            item.containerid = containerid;
            item.frameid = element.uuid;
            item.linkid = item.templateId
            item.id = key;
            item.uuid = item.frameid + '_' + containerid + '_' + key;

            if (widgets[element.id] !== undefined && widgets[element.id][key] !== undefined) {
              item.key = item.uuid + Date.now();
              item.data = widgets[element.id][key];
            }

            if (item.type === 'group') {
              item.list = item.elements.map(id => item.frameid + '_' + containerid + '_' + id);
            }

            if (item.type === 'template') {
              const template = templates[item.linkid];

              createTemplateList(item, templates);
              createItemLinks(item, template);

              createMasterLayer(template);            
              createChangesLayers(template);

              const curentLayer = getCurentLayer(item, template, values);
              
              Object
              .keys(curentLayer)
              .forEach(id => {
                const item2 = cloneObject(curentLayer[id]);
                Object
                  .keys(item2)
                  .forEach(id => {
                    const prop = item2[id];

                    if (prop && prop.enabled) {
                      if (item.links[prop._bind] !== undefined) {
                        prop.did = item.links[prop._bind].did;
                        prop.prop = item.links[prop._bind].prop;
                      } else {
                        prop.enabled = false;
                      }
                    }
                  })   

                item2.layoutid = layoutid;
                item2.containerid = containerid;
                item2.frameid = element.uuid;
                item2.id = id;
                item2.uuid = item.frameid + '_' + containerid + '_' + key + '_' + id;

                temp[item2.uuid] = item2;
              });
            }

            temp[item.uuid] = item;
          });
      }
    });
  return temp;
}



