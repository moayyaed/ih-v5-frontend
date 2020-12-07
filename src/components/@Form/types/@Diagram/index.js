import React, { PureComponent } from 'react';
import core from 'core';

import { 
  MosaicWithoutDragDropContext as Mosaic, MosaicWindow, 
  RemoveButton, ExpandButton, Separator, 
} from 'react-mosaic-component';

import { Button } from '@blueprintjs/core';
import { ContextMenu } from "@blueprintjs/core";

import Diagrams from 'libs/diagrams';
import Menu from 'components/Menu';

import components from './components';

import Property from './Property/index.js';
import Toolbar from './Toolbar/index.js';

import './main.css';

const menu = JSON.parse('{"tabs":{"devices":{"name":"$Devices","data":[{"id":"1","icon":"sd_actor_a","name2":"$ActorA","transfer":{"type":"ActorA"}},{"id":"2","icon":"sd_actor_d","name2":"$ActorD","transfer":{"type":"ActorD"}},{"id":"3","icon":"sd_sensor_a","name2":"$SensorA","transfer":{"type":"SensorA"}},{"id":"4","icon":"sd_sensor_d","name2":"$SensorD","transfer":{"type":"SensorD"}}]},"operations":{"name":"$Operations","data":[{"id":"5","icon":"sd_and","name2":"AND","transfer":{"type":"and"}},{"id":"6","icon":"sd_or","name2":"OR","transfer":{"type":"or"}},{"id":"7","icon":"sd_if","name2":"IF","transfer":{"type":"if"}},{"id":"8","icon":"sd_between","name2":"BETWEEN","transfer":{"type":"between"}},{"id":"9","icon":"sd_not","name2":"NOT","transfer":{"type":"not"}},{"id":"10","icon":"sd_dp","name2":"$DeviceProperty","transfer":{"type":"device_property"}},{"id":"11","icon":"sd_timer","name2":"TIMER","transfer":{"type":"timer"}},{"id":"12","icon":"sd_constant","name2":"CONSTANT","transfer":{"type":"const"}},{"id":"13","icon":"sd_now","name2":"NOW","transfer":{"type":"now"}}]},"commands":{"name":"$Commands","data":[{"id":"7","icon":"sd_command","name2":"$DeviceCommand","transfer":{"type":"device_command"}},{"id":"8","icon":"sd_command_set","name2":"$SetCommand","transfer":{"type":"set_command"}},{"id":"9","icon":"sd_command_log","name2":"$LogCommand","transfer":{"type":"log_command"}},{"id":"10","icon":"sd_message","name2":"$InfoCommand","transfer":{"type":"info_command"}},{"id":"11","icon":"sd_command_plugin","name2":"$PluginCommand","transfer":{"type":"plugin_command"}},{"id":"12","icon":"sd_command_group","name2":"$GroupCommand","transfer":{"type":"group_command"}},{"id":"13","icon":"sd_command_os","name2":"$OSCommand","transfer":{"type":"os_command"}},{"id":"14","icon":"sd_command_http","name2":"$HttpCommand","transfer":{"type":"http_command"}},{"id":"15","icon":"sd_command_snap","name2":"$SnapCommand","transfer":{"type":"snap_command"}}]}}}')


const styles = {
  root: {
    width: '100%',
    height: '100%',
  }
}

const EMPTY_ARRAY = [];
const EMPTY_STYLE = {};
const TITLES = {
  sheet: 'Diagram',
  toolbar: '',
  property: '',

}

const state = {
  windows: {
    mode: 0,
    direction: 'row',
    first: "sheet",
    second: {
      direction: 'column',
      first: "toolbar",
      second: "property",
      splitPercentage: 35,
    },
    splitPercentage: 75,
  },
  select: null,
  property: {},
}


class Diagram extends PureComponent {
  state = state;

  componentDidMount() {
    core.transfer.sub('diagram', this.handleTransferData);
    this.diagrams.load({
      gridSize: 0,
      offsetX: 0,
      offsetY: 0,
      zoom: 85,
      links: [],
      nodes: [],
    });
  }

  componentWillUnmount() {
    core.transfer.unsub('diagram', this.handleTransferData);
    this.isSave = null;
    this.diagrams.clearAll();
  }

  handleTransferData = (button, save, reset) => {
    if (button === 'save') {
      const data = this.diagrams.getEngine().getDiagramModel().serializeDiagram();
      Object.keys(data.nodes)
        .forEach((key) => {
          delete data.nodes[key].name.render;
          data.nodes[key].selected = false;
        });
      delete data.id;
      save(data)
    } else {
      reset();
    }
  }

  save = () => {
    if (!this.isSave) {
      this.isSave = true;
      core.actions.apppage.data({ save: 'diagram' })
    }
  }

  handleChangeWindows = (data) => {
    this.setState(state => {
      return { ...state, windows: data };
    });
  }

  handleChangeToolbar = (toolbarId) => {
    core.actions.container
      .data(
        this.props.id, this.props.options.prop,
        { toolbarType: toolbarId }
      );
  }

  handleChangeValueProperty = (key, value) => {
    this.setState(state => {
      return {
        ...state,
        property: {
          ...state.property,
          [key]: value,
        }
      }
    })
    this.diagrams.updateSettings(this.state.select, key, value);
    this.save();
  }

  handleChangeValueProperty2 = (key, value) => {
    this.save();
  }

  handleGetStyleProperty = (params) => {
    return EMPTY_STYLE;
  }

  handleChangeProperty = (propertyId) => {
    core.actions.container
      .data(
        this.props.id, this.props.options.prop,
        { propertyType: propertyId }
      );
  }

  renderButtons = (id) => {
    if (id === 'property') {
      const select = this.props.data.propertyType || 'main';
      return [
        <Button 
          key="3"
          minimal
          active={select === 'main'} 
          icon="properties"  
          onClick={() => this.handleChangeProperty('main')} 
        />,
      ];
    }

    if (id === 'toolbar') {
      const select = this.props.data.toolbarType || 'tree';
      return [
        <Button 
          key="3"
          minimal
          icon="diagram-tree" 
          active={select === 'tree'}
          onClick={() => this.handleChangeToolbar('tree')} 
        />,
      ];
    }
    return [];
  }

  renderDownToolbar = (id) => {
    return null;
  }

  handleClickTreeElement = (elementId) => {
    core.actions.container
      .select(
        this.props.id, this.props.options.prop,
        elementId
      );
  }

  handleClickOptionToolbarMenu = (command, type, props) => {
    if (type === 'element') {
      core.actions.container
        .select(
          this.props.id, this.props.options.prop,
          props.nodeId
        );
      core.actions.container
        .deleteElement(this.props.id, this.props.options.prop);
    }
    this.save();
  }

  handleState = (state) => {
    this.setState(state);
  }

  handleAddElement = (e, type, menuItemId, title) => {
    const engine = this.diagrams.getEngine();
    const native = engine.getRelativeMousePoint(e)
    
    this.diagrams.addBlock(components[type], { x: native.x, y: native.y });
  }

  handleDropBlock = () => {

  }

  handleBodyClick = () => {

  }

  handleContextMenuBodyClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    e.persist();

    const disabled = {
      delete: true,
    }

    const commands = {

    };

    const pos = { left: e.clientX, top: e.clientY };
    const listElemnts = (data) => {
      return data.data.map((i, k) => {
        return { id: k, title: i.name2, click: () => this.handleAddElement(e, i.transfer.type) }
      })
    }

    const scheme = {
      main: [
        { id: '1', title: 'Add Device', children: listElemnts(menu.tabs.devices) },
        { id: '2', title: 'Add Operation', children: listElemnts(menu.tabs.operations) },
        { id: '3', title: 'Add Command', children: listElemnts(menu.tabs.commands) },
        { id: '4', type: 'divider' },
        { id: '5', title: 'Delete', check: 'delete', click: () => {} },
      ]
    }

    ContextMenu.show(<Menu disabled={disabled} commands={commands} scheme={scheme} />, pos);
  }

  handleDiagramDoubleClick = () => {

  }

  handleContextMenuClick = (e, item) => {
    const disabled = {}
    const commands = {};

    const pos = { left: e.clientX, top: e.clientY };
    const listElemnts = (data) => {
      return data.data.map((i, k) => {
        return { id: k, title: i.name2, click: () => this.handleAddElement(e, i.transfer.type) }
      })
    }

    const scheme = {
      main: [
        { id: '1', title: 'Add Device', children: listElemnts(menu.tabs.devices) },
        { id: '2', title: 'Add Operation', children: listElemnts(menu.tabs.operations) },
        { id: '3', title: 'Add Command', children: listElemnts(menu.tabs.commands) },
        { id: '4', type: 'divider' },
        { id: '5', title: 'Delete', click: () => this.handleDeleteBlock(item) },
      ]
    }

    ContextMenu.show(<Menu disabled={disabled} commands={commands} scheme={scheme} />, pos);
  }

  handleContextMenuClickLink = (e, item) => {
    const disabled = {}
    const commands = {};

    const pos = { left: e.clientX, top: e.clientY };
    const listElemnts = (data) => {
      return data.data.map((i, k) => {
        return { id: k, title: i.name2, click: () => this.handleAddElement(e, i.transfer.type) }
      })
    }

    const scheme = {
      main: [
        { id: '1', title: 'Add Device', children: listElemnts(menu.tabs.devices) },
        { id: '2', title: 'Add Operation', children: listElemnts(menu.tabs.operations) },
        { id: '3', title: 'Add Command', children: listElemnts(menu.tabs.commands) },
        { id: '4', type: 'divider' },
        { id: '5', title: 'Delete', click: () => this.handleDeleteLink(item) },
      ]
    }

    ContextMenu.show(<Menu disabled={disabled} commands={commands} scheme={scheme} />, pos);
  }

  handleDeleteLink = (item) => {
    this.diagrams.removeBlock(item.id);
    this.save();
  }

  handleDeleteBlock = (item) => {
    this.diagrams.removeBlock(item.id)
    this.save();
  }

  handleDiagramSelect = (item) => {
    if (item.isSelected) {
      const select = item.entity.id;
      const property = this.diagrams.getEngine().getDiagramModel().nodes[select].name;
      this.setState({ select, property });
    }
  }

  handleDiagramSelectLink = () => {
    
  }

  handleSave = () => {
    this.save();
  }

  handleRemoveBS = (e, items) => {
    if (e.keyCode === 8 && items.length) {
      this.setState(state => {
        return {
          ...state,
          select: null,
          property: {},
        }
      }, () => this.diagrams.removeBlock(this.props.select));
    }
  }

  link = (e) => {
    this.diagrams = e;
  }

  renderComponent = (id) => {
    if (id === 'sheet') {
      return (
        <Diagrams
          ref={this.link}
          onDrop={this.handleDropBlock}
          onBodyClick={this.handleBodyClick}
          onContextMenuBodyClick={this.handleContextMenuBodyClick}
          onDoubleClick={this.handleDiagramDoubleClick}
          onContextMenu={this.handleContextMenuClick}
          onContextMenuLink={this.handleContextMenuClickLink}
          onSelect={this.handleDiagramSelect}
          onSelectLink={this.handleDiagramSelectLink}
          onStopDrag={this.handleSave}
          onRemoveBS={this.handleRemoveBS}
        />
      );
    }
    if (id === 'toolbar') {
      return (
        <Toolbar
          type={this.props.data.toolbarType || 'tree'}
          selectElements={this.props.data.selects || {} }
          listElements={this.props.data.list || []}
          elements={this.props.data.elements || {}}
          onClickElement={this.handleClickTreeElement}
          onClickMenu={this.handleClickOptionToolbarMenu}
          onChange={this.handleChangeValueProperty2}
          data={this.props.data.settings}
          getStyle={this.handleGetStyleProperty}
        />
      )
    }
    if (id === 'property') {
      return (
        <Property
          type={this.props.data.propertyType || 'main'}
          elementId={this.state.select}
          data={this.state.property}
          onChange={this.handleChangeValueProperty}
          getStyle={this.handleGetStyleProperty}
        />
      )
    }
    return null;
  }

  render() {
    return (
      <div style={styles.root} >
        <Mosaic
          className="mosaic-blueprint-theme"
          value={this.state.windows}
          onChange={this.handleChangeWindows}
          renderTile={(id, path) => {
            return (
              <MosaicWindow
                key={id}
                className={id}
                draggable={false}
                title={TITLES[id]}
                additionalControls={EMPTY_ARRAY}
                path={path}
                renderToolbar={null}
                toolbarControls={this.renderButtons(id)}
                renderPreview={() => this.renderDownToolbar(id)}
              >
                {this.renderComponent(id)}
              </MosaicWindow>
            )
          }}
        />
      </div>
    )
  }
}


export default Diagram;