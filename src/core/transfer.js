import EventEmitter from 'events';
import core from 'core';


function sub(name, handler) {
  transfer.events.on(name, handler);
}

function unsub(name, handler) {
  transfer.events.removeListener(name, handler);
}

function send(name, data, param1, param2, param3, param4) {
  transfer.events.emit(name, data, param1, param2, param3, param4);
}

const transfer = {
  sub,
  unsub,
  send,
  events: new EventEmitter(),
}



export default transfer;