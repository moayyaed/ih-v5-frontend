const decoration = [
  { 
    title: 'Украшение', 
    prop: 'decoration', 
    type: 'divider',
  },
  { 
    title: 'Анимация', 
    prop: 'animation', 
    type: 'animation',
  },
  { 
    title: 'Тень', 
    prop: 'boxShadow', 
    type: 'shadow',
  },
  { 
    title: 'Непрозрачность', 
    prop: 'opacity', 
    type: 'number',
    step: 5,
    min: 0,
    max: 100,
  },
  {
    title: 'Visible',
    prop: 'visible',
    type: 'cb',
  }
];


export default decoration