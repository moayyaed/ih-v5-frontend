const border = [
  { 
    title: 'Border', 
    prop: 'border', 
    type: 'divider',
  },
  { 
    title: 'Color', 
    prop: 'borderColor', 
    type: 'color',
  },
  { 
    title: 'Size', 
    prop: 'borderSize', 
    type: 'number',
    min: 0,
    max: 5000,
  },
  { 
    title: 'Radius', 
    prop: 'borderRadius', 
    type: 'number',
    step: 10,
    min: 0,
    max: 100,
  },
  { 
    title: 'Style', 
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