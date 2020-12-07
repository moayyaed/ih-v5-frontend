import React from 'react';
import components from './types';

function SingleForm({ scheme, data, cache, route, onChange, getStyle }) {
  return scheme.map(i => components(i.prop, i, data[i.prop], cache[i.prop], data, route, onChange, getStyle))
}


export default SingleForm;