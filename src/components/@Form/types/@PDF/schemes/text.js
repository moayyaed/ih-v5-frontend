import move from './move';


const image  = {
  main: [
    { 
      bind: false,
      lang: 'pdf_text',
      prop: 'text', 
      type: 'input',
    },
    { 
      bind: false,
      lang: 'pdf_text_color',
      prop: 'textColor', 
      type: 'color',
    },
    { 
      bind: false,
      lang: 'pdf_text_size',
      prop: 'textSize', 
      type: 'number',
      min: 0,
      max: 5000,
    },
    { 
      bind: false,
      lang: 'pdf_text_bold',
      prop: 'textBold', 
      type: 'cb',
    },
    { 
      bind: false,
      lang: 'pdf_text_italic',
      prop: 'textItalic', 
      type: 'cb',
    },
  ],
  move: move 
}


export default image;