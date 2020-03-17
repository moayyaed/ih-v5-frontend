import EventEmitter from 'events';


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
  const json = JSON.parse(e.data);
  if (json.response === undefined) {
    realtime.events.emit(json.id, json.data);
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
  realtime.tasks[params.id] = params;
  realtime.events.on(params.id, handler);
  sendTunnel(params);
}

function unregisterEvent(params, handler) {
  delete realtime.tasks[params.id];
  realtime.events.removeListener(params.id, handler);
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
};


export default realtime;

