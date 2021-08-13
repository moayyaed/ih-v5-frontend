
import background from './background';
import border from './border';
import text from './text';
import image from './image';
import decoration from './decoration';
import effects from './effects';
import move from './move';

import group from './group';
import action from './action';

import template from './template';


export const main = [...background, ...border, ...decoration];


const elements = {
  block: { main: main, move: move },
  rectangle: { main: main, move: move },
  circle: { main: main, move: move },
  text: {
    main: main,
    element: text,
    move: move,
  },
  image: {
    main: main,
    element: image,
    move: move,
  },
  text_image: {
    main: main,
    element: [...text, ...image],
    move: move,
  },
  button: {
    main: main,
    element: [  
      { 
        title: 'Кнопка', 
        prop: '_button', 
        type: 'divider', //ratio
      },
      {
        prop: 'imgPosition',
        title: 'Ориентация',
        type: 'droplistlink',
        data: [
          {
            id: 'top',
            title: 'Сверху'
          },
          {
            id: 'bottom',
            title: 'Снизу'
          },
          {
            id: 'center',
            title: 'Центр'
          },
          {
            id: 'left',
            title: 'Слева'
          },
          {
            id: 'right',
            title: 'Справа'
          },
        ]
      },
      { 
        title: 'Соотношение', 
        prop: 'imgRatio', 
        type: 'number',
        step: 5,
        min: 0,
        max: 100,
      },
      ...text, 
      ...image, 
      ...effects],
    link: [{ type: 'actions', prop: 'actions' }],
    move: move,
  },
  iframe: { 
    main: main, 
    move: move,
    element: [
      { 
        title: 'Iframe', 
        prop: '_iframe', 
        type: 'divider',
      },
      { 
        title: 'Url', 
        prop: 'url', 
        type: 'inputlink',
      },
    ] 
  },
  html: { 
    main: main, 
    move: move,
    element: [
      { 
        title: 'Html', 
        prop: '_html', 
        type: 'divider',
      },
      { 
        title: 'code', 
        prop: 'code', 
        type: 'html',
      },
    ] 
  },
  group: group,
  action: action,
  action2: {
    main: [...effects],
    link: [{ type: 'actions', prop: 'actions' }],
    move: move,
  },
  template: {
    link: [],
    ...template,
  },
};


export default elements;