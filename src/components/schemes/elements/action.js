const action = {
  move: [
    { 
      
      prop: '_position', 
      type: 'divider',
    },
    { 
      
      prop: 'x', 
      type: 'number',
      bind: false,
    },
    { 
      
      prop: 'y', 
      type: 'number',
      bind: false,
    },
    { 
      
      prop: 'w', 
      type: 'number',
      bind: false,
    },
    { 
      
      prop: 'h', 
      type: 'number',
      bind: false,
    },
  ],
  actions: [
      { 
        
        prop: '_effects', 
        type: 'divider',
      },
      { 
        
        prop: 'colorHover', 
        type: 'color',
      },
      { 
        
        prop: 'colorRipple', 
        type: 'color',
      },
    ],
  }


export default action;