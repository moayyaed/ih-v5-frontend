import core from 'core';


function sub(params, callback) {
  core.network.realtime.registerEvent(params, callback);
}

function unsub(params, callback) {
  core.network.realtime.unregisterEvent(params, callback);
}

const tunnel = {
  sub,
  unsub,
}



export default tunnel;