import EventEmitter from 'events';
import core from 'core';


function sub(name, handler) {
  transfer.events.on(name, handler);
}

function unsub(name, handler) {
  transfer.events.removeListener(name, handler);
}

function send(name, data) {
  transfer.events.emit(name, data);
}

const transfer = {
  sub,
  unsub,
  send,
  events: new EventEmitter(),
}



export default transfer;