import 'whatwg-fetch';

import core from 'core';

class Request {

  constructor(req, options) {
    this.req = req;
    this.options = {
      delay: 250,
      timeout: 1000 * 15,
      ...options
    };
  }

  destroy() {
    this.req = null;
    this.options = null;
    this.controller = null;

    this.timerDelay = null;
    this.timerTimeout = null;

    if (this.handleOk) {
      this.handleOk = null;
    }
    if (this.handleLoading) {
      this.handleLoading = null;
    }
    if (this.handleError) {
      this.handleError = null;
    }
  }

  responseOk(res) {
    clearTimeout(this.timerDelay);
    clearTimeout(this.timerTimeout);
    if (this.handleOk) {
      this.handleOk(res);
    }
    this.destroy();
  }

  responseError(e) {
    clearTimeout(this.timerDelay);
    clearTimeout(this.timerTimeout);
    if (this.handleError) {
      if (e.stack) {
        this.handleError({ message: e.message });
      } else {
        this.handleError(e);
      }
    }
    this.destroy();
  }

  handleDelay() {
    if (this.handleLoading) {
      this.handleLoading();
    }
  }

  handleTimeout() {
    this.controller.abort();
  }

  ok(handle) {
    this.handleOk = handle;
    this.start();
    return this;
  }

  loading(handle) {
    this.handleLoading = handle;
    return this;
  }

  error(handle) {
    this.handleError = handle;
    return this;
  }

  start() {
    this.timerDelay = setTimeout(this.handleDelay.bind(this), this.options.delay);
    this.timerTimeout = setTimeout(this.handleTimeout.bind(this), this.options.timeout);
    this.controller = new AbortController();
    fetch(this.req, { signal: this.controller.signal })
      .then(this.responseOk.bind(this))
      .catch(this.responseError.bind(this))
  }
}


function fetch(data, options) {
  return new Promise((resolve, reject) => {
    const name1 = data.alias + ':' + data.id
    const name2 = data.alias;
  
    if (core.network._events[name1]) {
      virtual(data, name1, resolve, reject)
    } else if (core.network._events[name2] !== undefined) {
      virtual(data, name2, resolve, reject)
    } else {
      http(data, options, resolve, reject);
    }
  }); 
}


function http(data, options, resolve, reject) {
  window.fetch('/api', { 
    ...options,
    method: 'POST', body: JSON.stringify(data, null, 2),
    headers: {
      'Content-Type': 'application/json',
      'token': core.network.token,
    },
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      error(reject, { message: response.statusText });
    }
  })
  .then((json) => {
   if (json !== undefined) {
    if (json.response) {
      resolve(json);
    } else {
      if (json.error === 'NEEDAUTH') {
        core.event('app:exit', null, null);
        error(reject, json);
      } else {
        error(reject, json);
      }
    }
   }
  })
  .catch(err => reject(err));
}

function error(reject, data) {
  core.app.alert.error(data.message);
  reject(data);
}

function virtual(data, name, resolve, reject) {
  function res(data) {
    resolve({ response: 1, data })
  }
  core.network._events[name](res, data)
}


export default function req(options) {
  return new Request(options);
}