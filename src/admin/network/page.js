import core from 'core';

import { graphDataL } from '../temp';


core.network.on('page::table', (res, data) => {
  setTimeout(() => {
    res([]);
  }, 0)
});

core.network.on('page::options', (res, data) => {
  setTimeout(() => {
    res([]);
  }, 0)
});

core.network.on('page::layout', (res, data) => {
  setTimeout(() => {
    res([]);
  }, 0)
});

core.network.on('page::template', (res, data) => {
  setTimeout(() => {
    res(graphDataL);
  }, 0)
});