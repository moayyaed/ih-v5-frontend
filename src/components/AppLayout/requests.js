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

function subrealtime(layoutid, list, cb) {
  core.tunnel.sub({ 
    method: 'sub',
    type: 'layout',
    uuid: layoutid,
    id: layoutid,
  }, cb);
  
  list.forEach(id => {
    core.tunnel.sub({ 
      method: 'sub',
      type: 'container',
      uuid: id,
      id: id,
    }, cb);
  });
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
      subrealtime(layoutid, data.realtime, this.realtime)
      console.log('layout render', Date.now() - x)
    });
}