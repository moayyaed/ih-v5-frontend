import core from 'core';


function sub(params, callback) {
  core.network.realtime.registerEvent(params, callback);
}

function unsub(params, callback) {
  core.network.realtime.unregisterEvent(params, callback);
}

function command(params) {
  core.network.realtime.sendTunnel(params)
}

const tunnel = {
  sub,
  unsub,
  command,
}



export default tunnel;