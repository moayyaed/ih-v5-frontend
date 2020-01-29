import 'whatwg-fetch';

import core from 'core';
import shortid from 'shortid';

function error(reject, data) {
  core.app.alert.error(data.message);
  reject(data);
}

export function fetch(data) {
  return new Promise((resolve, reject) => {
    window.fetch('/api', { 
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
          core.app.exit();
          error(reject, json);
        } else {
          error(reject, json);
        }
      }
     }
    })
    .catch(err => { console.warn(err)});
  }); 
  

}


class Request {

  constructor(req, options) {
    this.req = req;
    this.options = {
      delay: 250,
      timeout: 1000 * 10,
      ...options
    };
  }

  destroy() {
    this.req = null;
    this.options = null;
    
    this.timerDelay = null;
    this.timerTimeout = null;

    if (this.handleOk !== undefined) {
      this.handleOk = null;
    }
    if (this.handleLoading !== undefined) {
      this.handleLoading = null;
    }
    if (this.handleError !== undefined) {
      this.handleError = null;
    }
  }

  responseOk() {
    clearTimeout(this.timerDelay);
    clearTimeout(this.timerTimeout);
    if (this.handleOk !== undefined) {
      this.handleOk();
    }
    this.destroy();
  }

  responseError() {
    clearTimeout(this.timerDelay);
    clearTimeout(this.timerTimeout);
    if (this.handleError !== undefined) {
      this.handleError();
    }
    this.destroy();
  }

  handleDelay() {
    if (this.handleLoading !== undefined) {
      this.handleLoading();
    }
  }

  handleTimeout() {
    if (this.handleError !== undefined) {
      this.handleError();
    }
  }

  fetch() {
    this.timerDelay = setTimeout(this.handleDelay.bind(this), this.options.delay);
    this.timerTimeout = setTimeout(this.handleTimeout.bind(this), this.options.timeout);
  }

  ok(handle) {
    this.handleOk = handle;
    this.fetch();
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
}


export function req(options) {
  return new Request(options);
}

export function res(data) {

}

