import core from 'core';

import { graphDataL } from '../temp';


core.network.on('page', (res, data) => {
  setTimeout(() => {
    res(graphDataL);
  }, 4500)
});