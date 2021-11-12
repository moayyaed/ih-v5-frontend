import EventEmitter from 'events';
import core from 'core';


function trasportWS() {
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const host = window.location.host === 'localhost:3000' ? 'v5.ih-systems.com:3000' : window.location.host;
  const token = core.cache.token;

  if (window.__ihp2p) {
    const p2pws = new window.__ihp2p.ws(window.window.__ihp2p.core.sessionid);

    p2pws.onopen = openTunnel;
    p2pws.onmessage = messageTunnel;
    p2pws.onerror = errorTunnel;
    p2pws.onclose = closeTunnel;
    p2pws.token(token);
    p2pws.connect();
    return p2pws;
  } else {
    const ws = new WebSocket(`${protocol}://${host}/${token}`);
    ws.onopen = openTunnel;
    ws.onmessage = messageTunnel;
    ws.onerror = errorTunnel;
    ws.onclose = closeTunnel;
  
    return ws;
  }
}


function tunnel(type, agent) {
  const provider = agent.call(null);
  return provider;
}


function start(token) {
  realtime.clear = false;
  startWebSocketTunnel();
}

function startWebSocketTunnel() {
  realtime.connections.main = tunnel('main', trasportWS);
}

function openTunnel() {
  core.actions.app.network(true);
  if (core.restart) {
    core.actions.app.restart(false);
    core.actions.app.alertClose(false);
    document.location.reload();
  }
  Object
    .keys(realtime.tasks)
    .forEach(key => {
      sendTunnel(realtime.tasks[key]);
    });
}

function messageTunnel(e) {
  try {
    const json = JSON.parse(e.data);
    if (json.method) {
      if (json.method === 'syscommand') {
        if (json.command === 'alert') {
          core.actions.app.alertOpen(json.type || 'info', json.message || '');
        }
        if (json.command === 'restart') {
          core.actions.app.restart(true);
        }
        if (json.command === 'refresh') {
          core.transfer.send('refresh_content');
        }
      } else {
        core.transfer.send('command_layout', json)
      }
    } else if (json.uuid !== undefined) {
      if (json.error) {
        core.actions.app.alertOpen('warning', json.error);
        realtime.events.emit(json.uuid, 'error', json);
      } else if (json.data || json.chartdata || json.alertdata) {
        if (json.data) {
          realtime.events.emit(json.uuid, json.data, json);
        }
        if (json.chartdata) {
          core.transfer.send('chartdata', json.chartdata)
        }
        if (json.alertdata) {
          core.transfer.send('realtime_alert', json.alertdata)
        }
      } else {
        realtime.events.emit(json.uuid, json);
      }
    } else {
      if (json.error) {
        core.actions.app.alertOpen('warning', 'Real-time: ' + json.error);
      }
    }
   } catch (ev) {
    console.log(ev.message, e.data)
    core.actions.app.alertOpen('error', ev.message);
  }
}

function errorTunnel() {
  console.log('error')
}

function closeTunnel() {
  if (!realtime.clear) {
    core.actions.app.network(false);
    if (window.__ihp2p) {
      realtime.timer = setTimeout(startWebSocketTunnel, 2000 * window.__ihp2p.closeCount);
    } else {
      realtime.timer = setTimeout(startWebSocketTunnel, 2000);
    }
  }
}

function sendTunnel(data) {
  if (realtime.connections.main && realtime.connections.main.readyState === 1) {
    realtime.connections.main.send(JSON.stringify(data));
  }
}

function registerEvent(params, handler) {
  realtime.tasks[params.uuid] = params;
  realtime.events.on(params.uuid, handler);
  sendTunnel(params);
}

function unregisterEvent(params, handler) {
  delete realtime.tasks[params.uuid];
  realtime.events.removeListener(params.uuid, handler);
  sendTunnel(params);
}

function destroy() {
  realtime.clear = true;
  clearTimeout(realtime.timer);

  if (realtime.connections.main) {
    realtime.connections.main.close(1000);
  }
}

const realtime = {
  clear: false,
  timer: null,
  tasks: {},
  events: new EventEmitter(),
  connections: { },
  params: { },
  start,
  registerEvent,
  unregisterEvent,
  sendTunnel,
  destroy,
};


export default realtime;

