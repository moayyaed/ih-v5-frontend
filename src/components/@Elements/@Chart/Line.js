import React, { PureComponent } from 'react';
import core from 'core';

import Dygraph from 'dygraphs';

import Fab from '@material-ui/core/Fab';

import { KeyboardDatePicker } from '@material-ui/pickers';

import IconBefore from '@material-ui/icons/KeyboardArrowLeft';
import IconNext from '@material-ui/icons/KeyboardArrowRight';

import SvgIcon from '@material-ui/core/SvgIcon';
import lime from "@material-ui/core/colors/lime";

import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

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


function EndIcon(props) {
  return (
    <SvgIcon  viewBox="0 0 24 24"  {...props}>
      <path d="M2,22 L18.25,12 L2,2 z" />
      <path d="M18.25,2 L22,2 L22,22 L18.25,22 L18.25,2 z" />
    </SvgIcon>
  )
}

function SyncIcon(props) {
  return (
    <SvgIcon  viewBox="0 0 24 24"  {...props}>
      <path d="M18.231,6 L18.231,10.5 L24,10.5 L24,13.5 L18.231,13.5 L18.231,18 L13,12 L18.231,6 z" />
      <path d="M11,-0 L13,-0 L13,24 L11,24 L11,-0 z" />
      <path d="M5.769,18 L5.769,13.5 L-0,13.5 L-0,10.5 L5.769,10.5 L5.769,6 L11,12 L5.769,18 z" />
    </SvgIcon>
  )
}

function CalendarIcon(props) {
  return (
    <SvgIcon  viewBox="0 0 24 24"  {...props}>
      <path d="M10.759,0 C10.53,0 10.345,0.188 10.345,0.421 C10.345,0.654 10.53,0.842 10.759,0.842 C11.297,0.842 11.753,1.195 11.924,1.684 L12.786,1.684 C12.593,0.725 11.758,0 10.759,0 z" />
      <path d="M13.241,0 C13.013,0 12.828,0.188 12.828,0.421 C12.828,0.654 13.013,0.842 13.241,0.842 C13.78,0.842 14.235,1.195 14.407,1.684 L15.269,1.684 C15.076,0.725 14.24,0 13.241,0 z" />
      <path d="M15.724,0 C15.495,0 15.31,0.188 15.31,0.421 C15.31,0.654 15.495,0.842 15.724,0.842 C16.263,0.842 16.718,1.195 16.889,1.684 L17.751,1.684 C17.559,0.725 16.723,0 15.724,0 z" />
      <path d="M17.751,1.684 C17.779,1.82 17.793,1.961 17.793,2.105 C17.793,3.266 16.865,4.211 15.724,4.211 C15.495,4.211 15.31,4.022 15.31,3.789 C15.31,3.557 15.495,3.368 15.724,3.368 C16.409,3.368 16.966,2.802 16.966,2.105 C16.966,1.957 16.936,1.816 16.889,1.684 L15.269,1.684 C15.296,1.82 15.31,1.961 15.31,2.105 C15.31,3.266 14.382,4.211 13.241,4.211 C13.013,4.211 12.828,4.022 12.828,3.789 C12.828,3.557 13.013,3.368 13.241,3.368 C13.926,3.368 14.483,2.802 14.483,2.105 C14.483,1.957 14.453,1.816 14.407,1.684 L12.786,1.684 C12.813,1.82 12.828,1.961 12.828,2.105 C12.828,3.266 11.899,4.211 10.759,4.211 C10.53,4.211 10.345,4.022 10.345,3.789 C10.345,3.557 10.53,3.368 10.759,3.368 C11.443,3.368 12,2.802 12,2.105 C12,1.957 11.97,1.816 11.924,1.684 L10.303,1.684 C10.33,1.82 10.345,1.961 10.345,2.105 C10.345,3.266 9.417,4.211 8.276,4.211 C8.047,4.211 7.862,4.022 7.862,3.789 C7.862,3.557 8.047,3.368 8.276,3.368 C8.96,3.368 9.517,2.802 9.517,2.105 C9.517,1.957 9.487,1.816 9.441,1.684 L7.448,1.684 L7.111,1.684 C7.282,1.195 7.737,0.842 8.276,0.842 C8.815,0.842 9.27,1.195 9.441,1.684 L10.303,1.684 C10.111,0.725 9.275,0 8.276,0 C7.277,0 6.441,0.725 6.249,1.684 L5.793,1.684 L0,1.684 L0,6.737 L0,7.579 L0,24 L24,24 L24,7.579 L24,6.737 L24,1.684 L17.751,1.684 z M23.172,23.158 L0.828,23.158 L0.828,7.579 L23.172,7.579 L23.172,23.158 z" />
      <path d="M4.706,13.127 L4.706,12.105 Q6.125,11.965 6.685,11.635 Q7.245,11.306 7.521,10.077 L8.554,10.077 L8.554,20.632 L7.158,20.632 L7.158,13.127 z" />
      <path d="M19.356,10.211 L19.356,11.373 Q18.854,11.868 18.021,13.097 Q17.188,14.326 16.548,15.747 Q15.915,17.131 15.588,18.271 Q15.377,19.003 15.042,20.632 L13.595,20.632 Q14.089,17.597 15.777,14.592 Q16.773,12.831 17.872,11.55 L12.111,11.55 L12.111,10.211 z" /> 
    </SvgIcon>
  )
}


function getHeight(h, item) {
  if (!item.buttonSync.value && !item.buttonHome.value && !item.buttonDate.value && !item.buttonNavigate.value) {
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

  cacheEvent = () => {
    const data = { 
      command: this.props.dialogId ? 'synccharts_dialog' : 'synccharts',
      range: this.ctx.chart.dateWindow_,
      realtime: this.state.realtime,
      layoutId: this.props.layoutId, 
      containerId: this.props.containerId, 
    };
    if (this.props.dialogId) {
      core.cache.chart.d = data
    } else if (this.props.containerId) {
      core.cache.chart.c[this.props.containerId] = data
    } else {
      core.cache.chart.l = data
    }
  }

  realtimeCharts = (data) => {
    const dn = (this.props.item.widgetlinks.link.id === '__device' ? core.store.getState().layoutDialog.contextId : this.props.item.widgetlinks.link.id) + '.' + this.props.item.widgetlinks.link.prop;
    if (this.props.item.realtime.value && data[dn] !== undefined) {
      this.realtime(data[dn])
    }
  }

  getData = (props = this.props, _discrete = false) => {
   const data = props.mode === 'user' ? 
    { lines: [] } : 
    { lines: [{ id: 'line', type: 0 }] };

   const items = data.lines;

    const statics = data.lines.filter(i => i.type !== 0);
    const legend = data || {};
    const isDidProp = props.item.widgetlinks.link.id === '__device';
    const dn = props.mode === 'user' ? ((isDidProp ? core.store.getState().layoutDialog.contextId : props.item.widgetlinks.link.dn) + '.' + props.item.widgetlinks.link.prop) : 'line';
    const alias = [].reduce((l, n) => ({ ...l, [n.dn]: n.id }), {});
    const { start, end } = getZoomInterval(props.item.interval.value.id);
    this.ctx = createContext(
      this.chart,
      this.spiner,
      props.fetch,
      { start, end },
      { id: props.id, type: props.item.type, chartid: dn, dn, alias, items, legend, statics, mode: props.mode, isDidProp },
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
    const id = getDayId(data.x);
    if (this.ctx.buffer.raw[id] && this.ctx.buffer.raw[id].ready) {
      this.ctx.buffer.raw[id].data.push([new Date(data.x), Number(data.y)]);
    }
    if (this.state.realtime) {
      renderRealTime(this.ctx);
      this.setWindow(data.x, this.props.item.positionCurentTime.value);
    }
  }

  multiColumnBarPlotter = (e, props = this.props) => {
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
        const fill = props.item.fillGraph !== undefined ? props.item.fillGraph.value : false;
        if (fill) {
          ctx.fillRect(x, p.canvasy, width - 0, y_bottom - p.canvasy);
        }
        ctx.strokeRect(x, p.canvasy, width - 0, y_bottom - p.canvasy);
      }
    }
  }

  getControlPoints = (p0, p1, p2, opt_alpha, opt_allowFalseExtrema) => {
    var alpha = (opt_alpha !== undefined) ? opt_alpha : 1 / 3;
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

  smoothPlotter = (e, props = this.props) => {  
    var ctx = e.drawingContext,
    points = e.points;
    const g = e.dygraph;

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
                                        1 / 3);
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
    const fill = props.item.fillGraph !== undefined ? props.item.fillGraph.value : false;
    if (fill) {
      const cords = g.toDomCoords(0, 0);
      const rgb = Dygraph.toRGB_(g.getColors()[0]);
      const color ='rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + g.getNumericOption('fillAlpha', 'line') + ')';
      ctx.stroke();
  
      ctx.lineTo(points[points.length - 1].canvasx, cords[1]);
      ctx.lineTo(points[0].canvasx, cords[1]);
      
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    } else {
      ctx.stroke();
    }
  }

  underlayCallback = (item, canvas, area, g) => {
    if (g.dateWindow_) {
      item.lines.forEach(i => {
        const left_bottom = g.toDomCoords(g.dateWindow_[0], i.value.value);
        const right_top = g.toDomCoords(g.dateWindow_[1], i.value.value);
  
        const left = left_bottom[0];
        const right = right_top[0];
        const top = left_bottom[1];
        const bottom = right_top[1];
    
        canvas.beginPath();
        canvas.strokeStyle = getColor(i.color.value);
        canvas.moveTo(left, top);
        canvas.lineTo(right, bottom);
        canvas.stroke();
      });

      item.fields.forEach(i => {
        const left_bottom = g.toDomCoords(g.dateWindow_[0], i.hight.value);
        const right_top = g.toDomCoords(g.dateWindow_[1], i.low.value);
  
        const left = left_bottom[0];
        const right = right_top[0];
        const top = left_bottom[1];
        const bottom = right_top[1];
        
        canvas.fillStyle = getColor(i.color.value);
        canvas.fillRect(left, top, right - left, bottom - top);
      });
    }
  }

  updateOptions = (props = this.props, windowfreeze = false) => {
    this.ctx.init = true;
    const { legend, items } = this.ctx.params;
    const { start, end } = getZoomInterval(props.item.interval.value.id);
    
    const lineType = props.item.lineType !== undefined ? props.item.lineType.value.id : 'line';
    const lineColor = props.item.lineColor !== undefined ? props.item.lineColor.value : 'rgba(74,144,226,1)';
    const axisPosition = props.item.axisPosition !== undefined ? props.item.axisPosition.value.id : 'left';
    const axisWidth = props.item.axisWidth !== undefined ? props.item.axisWidth.value : 50;
    const axisMin = props.item.axisMin !== undefined ? props.item.axisMin.value : 0;
    const axisMax = props.item.axisMax !== undefined ? props.item.axisMax.value : 100;
    const axisDynamic = props.item.axisDynamic !== undefined ? props.item.axisDynamic.value : false;

    legend.chart_type = lineType;
    this.ctx.chart.updateOptions({
      underlayCallback: (a, b, c) => this.handleChanged(a, b, c, props),
      file: [[new Date(), null]],
      visibility: [ true ],
      dateWindow: windowfreeze ? [this.ctx.chart.dateWindow_[0], this.ctx.chart.dateWindow_[1]] : [start, end],
      stepPlot: legend.chart_type === 'step' ? true : false,
      includeZero: legend.chart_type === 'bar' ? true : false,
      highlightCircleSize: legend.chart_type === 'bar' ? 0 : 3,
      plotter: legend.chart_type === 'bar' ? (e) => this.multiColumnBarPlotter(e, props) : legend.chart_type === 'smooth' ? (e) => this.smoothPlotter(e, props):  null,
      series: {
        line: { axis: axisPosition === 'right' ? 'y2' : 'y' },
      },
      axes: {
        x: {
          drawAxis: props.item.axisBottom !== undefined ? props.item.axisBottom.value : true,
          axisLabelFormatter: this.getAxisValueX,
          axisLineColor: props.item.gridColor.value,
        },
        y: {
          drawAxis: true,
          axisLabelFormatter: (v) => this.getAxisValueY(v, 'left', axisPosition, props),
          axisLabelWidth: axisPosition === 'left' ? axisWidth : -8,
          axisLineColor: axisPosition === 'left' ?  props.item.gridColor.value : null,
          valueRange: axisPosition === 'left' ? (legend.chart_type === 'bar' || axisDynamic) ? null : [axisMin, axisMax] : null,
        },
        y2: {
          drawAxis: axisPosition === 'none' ? false : (axisPosition === 'right'),
          axisLabelFormatter: (v) => this.getAxisValueY(v, 'right', axisPosition, props),
          axisLabelWidth: axisPosition === 'right' ? axisWidth : 0,
          axisLineColor: axisPosition === 'right' ? props.item.gridColor.value : null,
          valueRange: axisPosition === 'right' ? (legend.chart_type || axisDynamic) === 'bar' ? null : [axisMin, axisMax] : null,
        },
      },
      labels: ['x', 'line'],
      colors: [ lineColor ],
      ylabel: this.getLabel(props, 'left'),
      y2label: this.getLabel(props, 'right'),
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
    this.cacheEvent();
  }

  mousedown = (e, g, c) => {
    if (this.state.realtime) {
      this.setState({ realtime: false });
    }
    mousedown(e, g, c, this.cacheEvent);
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
    this.cacheEvent();
  }

  setWindow = (n, p) => {
    const [s, e] = this.ctx.chart.dateWindow_;
    const i = e - s;
    const d = (i / 100) * p;
    const ns = n - d;
    const ne = n + i - d;
    this.ctx.chart.updateOptions({ dateWindow: [ns, ne] });
  }

  handleChanged = (_, __, chart, props = this.props) => {
    this.underlayCallback(props.item, _, __, chart);
    render(this.ctx, chart, this.props.item.data.timerange);
    if (this.ctx && this.ctx.chart) {
        this.props.item.data.range = this.ctx.chart.dateWindow_;
    }
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

  getLabel = (props = this.props, type) => {
    const item = props.item;
    const axisPosition = item.axisPosition !== undefined ? props.item.axisPosition.value.id : 'left';
    if (axisPosition === type) {
      if (item.axisLabel !== undefined && item.axisLabel.value) {
        return `<span
        style="font-size:14px;color:${item.textColor.value}">
        ${item.axisLabel.value
        }</span>`;
      }
      return `<span style="font-size:14px;color:${item.textColor.value}"></span>`;
    }
    return `<span style="font-size:14px;color:${item.textColor.value}"></span>`;
  }

  getAxisValueY = (v, type, pos, props) => {
    if (type === pos) {
      const item = props.item;
      if (Number.isInteger(v)) {
        return `<span style="color:${item.textColor.value}">${v}</span>`;
      }
      return `<span style="color:${item.textColor.value}">${parseFloat(v).toFixed(2)}</span>`; 
    }
    return '<span></span>'
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
    const id = `${this.props.layoutId}_${this.props.containerId || 'null'}_${this.props.dialogId || 'null'}_${this.props.id}`
    if (data.x) {
      const x = new Date(data.x);
      if (this.ctx.params.legend.chart_type === 'bar') {
        this.ctx.litems[`l_${id}_t`].innerHTML = `${x.toLocaleDateString()}`;
      } else {
        this.ctx.litems[`l_${id}_t`].innerHTML = `${x.toLocaleDateString()} ${x.toLocaleTimeString()}`;
      }
    }
    data.series.forEach((i, k) => {
      const id = `l_${id}_line`;
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
    this.cacheEvent();
  }

  handleChandeDate = (v) => {
    const date = new Date(v.unix() * 1000);
    date.setHours(0, 0, 0, 0);

    this.setState({ realtime: false, calendar: false });
    this.setWindow(date.getTime(), 0);
    this.cacheEvent();
  }

  handleChandeDateClose = () => {
    this.setState({ calendar: false })
  }

  handleSync = () => {
    core.transfer.send('command_layout', { 
      command: this.props.dialogId ? 'synccharts_dialog' : 'synccharts',
      range: this.ctx.chart.dateWindow_,
      realtime: this.state.realtime,
      layoutId: this.props.layoutId, 
      containerId: this.props.containerId, 
    })
    this.cacheEvent();
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
    this.cacheEvent();
  }

  handleNavNext = () => {
    const [s, e] = this.ctx.chart.dateWindow_;
    const i = e - s;
    const ns = e;
    const ne = e + i;
    this.ctx.chart.updateOptions({ dateWindow: [ns, ne] });
    this.cacheEvent();
  }

  generateLegend = (props = this.props) => {
    const id = `${props.layoutId}_${props.containerId || 'null'}_${props.dialogId || 'null'}_${props.id}`
    const color = props.item.textColor.value;

    const legendLabel = props.item.legendLabel !== undefined ? props.item.legendLabel.value : 'Demo temp1';
    const lineColor = props.item.lineColor !== undefined ? props.item.lineColor.value : 'rgba(74,144,226,1)';
    const axisPosition = props.item.axisPosition !== undefined ? props.item.axisPosition.value.id : 'left';

    const st = `text-align:center;color:${color};width:150px;font-size:14px;display:flex;align-items:center;justify-content:center;`;
    const s0 = `display:flex;flex-direction:row;flex-shrink:0;height: 100%;`;
    const sl = 'font-size:14px;display:flex;width:100%;padding-left:5px;padding-right:10px;height:100%';
    const sr = 'font-size:14px;display:flex;width:100%;padding-right:5;padding-left:10px;height:100%;align-items:left;';
    const bl = 'flex-direction:row;display:flex;width:100%;height:100%;justify-content:end;flex-wrap: wrap;text-align:right;';
    const br = 'flex-direction:row;display:flex;width:100%;height:100%;justify-content:end;flex-wrap: wrap;';
    const temp = [{ id: `l_${id}_line`, linecolor: lineColor, raxis: axisPosition === 'right' }]

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
    const string = `<div style="${s0}"><div style="${sl}">${left}</div><div id="l_${id}_t" style="${st}">&nbsp;</div><div style="${sr}">${right}</div></div>`;
    this.legend.innerHTML = string;
    this.ctx.chart.resize();
    return {
      [`l_${id}_t`]: document.getElementById(`l_${id}_t`),
      [`l_${id}_line`]: document.getElementById(`l_${id}_line`),
    };
  }

  render = ({ item, mode, h } = this.props) => {
    const height = (h - (item.borderSize.value * 2)) - item.legendHeight.value;
    const top = item.legendHeight.value;
    const buttonSize = item.buttonSize.value / 100;
    return (
      <div style={{ ...styles.root, background: item.backgroundColor.value, zIndex: mode === 'user' ? 1 : -1 }}>
        <div ref={this.linkedLegend} style={{ ...styles.legend, height: top }} />
        <div ref={this.linked} style={{ ...styles.container, width: '100%', top, height: getHeight(height, item) }} />
        <div style={styles.toolbar} />
        <div ref={this.linkedSpiner} style={styles.spiner}>LOADING</div>
        <div ref={this.linkedPanel} style={styles.panel} />
        {this.state.enabledsd ? <div style={{ ...styles.speeddial, transform: `scale(${buttonSize})` }}></div>: null}
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
              <CalendarIcon />
            </Fab>
          : null}
          {item.buttonNavigate.value ?
            <Fab
              size="small"
              style={{ ...styles.buttonNavBefore, transform: `scale(${buttonSize})`, backgroundColor: item.buttonsColor.value }}
              onClick={this.handleNavBefore}
            >
              <IconBefore fontSize="large" />
            </Fab>
          : null}
          {item.buttonNavigate.value ?
            <Fab
              size="small"
              style={{ ...styles.buttonNavNext, transform: `scale(${buttonSize})`, backgroundColor: item.buttonsColor.value }}
              onClick={this.handleNavNext}
            >
              <IconNext fontSize="large" />
            </Fab>
          : null}
          {item.buttonHome.value ?
            <Fab
              size="small"
              style={{ ...styles.buttonHome, transform: `scale(${buttonSize})`, backgroundColor: item.buttonsColor.value }}
              onClick={this.handleHome}
            >
              <EndIcon />
            </Fab>
          : null}
          <ThemeProvider theme={createMuiTheme({
            palette: {
              primary: {
                main: item.buttonsColor.value,
              }
            },
          })}>
            <KeyboardDatePicker
              open={this.state.calendar}
              margin="normal"
              label=""
              minDate={MIN_DATE}
              maxDate={MAX_DATE}
              format="MM/dd/yyyy"
              style={styles.datePicker}
              onChange={this.handleChandeDate}
              onClose={this.handleChandeDateClose}
            />
          </ThemeProvider>
      </div>
    );
  }
}

export default Chart;