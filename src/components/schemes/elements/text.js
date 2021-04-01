const text = [
  { 
    title: 'Text', 
    prop: 'dividertext', 
    type: 'divider',
  },
  { 
    title: 'Text', 
    prop: 'text', 
    type: 'inputlink',
  },
  { 
    title: 'Color', 
    prop: 'textColor', 
    type: 'color',
  },
  { 
    title: 'Size', 
    prop: 'textSize', 
    type: 'number',
    min: 0,
    max: 5000,
  },
  { 
    title: 'Bold', 
    prop: 'textBold', 
    type: 'cb',
  },
  { 
    title: 'Italic', 
    prop: 'textItalic', 
    type: 'cb',
  },
  { 
    title: 'Font', 
    prop: 'textFontFamily',
    type: 'droplistlink',
    data: [
      {
        id: 'Arial',
        title: 'Arial'
      },
      {
        id: 'Serif',
        title: 'Serif'
      },
      {
        id: 'Sans-serif',
        title: 'Sans-serif'
      },
      {
        id: 'Monospace',
        title: 'Monospace'
      }
    ]
  },
  {
    prop: 'textAlignH',
    title: 'Horizontal',
    type: 'droplistlink',
    data: [
      {
        id: 'flex-start',
        title: 'Left'
      },
      {
        id: 'center',
        title: 'Center'
      },
      {
        id: 'flex-end',
        title: 'Right'
      }
    ]
  },
  {
    prop: 'textAlignV',
    title: 'Vertical',
    type: 'droplistlink',
    data: [
      {
        id: 'flex-start',
        title: 'Top'
      },
      {
        id: 'center',
        title: 'Center'
      },
      {
        id: 'flex-end',
        title: 'Bottom'
      }
    ]
  },
  { 
    title: 'Rotate', 
    prop: 'textRotate', 
    type: 'number',
    step: 10,
    min: 0,
    max: 360,
  }
];


export default text;