const decoration = [
  { 
    
    prop: '_decoration', 
    type: 'divider',
  },
  { 
    
    prop: 'animation', 
    type: 'animation',
  },
  { 
    
    prop: 'boxShadow', 
    type: 'shadow',
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
];


export default decoration