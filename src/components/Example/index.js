import React from 'react';

import context from 'context';


function test(e, dispatch, id) {
  e.preventDefault();
  e.stopPropagation();
  context.actions.example.count(id);
}

function Example({ id, state, dispatch }) {
  return <div onClick={(e) => test(e, dispatch, id)}>{state.count}</div>;
}


export default context.connect(Example);