/* eslint-disable */

import EventEmitter from 'events';
import uuidv4 from 'uuid/v4';
import Peer from 'simple-peer';

import { stringToBinary, bynaryToString } from './utils';

const ws = new WebSocket(`ws://127.0.0.1:9999`);
ws.onmessage = (e) => {
  const json = JSON.parse(e.data);
  trasferdata_message(json.payload);
};

function fetch(a,b) {
  if (a === 'transferdata') {
    b.type = 'transferdata';
    ws.send(JSON.stringify(b));
  }
  return new Promise(() => {});
}

const STORE = {
  uuid: `CCTV_CORE_${uuidv4()}`,
  system: {
    enabled: false,
    timer: null,
    timer2: null,
    ws: { network: null, activity: Date.now(), socket: null },
    p2p: { network: null, activity: Date.now(), socket: null },
  },
  cams: {},
  rtsp: {},
  rtc: {},
  notifications: {},
};

const SYSTEM_CHECK_INTERVAL = 1000 * 5;

const SUB_TIMEOUT = 1000 * 20;
const WS_TIMEOUT = 1000 * 20;
const P2P_TIMEOUT = 1000 * 20;

const CHANNELS_AUTO_CLOSE_TIME = 1500;
const RESTART_TIMEOUT = 1000 * 7;


function createchannel(type) {
  if (type === 'p2p') {
    if (STORE.system.p2p.network === null) {
      STORE.system.p2p.network = false;
      STORE.system.p2p.activity = Date.now();
      trasferdata_send({ method: 'create_channel', params: { type: 'p2p' } });
    }
  }

  if (type === 'ws') {
    if (STORE.system.ws.network === null) {
      STORE.system.ws.network = false;
      STORE.system.ws.activity = Date.now();
      trasferdata_send({ method: 'create_channel', params: { type: 'ws' } });
    }
  }
}

function unlinkchannelAll() {
  if (STORE.system.enabled !== false) {

    STORE.uuid = `CCTV_CORE_${uuidv4()}`;
    STORE.system.enabled = false;

    clearInterval(STORE.system.timer);
    STORE.system.timer = null;

    // p2p
    if (STORE.system.p2p.socket) {
      STORE.system.p2p.socket.destroy();
    }
    STORE.system.p2p.socket = null;
    STORE.system.p2p.network = null;
    STORE.system.p2p.activity = Date.now();

    // ws
    if (STORE.system.ws.socket) {
      STORE.system.ws.socket.close();
    }
    STORE.system.ws.socket = null;
    STORE.system.ws.network = null;
    STORE.system.ws.activity = Date.now();
  }
}

function channel_ws_start() {
  const cams = Object.keys(STORE.cams);
  STORE.system.ws.network = true;
  cams
    .forEach(camid => {
      const cam = STORE.cams[camid];
      if (cam !== undefined && cam.config.transport === 'ws') {
        if (cam.status.sub === false) {
          trasferdata_send({ method: 'sub_cam', params: cam.config });
        }
      }
    });
}

function channel_p2p_start() {
  const cams = Object.keys(STORE.cams);
  STORE.system.p2p.network = true;
  cams
    .forEach(camid => {
      const cam = STORE.cams[camid];
      if (cam !== undefined && cam.config.transport === 'p2p') {
        if (cam.status.sub === false) {
          trasferdata_send({ method: 'sub_cam', params: cam.config });
        }
      }
    });
}

function subcamtochannel(type, config) {
  if (type === 'p2p') {
    if (STORE.system.p2p.network === true) {
      trasferdata_send({ method: 'sub_cam', params: config });
    }
  }

  if (type === 'ws') {
    if (STORE.system.ws.network === true) {
      trasferdata_send({ method: 'sub_cam', params: config });
    }
  }
}

function transferchannel(config) {
  createchannel(config.transport);
  subcamtochannel(config.transport, config);
}

function rtsp_response(data) {
  const { camid, rawdata } = data;
  if (STORE.cams[camid] !== undefined) {
    STORE.cams[camid].rawdata = rawdata;
    STORE.cams[camid].status.rtsp = true;
    STORE.cams[camid].subs.forEach(uuid => {
      if (STORE.rtsp[uuid] && STORE.rtsp[uuid].status === false) {
        STORE.rtsp[uuid].status = true;
        STORE.rtsp[uuid].link.rawdata(rawdata);
        notifications('live_cam', { camid });
      }
    });
  }
}

function sub_cam_response(config) {
  if (STORE.cams[config.id] !== undefined) {
    STORE.cams[config.id].activity = Date.now();
    STORE.cams[config.id].status.sub = true;
    notifications('connect_cam', { camid: config.id });
  }
}

function sub_cam_error(params) {
  const camid = String(params.camid);
  notifications('error_cam', { camid, msg: params.msg });
}

function sub_cam_close(params) {
  const camid = String(params.camid);
  if (STORE.cams[camid] !== undefined) {
    STORE.cams[camid].subs.forEach(uuid => unsubcam(camid, uuid));
    delete STORE.cams[camid];
  }

  notifications('close_cam', { camid });
}

function notifications(type, params) {
  Object
    .keys(STORE.notifications)
    .forEach(key => STORE.notifications[key].call(null, type, params));
}

function subcam(type, uuid, config, link) {
  if (type === 'control') {
    if (STORE.system.timer2) {
      clearTimeout(STORE.system.timer2)
    }
    if (STORE.cams[config.id] === undefined) {
      STORE.cams[config.id] = { activity: Date.now(), subs: [], config, rawdata: [], status: { sub: false, rtsp: false } } ;
      STORE.cams[config.id].subs.push(uuid);
      transferchannel(config);
    } else {
      STORE.cams[config.id].subs.push(uuid);
    }
  }

  if (type === 'control') {
    STORE.rtsp[uuid] = { status: false, link }
    if (STORE.cams[config.id] !== undefined && STORE.cams[config.id].status.rtsp) {
      STORE.rtsp[uuid].status = true;
      STORE.rtsp[uuid].link.rawdata(STORE.cams[config.id].rawdata);
      notifications('live_cam', { camid: config.id });
    }
  } else {
    STORE.rtc[uuid] = { status: config.type === 'rtsp/h264' ? false : true, link }
  }
}

function unsubcam(camid, uuid) {
  if (STORE.cams[camid] !== undefined && STORE.cams[camid].subs) {
    const index = STORE.cams[camid].subs.findIndex(i => i === uuid);
    if (index !== -1) {
      STORE.cams[camid].subs.splice(index, 1)
    }
  }

  if (STORE.cams[camid] !== undefined && STORE.cams[camid].subs.length === 0) {
    delete STORE.cams[camid];
    trasferdata_send({ method: 'close_cam', params: { camid } })
  }
  if (STORE.rtsp[uuid] !== undefined) {
    delete STORE.rtsp[uuid];
  }
  if (STORE.rtc[uuid] !== undefined) {
    delete STORE.rtc[uuid];
  }

  if (Object.keys(STORE.cams).length === 0 && !STORE.system.timer2) {
    STORE.system.timer2 = setTimeout(unlinkchannelAll, CHANNELS_AUTO_CLOSE_TIME)
  }
}

function trasferdata_send(data) {
  fetch('transferdata', {
    id: STORE.uuid,
    route: { unit: 'cctv', id: STORE.uuid },
    payload: data,
  });
}

function trasferdata_message(data) {
  switch (data.method) {
    case 'channel_settings':
      channel_settings(data.params);
      break;
    case 'cam_ok':
      sub_cam_response(data.params);
      break;
    case 'rtsp_ok':
      rtsp_response(data.params);
      break;
    case 'cam_close':
      sub_cam_close(data.params);
      break;
    case 'cam_error':
      sub_cam_error(data.params);
      break;
    case 'p2p_params':
      p2p_params(data.params);
      break;
    default:
      break;
  }
}

function subtransferdata() {
  if (STORE.system.enabled === false) {
    STORE.system.enabled = true;
    STORE.system.timer = setInterval(systemCheck, SYSTEM_CHECK_INTERVAL);
    fetch('sub', {
      id: STORE.uuid,
      route: { event: 'transferdata', filter: { unit: 'cctv', id: STORE.uuid } },
    })
    .then(response => {
      STORE.system.sub = response.sub
      STORE.system.sub.on(STORE.uuid, trasferdata_message);
    });
  }
}

function channel_settings(params) {
  if (params.type === 'ws') {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    STORE.system.ws.socket = new WebSocket(`${protocol}://${window.location.hostname}:${params.port}`);
    STORE.system.ws.socket.binaryType = 'arraybuffer';
    STORE.system.ws.socket.onopen = ws_open;
    STORE.system.ws.socket.onclose = ws_close;
    STORE.system.ws.socket.onmessage = ws_message;
    STORE.system.ws.socket.onerror = ws_error;
  }

  if (params.type === 'p2p') {
    STORE.system.p2p.socket = new Peer({ initiator: true })
    STORE.system.p2p.socket.on('signal', p2p_signal);
    STORE.system.p2p.socket.on('connect', p2p_connect);
    STORE.system.p2p.socket.on('data', p2p_data);
    STORE.system.p2p.socket.on('error', p2p_error);
    STORE.system.p2p.socket.on('close', p2p_close);
  }
}

function camstream_ws(camid, data) {
  STORE.system.ws.activity = Date.now();

  if (STORE.cams[camid] !== undefined) {
    STORE.cams[camid].subs
      .forEach(id => {
        if (STORE.rtc[id] !== undefined && STORE.rtc[id].status === true && STORE.rtc[id].link.readyState === 1) {
          STORE.rtc[id].link.onmessage({ data: data.slice(3) });
        }
      })
  }
}

function camstream_p2p(camid, data) {
  STORE.system.p2p.activity = Date.now();

  if (STORE.cams[camid] !== undefined) {
    STORE.cams[camid].subs
      .forEach(id => {
        if (STORE.rtc[id] !== undefined && STORE.rtc[id].status === true && STORE.rtc[id].link.readyState === 1) {
          STORE.rtc[id].link.onmessage({ data: data.slice(3) });
        }
      })
  }
}

//-------------P2P--------------------

function pingp2p(data) {
  STORE.system.p2p.activity = Date.now();

  const id = bynaryToString(data.slice(3))
  if (STORE.uuid === id) {
    if (STORE.system.p2p.socket && STORE.system.p2p.socket.connected) {
      STORE.system.p2p.socket.send(stringToBinary(String.fromCharCode(2) + String.fromCharCode(0) + String.fromCharCode(0) + STORE.uuid));
    }
  }
}

function p2p_params(data) {
  STORE.system.p2p.socket.signal(data);
}

function p2p_signal(data) {
  trasferdata_send({ method: 'p2p_params', params: data });
}

function p2p_connect() {
  STORE.system.p2p.socket.send(stringToBinary(String.fromCharCode(0) + STORE.uuid))
  channel_p2p_start();
}

function p2p_data(data) {
  const header = new Uint8Array(data.slice(0, 3));
  switch (header[0]) {
    case 4:
      camstream_p2p(String(256 * header[1] + header[2]), data)
      break;
    case 1:
      pingp2p(data);
      break;
    default:
      break;
  }
}

function p2p_error() {
  console.log('p2p_error');
}

function p2p_close() {
  console.log('p2p_close');
}

//------------------------------------



//-------------WS---------------------

function pingws(data) {
  STORE.system.ws.activity = Date.now();

  const id = bynaryToString(data.slice(3))
  if (STORE.uuid === id) {
    if (STORE.system.ws.socket && STORE.system.ws.socket.readyState === 1) {
      STORE.system.ws.socket.send(stringToBinary(String.fromCharCode(2) + String.fromCharCode(0) + String.fromCharCode(0) + STORE.uuid));
    }
  }
}

function ws_open() {
  STORE.system.ws.socket.send(stringToBinary(String.fromCharCode(0) + STORE.uuid));
  channel_ws_start();
}

function ws_close(e) {
  if (e.wasClean) {
    console.log('Соединение закрыто чисто');
  } else {
    console.log('Обрыв соединения');
  }
  console.log('Код: ' + event.code + ' причина: ' + event.reason);
}

function ws_message(e) {
  const header = new Uint8Array(e.data.slice(0, 3));
  switch (header[0]) {
    case 4:
      camstream_ws(String(256 * header[1] + header[2]), e.data)
      break;
    case 1:
      pingws(e.data);
      break;
    default:
      break;
  }
}

function ws_error(e) {
  console.log(e.message);
}

//------------------------------------

function systemCheck() {
  const cams = Object.keys(STORE.cams);

  let lost = false;

  cams.forEach(key => {
    if (STORE.cams[key] !== undefined && STORE.cams[key].status.sub === false) {
      const interval = Date.now() - STORE.cams[key].activity;
      if (interval >= SUB_TIMEOUT) {
        lost = true;
      }
    }
  });

  if (lost) {
    unlinkchannelAll()
    cams.forEach(key => {
      if (STORE.cams[key] !== undefined) {
        sub_cam_close({ camid: key });
      }
    })
  }

  if (cams.length !== 0) {
    if (STORE.system.ws.network !== null) {
        const interval = Date.now() - STORE.system.ws.activity;
        if (interval >= WS_TIMEOUT) {
          unlinkchannelAll();
          cams.forEach(key => {
            if (STORE.cams[key].config && STORE.cams[key].config.transport === 'ws') {
              sub_cam_close({ camid: key });
            }
          })
        }
    }
    if (STORE.system.p2p.network !== null) {
      const interval = Date.now() - STORE.system.p2p.activity;
      if (interval >= P2P_TIMEOUT) {
        unlinkchannelAll();
        cams.forEach(key => {
          if (STORE.cams[key].config && STORE.cams[key].config.transport === 'p2p') {
            sub_cam_close({ camid: key });
          }
        })
      }
    }
  }
}


export class FWebSocket {
  constructor(config, type) {

    this.readyState = 1;
    this.index = -2;
    this.seq = '0';
    this.type = type;
    this.data = [];

    this.uuid = config.uuid;
    this.camid = config.id;


    subtransferdata();
    subcam(type, this.uuid, config, this);

    setTimeout(() => this.onopen(), 250);
  }

  rawdata(data) {
    this.data = data;
    if (this.index === 0) {
      if (this.data[this.index] !== undefined) {
        this.onmessage({ data: `WSP/1.1 200 OK\r\nseq: ${this.seq}\r\n\r\n${this.data[this.index]}` });
      }
    }
  }

  send(data) {
    this.index = this.index + 1;

    const reg = /seq: (.*)/gi
    this.seq = reg.exec(data)[1];

    if (this.type === 'control') {
      if (this.index === -1) {
        this.onmessage({ data: 'WSP/1.1 200 OK\r\nseq: 1\r\nchannel: intrahouse 1675496904\r\n\r\n' });
      } else {
        if (this.data && this.data[this.index] !== undefined) {
          this.onmessage({ data: `WSP/1.1 200 OK\r\nseq: ${this.seq}\r\n\r\n${this.data[this.index]}` });
          if (this.index === 3) {
            STORE.rtc[this.uuid].status = true;
          }
        }
      }
    } else {
      this.onmessage({ data: 'WSP/1.1 200 OK\r\nseq: 2\r\n\r\n' });
    }
  }

  close() {
    this.readyState = 0;
    if (this.type === 'control') {
      unsubcam(this.camid, this.uuid);
    }
  }
}

export function subnotifications(uuid, func) {
  STORE.notifications[uuid] = func;
}

export function unsubnotifications(uuid) {
  delete STORE.notifications[uuid];
}