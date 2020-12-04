
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
    element: [...text, ...image, ...effects],
    link: [{ type: 'actions', prop: 'actions' }],
    move: move,
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