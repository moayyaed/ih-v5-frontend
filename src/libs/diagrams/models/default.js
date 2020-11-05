/* eslint-disable class-methods-use-this */

import React from 'react';
import * as _ from 'lodash';

import { DefaultNodeWidget } from 'storm-react-diagrams';
import DefaultPortLabel from './block/BlockPortLabel';

function getValueT0(value) {
  if (value === 'TURNONSAVEAUTO') {
    return 'ON save Auto';
  }
  if (value === 'TURNOFFSAVEAUTO') {
    return 'OFF save Auto';
  }
  return value;
}


class $Default extends DefaultNodeWidget {

  generatePort(port) {
    return <DefaultPortLabel model={port} key={port.id} />;
  }

  handleDoubleClick = (e) => {
    Object.keys(this.props.node.listeners)
      .forEach(key => {
        if (this.props.node.listeners[key].doubleClick) {
          this.props.node.listeners[key].doubleClick(e, this.props.node);
        };
      });
  }

  handleContextMenu = (e) => {
    Object.keys(this.props.node.listeners)
    .forEach(key => {
      if (this.props.node.listeners[key].contextMenu) {
        this.props.node.listeners[key].contextMenu(e, this.props.node);
      };
    });
  }

  render() {
    return (
      <div {...this.getProps()} onDoubleClick={this.handleDoubleClick} onContextMenu={this.handleContextMenu} style={{ background: this.props.node.color, ...this.props.node.name.style }}>
        <div className={this.bem('__title')}>
          <div className={this.bem('__name')}>{this.props.node.name.render.L2}</div>
        </div>
        <div className="srd-default-node__body">
          <div className={this.bem('__ports')}>
            <div className={this.bem('__textcenter_0')}><div className="text_body">{getValueT0(this.props.node.name.render.T0)}</div></div>
            <div className={this.bem('__in')}>
              {_.map(this.props.node.getInPorts(), this.generatePort.bind(this))}
            </div>
            <div className={this.bem('__out')}>
              {_.map(this.props.node.getOutPorts(), this.generatePort.bind(this))}
            </div>
          </div>
          <div className={this.bem('__textcenter_1')} style={this.props.node.name.render.STYLE_T1}>
            <div className="text_body">{this.props.node.name.render.T1}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default $Default;
