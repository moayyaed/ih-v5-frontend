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
  realtime.params.token = token;

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
    if (json.data !== undefined) {
      realtime.events.emit(json.uuid, json.data);
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
  setTimeout(startWebSocketTunnel, 2000);
}

function sendTunnel(data) {
  if (realtime.connections.main.readyState === 1) {
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

const realtime = {
  tasks: {},
  events: new EventEmitter(),
  connections: { },
  params: { token: '' },
  start,
  registerEvent,
  unregisterEvent,
  sendTunnel,
};


export default realtime;

