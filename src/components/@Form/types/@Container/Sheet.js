import React, { Component } from 'react';
import core from 'core';

import { ContextMenu } from "@blueprintjs/core";

import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

import Element from './Element';
import Menu from 'components/Menu';


const styles = {
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    perspective: 1000,
    WebkitPerspective: 1000,
  },
  sheet: {
    transformOrigin: '0 0',
    position: 'absolute',
    borderRadius: 0,
    backgroundSize: '50px 50px',
    // backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogPGxpbmUgeDE9IjEwMCIgeTE9IjAiIHgyPSIxMDAiIHkyPSIxMDAiIHN0cm9rZT0iIzc1NzU3NSIgLz4NCiA8bGluZSB4MT0iMCIgeTE9IjEwMCIgeDI9IjEwMCIgeTI9IjEwMCIgc3Ryb2tlPSIjNzU3NTc1IiAvPg0KPC9zdmc+')",
  },
}


function getAllElementsByGroup(list, elements) {
  return list
    .reduce((p, c) => {
      if (elements[c].type === 'group') {
        return {
          ...p,
          [c]: true,
          ...getAllElementsByGroup(elements[c].elements, elements)
        };
      }
      return {
        ...p,
        [c]: true,
      };
    }, {});
} 

function getIdElement(index, prefix, elements) {
  if (elements[`${prefix}_${index + 1}`] === undefined) {
    return `${prefix}_${index + 1}`;
  }
  return getIdElement(index + 1, prefix, elements);
}


class Sheet extends Component {

  componentDidMount() {
    core.transfer.sub('container', this.handleTransferData);

  }

  componentWillUnmount() {
    core.transfer.unsub('container', this.handleTransferData);
    this.isSave = null;
    this.dragSelectContainer = null;
  }

  handleTransferData = (button, save, reset) => {
    if (button === 'save') {
      this.isSave = null;
      save({
        [this.props.id]: {
          [this.props.prop]: {
            settings: this.props.settings,
            list: this.props.list,
            elements: this.props.elements,
          }
        }
      })
    } else {
      reset();
    }
  }

  save = () => {
    if (!this.isSave) {
      this.isSave = true;
      core.actions.apppage.data({ save: 'container' })
    }
  }

  handleMouseUpContainer = (e) => {

  }

  handleMouseDownContainer = (e) => {

  }

  handleMouseWhellContainer = (e) => {
    const isTouchPad = e.nativeEvent.wheelDeltaY ? 
    e.nativeEvent.wheelDeltaY === -3 * e.nativeEvent.deltaY : e.nativeEvent.deltaMode === 0;

    const offset = this.container.getBoundingClientRect();

    let x = this.props.settings.x;
    let y = this.props.settings.y;
    let s = this.props.settings.scale;

    const px = e.pageX - offset.left;
    const py = e.pageY - offset.top;

    const tx = (px - x) / s;
    const ty = (py - y) / s;

    if (isTouchPad) {
      if (e.deltaY > 0) {
        s -= (e.deltaY * 1 / 450)
      } else {
        s += (e.deltaY * -1 / 450)
      }
    } else {
      s += Math.max(-1, Math.min(1, e.deltaY)) * -0.1 * s;
    }

    if (s > 8) {
      s = 8;
    }
    if (s < 0.1 ) {
      s = 0.1;
    }

    x = -tx * s + px
    y = -ty * s + py

    core.actions.container
      .settings(
        this.props.id, this.props.prop,
        { x, y, scale: s }
      );
  }

  handleClickSheet = (e) => {

  }

  handleContextMenuSheet = (e) => {

  }

  handleMoveSheet = (e) => {
 
  }

  handleStopMoveSheet = (e, data) => {
    core.actions.container
      .settings(
        this.props.id, this.props.prop,
        { x: data.x, y: data.y }
      );
    this.save();
  }

  handleStartMoveElement = (e, elementId, data) => {
    e.preventDefault();
    e.stopPropagation();
  }

  handleMoveElement = (e, elementId, data) => {

  }

  handleStopMoveElement = (e, elementId, data) => {
    e.preventDefault();
    e.stopPropagation();

    core.actions.container
      .editElement(
        this.props.id, this.props.prop,
        elementId, { x: data.x, y: data.y }
      );
    this.save();
  }

  handleChangeSizeElement = (e, elementId, position, type) => {
    e.preventDefault();
    e.stopPropagation();

    const element = this.props.elements[elementId];

    if (element.type === 'group') {
      const childs = getAllElementsByGroup(element.elements, this.props.elements);
      core.actions.container
        .resizeGroupElement(
          this.props.id, this.props.prop,
          elementId, position, childs,
        );
    } else {
      core.actions.container
        .editElement(
          this.props.id, this.props.prop,
          elementId, position
        );
    }
    this.save();
  }

  handleClickElement = (e, elementId) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.shiftKey && this.props.selectType !== null) {
      if (this.props.selects[elementId] === undefined) {
        const data = { x: Infinity, y: Infinity, w: 0, h: 0 };
        Object
          .keys({ ...this.props.selects, [elementId]: true })
          .forEach(key => {
            const element = this.props.elements[key];
            data.x = Math.min(data.x, element.x);
            data.y = Math.min(data.y, element.y); 
            data.w = Math.max(data.w, element.x + element.w); 
            data.h = Math.max(data.h, element.y + element.h); 
          });
        data.w = data.w - data.x;
        data.h = data.h - data.y;
        core.actions.container
          .selectSome(
            this.props.id, this.props.prop,
            elementId, data
          );
      }
    } else {
      core.actions.container
        .select(
          this.props.id, this.props.prop,
          elementId
        );
    }
  }

  handleContextMenuElement = (e, elementId) => {
    const pos = { left: e.clientX, top: e.clientY };
    const scheme = {
      main: [
        { id: '1', title: 'Group', click: this.handleClickGroupElements },
        { id: '2', title: 'Ungroup', click: () => this.handleClickUnGroupElement(elementId) },
      ]
    }

    ContextMenu.show(<Menu scheme={scheme} />, pos);
  }

  handleClickGroupElements = () => {
    if (this.props.selectType === 'some') {
      const list = [];
      const groupId = getIdElement(0, 'group', this.props.elements);
      let x = Infinity, y = Infinity, w = 0, h = 0;
      Object
        .keys(this.props.selects)
        .forEach(key => {
          const element = this.props.elements[key];
          x = Math.min(x, element.x);
          y = Math.min(y, element.y); 
          w = Math.max(w, element.x + element.w); 
          h = Math.max(h, element.y + element.h); 
          list.push(key) 
        });
      const groupData = { 
        x, y, 
        w: w - x, 
        h: h - y, 
        type: 'group',
        elements: list, 
      };
      core.actions.container
        .groupElements(
          this.props.id, this.props.prop,
          groupId, groupData,
        );
    }
  }

  handleClickUnGroupElement = (elementId) => {
    const list = [];
    const data = { x: Infinity, y: Infinity, w: 0, h: 0 };
    Object
      .keys(this.props.selects)
      .forEach(key => {
        const element = this.props.elements[key];
        data.x = Math.min(data.x, element.x);
        data.y = Math.min(data.y, element.y); 
        data.w = Math.max(data.w, element.x + element.w); 
        data.h = Math.max(data.h, element.y + element.h); 
        if (element.type === 'group') {
          list.push(key);
        }
      });
    data.w = data.w - data.x;
    data.h = data.h - data.y;

    core.actions.container
      .unGroupElements(
        this.props.id, this.props.prop,
        list, data,
      );
  }

  handleRenderElement = (elementId, item) => {
    if (item.type === 'group') {
      return (
        <div
          style={{
            position: 'absolute', 
            width: '100%', 
            height: '100%', 
            outline: item.groupId ? 'unset' : `1px dashed #6d7882`, 
          }}
        >
          {item.elements.map(id => 
            <Element 
              key={id}
              id={id}
              isGroup
              scale={this.props.settings.scale}
              item={this.props.elements[id]}
              select={this.props.selects[id]}
              selectType={this.props.selectType}  
              onStartMove={this.handleStartMoveElement}
              onMove={this.handleMoveElement}
              onStopMove={this.handleStopMoveElement}
              onChangeSize={this.handleChangeSizeElement}
              onClick={this.handleClickElement}
              onContextMenu={this.handleContextMenuElement} 
              onRenderElement={this.handleRenderElement}
            />
          )}
        </div>
      )
    }
    return (
      <div 
        style={{
          position: 'absolute', 
          width: '100%', 
          height: '100%', 
          border: `1px solid ${item.borderColor}`, 
        }}
      />
    )
  }

  handleStartMoveSelectContainer = (e, elementId, data) => {
    e.preventDefault();
    e.stopPropagation();
    
  }

  handleMoveSelectContainer = (e, elementId, data) => {
    if (!this.dragSelectContainer) {
      this.dragSelectContainer = true;
    }
    core.actions.container
      .moveSelectContainer(
        this.props.id, this.props.prop,
        data.x, data.y,
      );
  }

  handleStopMoveSelectContainer = (e, elementId, data) => {
    core.actions.container
      .moveSelectContainer(
        this.props.id, this.props.prop,
        data.x, data.y,
      );
    this.save();
  }

  handleClickSelectContainer = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (this.dragSelectContainer) {
      this.dragSelectContainer = null;
    } else {
      if (e.shiftKey) {
        const elements = window.document.elementsFromPoint(e.clientX, e.clientY);
        let elementId = null;
        
        elements.forEach(i => {
          const attribute = i.getAttribute('elementid');
         
          if (elementId === null && attribute && attribute !== 'select') {
            if (this.props.elements[attribute].groupId) {
              elementId = this.props.elements[attribute].groupId;
            } else {
              elementId = attribute;
            }
          }
        });
    
        if (elementId) {
          this.handleClickElement(e, elementId)
        }
      }
    }
  }

  handleChangeSizeSelectContainer = (e, elementId, position) => {
    e.preventDefault();
    e.stopPropagation();

    if (!this.dragSelectContainer) {
      this.dragSelectContainer = true;
    }

    const childs = getAllElementsByGroup(Object.keys(this.props.selects), this.props.elements)
    core.actions.container
      .resizeSelectContainer(
        this.props.id, this.props.prop,
        position, childs,
      );
    this.save();
  }

  handleRenderContentSelectContainer = () => {
    return null;
  }

  handleRenderSelectContainer = () => {
    if (this.props.selectType === 'some') {
      return (
        <Element 
          key="select"
          id="select"
          select
          scale={this.props.settings.scale}
          item={this.props.selectContainer}
          onStartMove={this.handleStartMoveSelectContainer}
          onMove={this.handleMoveSelectContainer}
          onStopMove={this.handleStopMoveSelectContainer}
          onChangeSize={this.handleChangeSizeSelectContainer}
          onClick={this.handleClickSelectContainer}
          onContextMenu={this.handleContextMenuElement} 
          onRenderElement={this.handleRenderContentSelectContainer}
        />
      )
    }
    return null;
  }
  
  linkContainer = (e) => {
    this.container = e;
  } 

  linkSheet = (e) => {
    this.sheet = e;
  } 

  render({ selects, settings, list, elements } = this.props) {
    return (
      <div style={styles.root}>
        <div 
          ref={this.linkContainer}
          style={styles.container}
          onMouseUp={this.handleMouseUpContainer}
          onMouseDown={this.handleMouseDownContainer}
          onWheel={this.handleMouseWhellContainer}
        >
          <Draggable 
            position={settings}
            onDrag={this.handleMoveSheet}
            onStop={this.handleStopMoveSheet}
          >
            <Paper
              ref={this.linkSheet}
              elevation={2} 
              className="parent" 
              style={{ ...styles.sheet, width: settings.w, height: settings.h }}
              onClick={(e) => this.handleClickSheet}
              onContextMenu={(e) => this.handleContextMenuSheet}
            >
              {list.map(id => 
                <Element 
                  key={id}
                  id={id}
                  scale={settings.scale}
                  item={elements[id]}
                  select={selects[id]}
                  selectType={this.props.selectType} 
                  onStartMove={this.handleStartMoveElement}
                  onMove={this.handleMoveElement}
                  onStopMove={this.handleStopMoveElement}
                  onChangeSize={this.handleChangeSizeElement}
                  onClick={this.handleClickElement}
                  onContextMenu={this.handleContextMenuElement} 
                  onRenderElement={this.handleRenderElement}
                />
              )}
              {this.handleRenderSelectContainer()}
            </Paper>
          </Draggable>
        </div>
      </div>
    )
  }
}


export default Sheet