/* eslint-disable class-methods-use-this */

import React from 'react';

import { DefaultLinkFactory } from 'storm-react-diagrams';
import BlockLinkWidget from './BlockLinkWidget';

import { $DefaultLinkModel } from './BlockNodeModel';


class BlockLinkFactory extends DefaultLinkFactory {
  generateReactWidget(diagramEngine, link) {
    return React.createElement(BlockLinkWidget, {
      link,
      diagramEngine,
    });
  }

  getNewInstance(initialConfig) {
    return new $DefaultLinkModel();
  }
}

export default BlockLinkFactory;
