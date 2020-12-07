/* eslint-disable class-methods-use-this */


import React from 'react';
import { AbstractNodeFactory } from 'storm-react-diagrams';

import NodeWidget from './NodeWidget';
import NodeModel from './NodeModel';


class $NodeFactory extends AbstractNodeFactory {
  constructor() {
    super('diamond');
  }

  generateReactWidget(diagramEngine, node) {
    return <NodeWidget node={node} />;
  }

  getNewInstance() {
    return new NodeModel();
  }
}


export default $NodeFactory;
