const text = [
  { 
    title: 'Текст', 
    prop: 'dividertext', 
    type: 'divider',
  },
  { 
    title: 'Значение', 
    prop: 'text', 
    type: 'inputlink',
  },
  { 
    title: 'Цвет', 
    prop: 'textColor', 
    type: 'color',
  },
  { 
    title: 'Размер', 
    prop: 'textSize', 
    type: 'number',
    min: 0,
    max: 5000,
  },
  { 
    title: 'Насыщенность', 
    prop: 'textBold', 
    type: 'cb',
  },
  { 
    title: 'Курсив', 
    prop: 'textItalic', 
    type: 'cb',
  },
  { 
    title: 'Шрифт', 
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
    title: 'Горизонталь',
    type: 'droplistlink',
    data: [
      {
        id: 'flex-start',
        title: 'Слева'
      },
      {
        id: 'center',
        title: 'Центр'
      },
      {
        id: 'flex-end',
        title: 'Справа'
      }
    ]
  },
  {
    prop: 'textAlignV',
    title: 'Вертикаль',
    type: 'droplistlink',
    data: [
      {
        id: 'flex-start',
        title: 'Вверх'
      },
      {
        id: 'center',
        title: 'Центр'
      },
      {
        id: 'flex-end',
        title: 'Вниз'
      }
    ]
  },
  { 
    title: 'Повернуть', 
    prop: 'textRotate', 
    type: 'number',
    step: 10,
    min: 0,
    max: 360,
  }
];


export default text;