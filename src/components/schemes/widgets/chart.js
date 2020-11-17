import { main } from '../elements';
import move from '../elements/move';


const chart = {
  element: [
    { 
      title: 'Chart', 
      prop: 'chart', 
      type: 'divider',
    },
    { 
      title: 'Interval', 
      prop: 'interval', 
      type: 'droplistlink',
      data: [
        {
          id: '1970',
          title: '-'
        },
        {
          id: 'minute',
          title: 'Minute'
        },
        {
          id: 'hour',
          title: 'Hour'
        },
        {
          id: 'day',
          title: 'Day'
        },
        {
          id: 'week',
          title: 'Week'
        },
        {
          id: 'mount',
          title: 'Month'
        }
      ],
    },
    { 
      title: 'Position Curent Time', 
      prop: 'positionCurentTime', 
      type: 'number',
    },
    { 
      title: 'Grid Color', 
      prop: 'gridColor', 
      type: 'color',
    },
    { 
      title: 'Text Color', 
      prop: 'textColor', 
      type: 'color',
    },
    { 
      title: 'Realtime', 
      prop: 'realtime', 
      type: 'cb',
    },
    { 
      title: 'Draw Points', 
      prop: 'points', 
      type: 'cb',
    },
    { 
      title: 'Fill Graph', 
      prop: 'fillGraph', 
      type: 'cb',
    },
    { 
      title: 'Line', 
      prop: '_line', 
      type: 'divider',
    },
    {
      title: 'Type', 
      prop: 'lineType', 
      type: 'droplistlink',
      data: [
        {
          id: 'line',
          title: 'Line'
        },
        {
          id: 'bar',
          title: 'Bar'
        },
        {
          id: 'step',
          title: 'Step'
        },
      ],
    },
    { 
      title: 'Color', 
      prop: 'lineColor', 
      type: 'color',
    },
    { 
      title: 'Smooth', 
      prop: 'lineSmooth', 
      type: 'number',
      min: 0,
      max: 70,
      step: 5
    },
    { 
      title: 'Legend', 
      prop: 'legenddivider', 
      type: 'divider',
    },
    { 
      title: 'Active', 
      prop: 'legend', 
      type: 'cb',
    },
    { 
      title: 'Height', 
      prop: 'legendHeight', 
      type: 'number',
    },
    { 
      title: 'Axis Left / Right', 
      prop: '_axis', 
      type: 'divider',
    },
    { 
      title: 'Position', 
      prop: 'axisPosision', 
      type: 'droplistlink',
      data: [
        {
          id: 'none',
          title: 'None'
        },
        {
          id: 'left',
          title: 'Left'
        },
        {
          id: 'right',
          title: 'Right'
        },
      ],
    },
    { 
      title: 'Label', 
      prop: 'axisLabel', 
      type: 'input',
    },
    { 
      title: 'Width', 
      prop: 'axisWidth', 
      type: 'number',
    },
    { 
      title: 'Min', 
      prop: 'axisMin', 
      type: 'number',
    },
    { 
      title: 'Max', 
      prop: 'axisMax', 
      type: 'number',
    },
    { 
      title: 'Axis Bottom', 
      prop: 'axisbottom', 
      type: 'divider',
    },
    { 
      title: 'Active', 
      prop: 'axisBottom', 
      type: 'cb',
    },
    { 
      title: 'Buttons', 
      prop: 'buttons', 
      type: 'divider',
    },
    { 
      title: 'Sync', 
      prop: 'buttonSync', 
      type: 'cb',
    },
    { 
      title: 'Home', 
      prop: 'buttonHome', 
      type: 'cb',
    },
    { 
      title: 'Date', 
      prop: 'buttonDate', 
      type: 'cb',
    },
    { 
      title: 'Discrete', 
      prop: 'buttonDiscrete', 
      type: 'cb',
    },
    { 
      title: 'Navigate', 
      prop: 'buttonNavigate', 
      type: 'cb',
    },
    { 
      title: 'Size', 
      prop: 'buttonSize', 
      type: 'number',
    },
    { 
      title: 'Color', 
      prop: 'buttonsColor', 
      type: 'color',
    },
  ],
  main: main,
  move: move,
  link: [],
};


export default chart;
