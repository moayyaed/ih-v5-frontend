/* eslint-disable class-methods-use-this */

import { DefaultPortFactory, DefaultPortModel } from 'storm-react-diagrams';

import { $DefaultPortModel } from './BlockNodeModel';


class BlockPortFactory extends DefaultPortFactory {
  getNewInstance(initialConfig) {
    return new $DefaultPortModel(true, 'unknown');
  }
}

export default BlockPortFactory;
