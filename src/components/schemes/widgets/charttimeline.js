import { main } from '../elements';
import move from '../elements/move';


const charttimeline = {
  element: [
    { 
      
      prop: '_chart_timeline', 
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
      
      prop: 'moveable', 
      type: 'cb',
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
      
      prop: '_legend', 
      type: 'divider',
    },
    { 
      
      prop: 'legendWidth', 
      type: 'number',
    },
    { 
      
      prop: '_axis_bottom', 
      type: 'divider',
    },
    { 
      
      prop: 'axisBottomDate', 
      type: 'cb',
    },
    { 
      
      prop: 'axisBottomTime', 
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


export default charttimeline;
