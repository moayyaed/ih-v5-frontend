/* eslint-disable class-methods-use-this */

import React from 'react';

import { DefaultNodeFactory } from 'storm-react-diagrams';

import DefaultNodeWidget from '../default';
import BlockNodeModel from './BlockNodeModel';

class BlockNodeFactory extends DefaultNodeFactory {
  generateReactWidget(diagramEngine, node) {
    return React.createElement(DefaultNodeWidget, { node, diagramEngine });
  }

  getNewInstance(initialConfig) {
    return new BlockNodeModel();
  }
}

export default BlockNodeFactory;
