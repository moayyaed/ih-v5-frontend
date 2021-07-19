import { main } from '../elements';
import move from '../elements/move';


const charttimeline = {
  element: [
    { 
      title: 'Chart Timeline', 
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
      title: 'Show Legend', 
      prop: 'legend', 
      type: 'cb',
    },
    { 
      title: 'Moveable', 
      prop: 'moveable', 
      type: 'cb',
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
      title: 'Axis Bottom', 
      prop: 'axisbottom', 
      type: 'divider',
    },
    { 
      title: 'Show Date', 
      prop: 'axisBottomDate', 
      type: 'cb',
    },
    { 
      title: 'Show Time', 
      prop: 'axisBottomTime', 
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
  ],
  main: main,
  move: move,
  link: [],
};


export default charttimeline;
