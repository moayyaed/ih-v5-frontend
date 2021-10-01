import { main } from '../elements';
import move from '../elements/move';


const chart = {
  element: [
    { 
      
      prop: '_chart_multi', 
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
      
      prop: '_legend', 
      type: 'divider',
    },
    { 
      
      prop: 'legend', 
      type: 'cb',
    },
    { 
      
      prop: 'legendHeight', 
      type: 'number',
    },
    { 
      
      prop: '_axis_left', 
      type: 'divider',
    },
    { 
      
      prop: 'axisLeft', 
      type: 'cb',
    },
    { 
      
      prop: 'axisLeftLabel', 
      type: 'cb',
    },
    { 
      
      prop: 'axisLeftWidth', 
      type: 'number',
    },
    { 
      
      prop: '_axis_right', 
      type: 'divider',
    },
    { 
      
      prop: 'axisRight', 
      type: 'cb',
    },
    { 
      
      prop: 'axisRightLabel', 
      type: 'cb',
    },
    { 
      
      prop: 'axisRightWidth', 
      type: 'number',
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
  ],
  main: main,
  move: move,
  link: [],
};


export default chart;
