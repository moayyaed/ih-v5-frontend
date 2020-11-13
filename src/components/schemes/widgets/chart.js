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
      title: 'Points', 
      prop: 'points', 
      type: 'cb',
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
      title: 'Axis Left', 
      prop: 'axisleft', 
      type: 'divider',
    },
    { 
      title: 'Active', 
      prop: 'axisLeft', 
      type: 'cb',
    },
    { 
      title: 'Label', 
      prop: 'axisLeftLabel', 
      type: 'cb',
    },
    { 
      title: 'Width', 
      prop: 'axisLeftWidth', 
      type: 'number',
    },
    { 
      title: 'Axis Right', 
      prop: 'axisright', 
      type: 'divider',
    },
    { 
      title: 'Active', 
      prop: 'axisRight', 
      type: 'cb',
    },
    { 
      title: 'Label', 
      prop: 'axisRightLabel', 
      type: 'cb',
    },
    { 
      title: 'Width', 
      prop: 'axisRightWidth', 
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
