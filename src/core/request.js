import core from 'core';


class Request {

  constructor(namespace, options) {
    this.namespace = namespace;
    this.req = null;
    this.options = {
      delay: 200,
      timeout: 1000 * 15,
      ...options
    };
  }

  destroy() {
    core.progress.stop();

    this.context = null;
    this.namespace = null;
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

  settings(req, context) {
    this.req = req;
    this.context = context;
    if (this.handleOk) {
      this.start();
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

  responseEvent(res) {
    const name = `response_${this.namespace}`;
    if (core.network.events._events[name] !== undefined) {
      core.network.events.emit(name, this.responseOk.bind(this), res, this.context);
    }
  }

  responseError(e) {
    clearTimeout(this.timerDelay);
    clearTimeout(this.timerTimeout);
    core.actions.app.alertOpen('error', e.message);
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
    if (this.req) {
      this.start();
    }
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
    core.progress.start();

    const _handleOk = `response_${this.namespace}` ? this.responseEvent.bind(this) : this.responseOk.bind(this);

    if (Array.isArray(this.req)) {
      Promise
      .all(this.req.map(req => fetch(req, { signal: this.controller.signal })))
      .then(_handleOk)
      .catch(this.responseError.bind(this))
    } else {
      fetch(this.req, { signal: this.controller.signal })
      .then(_handleOk)
      .catch(this.responseError.bind(this))
    }
  }
}

function request(data) {
  const name = `request_${data.component}`;
  const req = new Request(data.component);

  function send(options) {
    req.settings(options, data);
  }

  if (core.network.events._events[name] !== undefined) {
    core.network.events.emit(name, send, data);
  } else {
    req.settings(data, data);
  }
  return req;
}

function fetch(data, options) {
  return new Promise((resolve, reject) => {
    http(data, options, resolve, reject);
  }); 
}

function http(data, options, resolve, reject) {
  const queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
  window.fetch('/api/admin?' + queryString, { 
    ...options,
    method: 'GET',
    // body: JSON.stringify(data, null, 2),
    headers: {
    // 'Content-Type': 'application/json',
      'token': 'admin_12345',
    },
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      reject({ message: response.statusText });
    }
  })
  .then((json) => {
   if (json !== undefined) {
    if (json.response) {
      resolve(json);
    } else {
      if (json.error === 'NEEDAUTH') {
        core.event('app:exit', null, null);
        reject(json);
      } else {
        reject(json);
      }
    }
   }
  })
  .catch(err => reject(err));
}


export default request;