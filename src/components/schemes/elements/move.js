const move = [
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
    type: 'number',
  },
  { 
    
    prop: 'h', 
    type: 'number',
  },
  { 
    
    prop: 'w2', 
    type: 'number',
  },
  { 
    
    prop: 'h2', 
    type: 'number',
  },
  { 
    
    prop: 'zIndex', 
    type: 'number',
    min: -100,
    max: 5000,
  },
  { 
    
    prop: '_transform', 
    type: 'divider',
  },
  { 
    
    prop: 'flipH', 
    type: 'cb',
  },
  { 
    
    prop: 'flipV', 
    type: 'cb',
  },
  { 
    
    prop: 'overflow', 
    type: 'cb',
  },
  { 
    
    prop: 'rotate', 
    type: 'number',
    step: 10,
    min: 0,
    max: 360,
  },
];


export default move;