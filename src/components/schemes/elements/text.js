const text = [
  { 
    
    prop: '_text', 
    type: 'divider',
  },
  { 
    
    prop: 'text', 
    type: 'inputlink',
  },
  { 
    
    prop: 'textColor', 
    type: 'color',
  },
  { 
    
    prop: 'textSize', 
    type: 'number',
    min: 0,
    max: 5000,
  },
  { 
    
    prop: 'textBold', 
    type: 'cb',
  },
  { 
    
    prop: 'textItalic', 
    type: 'cb',
  },
  { 
    
    prop: 'textFontFamily',
    type: 'droplistlink',
    data: [
      {
        id: 'Arial',
       
      },
      {
        id: 'Serif',
       
      },
      {
        id: 'Sans-serif',
       
      },
      {
        id: 'Monospace',
       
      }
    ]
  },
  {
    prop: 'textAlignH',
   
    type: 'droplistlink',
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
    prop: 'textAlignV',
   
    type: 'droplistlink',
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
    
    prop: 'textRotate', 
    type: 'number',
    step: 10,
    min: 0,
    max: 360,
  }
];


export default text;