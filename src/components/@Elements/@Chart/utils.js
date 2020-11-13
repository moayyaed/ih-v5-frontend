/* eslint-disable no-underscore-dangle  */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */

import core from 'core';

import shortid from 'shortid';
import Dygraph from 'dygraphs';

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

export function render(context, chart, timerange) {
  if (context) {
    let params = null;
    const { s, e } = getInterval(context, chart);
    if (timerange !== undefined) {
      params = getParams(timerange[0], timerange[1]);
    } else {
      params = getParams(s, e);
    }

    if (context.init) {
      context.init = false;
      setRender(context, params);
      showData(context, chart, timerange);
      // -- showPanelSelect(context, params, true);
    } else {
      if ((context.render.s + BUFFER_RESIDUE) < s && (context.render.e - BUFFER_RESIDUE) > e) {
        // -- showPanelSelect(context, params, false);
      } else {
        if (timerange === undefined) {
          setRender(context, params);
          showData(context, chart);
          // -- showPanelSelect(context, params, true);
        }
      }
    }
  }
}

function getInterval(context, chart) {
  if (chart.dateWindow_) {
    return {
      s: chart.dateWindow_[0],
      e: chart.dateWindow_[1],
    };
  }
  return {
    s: context.render.defs,
    e: context.render.defe,
  };
}

function showData(context, chart, timerange) {
  let virtualWorkerList = false;
  const { renderList, workerList } = getTask(context);

  if (timerange !== undefined && workerList[0] !== undefined) {
    virtualWorkerList = [{ ...workerList[0], s: timerange[0], e: timerange[1]}];
  }

  worker(context, virtualWorkerList || workerList);
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
    if (context.worker.list.length >= 2) {
      const item1 = context.worker.list[0];
      const item2 = context.worker.list[1];
      context.worker.list = context.worker.list.slice(2);
      loadingItem(context, item1);
      loadingItem(context, item2);
    } else {
      const item = context.worker.list[0];
      context.worker.list = context.worker.list.slice(1);
      loadingItem(context, item);
    }
  } else {
    if (context.worker.req === 0) {
      context.spiner.style.display = 'none';
      context.worker.enabled = false;
    }
  }
}

function endWorker(context, item, res) {
  if (res) {
    if (res.length) {
      if (context.buffer.raw[item.id] != undefined) {
        context.buffer.raw[item.id].data = res;
        context.buffer.raw[item.id].status = 'finish';
        context.buffer.raw[item.id].ready = true;
        renderDataOne(context, item);
      }
    } else {
      if (context.buffer.raw[item.id] != undefined) {
        context.buffer.raw[item.id].data = res;
        context.buffer.raw[item.id].status = 'finish';
        context.buffer.raw[item.id].ready = true;
      }
    }
    // -- showPanelLoading(false, context, item.d);
  } else {
    if (context.buffer.raw[item.id] != undefined) {
      context.buffer.raw[item.id].status = 'error';
      context.buffer.raw[item.id].ready = false;
    }
    // -- showPanelLoading(true, context, item.d);
  }
  nextWorker(context);
}

function loadingItem(context, item) {
  context.buffer.raw[item.id] = { ...item, data: [], status: 'loading' };
  requestHTTP(context, item)
  .then(res => res.set.map(i => {
    i[0] = new Date(i[0]);
    return i;
  }))
  .then(data => endWorker(context, item, data))
  .catch(e => endWorker(context, item, false));
}


function getTypeChart(type) {
  if (type && type === 'bar') {
    return 'analytics';
  }
  return 'trend'
}

function requestHTTP(context, item) {
  // uuid=${shortid.generate()}&
  context.worker.req = context.worker.req + 1;
  const alias = Object.keys(context.params.alias).map(i => `${i}:${context.params.alias[i]}`).join(',');
  const url = `/${getTypeChart(context.params.legend.chart_type)}?id=${context.params.chartid}&dn_prop=${context.params.dn}&start=${item.s}&end=${item.e}&alias=${alias}&discrete=${context.params.legend.discrete}`;
  if (window.ihp2p) {
    return window.ihp2p.http(url)
    .then(res => JSON.parse(res))
    .then(json => {
      context.worker.req = context.worker.req - 1;
      return { set: json.data };
    });;
  }

  if (context.params.mode === 'user') {
    return fetch(url, { headers: { token: core.cache.token } })
    .then(res => res.json())
    .then(json => {
      context.worker.req = context.worker.req - 1;
      return { set: json.data };
    });
  } else {
    context.worker.req = context.worker.req - 1;
    return Promise.resolve({ set: [[item.s + 1000 * 60 * 60 * 6, 20, 68], [item.e - 1000 * 60 * 60 * 6, 80, 176]] })
  }
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
      context.chart.updateOptions({ file: temp });
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

export function createContext(chart, spiner, fetch, def, params, panel) {
  return {
    init: true,
    chart,
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
    panel: null && createPanel(panel),
    worker: {
      req: 0,
      enabled: false,
      list: [],
    },
    buffer: {
      raw: {},
      preview: {},
    },
  };
}

export function getZoomIntervalPlotter([s, e], type) {
  const midle = s + ((e - s) / 2);
  switch (type) {
    case 'hour':
      return { start: midle - 43200000, end: midle + 43200000 };
    case 'day':
      return { start: midle - 1339200000, end: midle + 1339200000 };
    case 'month':
      return { start: midle - 15552000000, end: midle + 15552000000 };
    default:
      return { start: s, end: e };
  }
}

export function getZoomInterval(type) {
  const end = Date.now();
  switch (type) {
    case '1970':
      return { start: 0, end: 3600000 };
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

function darkenColor2(colorStr) {
  var color = Dygraph.toRGB_(colorStr);
  color.r = Math.floor((255 + color.r) / 2);
  color.g = Math.floor((255 + color.g) / 2);
  color.b = Math.floor((255 + color.b) / 2);
  return colorStr;
}

export function plotter(e) {
  if (e.seriesIndex !== 0) return;
  var g = e.dygraph;
  var ctx = e.drawingContext;
  var sets = e.allSeriesPoints;
  var y_bottom = e.dygraph.toDomYCoord(0);

  var min_sep = Infinity;
  for (var j = 0; j < sets.length; j++) {
    var points = sets[j];
    for (var i = 1; i < points.length; i++) {
      var sep = points[i].canvasx - points[i - 1].canvasx;
      if (sep < min_sep) min_sep = sep;
    }
  }
  var bar_width = Math.floor(2.0 / 3 * min_sep);

  var fillColors = [];
  var strokeColors = g.getColors();
  for (var i = 0; i < strokeColors.length; i++) {
    fillColors.push(darkenColor2(strokeColors[i]));
  }

  var last = [];

  for (var j = 0; j < sets.length; j++) {
    ctx.fillStyle = fillColors[j];
    ctx.strokeStyle = strokeColors[j];
    for (var i = 0; i < sets[j].length; i++) {
      var p = sets[j][i];
      var center_x = p.canvasx;
        if (!last[i]) {
          last[i] = center_x;
        }

        ctx.fillRect(last[i], p.canvasy, bar_width/sets.length, y_bottom - p.canvasy);
        ctx.strokeRect(last[i], p.canvasy, bar_width/sets.length, y_bottom - p.canvasy);
        last[i] = last[i] + (bar_width/sets.length) + 5;
    }
  }
}

export function darkenColor(colorStr) {
  var color = Dygraph.toRGB_(colorStr);
  color.r = Math.floor((255 + color.r) / 2);
  color.g = Math.floor((255 + color.g) / 2);
  color.b = Math.floor((255 + color.b) / 2);
  return 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
}

export function discrete(g, discrete) {
  switch (discrete) {
    case 'month':
      return g.dateWindow_ ? g.plotter_.area.w / ((g.dateWindow_[1] - g.dateWindow_[0]) / 1000 / 60 / 60 / 24 / 31) : Infinity;
    case 'day':
      return g.dateWindow_ ? g.plotter_.area.w / ((g.dateWindow_[1] - g.dateWindow_[0]) / 1000 / 60 / 60 / 24) : Infinity;
    case 'hour':
      return g.dateWindow_ ? g.plotter_.area.w / ((g.dateWindow_[1] - g.dateWindow_[0]) / 1000 / 60 / 60) : Infinity;
    default:
      return g.dateWindow_ ? g.plotter_.area.w / ((g.dateWindow_[1] - g.dateWindow_[0]) / 1000 / 60 / 60 / 24) : Infinity;
  }
}

function getFormatHour(string) {
  if (string.length === 5) {
    if (string.slice(-2) === '00') {
      return string;
    }
    return '';
  }
  return string;
}

export function getBarFormatDate(a, b, c, d, type, lng) {
  switch (type) {
    case 'hour':
      return getFormatHour(Dygraph.dateAxisLabelFormatter(a, b, c, d));
    case 'day':
      return a.toLocaleString('ru-RU', { day: 'numeric', month: 'short' });
    case 'month':
      return a.toLocaleString('ru-RU', { month: 'long' });
    default:
      return Dygraph.dateAxisLabelFormatter(a, b, c, d);
  }
}