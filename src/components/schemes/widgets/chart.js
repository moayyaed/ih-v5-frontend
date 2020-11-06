import { main } from '../elements';
import move from '../elements/move';


const chart = {
  main: [
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
      title: 'Legend Height', 
      prop: 'legendHeight', 
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
      title: 'Buttons Color', 
      prop: 'buttonsColor', 
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
      title: 'Button Sync', 
      prop: 'buttonSync', 
      type: 'cb',
    },
    { 
      title: 'Button Home', 
      prop: 'buttonHome', 
      type: 'cb',
    },
    { 
      title: 'Button Date', 
      prop: 'buttonDate', 
      type: 'cb',
    },
    { 
      title: 'Button Discrete', 
      prop: 'buttonDiscrete', 
      type: 'cb',
    },
    { 
      title: 'Button Navigate', 
      prop: 'buttonNavigate', 
      type: 'cb',
    },
    { 
      title: 'Button Size', 
      prop: 'buttonSize', 
      type: 'number',
    },
    ...main
  ],
  move: move,
  link: [],
};


export default chart;
