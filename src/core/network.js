import EventEmitter from 'events';
import core from 'core';


function request(name, callback) {
  network.events.on(`request_${name}`, callback);
}

function response(name, callback) {
  network.events.on(`response_${name}`, callback);
}


const network = new EventEmitter();
network.events = new EventEmitter();
network.request = request;
network.response = response;

export default network;