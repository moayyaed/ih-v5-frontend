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
  // console.log('open')
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
  console.log('close')
}

function sendTunnel(data) {
  if (realtime.connections.main.readyState === 1) {
    realtime.connections.main.send(JSON.stringify(data));
  }
}

function registerEvent(params, handler) {
  realtime.events.on(params.id, handler);
  sendTunnel(params);
}

function unregisterEvent(params, handler) {
  realtime.events.removeListener(params.id, handler);
  sendTunnel(params);
}

const realtime = {
  events: new EventEmitter(),
  connections: { },
  params: { token: '' },
  start,
  registerEvent,
  unregisterEvent,
};


export default realtime;

