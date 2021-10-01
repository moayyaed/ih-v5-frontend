const container = {
  element: [
    { 
      
      prop: '_content_align', 
      type: 'divider',
    },
    {
      prop: 'alignW',
     
      type: 'droplistlink',
      bind: false,
      data: [
        {
          id: 'flex-start',
         
          lang: 'left',
        },
        {
          id: 'center',
         
        },
        {
          id: 'flex-end',
         
          lang: 'right',
        }
      ]
    },
    {
      prop: 'alignH',
     
      type: 'droplistlink',
      bind: false,
      data: [
        {
          id: 'flex-start',
         
          lang: 'up',
        },
        {
          id: 'center',
         
        },
        {
          id: 'flex-end',
         
          lang: 'bottom2',
        }
      ]
    },
    { 
      
      prop: '_content_fit', 
      type: 'divider',
    },
    { 
      
      prop: 'fitW', 
      type: 'cb',
      bind: false,
    },
    { 
      
      prop: 'fitH', 
      type: 'cb',
      bind: false,
    },
    { 
      
      prop: '_content_scroll', 
      type: 'divider',
    },
    { 
      
      prop: 'scrollX', 
      type: 'cb',
      bind: false,
    },
    { 
      
      prop: 'scrollY', 
      type: 'cb',
      bind: false,
    },
  ],
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
      type: 'number',
    },
    { 
      
      prop: 'h', 
      type: 'number',
    },
    { 
      
      prop: 'zIndex', 
      type: 'number',
      min: -100,
      max: 5000,
    },
    { 
      
      prop: 'overflow', 
      type: 'cb',
    },
  ],
  link: [],
}


export default container