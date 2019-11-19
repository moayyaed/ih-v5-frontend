export class Request extends Promise {

  handleOk() {
    this._then.apply(null, arguments);
    this.clear();
  }

  handleError() {
    if (this._catch) {
      this._catch.apply(null, arguments);
    }
    this.clear();
  }

  handleFinally() {
    // console.log('handleFinally');
  }

  clear() {
    if (this._timer) {
      clearTimeout(this._timer);
    }
    this._next = null;
    this._catch = null;
    this._then = null;
    this._catch = null;
  }

  load(_load) {
    this._timer = setTimeout(_load, 200);
    return this;
  }

  ok(_then) {
    this._then = _then;
    this
      .then(this.handleOk.bind(this))
      .catch(this.handleError.bind(this))
      .finally(this.handleFinally.bind(this));
    return this;
  }

  error(_catch) {
    this._catch = _catch;
   return this;
  }
}