import core from 'core';


function show(title, message, accept, cancel) {
  core.transfer.send('alert', 'show', title, message, accept, cancel);
}

function close() {
  core.transfer.send('alert', 'close');
}


export default {
  show,
  close,
}