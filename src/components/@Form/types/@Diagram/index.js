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

const data = JSON.parse('{"id":"3c54c59b-9892-4e79-9af5-454c6a16f8f6","offsetX":0,"offsetY":0,"zoom":75,"gridSize":0,"links":[{"id":"8063af02-198d-4069-b1c9-ab3be4632da2","type":"default","selected":false,"source":"d74439c4-f9a8-42d6-8cb0-e189adf23079","sourcePort":"a78c95b8-d1db-4c71-9e47-fd12f483f0ed","target":"c2c8a5c9-d3e7-456f-a4a9-4dce8b9f1733","targetPort":"dc7e98a8-6f12-43e3-8afe-1739a67ec22a","points":[{"id":"f3221094-a06b-46e0-afd0-5009b833efcc","selected":false,"x":223.515625,"y":79.3125},{"id":"a2f967be-991e-43f9-977a-f94192ad0288","selected":false,"x":332.5,"y":152.3125}],"extras":{},"labels":[],"width":3,"color":"rgba(255,255,255,0.5)","curvyness":50},{"id":"a37e5f30-6e50-452c-9889-bf8e7da2f23d","type":"default","selected":false,"source":"522dd780-47f1-476d-ba16-41e410a478e1","sourcePort":"40f2e1ba-2750-4718-a7bd-098462175e48","target":"c2c8a5c9-d3e7-456f-a4a9-4dce8b9f1733","targetPort":"8bcf7566-0c6c-4d51-9f73-a82ef9cd6c07","points":[{"id":"407058e5-fb90-4452-a1e4-41cfbf2a7a6c","selected":false,"x":256.5,"y":241.3125},{"id":"9db5b4df-ff5f-42f6-969f-948e892c829c","selected":false,"x":332.5,"y":175.3125}],"extras":{},"labels":[],"width":3,"color":"rgba(255,255,255,0.5)","curvyness":50},{"id":"3fb36c22-bf31-44a4-8e0d-23844e06fa62","type":"default","selected":false,"source":"c2c8a5c9-d3e7-456f-a4a9-4dce8b9f1733","sourcePort":"bb9c8bcb-126c-4e95-9686-cf8abc36a02f","target":"e581ceb2-7d67-4f68-a417-66852790bc55","targetPort":"c35d4883-4d55-4ff8-b935-5182cac32272","points":[{"id":"404ddf2a-7e00-4dfe-a165-01380721e236","selected":false,"x":424.5,"y":152.3125},{"id":"f303fdc4-2fc4-4f98-b1ad-fa41e0c2717a","selected":false,"x":502.5,"y":152.3125}],"extras":{},"labels":[],"width":3,"color":"rgba(255,255,255,0.5)","curvyness":50},{"id":"08f513c1-0b46-4b5a-a9c2-b1a923d39bf4","type":"default","selected":false,"source":"e581ceb2-7d67-4f68-a417-66852790bc55","sourcePort":"0b72dae5-faf9-4423-8b70-0dbfc5e0e25f","target":"49d1e5c8-ae62-44f4-84ef-0897e9919e90","targetPort":"e5265f20-9e66-4eb1-ae8d-f2107a3f83b9","points":[{"id":"d97c66ce-1406-4a58-aecb-a104a90acfee","selected":false,"x":593.5,"y":151.3125},{"id":"e28dde60-192a-4b41-9d48-573859a2cc5f","selected":true,"x":644.5,"y":151.3125}],"extras":{},"labels":[],"width":3,"color":"rgba(255,255,255,0.5)","curvyness":50}],"nodes":[{"id":"d74439c4-f9a8-42d6-8cb0-e189adf23079","type":"default","selected":false,"x":66,"y":42.8125,"extras":{},"ports":[{"id":"a78c95b8-d1db-4c71-9e47-fd12f483f0ed","type":"default","selected":false,"name":"93a72112-8b75-4c98-824c-d3483259c1af","parentNode":"d74439c4-f9a8-42d6-8cb0-e189adf23079","links":["8063af02-198d-4069-b1c9-ab3be4632da2"],"in":false,"label":"VALUE","max":0,"portname":"value"},{"id":"ec8f0c0c-e18c-4fbd-b050-ce50eff1d510","type":"default","selected":false,"name":"1b8d05d4-49f0-4ecd-8f7e-45b2262672bc","parentNode":"d74439c4-f9a8-42d6-8cb0-e189adf23079","links":[],"in":false,"label":"SETPOINT","max":0,"portname":"setpoint"},{"id":"dd6b6dda-c4f9-4c16-8ffc-106742057d18","type":"default","selected":false,"name":"a84d7d5a-0a1a-48e0-84bd-76785ad1576a","parentNode":"d74439c4-f9a8-42d6-8cb0-e189adf23079","links":[],"in":false,"label":"ERROR","max":0,"portname":"error"}],"name":{"class":"device","type":"SensorA","mode":"trigger","dn":"telegram_mes","style":{"width":168,"height":116},"text_size":0,"comment":"","component":"SensorA","label_dn":"telegram_mes telegram_mes"},"color":"#f4433680"},{"id":"c2c8a5c9-d3e7-456f-a4a9-4dce8b9f1733","type":"default","selected":false,"x":320,"y":115.8125,"extras":{},"ports":[{"id":"dc7e98a8-6f12-43e3-8afe-1739a67ec22a","type":"default","selected":false,"name":"dcf16494-6850-402b-af06-568507bccb09","parentNode":"c2c8a5c9-d3e7-456f-a4a9-4dce8b9f1733","links":["8063af02-198d-4069-b1c9-ab3be4632da2"],"in":true,"label":"A","max":1,"portname":"a"},{"id":"8bcf7566-0c6c-4d51-9f73-a82ef9cd6c07","type":"default","selected":false,"name":"de93b480-456f-4326-8f13-7368fcc0395a","parentNode":"c2c8a5c9-d3e7-456f-a4a9-4dce8b9f1733","links":["a37e5f30-6e50-452c-9889-bf8e7da2f23d"],"in":true,"label":"B","max":1,"portname":"b"},{"id":"bb9c8bcb-126c-4e95-9686-cf8abc36a02f","type":"default","selected":false,"name":"65f75f42-be2c-47b7-9f28-d705cb381f95","parentNode":"c2c8a5c9-d3e7-456f-a4a9-4dce8b9f1733","links":["3fb36c22-bf31-44a4-8e0d-23844e06fa62"],"in":false,"label":" ","max":1,"portname":"out"}],"name":{"class":"operation","type":"if","operator":"==","style":{"width":115,"height":73},"color":"#2196F380","text_size":0,"comment":"","component":"IF"},"color":"#2196F380"},{"id":"522dd780-47f1-476d-ba16-41e410a478e1","type":"default","selected":false,"x":67,"y":204.8125,"extras":{},"ports":[{"id":"40f2e1ba-2750-4718-a7bd-098462175e48","type":"default","selected":false,"name":"39d7d54e-62f9-44a0-bff8-4b863476b095","parentNode":"522dd780-47f1-476d-ba16-41e410a478e1","links":["a37e5f30-6e50-452c-9889-bf8e7da2f23d"],"in":false,"label":" ","max":0,"portname":"out"}],"name":{"class":"operation","type":"const","style":{"width":200,"height":48},"mode_const":"string","value_number":5,"value_string":"reboot","value_time":"12:00","value_date":"2019-01-01","value_date_time":"2019-01-01 12:00","value_weekday":"","color":"#9E9E9E80","text_size":16,"comment":"","component":"CONSTANT"},"color":"#9E9E9E80"},{"id":"e581ceb2-7d67-4f68-a417-66852790bc55","type":"default","selected":false,"x":489,"y":114.8125,"extras":{},"ports":[{"id":"c35d4883-4d55-4ff8-b935-5182cac32272","type":"default","selected":false,"name":"5541efc5-5617-488a-a040-a25c5a596a97","parentNode":"e581ceb2-7d67-4f68-a417-66852790bc55","links":["3fb36c22-bf31-44a4-8e0d-23844e06fa62"],"in":true,"label":" ","max":1,"portname":"in"},{"id":"0b72dae5-faf9-4423-8b70-0dbfc5e0e25f","type":"default","selected":false,"name":"7b241df0-5c8a-4d45-a242-b261dd700344","parentNode":"e581ceb2-7d67-4f68-a417-66852790bc55","links":["08f513c1-0b46-4b5a-a9c2-b1a923d39bf4"],"in":false,"label":" ","max":0,"portname":"out"}],"name":{"class":"operation","type":"timer","style":{"width":115,"height":70},"time":10,"color":"#673AB780","text_size":16,"comment":"","component":"TIMER"},"color":"#673AB780"},{"id":"49d1e5c8-ae62-44f4-84ef-0897e9919e90","type":"default","selected":false,"x":631,"y":113.8125,"extras":{},"ports":[{"id":"e5265f20-9e66-4eb1-ae8d-f2107a3f83b9","type":"default","selected":false,"name":"10af058d-3454-450e-bbc7-4857b5d21e62","parentNode":"49d1e5c8-ae62-44f4-84ef-0897e9919e90","links":["08f513c1-0b46-4b5a-a9c2-b1a923d39bf4"],"in":true,"label":" ","max":0,"portname":"in"},{"id":"8075b9d7-83fa-4d5e-a13f-175757fb67a1","type":"default","selected":false,"name":"22f3ce14-db71-45b6-897c-ed810725626d","parentNode":"49d1e5c8-ae62-44f4-84ef-0897e9919e90","links":[],"in":false,"label":" ","max":0,"portname":"out"}],"name":{"class":"command","type":"os_command","text":"sudo reboot","style":{"width":336,"height":70},"color":"#53EA5A80","text_size":16,"comment":"","component":"Device command"},"color":"#53EA5A80"}]}');
const a = JSON.parse('{"tabs":{"devices":{"name":"$Devices","data":[{"id":"1","icon":"sd_actor_a","name2":"$ActorA","transfer":{"type":"ActorA"}},{"id":"2","icon":"sd_actor_d","name2":"$ActorD","transfer":{"type":"ActorD"}},{"id":"3","icon":"sd_sensor_a","name2":"$SensorA","transfer":{"type":"SensorA"}},{"id":"4","icon":"sd_sensor_d","name2":"$SensorD","transfer":{"type":"SensorD"}}]},"operations":{"name":"$Operations","data":[{"id":"5","icon":"sd_and","name2":"AND","transfer":{"type":"and"}},{"id":"6","icon":"sd_or","name2":"OR","transfer":{"type":"or"}},{"id":"7","icon":"sd_if","name2":"IF","transfer":{"type":"if"}},{"id":"8","icon":"sd_between","name2":"BETWEEN","transfer":{"type":"between"}},{"id":"9","icon":"sd_not","name2":"NOT","transfer":{"type":"not"}},{"id":"10","icon":"sd_dp","name2":"$DeviceProperty","transfer":{"type":"device_property"}},{"id":"11","icon":"sd_timer","name2":"TIMER","transfer":{"type":"timer"}},{"id":"12","icon":"sd_constant","name2":"CONSTANT","transfer":{"type":"const"}},{"id":"13","icon":"sd_now","name2":"NOW","transfer":{"type":"now"}}]},"commands":{"name":"$Commands","data":[{"id":"7","icon":"sd_command","name2":"$DeviceCommand","transfer":{"type":"device_command"}},{"id":"8","icon":"sd_command_set","name2":"$SetCommand","transfer":{"type":"set_command"}},{"id":"9","icon":"sd_command_log","name2":"$LogCommand","transfer":{"type":"log_command"}},{"id":"10","icon":"sd_message","name2":"$InfoCommand","transfer":{"type":"info_command"}},{"id":"11","icon":"sd_command_plugin","name2":"$PluginCommand","transfer":{"type":"plugin_command"}},{"id":"12","icon":"sd_command_group","name2":"$GroupCommand","transfer":{"type":"group_command"}},{"id":"13","icon":"sd_command_os","name2":"$OSCommand","transfer":{"type":"os_command"}},{"id":"14","icon":"sd_command_http","name2":"$HttpCommand","transfer":{"type":"http_command"}},{"id":"15","icon":"sd_command_snap","name2":"$SnapCommand","transfer":{"type":"snap_command"}}]}}}')



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
    console.log(this.props.data)
    core.transfer.sub('diagram', this.handleTransferData);
    this.diagrams.load({
      gridSize: 0,
      offsetX: 0,
      offsetY: 0,
      zoom: 100,
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



    const disabled = {}

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
        { id: '1', title: 'Add Device', children: listElemnts(a.tabs.devices) },
        { id: '2', title: 'Add Operation', children: listElemnts(a.tabs.operations) },
        { id: '3', title: 'Add Command', children: listElemnts(a.tabs.commands) },

        // { id: '1', title: 'Add Device', type: 'remote', popupid: 'viscont', command: 'addContainer' },
        // { id: '2', title: 'Add Operation', type: 'remote', popupid: 'viscont', command: 'addContainer' },
        // { id: '3', title: 'Add Command', type: 'remote', popupid: 'viscont', command: 'addContainer' },
      ]
    }

    ContextMenu.show(<Menu disabled={disabled} commands={commands} scheme={scheme} />, pos);
  }

  handleDiagramDoubleClick = () => {

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