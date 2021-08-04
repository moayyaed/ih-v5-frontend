import core from 'core';


function getContextString(frames) {
  if (frames) {
    const temp = [];
    Object
      .keys(frames)
      .forEach(key => {
        temp.push(`${key},${frames[key].container_id || ''},${frames[key].device_id || ''}`);
      });
  return temp.join(';')
  }
  return '';
}

function getContext(props, frames) {
  const context = {
    layoutid: props.route.layout || props.app.auth.layout,
    username: props.app.auth.name,
    frames: props.route.frames,
    uframes: props.route.uframes,
  };
  return context;
}

function subrealtimelayout(layoutid, elements, cb) {
  core.tunnel.sub({ 
    method: 'sub',
    type: 'layout',
    uuid: layoutid,
    id: layoutid,
  }, cb);

  Object
    .keys(elements)
    .forEach(id => {
      const element = elements[id];

      if (element.type === 'container' && element.linkid) {
        core.tunnel.sub({ 
          method: 'sub',
          type: 'container',
          uuid: element.uuid,
          id: element.linkid,
          contextId: element.contextid || null,
        }, cb);
      }
    });
}

function subrealtimecontainer(elementid, containerid, contextid, cb) {
  core.tunnel.sub({ 
    method: 'sub',
    type: 'container',
    uuid: elementid,
    id: containerid,
    contextId: contextid || null,
  }, cb);
}

function unsubrealtimecontainer(elementid, containerid, contextid, cb) {
  core.tunnel.unsub({ 
    method: 'unsub',
    type: 'container',
    uuid: elementid,
    id: containerid,
    contextId: contextid || null,
  }, cb);
}


export function requestDefaultLayout() {
  const context = getContext(this.props);
  const layoutid = context.layoutid;
  
  core
    .request({ method: 'GET_LAYOUT', context, params: { layoutid } })
    .ok(data => {
      const x = Date.now();
      this.resize(data.settings);
      core.actions.layout.data(data);
      subrealtimelayout(layoutid, data.elements, this.realtime)
      console.log('layout render', Date.now() - x)
    });
}

export function requestChangeContainer(params) {
  if (params.frames) {
    const prevContext = getContext(this.props);

    core.route(`${prevContext.layoutid}/${getContextString(params.frames)}`);

    const context = getContext(this.props);
    const layoutid = context.layoutid;

    Object
      .keys(params.frames)
      .forEach(id => {
        const elementid = layoutid + '_' + id;
        const containerid = params.frames[id].container_id;
        const item = this.props.state.elements[elementid];
        const contextid = params.frames[id].device_id;
        
        core.cache.context[elementid] = contextid

        core
        .request({ method: 'GET_CONTAINER', context, params: { contextid, elementid, containerid } })
        .ok(data => {
          const x = Date.now();
          unsubrealtimecontainer(item.uuid, item.linkid, item.contextid, this.realtime);
          core.actions.layout.changeContainer(elementid, containerid, contextid, data);
          subrealtimecontainer(elementid, containerid, contextid, this.realtime);
          console.log('container render', Date.now() - x)
        });
      });
  }
}