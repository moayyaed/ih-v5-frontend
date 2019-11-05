import React from 'react';

import context from 'context';


function test(e, dispatch, id) {
  e.preventDefault();
  e.stopPropagation();
  context.actions.example.countbox(id);
}

function Example({ id, state, dispatch }) {
  console.log('render example: ' + id);
  return <div onClick={(e) => test(e, dispatch, id)}>{state}</div>;
}


export default context.connect(Example);