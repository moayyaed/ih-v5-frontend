const scheme = {
  settings: [
    { 
      
      prop: '_settings_dev', 
      type: 'divider',
    },
    { 
      
      prop: 'grid', 
      type: 'number',
      step: 1,
      min: 1,
      max: 100,
      bind: false,
    },
    { 
      
      prop: 'scale', 
      type: 'number',
      step: 0.1,
      min: 0.1,
      max: 8,
      bind: false,
    },
    {
     
      prop: 'devBackgroundColor',
      type: 'color',
      bind: false,
    }
  ],
}


export default scheme;