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
    this.isCancel = null;

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
    console.error(e)
    clearTimeout(this.timerDelay);
    clearTimeout(this.timerTimeout);
  
    if (e.error && e.error === 'INVALIDTOKEN') {
      core.cache.token = null;
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('rememberme');
      
      core.network.realtime.destroy();
      core.actions.app.auth(false);
    }
    
    if (!this.isCancel) {
      core.actions.app.alertOpen('error', e.message);
      if (this.handleError) {
        if (e.stack) {
          this.handleError({ message: e.message });
        } else {
          this.handleError(e);
        }
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

  cancel() {
    this.isCancel = true;
    this.controller.abort();
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
    // this.timerTimeout = setTimeout(this.handleTimeout.bind(this), this.options.timeout);

    this.controller = new AbortController();

    const _handleOk = `response_${this.namespace}` ? this.responseEvent.bind(this) : this.responseOk.bind(this);
    if (this.context.cache) {
      const cacheid = this.context.cache;
      if (core.cache.requests[cacheid] && core.cache.requests[cacheid].time) {
        if (Date.now() - core.cache.requests[cacheid].time > 7500) {
          core.cache.requests[cacheid] = null;
        }
      }
      if (!core.cache.requests[this.context.cache]) {
        core.progress.start();
        core.cache.requests[cacheid] = {
          status: null,
          list: [],
          response: null,
          error: null,
        };
        fetch(this.req, { signal: this.controller.signal })
          .then((response) => {
            _handleOk(response);
            core.cache.requests[cacheid].status = 'ok';
            core.cache.requests[cacheid].list.forEach(i => i.resolve(response));
            core.cache.requests[cacheid].list = null;
            core.cache.requests[cacheid].response = response;
            core.cache.requests[cacheid].time = Date.now();
          })
          .catch((e) => {
            this.responseError.bind(this)(e);
            core.cache.requests[cacheid].status = 'error';
            core.cache.requests[cacheid].list.forEach(i => i.reject(e));
            core.cache.requests[cacheid].list = null;
            core.cache.requests[cacheid].error = null;
            core.cache.requests[cacheid] = null;
            core.cache.requests[cacheid].status = null;
          })
      } else {
        clearTimeout(this.timerDelay);
        if (core.cache.requests[cacheid].status === null) {
            core.cache.requests[cacheid].list.push({ resolve: _handleOk , reject: this.responseError.bind(this) });
        } else {
          if (core.cache.requests[cacheid].status === 'ok') {
            _handleOk(core.cache.requests[cacheid].response);
          } else {
            this.responseError.bind(this)(core.cache.requests[cacheid].error);
          }
        }
      }
    } else {
      core.progress.start();
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
}

function request(data) {
  const name = `request_${data.method}`;
  const req = new Request(data.method);

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

function fetch(data, options, headers) {
  return new Promise((resolve, reject) => {
    http(data, options, resolve, reject);
  }); 
}

function http(data, options, resolve, reject) {
  const headers = {};

  let _uri = '';
  let _options = {}

  if (core.cache.token) {
    headers.token = core.cache.token;
  }

  if (data.payload) {
    _uri = '/api/admin';
    _options = {
      ...options,
      method: 'POST',
      body: JSON.stringify(data, null, 2),
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    }
  } else {
    const queryString = Object.keys(data)
      .filter(key => key !== 'api')
      .map(key => key + '=' + data[key]).join('&');
    _uri = data.api ? `/api/engine/${data.api}?` + queryString : '/api/admin?' + queryString;
    _options = {
      ...options,
      method: 'GET',
      headers: {
        ...headers,
      },
    }
  }

  const fetch = window.__ihp2p ? window.__ihp2p.fetch : window.fetch;
  
  fetch(_uri, _options)
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