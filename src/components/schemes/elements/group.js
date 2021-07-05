const group = {
  main: [
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
      title: 'Непрозрачность', 
      prop: 'opacity', 
      type: 'number',
      step: 5,
      min: 0,
      max: 100,
    },
    {
      title: 'Видимый',
      prop: 'visible',
      type: 'cb',
    }
  ],
  move: [
    { 
      title: 'Позиция', 
      prop: 'position', 
      type: 'divider',
    },
    { 
      title: 'X', 
      prop: 'x', 
      type: 'number',
    },
    { 
      title: 'Y', 
      prop: 'y', 
      type: 'number',
    },
    { 
      title: 'Ширина', 
      prop: 'w', 
      type: 'text',
    },
    { 
      title: 'Высота', 
      prop: 'h', 
      type: 'text',
    },
    { 
      title: 'Обрезать', 
      prop: 'overflow', 
      type: 'cb',
    },
    { 
      title: 'Положение элемента', 
      prop: 'zIndex', 
      type: 'number',
      min: -100,
      max: 5000,
    },
  ],
}


export default group;