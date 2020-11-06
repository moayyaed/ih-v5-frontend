const template = {
  main: [
    { 
      title: 'Decoration', 
      prop: 'decoration', 
      type: 'divider',
    },
    { 
      title: 'Animation', 
      prop: 'animation', 
      type: 'animation',
    },
    { 
      title: 'Opacity', 
      prop: 'opacity', 
      type: 'number',
      step: 5,
      min: 0,
      max: 100,
    },
    {
      title: 'Visible',
      prop: 'visible',
      type: 'cb',
    }
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
      title: 'Crop', 
      prop: 'overflow', 
      type: 'cb',
    },
    { 
      title: 'Z-index', 
      prop: 'zIndex', 
      type: 'number',
      min: -100,
      max: 5000,
    },
  ],
}


export default template;