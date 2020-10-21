const scheme = {
  settings: [
    { 
      title: 'Development Settings', 
      prop: 'settings', 
      type: 'divider',
    },
    { 
      title: 'Grid', 
      prop: 'grid', 
      type: 'number',
      step: 1,
      min: 1,
      max: 100,
      bind: false,
    },
    { 
      title: 'Scale', 
      prop: 'scale', 
      type: 'number',
      step: 0.1,
      min: 0.1,
      max: 8,
      bind: false,
    },
    {
      title: 'Color',
      prop: 'devBackgroundColor',
      type: 'color',
      bind: false,
    },
    {
      title: 'Color2',
      prop: 'devBackgroundColor2',
      type: 'color',
      bind: false,
    }
  ]
}


export default scheme;