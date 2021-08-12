import core from 'core';


function getContextString(frames) {
  if (frames) {
    const temp = [];
    Object
      .keys(frames)
      .forEach(key => {
        const txt = key + ',' 
        + (frames[key].container_id || '') + ','
        + (frames[key].device_id || '') + ','
        + (frames[key].multichart_id || '') + ','
        + (frames[key].timelinechart_id || '') + ','
        + (frames[key].journal_id || '') + ','
        + (frames[key].alertjournal_id || '')
        temp.push(txt);
      });
  if (temp.length === 1) {
    if (temp[0].replace(RegExp('-', 'g'), '').replace(RegExp(',', 'g'), '') === '') {
      return '';
    }
  }
  return temp.join(';')
  }
  return '';
}

function getContextStringOne(itemid, params) {
  if (params) {
    return (itemid || '') + ','
    + (params.containerid || '') + ','
    + (params.linkid || '') + ','
    + (params.multichartid || '') + ','
    + (params.timelineid || '') + ','
    + (params.journalid || '') + ','
    + (params.alertjournalid || '');
  }
  return null;
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

function subrealtimelayout(layoutid, elements, context, cb) {
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
          layoutid: layoutid,
          elementid: element.id,
          frames: getContextStringOne(element.id, context.frames[element.uuid]),
        }, cb);
      }
    });
}

function unsubrealtimelayout(layoutid, elements, context, cb) {
  core.tunnel.unsub({ 
    method: 'unsub',
    type: 'layout',
    uuid: layoutid,
    id: layoutid,
  }, cb);

  Object
    .keys(elements)
    .forEach(id => {
      const element = elements[id];

      if (element.type === 'container' && element.linkid) {
        core.tunnel.unsub({ 
          method: 'unsub',
          type: 'container',
          uuid: element.uuid,
          id: element.linkid,
          contextId: element.contextid || null,
          layoutid: layoutid,
          elementid: element.id,
          frames: getContextStringOne(element.id, context.frames[element.uuid]),
        }, cb);
      }
    });
}


function subrealtimecontainer(elementid, containerid, contextid, context, cb) {
  const itemid = elementid.replace(context.layoutid + '_', '')
  core.tunnel.sub({ 
    method: 'sub',
    type: 'container',
    uuid: elementid,
    id: containerid,
    contextId: contextid || null,
    layoutid: context.layoutid,
    elementid: itemid,
    frames: getContextStringOne(itemid, context.frames[elementid]),
  }, cb);
}

function unsubrealtimecontainer(elementid, containerid, contextid, context, cb) {
  const itemid = elementid.replace(context.layoutid + '_', '')
  core.tunnel.unsub({ 
    method: 'unsub',
    type: 'container',
    uuid: elementid,
    id: containerid,
    contextId: contextid || null,
    frames: context.uframes|| null,
    layoutid: context.layoutid,
    elementid: itemid,
    frames: getContextStringOne(itemid, context.frames[elementid]),
  }, cb);
}

function clearAnimation() {
  const temp = []

  Object
    .keys(document.styleSheets[0].rules)
    .forEach(id => {
      if (document.styleSheets[0].rules[id].type === CSSRule.KEYFRAMES_RULE) {
        temp.push(id)
      }
    })
  temp
    .reverse()
    .forEach(id => {
      document.styleSheets[0].deleteRule(id);
   })
}


export function requestDefaultLayout() {
  const context = getContext(this.props);
  const layoutid = context.layoutid;
  
  core
    .request({ method: 'GET_LAYOUT', context, params: { layoutid } })
    .ok(data => {
      this.resize(data.settings);
      core.actions.layout.data(data);
      subrealtimelayout(layoutid, data.elements, context, this.realtime)
    });
}

export function requestChangeLayout(layoutid, params) {
  const strcontext = getContextString(params.frames);
  const prevContext = getContext(this.props);

  core.route(`${layoutid}/${strcontext}`);

  const context = getContext(this.props);
  
  core
    .request({ method: 'GET_LAYOUT', context, params: { layoutid } })
    .ok(data => {
      unsubrealtimelayout(this.props.state.layoutid, this.props.state.elements, prevContext, this.realtime);
      clearAnimation();
      core.actions.layout.data(data);
      subrealtimelayout(layoutid, data.elements, context, this.realtime)
    });
}

export function requestChangeContainer(params) {
  if (params.frames) {
    const strcontext = getContextString(params.frames);

    if (strcontext) {
      const prevContext = getContext(this.props);

      core.route(`${prevContext.layoutid}/${strcontext}`);
  
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
  
          const d = params.frames[id].device_id;
          const m = params.frames[id].multichart_id;
          const t = params.frames[id].timelinechart_id;
          const j = params.frames[id].journal_id;
          const a = params.frames[id].alertjournal_id;
  
          core.cache.context2[elementid] = {
            linkid: d,
            multichartid: m,
            timelineid: t,
            journalid: j,
            alertjournalid: a,
          };
          core
            .request({ method: 'GET_CONTAINER', context, params: { contextid, elementid, containerid } })
            .ok(data => {
              unsubrealtimecontainer(item.uuid, item.linkid, item.contextid, prevContext, this.realtime);
              core.actions.layout.changeContainer(elementid, containerid, contextid, data);
              subrealtimecontainer(elementid, containerid, contextid, context, this.realtime);
            });
        });
    }
  }
}