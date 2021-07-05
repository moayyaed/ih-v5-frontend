const border = [
  { 
    title: 'Рамка', 
    prop: 'border', 
    type: 'divider',
  },
  { 
    title: 'Цвет', 
    prop: 'borderColor', 
    type: 'color',
  },
  { 
    title: 'Размер', 
    prop: 'borderSize', 
    type: 'number',
    min: 0,
    max: 5000,
  },
  { 
    title: 'Радиус', 
    prop: 'borderRadius', 
    type: 'number',
    step: 10,
    min: 0,
    max: 100,
  },
  { 
    title: 'Стиль', 
    prop: 'borderStyle', 
    type: 'droplistlink',
    data: [
      {
        id: 'dotted',
        title: 'Dotted'
      },
      {
        id: 'dashed',
        title: 'Dashed'
      },
      {
        id: 'solid',
        title: 'Solid'
      },
      {
        id: 'groove',
        title: 'Groove'
      },
      {
        id: 'ridge',
        title: 'Ridge'
      },
      {
        id: 'inset',
        title: 'Inset'
      },
      {
        id: 'outset',
        title: 'Outset'
      },
    ]
  },
]


export default border;