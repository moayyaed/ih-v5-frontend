import core from 'core';


function sub(id, callback) {
  core.network.realtime.registerEvent({ type: 'sub', id }, callback);
}

function unsub(id) {
  core.network.realtime.unregisterEvent({ type: 'unsub', id });
}

const tunnel = {
  sub,
  unsub,
}



export default tunnel;