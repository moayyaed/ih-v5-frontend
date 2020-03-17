import EventEmitter from 'events';


function trasportWS() {
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const host = window.location.host;

  const ws = new WebSocket(`${protocol}://${host}/backend`);

  return {
    connection: ws,
    open: ws.onopen,
    message: ws.onmessage,
    error: ws.onerror,
    close: ws.onclose,
    send: ws.send,
  }
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

  realtime.connections.main.open = openTunnel;
  realtime.connections.main.message = messageTunnel;
  realtime.connections.main.error = errorTunnel;
  realtime.connections.main.close = closeTunnel;
}

function openTunnel() {
  console.log('open')
}

function messageTunnel() {
  console.log('message')
}

function errorTunnel() {
  console.log('error')
}

function closeTunnel() {
  console.log('close')
}

const realtime = {
  events: new EventEmitter(),
  connections: { },
  params: { token: '' },
  start,
};


export default realtime;

