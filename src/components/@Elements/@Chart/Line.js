import React, { PureComponent } from 'react';
import core from 'core';

import Dygraph from 'dygraphs';

import Fab from '@material-ui/core/Fab';

import { KeyboardDatePicker } from '@material-ui/pickers';

import IconBefore from '@material-ui/icons/ArrowBackIos';
import IconNext from '@material-ui/icons/ArrowForwardIos';

import SyncIcon from '@material-ui/icons/Sync';
import EventIcon from '@material-ui/icons/Event';
import UpdateIcon from '@material-ui/icons/Update';


import Intl from 'intl';


import 'dygraphs/dist/dygraph.min.css';

import { mousedown, mousewheel } from './interaction';

import {
  getDayId,
  getZoomInterval,
  getZoomIntervalPlotter,
  render,
  createContext,
  renderRealTime,
  darkenColor,
  discrete,
  getBarFormatDate,
} from './utils';

require('intl/locale-data/jsonp/en');
require('intl/locale-data/jsonp/ru');

const DateTimeFormat = global.Intl ? global.Intl.DateTimeFormat : Intl.DateTimeFormat;

const MIN_DATE = new Date(1451606400 * 1000);
const MAX_DATE = new Date(2524694399 * 1000);

const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;


const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
  },
  container: {
    display: 'flex',
    position: 'absolute',
    width: '100%',
    flexShrink: 0,
  },
  spiner: {
    display: 'none',
    position: 'absolute',
    width: 52,
    height: 18,
    backgroundColor: 'rgba(247,252,255,.65)',
    fontSize: 10,
    top: 4,
    right: 5,
    border: '1px solid #b3b3b3',
    boxShadow: '2px 2px 10px rgba(154,154,154,.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panel: {
    display: 'none',
    position: 'absolute',
    width: '100%',
    height: 30,
    backgroundColor: '#9E9E9E',
    flexShrink: 0,
  },
  legend: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flexShrink: 0,
    minHeight: 40,
    zIndex: 1,
  },
  buttonSync: {
    position: 'absolute',
    bottom: 4,
    left: 6,
    color: '#fff',
  },
  buttonHome: {
    position: 'absolute',
    bottom: 4,
    right: 6,
    color: '#fff',
  },
  buttonNavNext: {
    position: 'absolute',
    bottom: 4,
    left: 'calc(50% + 30px)',
    color: '#fff',
  },
  buttonNavBefore: {
    position: 'absolute',
    bottom: 4,
    left: 'calc(50% - 70px)',
    color: '#fff',
  },
  buttonDate: {
    position: 'absolute',
    bottom: 4,
    left: 'calc(50% - 20px)',
    color: '#fff',
  },
  buttonsDiscrete: {
    position: 'absolute',
    bottom: 4,
    left: 56,
    color: '#fff',
  },
  datePicker: {
    display: 'none',
  },
  speeddial: {
    position: 'absolute',
    bottom: 4,
    left: 40,
    height: 40,
    width: 40,
  },
  toolbar: {
    height: 44,
  },
};

const demo = {
  data_type: 'trend',
  chart_type: 'line',
  leftaxis_title: '°C',
  leftaxis_min: 0,
  leftaxis_max: 100,
  rightaxis_title: '°F',
  rightaxis_min: 0,
  rightaxis_max: 270,
  rightaxis: true,
  lines: [
    {
      type: 0,
      name: 'Demo temp1',
      legend: 'Demo temp1 - Left',
      linecolor: 'rgba(74,144,226,1)',
      dn_prop: '',
      raxis: false
    },
    {
      type: 0,
      name: 'Demo temp2',
      legend: 'Demo temp2 - Right',
      linecolor: 'rgba(255,152,0,1)',
      dn_prop: '',
      raxis: true
    }
  ]
}


function getHeight(h, item) {
  if (!item.buttonSync.value && !item.buttonHome.value && !item.buttonDate.value && !item.buttonDiscrete.value && !item.buttonNavigate.value) {
    return h;
  }
  return h - 44;
}

function getColor(color) {
  if (!color && color === '') {
    return 'rgba(0,0,0,1)';
  }
  return color;
}


class Chart extends PureComponent {

  state = { enabledsd: null, speeddial: false, realtime: true, calendar: false }

  componentDidMount() {
    core.transfer.sub('realtime_charts', this.realtimeCharts);
    const options = {
      underlayCallback: this.handleChanged,
      interactionModel: {
        ...Dygraph.defaultInteractionModel,
        dblclick: this.dblclick,
        mousedown: this.mousedown,
        mousewheel: this.mousewheel,
      },
      connectSeparatedPoints: true,
      gridLineColor: 'transparent',
      legend: 'always',
      // labelsDiv: this.legend,
      width: '100%',
      height: '100%',
    };
    this.chart = new Dygraph(this.link, [[new Date(), null]], options);
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.network !== this.props.network && nextProps.network) {
      this.getData(nextProps);
    }

    if (nextProps.item.widgetlinks.link.id !== this.props.item.widgetlinks.link.id) {
      this.getData(nextProps);
    } else {
      if (this.props.item !== nextProps.item) {
        if (JSON.stringify(this.props.item) !== JSON.stringify(nextProps.item)) {
          this.updateOptions(nextProps);
        }
      }
      if (nextProps.item.data.triger !== undefined && nextProps.item.data.triger !== this.props.item.data.triger) {
        if (nextProps.item.data.timerange !== undefined) {
          this.props.item.data.timerange = nextProps.item.data.timerange
          this.ctx.buffer.raw = {}
          this.ctx.init = true;
        }
        this.setState({ realtime: nextProps.item.data.forceRealtime });
        this.ctx.chart.updateOptions({ dateWindow: nextProps.item.data.range });
      }
    }
    if (
      this.props.item.h.value !== nextProps.item.h.value ||
      this.props.item.w.value !== nextProps.item.w.value
    ) {
      this.ctx.chart.resize();
    }
  }

  componentWillUnmount() {
    core.transfer.unsub('realtime_charts', this.realtimeCharts);
  }

  realtimeCharts = (data) => {
    if (this.props.item.realtime.value && data[this.props.item.widgetlinks.link.id] !== undefined) {
      this.realtime(data[this.props.item.widgetlinks.link.id])
    }
  }

  getData = (props = this.props, _discrete = false) => {
    const data = props.mode === 'user' ? props.item.data : demo;
    if (data.lines === undefined) {
      data.lines = [];
    }
    const items = data.lines
      .filter(i => i.type === 0)
      .map((i, key) => {
      return { id: key.toString(), ...i, linecolor: getColor(i.linecolor) };
    });
    const statics = data.lines.filter(i => i.type !== 0);
    const legend = data || {};
    const dn = items.map(i => i.dn_prop).join(',');
    const alias = [].reduce((l, n) => ({ ...l, [n.dn]: n.id }), {});
    const { start, end } = getZoomInterval(props.item.interval.value.id);
    this.ctx = createContext(
      this.chart,
      this.spiner,
      props.fetch,
      { start, end },
      { id: props.id, type: props.item.type, chartid: props.item.widgetlinks.link.id, dn, alias, items, legend, statics, mode: props.mode },
      this.panel,
    );
    const genlegend = this.generateLegend();
    this.setClickLegend(genlegend);
    this.ctx.litems = genlegend;
    if (_discrete) {
      this.ctx.params.legend.discrete = _discrete;
    }
    this.updateOptions(props, _discrete);
  }

  setClickLegend = (legend) => {
    Object
      .keys(legend)
      .forEach(key => {
        legend[key].parentNode.onclick = this.handleClickLegend;
      });
  }

  handleClickLegend = e => {
    e.stopPropagation();

    if (e.target.parentElement.nodeName === 'SPAN') {
      const id = e.target.parentElement.children[0].nodeName === 'DIV' ?
        e.target.parentElement.children[0].id : e.target.parentElement.children[1].id;
      const chartid = Number(id.split('_').slice(-1)[0]);

      const visibility = this.chart.getOption('visibility');
      e.target.parentElement.style.opacity = visibility[chartid] ? 0.5 : 1;
      this.chart.setVisibility(chartid, !visibility[chartid]);
    }
  }

  realtime = (data) => {
    let x = 0;
    Object.keys(data)
      .forEach(key => {
        const item = data[key];
        x = x < item.x ? item.x : x;
        const d = this.ctx.params.items
          .map(v => {
            if (v.dn_prop === key) {
              return Number(item.y);
            }
            return null;
          });
        const id = getDayId(item.x);
        if (this.ctx.buffer.raw[id] && this.ctx.buffer.raw[id].ready) {
          this.ctx.buffer.raw[id].data.push([new Date(item.x)].concat(d));
        }
      });
    if (this.state.realtime) {
      renderRealTime(this.ctx);
      this.setWindow(x, this.props.item.positionCurentTime.value);
    }
  }

  multiColumnBarPlotter = (e) => {
    if (e.seriesIndex !== 0) return;

    var g = e.dygraph;
    var ctx = e.drawingContext;
    var sets = e.allSeriesPoints;

    var y_bottom = e.dygraph.toDomYCoord(0);
    var min_sep = discrete(g, this.ctx.params.legend.discrete);

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
      fillColors.push(darkenColor(strokeColors[i]));
    }

    for (var j = 0; j < sets.length; j++) {

      ctx.fillStyle = fillColors[j];
      ctx.strokeStyle = strokeColors[j];
      for (var i = 0; i < sets[j].length; i++) {
        var p = sets[j][i];
        var center_x = p.canvasx;


        const width = bar_width/sets.length;
        const x = center_x + (j * width);

        ctx.fillRect(x, p.canvasy, width - 0, y_bottom - p.canvasy);
        ctx.strokeRect(x, p.canvasy, width - 0, y_bottom - p.canvasy);
      }
    }
  }

  getControlPoints = (p0, p1, p2, opt_alpha, opt_allowFalseExtrema) => {
    var alpha = (opt_alpha !== undefined) ? opt_alpha : this.props.item.lineSmooth.value / 100;
    var allowFalseExtrema = opt_allowFalseExtrema || false;
  
    if (!p2) {
      return [p1.x, p1.y, null, null];
    }
  
    var l1x = (1 - alpha) * p1.x + alpha * p0.x,
        l1y = (1 - alpha) * p1.y + alpha * p0.y,
        r1x = (1 - alpha) * p1.x + alpha * p2.x,
        r1y = (1 - alpha) * p1.y + alpha * p2.y;
    if (l1x != r1x) {
      var deltaY = p1.y - r1y - (p1.x - r1x) * (l1y - r1y) / (l1x - r1x);
      l1y += deltaY;
      r1y += deltaY;
    }
  
    if (!allowFalseExtrema) {
      if (l1y > p0.y && l1y > p1.y) {
        l1y = Math.max(p0.y, p1.y);
        r1y = 2 * p1.y - l1y;
      } else if (l1y < p0.y && l1y < p1.y) {
        l1y = Math.min(p0.y, p1.y);
        r1y = 2 * p1.y - l1y;
      }
  
      if (r1y > p1.y && r1y > p2.y) {
        r1y = Math.max(p1.y, p2.y);
        l1y = 2 * p1.y - r1y;
      } else if (r1y < p1.y && r1y < p2.y) {
        r1y = Math.min(p1.y, p2.y);
        l1y = 2 * p1.y - r1y;
      }
    }
    return [l1x, l1y, r1x, r1y];
  }

  isOK = (x) => {
    return !!x && !isNaN(x);
  };

  smoothPlotter = (e) => {  
    var ctx = e.drawingContext,
    points = e.points;

    ctx.beginPath();
    ctx.moveTo(points[0].canvasx, points[0].canvasy);

    var lastRightX = points[0].canvasx, lastRightY = points[0].canvasy;

    for (var i = 1; i < points.length; i++) {
      var p0 = points[i - 1],
          p1 = points[i],
          p2 = points[i + 1];
      p0 = p0 && this.isOK(p0.canvasy) ? p0 : null;
      p1 = p1 && this.isOK(p1.canvasy) ? p1 : null;
      p2 = p2 && this.isOK(p2.canvasy) ? p2 : null;
      if (p0 && p1) {
        var controls = this.getControlPoints({x: p0.canvasx, y: p0.canvasy},
                                        {x: p1.canvasx, y: p1.canvasy},
                                        p2 && {x: p2.canvasx, y: p2.canvasy},
                                        this.props.item.lineSmooth.value / 100);
        lastRightX = (lastRightX !== null) ? lastRightX : p0.canvasx;
        lastRightY = (lastRightY !== null) ? lastRightY : p0.canvasy;
        ctx.bezierCurveTo(lastRightX, lastRightY,
                          controls[0], controls[1],
                          p1.canvasx, p1.canvasy);
        lastRightX = controls[2];
        lastRightY = controls[3];
      } else if (p1) {
        ctx.moveTo(p1.canvasx, p1.canvasy);
        lastRightX = p1.canvasx;
        lastRightY = p1.canvasy;
      } else {
        lastRightX = lastRightY = null;
      }
    }

    ctx.stroke();
  }

  underlayCallback = (canvas, area, g) => {
    if (g.dateWindow_) {
      
      this.ctx.params.statics.forEach(i => {
        if (i.type === 1) {
          const left_bottom = g.toDomCoords(g.dateWindow_[0], i.staticvalue);
          const right_top = g.toDomCoords(g.dateWindow_[1], i.staticvalue);
    
          const left = left_bottom[0];
          const right = right_top[0];
          const top = left_bottom[1];
          const bottom = right_top[1];
     
          canvas.beginPath();
          canvas.strokeStyle = getColor(i.linecolor);
          canvas.moveTo(left, top);
          canvas.lineTo(right, bottom);
          canvas.stroke();
        } else {
          const left_bottom = g.toDomCoords(g.dateWindow_[0], i.statichigh);
          const right_top = g.toDomCoords(g.dateWindow_[1], i.staticlow);
    
          const left = left_bottom[0];
          const right = right_top[0];
          const top = left_bottom[1];
          const bottom = right_top[1];
          
          canvas.fillStyle = getColor(i.linecolor);
          canvas.fillRect(left, top, right - left, bottom - top);
        }
      });
    
    }

  }

  updateOptions = (props = this.props, windowfreeze = false) => {
    this.ctx.init = true;
    const { legend, items } = this.ctx.params;
    const { start, end } = getZoomInterval(props.item.interval.value.id);
    
    const lineType = props.item.lineType !== undefined ? props.item.lineType.value.id : 'line';
    const lineColor = props.item.lineColor !== undefined ? props.item.lineColor.value : 'rgba(74,144,226,1)';
    const axisPosision = props.item.axisPosision !== undefined ? props.item.axisPosision.value.id : 'left';
    const axisWidth = props.item.axisWidth !== undefined ? props.item.axisWidth.value : 50;
    const axisMin = props.item.axisMin !== undefined ? props.item.axisMin.value : 0;
    const axisMax = props.item.axisMax !== undefined ? props.item.axisMax.value : 100;

    legend.chart_type = lineType;

    this.ctx.chart.updateOptions({
      file: [[new Date()].concat(items.map(() => null))],
      visibility: items.map(() => true),
      dateWindow: windowfreeze ? [this.ctx.chart.dateWindow_[0], this.ctx.chart.dateWindow_[1]] : [start, end],

      stepPlot: legend.chart_type === 'step' ? true : false,
      includeZero: legend.chart_type === 'bar' ? true : false,
      highlightCircleSize: legend.chart_type === 'bar' ? 0 : 3,
      plotter: legend.chart_type === 'bar' ? this.multiColumnBarPlotter : (props.item.lineSmooth && props.item.lineSmooth.value ? this.smoothPlotter : null),
     
      series: {
        line: { axis: axisPosision === 'right' ? 'y2' : 'y' },
      },
      axes: {
        x: {
          drawAxis: props.item.axisBottom !== undefined ? props.item.axisBottom.value : true,
          axisLabelFormatter: this.getAxisValueX,
          axisLineColor: props.item.gridColor.value,
        },
        [axisPosision === 'right' ? 'y2' : 'y']: {
          drawAxis: axisPosision === 'none' ? false : true,
          axisLabelFormatter: this.getAxisValueY,
          axisLabelWidth: axisWidth,
          axisLineColor: props.item.gridColor.value,
          valueRange: legend.chart_type === 'bar' ? null : [axisMin, axisMax],
        },
      },
      
      labels: ['x', 'line'],
      colors: [ lineColor ],
      ylabel: this.getLabel(props),
      y2label: this.getLabel(props),
      gridLineColor: props.item.gridColor.value,
      legend: 'always',
      labelsSeparateLines: true,
      hideOverlayOnMouseOut: false,
      legendFormatter: this.setLegend,
      drawPoints: props.item.points.value,
      fillGraph: props.item.fillGraph !== undefined ? props.item.fillGraph.value : false,
    });
    const genlegend = this.generateLegend(props);
    this.setClickLegend(genlegend);
    this.ctx.litems = genlegend;
    if (windowfreeze === false) {
      this.setWindow(Date.now(), this.props.item.positionCurentTime.value);
    } else {
      const { start, end } = getZoomIntervalPlotter(this.ctx.chart.dateWindow_, windowfreeze);
      this.ctx.chart.updateOptions({ dateWindow: [start, end] });
    }
    requestAnimationFrame(() => this.ctx.chart.resize());
    this.setState({ enabledsd: legend.chart_type === 'bar' ? true : null })
  }

  mousewheel = (e, g, c) => {
    mousewheel(e, g, c);
  }

  mousedown = (e, g, c) => {
    if (this.state.realtime) {
      this.setState({ realtime: false });
    }
    mousedown(e, g, c);
    c.is2DPan = false;
  }

  dblclick = (e, g, c) => {
    const { start, end } = getZoomInterval(this.props.item.interval.value.id);
    const a = (end - start) / 2;
    const b = (this.ctx.render.e - this.ctx.render.s) / 2;
    const x = this.ctx.render.s + b;
    const ns = x - a;
    const ne = x + a;
    g.updateOptions({ dateWindow: [ns, ne] });
  }

  setWindow = (n, p) => {
    const [s, e] = this.ctx.chart.dateWindow_;
    const i = e - s;
    const d = (i / 100) * p;
    const ns = n - d;
    const ne = n + i - d;
    this.ctx.chart.updateOptions({ dateWindow: [ns, ne] });
  }

  handleChanged = (_, __, chart) => {
    this.underlayCallback(_, __, chart);
    render(this.ctx, chart, this.props.item.data.timerange);
  }

  linked = (e) => {
    this.link = e;
  }

  linkedSpiner = (e) => {
    this.spiner = e;
  }

  linkedPanel = (e) => {
    this.panel = e;
  }

  linkedLegend = (e) => {
    this.legend = e;
  }

  linkedDatePicker = (e) => {
    this.linkDatePicker = e;
  }

  getLabel = (props = this.props) => {
    const item = props.item;
    if (item.axisLabel !== undefined && item.axisLabel.value) {
      return `<span
      style="font-size:14px;color:${item.textColor.value}">
      ${item.axisLabel.value
      }</span>`;
    }
    return `<span style="font-size:14px;color:${item.textColor.value}"></span>`;
  }

  getLabelRight = (props = this.props) => {
    const item = props.item;
    if (item.axisRightLabel !== undefined && item.axisRightLabel.value) {
      return `<span
      style="font-size:14px;color:${item.textColor.value}">
      ${this.ctx.params.legend.rightaxis_title
      }</span>`;
    }
    return `<span style="font-size:14px;color:${item.textColor.value}"></span>`;
  }

  getAxisValueY = (v) => {
    const item = this.props.item;
    if (Number.isInteger(v)) {
      return `<span style="color:${item.textColor.value}">${v}</span>`;
    }
    return `<span style="color:${item.textColor.value}">${parseFloat(v).toFixed(2)}</span>`;
  }

  getAxisValueX = (a, b, c, d) => {
    if (this.ctx.params.legend.chart_type === 'bar') {
      const item = this.props.item;
      const v = getBarFormatDate(a, b, c, d, this.ctx.params.legend.discrete);
      return `<span style="white-space:nowrap;color:${item.textColor.value}">${v}</span>`;
    }
    const item = this.props.item;
    const v = Dygraph.dateAxisLabelFormatter(a, b, c, d);
    return `<span style="color:${item.textColor.value}">${v}</span>`;
  }

  setLegend = (data) => {
    if (data.x) {
      const x = new Date(data.x);
      if (this.ctx.params.legend.chart_type === 'bar') {
        this.ctx.litems[`l_${this.props.id}_t`].innerHTML = `${x.toLocaleDateString()}`;
      } else {
        this.ctx.litems[`l_${this.props.id}_t`].innerHTML = `${x.toLocaleDateString()} ${x.toLocaleTimeString()}`;
      }
    }
    data.series.forEach((i, k) => {
      const id = `l_${this.props.id}_${k}`;
      if (this.ctx.litems && this.ctx.litems.hasOwnProperty(id)) {
        if (typeof i.y === 'number') {
          this.ctx.litems[id].innerHTML = i.y;
        } else {
          this.ctx.litems[id].innerHTML = '&nbsp;';
        }
      }
    });
    return '';
  }

  handleDate = () => {
    this.setState({ calendar: true })
  }

  handleHome = () => {
    this.setState({ realtime: true });
    renderRealTime(this.ctx);
    this.setWindow(Date.now(), this.props.item.positionCurentTime.value);
  }

  handleChandeDate = (v) => {
    const date = new Date(v.unix() * 1000);
    date.setHours(0, 0, 0, 0);

    this.setState({ realtime: false, calendar: false });
    this.setWindow(date.getTime(), 0);
  }

  handleSync = () => {
    core.transfer.send('command_layout', { 
      command: 'synccharts',
      range: this.ctx.chart.dateWindow_,
      realtime: this.state.realtime,
      layoutId: this.props.layoutId, 
      containerId: this.props.containerId, 
    })
  };

  handleChangeDiscrete = (v) => {
    this.setState({ speeddial: false });
    this.getData(this.props, v);
  }

  handleSpeeddial = (v) => {
    if (this.state.speeddial !== v.isOpen) {
      this.setState({ speeddial: v.isOpen });
    }
  }

  handleNavBefore = () => {
    const [s, e] = this.ctx.chart.dateWindow_;
    const i = e - s;
    const ns = s - i;
    const ne = e - i;
    this.ctx.chart.updateOptions({ dateWindow: [ns, ne] });
  }

  handleNavNext = () => {
    const [s, e] = this.ctx.chart.dateWindow_;
    const i = e - s;
    const ns = e;
    const ne = e + i;
    this.ctx.chart.updateOptions({ dateWindow: [ns, ne] });
  }

  generateLegend = (props = this.props) => {
    const color = props.item.textColor.value;

    const legendLabel = props.item.legendLabel !== undefined ? props.item.legendLabel.value : 'Demo temp1';
    const lineColor = props.item.lineColor !== undefined ? props.item.lineColor.value : 'rgba(74,144,226,1)';
    const axisPosision = props.item.axisPosision !== undefined ? props.item.axisPosision.value.id : 'left';

    const st = `text-align:center;color:${color};width:150px;font-size:14px;display:flex;align-items:center;justify-content:center;`;
    const s0 = `display:flex;flex-direction:row;flex-shrink:0;height: 100%;`;
    const sl = 'font-size:14px;display:flex;width:100%;padding-left:5px;padding-right:10px;height:100%';
    const sr = 'font-size:14px;display:flex;width:100%;padding-right:5;padding-left:10px;height:100%;align-items:left;';
    const bl = 'flex-direction:row;display:flex;width:100%;height:100%;justify-content:end;flex-wrap: wrap;text-align:right;';
    const br = 'flex-direction:row;display:flex;width:100%;height:100%;justify-content:end;flex-wrap: wrap;';
    const temp = [{ id: `l_${props.id}_line`, linecolor: lineColor, raxis: axisPosision === 'right' }]

    const lt = temp
      .filter(v => !v.raxis)
      .map(i => `<span style="cursor:pointer;display:flex;margin-left:5px;margin-top:2px;"><span style="color:${i.linecolor}">${legendLabel}</span><div id="${i.id}" style="text-align:left;margin-left:8px;margin-right:10px;width:50px;height: 20px;font-weight:bold;color:${i.linecolor}"></div></span>`)
      .join('');
    const rt = temp
      .filter(v => v.raxis)
      .map(i => `<span style="cursor:pointer;display:flex;margin-right:5px;margin-top:2px;"><span style="color:${i.linecolor}">${legendLabel}</span><div id="${i.id}" style="text-align:left;margin-right:10px;margin-left:8px;width:50px;height: 20px;font-weight:bold;color:${i.linecolor}"></div></span>`)
      .join('');
    const left = `<div style="${bl}">${lt}</div>`;
    const right = `<div style="${br}">${rt}</div>`;
    const string = `<div style="${s0}"><div style="${sl}">${left}</div><div id="l_${props.id}_t" style="${st}">&nbsp;</div><div style="${sr}">${right}</div></div>`;
    this.legend.innerHTML = string;
    this.ctx.chart.resize();
    return {
      [`l_${props.id}_t`]: document.getElementById(`l_${props.id}_t`),
      [`l_${props.id}_line`]: document.getElementById(`l_${props.id}_line`),
    };
  }

  render = ({ item, mode, h } = this.props) => {
    const height = (h - (item.borderSize.value * 2)) - item.legendHeight.value;
    const top = item.legendHeight.value;
    const buttonSize = item.buttonSize.value / 100;
    return (
      <div style={{ ...styles.root, zIndex: mode === 'user' ? 1 : -1 }}>
        <div ref={this.linkedLegend} style={{ ...styles.legend, height: top }} />
        <div ref={this.linked} style={{ ...styles.container, width: '100%', top, height: getHeight(height, item) }} />
        <div style={styles.toolbar} />
        <div ref={this.linkedSpiner} style={styles.spiner}>LOADING</div>
        <div ref={this.linkedPanel} style={styles.panel} />
        {item.buttonDiscrete.value && this.state.enabledsd ? <div style={{ ...styles.speeddial, transform: `scale(${buttonSize})` }}></div>: null}
          {item.buttonSync.value ?
            <Fab
              size="small"
              style={{ ...styles.buttonSync, transform: `scale(${buttonSize})`, backgroundColor: item.buttonsColor.value }}
              onClick={this.handleSync}
            >
              <SyncIcon />
            </Fab>
          : null}
          {item.buttonDate.value ?
            <Fab
              size="small"
              style={{ ...styles.buttonDate, transform: `scale(${buttonSize})`, backgroundColor: item.buttonsColor.value }}
              onClick={this.handleDate}
            >
              <EventIcon />
            </Fab>
          : null}
          {item.buttonNavigate.value ?
            <Fab
              size="small"
              style={{ ...styles.buttonNavBefore, transform: `scale(${buttonSize})`, backgroundColor: item.buttonsColor.value }}
              onClick={this.handleNavBefore}
            >
              <IconBefore />
            </Fab>
          : null}
          {item.buttonNavigate.value ?
            <Fab
              size="small"
              style={{ ...styles.buttonNavNext, transform: `scale(${buttonSize})`, backgroundColor: item.buttonsColor.value }}
              onClick={this.handleNavNext}
            >
              <IconNext />
            </Fab>
          : null}
          {item.buttonHome.value ?
            <Fab
              size="small"
              style={{ ...styles.buttonHome, transform: `scale(${buttonSize})`, backgroundColor: item.buttonsColor.value }}
              onClick={this.handleHome}
            >
              <UpdateIcon />
            </Fab>
          : null}
          <KeyboardDatePicker
            open={this.state.calendar}
            margin="normal"
            label=""
            minDate={MIN_DATE}
            maxDate={MAX_DATE}
            format="MM/dd/yyyy"
            style={styles.datePicker}
            onChange={this.handleChandeDate}
          />
      </div>
    );
  }
}

export default Chart;