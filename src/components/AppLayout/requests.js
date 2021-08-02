import core from 'core';



function getContext(props) {
  const context = {
    layoutid: props.route.layout || props.app.auth.layout,
    username: props.app.auth.name,
    frames: props.route.frames,
    uframes: props.route.uframes,
  };
  return context;
}

function subrealtimelayout(layoutid, list, cb) {
  core.tunnel.sub({ 
    method: 'sub',
    type: 'layout',
    uuid: layoutid,
    id: layoutid,
  }, cb);
  
  list.forEach(id => {
    if (core.cache.subs[id] === undefined) {
      core.cache.subs[id] = 0;
    }

    if (core.cache.subs[id] === 0) {
      core.tunnel.sub({ 
        method: 'sub',
        type: 'container',
        uuid: id,
        id: id,
      }, cb);
    }

    ++core.cache.subs[id];
  });
}

function subrealtimecontainer(containerid, cb) {
  if (containerid) {
    if (core.cache.subs[containerid] === undefined) {
      core.cache.subs[containerid] = 0;
    }

    if (core.cache.subs[containerid] === 0) {
      core.tunnel.sub({ 
        method: 'sub',
        type: 'container',
        uuid: containerid,
        id: containerid,
      }, cb);
    }

    ++core.cache.subs[containerid];
  }
}

function unsubrealtimecontainer(containerid, cb) {
  if (containerid) {
    --core.cache.subs[containerid];

    if (core.cache.subs[containerid] === 0) {
      core.tunnel.unsub({ 
        method: 'unsub',
        type: 'container',
        uuid: containerid,
        id: containerid,
      }, cb);
    }
  }
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
      subrealtimelayout(layoutid, data.realtime, this.realtime)
      console.log('layout render', Date.now() - x)
    });
}

export function requestChangeContainer(params) {
  if (params.frames) {
    const context = getContext(this.props);
    const layoutid = context.layoutid;

    Object
      .keys(params.frames)
      .forEach(id => {
        const elementid = layoutid + '_' + id;
        const containerid = params.frames[id].container_id;
        const item = this.props.state.elements[elementid];

        core
        .request({ method: 'GET_CONTAINER', context, params: { containerid } })
        .ok(data => {
          const x = Date.now();
          unsubrealtimecontainer(item.linkid, this.realtime);
          core.actions.layout.changeContainer(elementid, containerid, data);
          subrealtimecontainer(containerid, this.realtime)
          console.log('container render', Date.now() - x)
        });
      });
  }
}