const image = [
  { 
    
    prop: '_image', 
    type: 'divider',
  },
  { 
    
    prop: 'img', 
    type: 'img',
  },
  { 
    
    prop: 'imgColor', 
    type: 'color',
  },
  { 
    
    prop: 'imgSize', 
    type: 'number',
    min: -100,
    max: 100,
  },
  { 
    
    prop: 'imgRotate', 
    type: 'number',
    step: 10,
    min: 0,
    max: 360,
  },
];


export default image;