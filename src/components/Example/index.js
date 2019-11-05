import React from 'react';

import context from 'context';


function handleClick(e, id) {
  e.preventDefault();
  e.stopPropagation();

  context.actions.example.count(id);
}

function Example({ id, state, dispatch }) {
  return <div onClick={(e) => handleClick(e, id)}>{state.count}</div>;
}


export default context.connect(Example);