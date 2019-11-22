import shortid from 'shortid';

const store = {

}

const ws = new WebSocket("ws://192.168.0.248:8088");

ws.onopen = _open;
ws.onmessage = _message;

function _send(data) {
  if (typeof data === 'object') {
    ws.send(JSON.stringify(data))
  }
  if (typeof data === 'string') {
    ws.send(data)
  }
}

function _open() {
  _send('connect');
}

function _message(e) {
  if (e.data === 'connect:connected') {
    _send(`{
      "uuid": "2975bf33-fd1f-43a1-b738-7396ada356b7",
      "type": "auth",
      "id": "auth",
      "route": {
        "token": "486763d6452560e9cb8c6cf3135a7ca765de78abec9b43c704c55eee16d09a54",
        "client": "pm"
      },
      "payload": null
    }`)
  } else {
    const msg = JSON.parse(e.data);
    if (msg.id === 'auth') {
      Object.keys(store)
        .forEach(key => {
          _send(store[key].data);
        });
    } else {
      if (store[msg.uuid]) {
        store[msg.uuid].resolve(msg)
      }
    }
  }
}


//-------------------------------

function send(data) {
  return new Promise((resolve) => {
    const id = shortid.generate();
    const temp = {};
  
    temp.type = 'get';
    temp.id = id;
    temp.uuid = id;
    temp.route = data;
    
    if (ws.readyState === 1) {
      store[id] = { data: temp, resolve };
      _send(temp)
    } else {
      store[id] = { data: temp, resolve };
    }
  });

}

function vserver(data, res) {
  if (data.component === 'appmenu') {
    send({propname: "list", tablename: "pmmenu"})
    .then(data => {
      res({
        select: null,
        list: data.set.list.map(i => ({ id: i.id, route: i.id, label: i.name })),
      })
    });
  }

  function parseExplorer(item) {
    if (item.tables) {
      return { id: item.id, label: item.header, children: item.tables.map(i => {
        return { ...i, id: i.id, label: i.name };
      }) };
    }
    return { id: item.id, label: item.header };
  }

  if (data.component === 'navigator') {
    const id = data.route;
    send({propname: "list", tablename: data.id })
    .then(data => {
      if (data.set) {
        res({ id, list: data.set.list.map(parseExplorer) });
      } else {
        res({ id, list: [] });
      }
    });
  }
  

  if (data.component === 'table') {
    const id = data.id.tablename;
    send({ tablename: data.id.tablename, scheme: data.id.scheme })
    .then(data => {
      res({ 
        id,
        columns: Object.keys(data.set.scheme).map(id => ({ id, label: data.set.scheme[id].name, width: data.set.scheme[id].width })),
        selects: {
          scrollToIndex: undefined,
          lastIndex: null,
          data: {},
        },
        data: data.set.data,
      })
    });
  }
}

function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export default vserver;
