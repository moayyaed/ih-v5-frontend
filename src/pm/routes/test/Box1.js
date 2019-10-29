import React from 'react';

import store from './store';
import { countbox } from './actions';

function test(dispatch, id) {
  dispatch(countbox(id))
}

function Box1({ id, state, dispatch }) {
  return <div onClick={() => test(dispatch, id)}>{state}</div>;
}


export default store(Box1);