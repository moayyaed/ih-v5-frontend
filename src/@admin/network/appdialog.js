import core from 'core';
import { generateOptions, generateCache } from './tools';


core.network.request('appdialog_devlink', (send, context) => {
  send({ 
    method: 'get', 
    type: 'link',
    dialogid: context.params.dialogid,
    id: 'devicelink',
    nodeid: context.params.id,
    anchor: context.props.anchor,
  });
})

core.network.response('appdialog_devlink', (answer, res, context) => {
  answer(res);
})



core.network.request('appdialog_channellink', (send, context) => {
  send({ 
    method: 'get', 
    type: 'link',
    id: 'channellink',
    nodeid: context.params.id,
    anchor: context.props.anchor,
  });
})

core.network.response('appdialog_channellink', (answer, res, context) => {
  answer(res);
})

core.network.request('appdialog_elementlink', (send, context) => {
  send({ 
    method: 'get', 
    type: 'link',
    id: 'elementlink',
    nodeid: context.params.id,
    anchor: context.props.anchor,
  });
})

core.network.response('appdialog_elementlink', (answer, res, context) => {
  answer(res);
})





