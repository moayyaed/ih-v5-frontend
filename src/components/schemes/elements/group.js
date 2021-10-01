const group = {
  main: [
    { 
      
      prop: '_decoration', 
      type: 'divider',
    },
    { 
      
      prop: 'animation', 
      type: 'animation',
    },
    { 
      
      prop: 'opacity', 
      type: 'number',
      step: 5,
      min: 0,
      max: 100,
    },
    {
     
      prop: 'visible',
      type: 'cb',
    }
  ],
  move: [
    { 
      
      prop: '_position', 
      type: 'divider',
    },
    { 
      
      prop: 'x', 
      type: 'number',
    },
    { 
      
      prop: 'y', 
      type: 'number',
    },
    { 
      
      prop: 'w', 
      type: 'text',
    },
    { 
      
      prop: 'h', 
      type: 'text',
    },
    { 
      
      prop: 'overflow', 
      type: 'cb',
    },
    { 
      
      prop: 'zIndex', 
      type: 'number',
      min: -100,
      max: 5000,
    },
  ],
}


export default group;