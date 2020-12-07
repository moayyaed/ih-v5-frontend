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
          id: 'step',
          title: 'Step'
        },
        {
          id: 'smooth',
          title: 'Smooth'
        },
        {
          id: 'bar',
          title: 'Bar'
        },
      ],
    },
    { 
      title: 'Color', 
      prop: 'lineColor', 
      type: 'color',
    },
    { 
      title: 'Legend', 
      prop: 'legenddivider', 
      type: 'divider',
    },
    { 
      title: 'Label', 
      prop: 'legendLabel', 
      type: 'inputlink',
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
      prop: 'axisPosition', 
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
      type: 'inputlink',
    },
    { 
      title: 'Width', 
      prop: 'axisWidth', 
      type: 'number',
    },
    { 
      title: 'Max', 
      prop: 'axisMax', 
      type: 'number',
    },
    { 
      title: 'Min', 
      prop: 'axisMin', 
      type: 'number',
    },
    { 
      title: 'Axis Bottom', 
      prop: 'axisbottom', 
      type: 'divider',
    },
    { 
      title: 'Visible', 
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
    { 
      title: 'Static Lines', 
      prop: 'lines', 
      type: 'combine',
      itemTitle: 'Line',
      itemScheme: [
        { 
          title: 'Color', 
          prop: 'color', 
          type: 'color',
          bind: false,
        },
        { 
          title: 'Value', 
          prop: 'value', 
          type: 'number',
          bind: false,
        },
      ],
      itemDefault: {
        color: { value: 'rgba(208,2,27,1)' },
        value: { value: 5 },
      },
    },
    { 
      title: 'Static Fields', 
      prop: 'fields', 
      type: 'combine',
      itemTitle: 'Field',
      itemScheme: [
        { 
          title: 'Color', 
          prop: 'color', 
          type: 'color',
          bind: false,
        },
        { 
          title: 'Hight', 
          prop: 'hight', 
          type: 'number',
          bind: false,
        },
        { 
          title: 'Low', 
          prop: 'low', 
          type: 'number',
          bind: false,
        },
      ],
      itemDefault: {
        color: { value: 'rgba(74,144,226,0.15)' },
        low: { value: 20 },
        hight: { value: 80 },
      },
    },
  ],
  main: main,
  move: move,
  link: [],
};


export default chart;
