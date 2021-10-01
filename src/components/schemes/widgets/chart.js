import { main } from '../elements';
import move from '../elements/move';


const chart = {
  element: [
    { 
      
      prop: '_chart', 
      type: 'divider',
    },
    { 
      
      prop: 'interval', 
      type: 'droplistlink',
      data: [
        {
          id: '1970',
         
        },
        {
          id: 'minute',
         
        },
        {
          id: 'hour',
         
        },
        {
          id: 'day',
         
        },
        {
          id: 'week',
         
        },
        {
          id: 'mount',
         
        }
      ],
    },
    { 
      
      prop: 'positionCurentTime', 
      type: 'number',
    },
    { 
      
      prop: 'gridColor', 
      type: 'color',
    },
    { 
      
      prop: 'textColor', 
      type: 'color',
    },
    { 
      
      prop: 'realtime', 
      type: 'cb',
    },
    { 
      
      prop: 'points', 
      type: 'cb',
    },
    { 
      
      prop: 'fillGraph', 
      type: 'cb',
    },
    { 
      
      prop: '_line', 
      type: 'divider',
    },
    {
      
      prop: 'lineType', 
      type: 'droplistlink',
      data: [
        {
          id: 'line',
         
        },
        {
          id: 'step',
         
        },
        {
          id: 'smooth',
         
        },
        {
          id: 'bar',
         
        },
      ],
    },
    { 
      
      prop: 'lineColor', 
      type: 'color',
    },
    { 
      
      prop: '_aggregate', 
      type: 'divider',
    },
    { 
      
      prop: 'period', 
      type: 'droplistlink',
      data: [
        {
          id: '-',
         
        },
        {
          id: 'minute',
         
        },
        {
          id: 'hour',
         
        },
        {
          id: 'day',
         
        },
        {
          id: 'mount',
         
        }
      ],
    },
    { 
      
      prop: 'function', 
      type: 'droplistlink',
      data: [
        { id: '-', },
        { id: 'sum', },
        { id: 'min', },
        { id: 'max', },
        { id: 'mean', }      
      ],
    },
    { 
      
      prop: '_legend', 
      type: 'divider',
    },
    { 
      
      prop: 'legendLabel', 
      type: 'inputlink',
    },
    { 
      
      prop: 'legendHeight', 
      type: 'number',
    },
    { 
      
      prop: '_axis', 
      type: 'divider',
    },
    { 
      
      prop: 'axisPosition', 
      type: 'droplistlink',
      data: [
        {
          id: 'none',
         
        },
        {
          id: 'left',
         
        },
        {
          id: 'right',
         
        },
      ],
    },
    { 
      
      prop: 'axisLabel', 
      type: 'inputlink',
    },
    { 
      
      prop: 'axisWidth', 
      type: 'number',
    },
    { 
      
      prop: 'axisMax', 
      type: 'number',
    },
    { 
      
      prop: 'axisMin', 
      type: 'number',
    },
    { 
      
      prop: 'axisDynamic', 
      type: 'cb',
    },
    { 
      
      prop: '_axis_bottom', 
      type: 'divider',
    },
    { 
      
      prop: 'axisBottom', 
      type: 'cb',
    },
    { 
      
      prop: '_buttons', 
      type: 'divider',
    },
    { 
      
      prop: 'buttonSync', 
      type: 'cb',
    },
    { 
      
      prop: 'buttonHome', 
      type: 'cb',
    },
    { 
      
      prop: 'buttonDate', 
      type: 'cb',
    },
    { 
      
      prop: 'buttonNavigate', 
      type: 'cb',
    },
    { 
      
      prop: 'buttonSize', 
      type: 'number',
    },
    { 
      
      prop: 'buttonsColor', 
      type: 'color',
    },
    { 
      
      prop: 'lines', 
      type: 'combine',
      itemTitle: 'Line',
      itemScheme: [
        { 
          
          prop: 'color', 
          type: 'color',
          bind: false,
        },
        { 
          
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
      
      prop: 'fields', 
      type: 'combine',
      itemTitle: 'Field',
      itemScheme: [
        { 
          
          prop: 'color', 
          type: 'color',
          bind: false,
        },
        { 
          
          prop: 'hight', 
          type: 'number',
          bind: false,
        },
        { 
          
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
