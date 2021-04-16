import background from './background';
import border from './border';
import decoration from './decoration';

const template = {
  main: [
    ...background, 
    ...border, 
    ...decoration
  ],
  move: [
    { 
      title: 'Position', 
      prop: 'position', 
      type: 'divider',
    },
    { 
      title: 'X', 
      prop: 'x', 
      type: 'number',
    },
    { 
      title: 'Y', 
      prop: 'y', 
      type: 'number',
    },
    { 
      title: 'Width', 
      prop: 'w', 
      type: 'number',
    },
    { 
      title: 'Height', 
      prop: 'h', 
      type: 'number',
    },
    { 
      title: 'Z-index', 
      prop: 'zIndex', 
      type: 'number',
      min: -100,
      max: 5000,
    },
    { 
      title: 'Transform', 
      prop: 'transform', 
      type: 'divider',
    },
    { 
      title: 'Flip H', 
      prop: 'flipH', 
      type: 'cb',
    },
    { 
      title: 'Flip V', 
      prop: 'flipV', 
      type: 'cb',
    },
    { 
      title: 'Crop', 
      prop: 'overflow', 
      type: 'cb',
    },
    { 
      title: 'Rotate', 
      prop: 'rotate', 
      type: 'number',
      step: 10,
      min: 0,
      max: 360,
    },
  ],
}


export default template;