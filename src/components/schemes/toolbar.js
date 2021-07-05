const scheme = {
  settings: [
    { 
      title: 'Настройки разработки', 
      prop: 'settings', 
      type: 'divider',
    },
    { 
      title: 'Сетка', 
      prop: 'grid', 
      type: 'number',
      step: 1,
      min: 1,
      max: 100,
      bind: false,
    },
    { 
      title: 'Масштаб', 
      prop: 'scale', 
      type: 'number',
      step: 0.1,
      min: 0.1,
      max: 8,
      bind: false,
    },
    {
      title: 'Фон',
      prop: 'devBackgroundColor',
      type: 'color',
      bind: false,
    }
  ],
}


export default scheme;