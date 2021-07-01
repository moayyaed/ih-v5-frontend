import core from 'core';
import { generateOptions, generateCache } from './tools';


core.network.request('appdialog_devlink', (send, context) => {
  send({ 
    method: 'get', 
    type: 'link',
    dialogid: context.params.dialogid,
    id: 'devicelink',
    nodeid: context.params.id,
    root: context.params.rootid,
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
    dialogid: context.params.dialogid,
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
    dialogid: context.params.dialogid,
    id: 'elementlink',
    nodeid: context.params.id,
    root: context.params.rootid,
    anchor: context.props.anchor,
  });
})

core.network.response('appdialog_elementlink', (answer, res, context) => {
  answer(res);
})

core.network.request('appdialog_setvalue', (send, context) => {
  send({ 
    method: 'get', 
    type: 'link',
    dialogid: context.params.dialogid,
    id: 'setvalue',
    nodeid: context.params.id,
    anchor: context.props.anchor,
  });
})

core.network.response('appdialog_setvalue', (answer, res, context) => {
  answer(res);
})

core.network.request('appdialog_imagegrid', (send, context) => {
  send({ 
    method: 'get', 
    type: 'link',
    dialogid: context.params.dialogid,
    id: 'imagegrid',
    nodeid: context.params.id,
  });
})

core.network.response('appdialog_imagegrid', (answer, res, context) => {
  answer(res);
})


core.network.request('browse_submit', (send, context) => {
  send({ 
    method: 'insert', 
    type: 'browse',
    id: 'channels',
    unit: context.params.unit,
    nodeid: context.params.nodeid,
    payload: context.payload,
  });
})

core.network.response('browse_submit', (answer, res, context) => {
  answer(res);
})
