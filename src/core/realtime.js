import EventEmitter from 'events';
import core from 'core';


function trasportWS() {
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const host = window.location.host === 'localhost:3000' ? 'v5.ih-systems.com:3000' : window.location.host;

  const ws = new WebSocket(`${protocol}://${host}`);
  ws.onopen = openTunnel;
  ws.onmessage = messageTunnel;
  ws.onerror = errorTunnel;
  ws.onclose = closeTunnel;

  return ws;
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
      if (json.command === 'gotolayout') {
        core.route(json.id);
      }
    }
    if (json.data !== undefined) {
      realtime.events.emit(json.uuid, json.data);
    } else if (json.uuid !== undefined) {
      realtime.events.emit(json.uuid, json);
    } else {
      if (json.command !== undefined && json.command === 'showdialog') {
        core.transfer.send('show_dialog_command', json);
      }
    }
    if (json.error) {
      core.actions.app.alertOpen('warning', 'Real-time: ' + json.error);
    }
   } catch (e) {
    core.actions.app.alertOpen('error', 'Real-time: incorrect data!');
  }
}

function errorTunnel() {
  console.log('error')
}

function closeTunnel() {
  if (!realtime.clear) {
    realtime.timer = setTimeout(startWebSocketTunnel, 2000);
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

