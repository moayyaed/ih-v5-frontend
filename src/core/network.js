import EventEmitter from 'events';
import realtime from './realtime';

function request(name, callback) {
  network.events.on(`request_${name}`, callback);
}

function response(name, callback) {
  network.events.on(`response_${name}`, callback);
}


const network = {};

network.events = new EventEmitter();

network.request = request;
network.response = response;

network.realtime = realtime;

export default network;