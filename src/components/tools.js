export function createValueFunc(text) {
  
  try {
    return { error: null,  body: new Function('value', 'vars', 'core', text + ';return value;') }
  } catch (e) {
    return { error: e, body: null }
  }

}

export function options(list) {
  return {
      spacing: 10,
      grid: [
        {
          id: 'p1',
          xs: 2,
          class: 'main',
          height: "fill",
          padding: 4,
        },
        {
          id: 'p2',
          xs: 10,
          class: 'main',
          height: "fill",
          padding: 4,
        },
      ],
      p1: [
        {
          prop: 'bind',
          title: 'Varibals',
          type: 'list',
          data: list,
        },
      ],
      p2: [
        {
          prop: 'func',
          title: 'Function',
          type: 'script',
          mode: 'javascript',
          theme: 'tomorrow',
        },
      ],
    }
}