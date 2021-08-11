import core from 'core';

const ONE_DAY = 1000 * 60 * 60 * 24;
const BUFFERING_PERCENTAGE = 35;
const BUFFER_RESIDUE = 1000 * 60 * 60 * 2 * 1;


function getDayStart(n) {
  const date = new Date(n);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

function getDayEnd(n) {
  const date = new Date(n);
  date.setHours(23, 59, 59, 999);
  return date.getTime();
}

function getDay(n) {
  const date = new Date(n);
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  return Math.floor(diff / ONE_DAY);
}

export function getDayId(n) {
  const date = new Date(n);
  const y = date.getFullYear();
  const start = new Date(y, 0, 0);
  const diff = date - start;
  const d = Math.floor(diff / ONE_DAY);
  return `${y}-${d}`;
}

export function render(context, chart) {
  if (context) {
    const { s, e } = getInterval(context, chart);
    const params = getParams(s, e);
    if (context.init) {
      context.init = false;
      setRender(context, params);
      showData(context, chart);
// ----      showPanelSelect(context, params, true); // ***
    } else {
      if ((context.render.s + BUFFER_RESIDUE) < s && (context.render.e - BUFFER_RESIDUE) > e) {
// ----        showPanelSelect(context, params, false); // ***
      } else {
        setRender(context, params);
        showData(context, chart);
// ----        showPanelSelect(context, params, true); // ***
      }
    }
  }
}

function getInterval(context, chart) {
  if (chart.start && chart.end) {
    return {
      s: chart.start.getTime(),
      e: chart.end.getTime(),
    };
  }
  return {
    s: context.render.defs,
    e: context.render.defe,
  };
}

function showData(context, chart) {
  const { renderList, workerList } = getTask(context);

  worker(context, workerList);
  renderData(context, renderList);
}

function worker(context, list) {
  if (list.length) {
    if (context.worker.enabled) {
      context.worker.list = list;
    } else {
      context.worker.enabled = true;
      context.worker.list = list.slice(1);
      context.spiner.style.display = 'flex';
      loadingItem(context, list[0]);
    }
  }
}

function nextWorker(context) {
  if (context.worker.list.length) {
    const item = context.worker.list[0];
    context.worker.list = context.worker.list.slice(1);
    loadingItem(context, item);
  } else {
    context.spiner.style.display = 'none';
    context.worker.enabled = false;
  }
}

function endWorker(context, item, res) {
  if (res) {
    if (res.length) {
      context.buffer.raw[item.id].data = res;
      context.buffer.raw[item.id].status = 'finish';
      context.buffer.raw[item.id].ready = true;
      renderDataOne(context, item);
    } else {
      context.buffer.raw[item.id].data = res;
      context.buffer.raw[item.id].status = 'finish';
      context.buffer.raw[item.id].ready = true;
    }
// ----    showPanelLoading(false, context, item.d); // ***
  } else {
    context.buffer.raw[item.id].status = 'error';
    context.buffer.raw[item.id].ready = false;
// ----    showPanelLoading(true, context, item.d); // ***
  }
  nextWorker(context);
}

function loadingItem(context, item) {
  context.buffer.raw[item.id] = { ...item, data: [], status: 'loading' };
  requestWS(context, item)
  .then(res => res.set)
  // .then(d => d.map(i => ({ ...i, className: i.className || `color_${context.params.id}_${i.group}` })))
  .then(data => endWorker(context, item, data))
  .catch(e => endWorker(context, item, false));
}

function requestWS(context, item) {
  if (context.params.mode === 'user') {
    const fetch = window.__ihp2p ? window.__ihp2p.fetch : window.fetch;

    return fetch(`/timeline?id=${context.params.id}&start=${item.s}&end=${item.e}&dn_prop=${context.params.dn}`, { headers: { token: core.cache.token } })
      .then(res => res.json())
      .then(json => {
        json.data.forEach(i => {
          i.group = `${i.dn}.${i.prop}`;
        });
        return { set: json.data };
      });
  } else {
    return Promise.resolve({ set: [{ start: item.s, end: item.e, group: 'temp1.value', prop: 'value', value: 1 }] })
  }
}

function requestHTTP(context, item) {
  const alias = Object.keys(context.params.alias).map(i => `${i}:${context.params.alias[i]}`).join(',');
  return fetch(`/timeline?uuid=0&dn=${context.params.dn}&start=${item.s}&end=${item.e}&alias=${alias}`)
  .then(res => res.json())
  .then(json => {
    return { set: json };
  });
}

function generateData(context, list) {
  let temp = [];
  list.forEach(i => {
    temp = temp.concat(context.buffer.raw[i.id].data);
  });
  return temp;
}

function renderData(context, list) {
  if (list.length) {
    const temp = generateData(context, list);
    if (temp.length) {
      context.chart.setData({
        items: temp
      })
    }
  }
}

export function renderRealTime(context) {
  const list = getRenderList(context);
  renderData(context, list);
}

function renderDataOne(context, item) {
  if (item.triger === context.render.triger) {
    const list = getRenderList(context);
    renderData(context, list);
  } else {
    if (context.render.views <= item.s) {
      const list = getRenderList(context);
      renderData(context, list);
    }
  }
}

function workerStatus(context, id) {
  if (context.buffer.raw[id] && context.buffer.raw[id].ready) {
    return 'ready';
  }

  if (context.buffer.raw[id] && context.buffer.raw[id].status) {
    return context.buffer.raw[id].status;
  }

  return null;
}

function getSlave(type, r, l) {
  if (type === 'right') {
    return [].concat(l, r.reverse());
  }
  return [].concat(r.reverse(), l);
}

function getTask(context) {
  const renderList = [];
  const workerList = [];
  const wmaster = [];
  const wright = [];
  const wleft = [];
  const triger = context.render.triger;

  let i = context.render.s;
  for (i; i < context.render.e; i = i + ONE_DAY) {
    const d = getDay(i);
    const id = getDayId(i);
    const end = getDayEnd(i);
    const status = workerStatus(context, id);
    const ready = status === 'ready';

    if (ready) {
      renderList.push({ id, d, s: i, e: end, ready, triger });
    } else {
      if (status !== 'loading') {
        if (context.render.views <= i && context.render.viewe >= i) {
          wmaster.push({ id, d, s: i, e: end, ready, triger });
        } else {
          if (Math.sign(context.render.views - i) !== -1) {
            wright.push({ id, d, s: i, e: end, ready, triger });
          } else {
            wleft.push({ id, d, s: i, e: end, ready, triger });
          }
        }
      }
    }
  }
  return {
    renderList,
    workerList: workerList.concat(wmaster, getSlave(context.render.direction, wright, wleft)),
  };
}

function getRenderList(context) {
  const renderList = [];

  let i = context.render.s;
  for (i; i < context.render.e; i = i + ONE_DAY) {
    const id = getDayId(i);
    const status = workerStatus(context, id);
    const ready = status === 'ready';

    if (ready) {
      renderList.push({ id });
    }
  }
  return renderList;
}

function getParams(start, end) {
  const s = getDayStart(start);
  const e = getDayEnd(end);
  const i = Math.floor((e - s) / ONE_DAY);
  const b = Math.floor((i / 100) * BUFFERING_PERCENTAGE) || 1;
  return { s, e, i, b };
}

function setRender(context, { s, e, b }) {
  if (context.render.views !== null) {
    context.render.direction = Math.sign(context.render.views - s) === -1 ? 'right' : 'left';
  }

  const buffer = b * ONE_DAY;
  context.render.s = s - buffer;
  context.render.e = e + buffer;
  context.render.views = s;
  context.render.viewe = e;
  context.render.triger = context.render.triger + 1;
}

function showPanelLoading(err, context, d) {
  if (err) {
    context.panel[d].style.borderBottom = '15px solid black';
  } else {
    context.panel[d].style.borderBottom = '15px solid #FFEB3B';
  }
}

function getColor(status, def) {
  switch (status) {
    case 'ready':
      return '15px solid #FFEB3B';
    case null:
      return '15px solid #F44336';
    case 'error':
      return '15px solid black';
    default:
      return def;
  }
}

function showPanelSelect(context, { s, e, b }, buffer) {
  let star = s;
  let end = e;

  let starbuf = 0;
  let endbbuf = 0;

  if (buffer) {
    starbuf = s - (b * ONE_DAY);
    endbbuf = e + (b * ONE_DAY);
  } else {
    starbuf = context.render.s;
    endbbuf = context.render.e;
  }

  Object.keys(context.panel)
    .forEach(n => {
      context.panel[n].style.borderTop = '15px solid #9E9E9E';
      // context.panel[n].style.borderBottom = '15px solid #9E9E9E';
    });

    for (starbuf; starbuf < endbbuf; starbuf = starbuf + ONE_DAY) {
      const d = getDay(starbuf);
      const id = getDayId(starbuf);
      const status = workerStatus(context, id);
      context.panel[d].style.borderTop = '15px solid #8E24AA';
      context.panel[d].style.borderBottom = getColor(status, context.panel[d].style.borderBottom);
    }

    for (star; star < end; star = star + ONE_DAY) {
      const d = getDay(star);
      const id = getDayId(star);
      const status = workerStatus(context, id);
      context.panel[d].style.borderTop = '15px solid #03A9F4';
      context.panel[d].style.borderBottom = getColor(status, context.panel[d].style.borderBottom);
    }
}

function createPanel(panel) {
  const temp = {}
  const arr = Array(366).fill(0);
  const w = panel.offsetWidth / 366;

  arr.forEach((_, i) => {
    const x = i + 1;
    const div = document.createElement('div');
    div.style.width = `${w}px`;
    div.style.height = '0px';
    div.style.flexShrink = 0;
    temp[x] = div;
    panel.appendChild(temp[x]);
  });
  return temp;
}

export function createContext(chart, visdata, vislegend, spiner, fetch, def, params, panel) {
  return {
    init: true,
    chart,
    visdata,
    vislegend,
    spiner,
    fetch,
    params,
    render: {
      s: null,
      e: null,
      views: null,
      viewe: null,
      defs: def.start,
      defe: def.end,
      triger: 0,
      direction: 'left',
    },
    panel: null, // createPanel(panel),
    worker: {
      enabled: false,
      list: [],
    },
    buffer: {
      raw: {},
      preview: {},
    },
  };
}

export function getZoomInterval(type) {
  const end = Date.now();
  switch (type) {
    case 'minute':
      return { start: end - (1000 * 60), end };
    case 'hour':
      return { start: end - (1000 * 60 * 60), end };
    case 'day':
      return { start: end - (1000 * 60 * 60 * 24), end };
    case 'week':
      return { start: end - (1000 * 60 * 60 * 24 * 7), end };
    case 'mount':
      return { start: end - (1000 * 60 * 60 * 24 * 31), end };
    default:
      return { start: end - (1000 * 60), end };
  }
}