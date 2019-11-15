import React from 'react';
import context from 'context';


function handleClick(e, id) {
  e.preventDefault();
  e.stopPropagation();

  context.actions.example.count(id);

  // ----- custom action 
  // context.action(actions => actions.example.count('test1'));

  /* ----- custom multiple actions 
  context.action(actions => [
    actions.example.count('test1'),
    actions.example.count('test2')
  ]);
  */
}

function Example({ id, state, dispatch }) {
  console.log(`render ${id}`);
  return <div onClick={(e) => handleClick(e, id)}>{state.count}</div>;
}


export default context.connect(Example);