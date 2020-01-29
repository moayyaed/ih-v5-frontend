import core from 'core';

import { 
  graphDataL,
  graphDataL1
} from '../temp';


core.events.on('app:page', (pageid, component) => {
  core.app.page.data({ component, pageid }, graphDataL)
});

core.events.on('app:page:template_1', (pageid, component) => {
  core.app.page.data({ component, pageid }, graphDataL1)
});
