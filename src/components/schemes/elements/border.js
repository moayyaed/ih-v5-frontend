const border = [
  { 
    
    prop: '_border', 
    type: 'divider',
  },
  { 
    
    prop: 'borderColor', 
    type: 'color',
  },
  { 
    
    prop: 'borderSize', 
    type: 'number',
    min: 0,
    max: 5000,
  },
  { 
    
    prop: 'borderRadius', 
    type: 'number',
    step: 10,
    min: 0,
    max: 100,
  },
  { 
    
    prop: 'borderStyle', 
    type: 'droplistlink',
    data: [
      {
        id: 'dotted',
       
      },
      {
        id: 'dashed',
       
      },
      {
        id: 'solid',
       
      },
      {
        id: 'groove',
       
      },
      {
        id: 'ridge',
       
      },
      {
        id: 'inset',
       
      },
      {
        id: 'outset',
       
      },
    ]
  },
]


export default border;