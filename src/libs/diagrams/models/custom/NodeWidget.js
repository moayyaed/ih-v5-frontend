/* eslint-disable class-methods-use-this */

import React, { Component } from 'react';
import { PortWidget } from 'storm-react-diagrams';

const styles = {
  root: {
    position: 'relative',
    width: 100,
    height: 100,
    background: 'rgb(0, 192, 255)',
    display: 'flex',
    flexDirection: 'column',
  },
};

class $NodeWidget extends Component {
  state = {};

  render() {
    return (
      <div
        className="srd-default-node"
        style={styles.root}
      >
        <div className="srd-default-node__title ih">
          <div className="srd-default-node__name ">MOTION_1</div>
        </div>
        <div className="srd-default-node__ports ih">
          <div className="srd-default-node__in ">
            <div className="srd-default-port srd-default-port--in ">
              <PortWidget name="on" node={this.props.node} />
              <div className="name">IN</div>
            </div>
          </div>
          <div className="srd-default-node__out ">
            <div className="srd-default-port srd-default-port--out ">
              <div className="name">OUT</div>
              <PortWidget name="on" node={this.props.node} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

$NodeWidget.defaultProps = {
  size: 150,
  node: null,
};


export default $NodeWidget;
