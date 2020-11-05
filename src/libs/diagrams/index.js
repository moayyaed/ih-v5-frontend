/* eslint-disable class-methods-use-this */

import React, { Component } from 'react';
import * as _ from 'lodash';

import { DiagramEngine, DiagramModel, DiagramWidget } from 'storm-react-diagrams';

import BlockNodeModel from './models/block/BlockNodeModel';
import BlockLabelFactory from './models/block/BlockLabelFactory';
import BlockNodeFactory from './models/block/BlockNodeFactory';
import BlockLinkFactory from './models/block/BlockLinkFactory';
import BlockPortFactory from './models/block/BlockPortFactory';

import getBlockSettings from './models/getBlockSettings';

import 'storm-react-diagrams/dist/style.min.css';
import './style.css';

function customInstallDefaultFactories() {
  this.registerNodeFactory(new BlockNodeFactory());
  this.registerLinkFactory(new BlockLinkFactory());
  this.registerPortFactory(new BlockPortFactory());
  this.registerLabelFactory(new BlockLabelFactory());
}

class $DiagramWidget extends DiagramWidget {
  onKeyUp(e) {
    this.props.onRemoveBS(e, this.props.diagramEngine.getDiagramModel().getSelectedItems());
	}
}


const engine = new DiagramEngine();
engine.installDefaultFactories = customInstallDefaultFactories;
engine.installDefaultFactories();

engine.setDiagramModel(new DiagramModel());

function createBlock(_engine, type, options, handleEvent, handleDoubleClick, handleContextMenu, handleContextMenuLink) {
  const settings = getBlockSettings(type, options);
  const block = new BlockNodeModel(settings.params, settings.color);

  block.setPosition(settings.x, settings.y);

  settings.in.forEach((item) => {
    const port = block.addInPort(item.label);
    port.portname = item.portname;
    port.max = item.max;
  });

  settings.out.forEach((item) => {
    const port = block.addOutPort(item.label);
    port.portname = item.portname;
    port.max = item.max;
  });

  block.addListener({ 
    selectionChanged: handleEvent, 
    entityRemoved: handleEvent, 
    doubleClick: handleDoubleClick, 
    contextMenu: handleContextMenu,
    contextMenuLink: handleContextMenuLink,
  });

  _engine.getDiagramModel().addNode(block);
}


class Diagrams extends Component {

  getEngine() {
    return this.link.props.diagramEngine;
  }

  linked = (e) => {
    this.link = e;
  }

  addBlock(type, options) {
    createBlock(engine, type, options, this.handleEvent, this.handleDoubleClick, this.handleContextMenu, this.handleContextMenuLink);
    this.forceUpdate();
  }

  removeBlock(id) {
    _.forEach(this.link.props.diagramEngine.getDiagramModel().getSelectedItems(), (element) => {
      if (!this.link.props.diagramEngine.isModelLocked(element)) {
        try {
          this.link.props.diagramEngine.getDiagramModel().removeNode(element.id);
        } catch (e) {
        }
        try {
          element.remove();
        } catch (e) {
        }
      }
    });
    this.forceUpdate();
  }

  updateSettings(id, key, value, label) {
    const model = engine.getDiagramModel();
    if (model.nodes[id]) {
      if (label || label === '') {
        model.nodes[id].name[`label_${key}`] = label;
      }
      model.nodes[id].name[key] = value;
      const settings = getBlockSettings({ params: model.nodes[id].name }, {});
      model.nodes[id].color = settings.color;
      model.nodes[id].name = settings.params;
      engine.repaintCanvas();
    }
  }

  clearAll() {
    const model = new DiagramModel();
    model.selectLinkEvent = this.handleSelectLink;
    engine.setDiagramModel(model);
    this.forceUpdate();
  }

  load(data) {
    if (data === null) {
      this.clearAll();
    } else {
      const model = new DiagramModel();
      model.deSerializeDiagram(data, engine);
      model.selectLinkEvent = this.handleSelectLink;
      Object.keys(model.nodes).forEach((key) => {
        const settings = getBlockSettings({ params: model.nodes[key].name }, {});
        model.nodes[key].color = settings.color;
        model.nodes[key].name = settings.params;
        model.nodes[key].addListener({
          selectionChanged: this.handleEvent,
          entityRemoved: this.handleEvent,
          doubleClick: this.handleDoubleClick,
          contextMenu: this.handleContextMenu,
          contextMenuLink: this.handleContextMenuLink,
        });
      });
      engine.setDiagramModel(model);
    }
  }

  handleDoubleClick = (e, node) => {
    e.stopPropagation();
    this.props.onDoubleClick(e, node)
  }

  handleContextMenu = (e, node) => {
    e.stopPropagation();
    e.preventDefault();
    
    this.props.onContextMenu(e, node)
  }

  handleContextMenuLink = (e, node) => {
    e.stopPropagation();
    e.preventDefault();
    
    this.props.onContextMenuLink(e, node)
  }

  handleEvent = (e) => {
    this.props.onSelect(e)
  }

  handleBodyClick = (e) => {
    if (e.target.className === 'srd-diagram srd-ih-canvas ') {
      this.props.onBodyClick(e);
    } else {
      if (typeof e.target.className === 'object' && e.target.className.baseVal === 'srd-link-layer ') {
        this.props.onBodyClick(e);
      }
    }
  }

  handleContextBodyMenu = (e) => {
    this.props.onContextMenuBodyClick(e);
  }

  handleStopDrag = (e) => {
    this.props.onStopDrag(e);
    return true;
  }

  handleSelectLink = () => {
    this.props.onSelectLink();
  }

  render() {
    return (
      <div 
        onClick={this.handleBodyClick}
        onContextMenu={this.handleContextBodyMenu} 
        style={{ width: '100%', height: '100%', position: 'relative' }}
      >
        <$DiagramWidget
          ref={this.linked}
          actionStoppedFiring={this.handleStopDrag}
          smartRouting={false}
          className="srd-ih-canvas"
          diagramEngine={engine}
          onRemoveBS={this.props.onRemoveBS}
        />
      </div>
    );
  }
}


export default Diagrams;
