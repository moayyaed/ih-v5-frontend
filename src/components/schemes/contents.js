const content = {
  main: [
    { 
      
      prop: '_background', 
      type: 'divider',
    },
    { 
      
      prop: 'backgroundColor', 
      type: 'color2',
      bind: false,
    },
    { 
      
      prop: 'backgroundImage', 
      type: 'img',
      bind: false,
    },
    { 
      
      prop: '_decoration', 
      type: 'divider',
    },
    { 
      
      prop: 'overlayColor', 
      type: 'color2',
      bind: false,
    },
  ],
  move: [
    { 
      
      prop: '_position', 
      type: 'divider',
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
};

const content2 = {
  main: [
    { 
      
      prop: '_background', 
      type: 'divider',
    },
    { 
      
      prop: 'backgroundColor', 
      type: 'color2',
      bind: false,
    },
    { 
      
      prop: 'backgroundImage', 
      type: 'img',
      bind: false,
    },
    { 
      
      prop: '_decoration', 
      type: 'divider',
    },
    { 
      
      prop: 'overlayColor', 
      type: 'color2',
      bind: false,
    },
  ],
  move: [
    { 
      
      prop: '_position', 
      type: 'divider',
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
};

const content3 = {
  main: [
    { 
      
      prop: '_position', 
      type: 'divider',
    },
    { 
      
      prop: 'backgroundColor', 
      type: 'color2',
      bind: false,
    },
    { 
      
      prop: 'backgroundImage', 
      type: 'img',
      bind: false,
    },
    { 
      
      prop: '_decoration', 
      type: 'divider',
    },
    { 
      
      prop: 'overlayColor', 
      type: 'color2',
      bind: false,
    },
  ],
  move: [
    { 
      
      prop: '_dialog', 
      type: 'divider',
    },
    {
      prop: 'Позиция',
     
      type: 'droplistlink',
      bind: false,
      data: [
        {
          id: 'center',
         
        },
        {
          id: 'left',
         
        },
        {
          id: 'right',
         
        },
        {
          id: 'top',
         
        },
        {
          id: 'bottom',
         
        }
      ]
    },
    { 
      
      prop: 'outsideClose', 
      type: 'cb',
      bind: false,
    },
    { 
      
      prop: '_position', 
      type: 'divider',
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
  ], main: [
    { 
      
      prop: '_background', 
      type: 'divider',
    },
    { 
      
      prop: 'backgroundColor', 
      type: 'color2',
      bind: false,
    },
    { 
      
      prop: 'backgroundImage', 
      type: 'img',
      bind: false,
    },
    { 
      
      prop: '_decoration', 
      type: 'divider',
    },
    { 
      
      prop: 'overlayColor', 
      type: 'color2',
      bind: false,
    },
  ],
  move: [
    { 
      
      prop: '_dialog', 
      type: 'divider',
    },
    {
      prop: 'Позиция',
     
      type: 'droplistlink',
      bind: false,
      data: [
        {
          id: 'center',
         
        },
        {
          id: 'left',
         
        },
        {
          id: 'right',
         
        },
        {
          id: 'top',
         
        },
        {
          id: 'bottom',
         
        }
      ]
    },
    { 
      
      prop: 'outsideClose', 
      type: 'cb',
      bind: false,
    },
    { 
      
      prop: '_position', 
      type: 'divider',
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
}

const content4 = {
  move: [
    { 
      
      prop: '_position', 
      type: 'divider',
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
};

const contents = {
  content,
  content2,
  content3,
  content4,
}

export default contents;