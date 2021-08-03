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
  if (
    item.widgetlinks && 
    item.widgetlinks.link && 
    item.widgetlinks.link.id
  ) {
    item.list = containers[item.widgetlinks.link.id].list
      .map(id => item.widgetlinks.link.id + '_' + id);
  } else {
    item.list = [];
  }
}

function createTemplateList(item, templates) {
  item.list = templates[item.linkid].list
    .map(id => item.containerid + '_' + item.id + '_' + id)
}

function createItemLinks(item, template) {
  const links = {};
  if (item.links !== undefined) {
    Object
      .keys(item.links)
      .forEach(stateid => {
        if (item.links[stateid].value !== undefined) {
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
          });
        })
      }
    });
  return curentLayer;
}

function createMasterLayer(template) {
  if (template.masterLayer === undefined) {
    const masterLayer = {};

    template.listState
    .concat('master')
    .reverse()
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
  const newid = uuid;
  
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

export function createElement(item, values, links, realtime) {
  checkItemProps(item);

  if (item.type === 'container' && item.linkid) {
    realtime.push(item.linkid)
  }
  
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

  Object
    .keys(item)
    .forEach(id => {
      const prop = item[id];

      if ((!!prop) && (prop.constructor === Object) && !Array.isArray(prop)) {
        if (id === 'animation') {
          createAnimation(item.uuid, prop)
        }

        if (prop.enabled) {
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
  
    return { image, colorback, colorback2, colorfront, w: settings.w.value, h: settings.h.value };
  }
  return null;
}

export function getLayoutElements(id, data, containers) {
  const temp = {};
  Object
    .keys(data.elements)
    .forEach(key => {
      const item = data.elements[key];

      item.layoutid = id;
      item.linkid = item.widgetlinks && item.widgetlinks.link && item.widgetlinks.link.id;
      item.id = key;
      item.uuid = id + '_' + key;
      
      if (item.type === 'container') {
        createContainerList(item, containers);
        item.settings = getItemSettings(containers[item.linkid].settings)
      }

      temp[id + '_' + key] = item;;
    });
  return temp;
}

export function getContainersElements(layoutid, data, templates, values) {
  const temp = {};
  Object
    .keys(data)
    .forEach(containerid => {
      Object
        .keys(data[containerid].elements)
        .forEach(key => {
          const item = data[containerid].elements[key];

          item.layoutid = layoutid;
          item.containerid = containerid;
          item.linkid = item.templateId
          item.id = key;
          item.uuid = containerid + '_' + key;

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
              item2.id = key;
              item2.uuid = containerid + '_' + key + '_' + id;

              temp[containerid + '_' + key + '_' + id] = item2;
            });
          }

          temp[containerid + '_' + key] = item;
        });
    });
  return temp;
}



