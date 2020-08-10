import React, { PureComponent } from 'react';
import core from 'core';

import Scrollbars from 'react-custom-scrollbars';

import TreeView from '@material-ui/lab/TreeView';

import { ElementsItems } from './Items';
import { CollapseIcon, ExpandIcon } from './Icons';

import './main.css';

const styles = {
  container: {
    height: '100%',
  },
  container2: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  treeElements: {
    // width: '100%',
  },
  button: {
    border: '2px dashed #9E9E9E',
    textAlign: 'center',
    margin: '8px 2px',
    width: 100,
  },

}

const ELEMENTS = [ 'container', 'text', 'innersection'];

class Toolbar extends PureComponent {

  handleClickIcon = (e, id) => {

  }

  handleClickElement = (e, id, type, content) => {
    if (id !== 'content') {
      e.preventDefault();
      this.props.onClickElement(id, type, content);
    }
  }

  handleDragStart = (e, id) => {
    e.dataTransfer.setData('text', id);
    core.actions.layout
      .data(this.props.id, this.props.prop, { isDraggingToolbar: true });
  }

  handleDragEnd = () => {
    core.actions.layout
      .data(this.props.id, this.props.prop, {
        isDraggingToolbar: false, 
        drag: { section: null, column: null }  
      });
  }

  render({ type, selectElements, listElements, sections, columns } = this.props) {
    if (type === 'tree') {
      const selected = selectElements.content ? selectElements.column + selectElements.content : selectElements.column ? selectElements.column : selectElements.section;
      return (
        <Scrollbars style={styles.container}>
          <TreeView
            className="tree-elements"
            style={styles.treeElements}
            defaultExpanded={['content']}
            defaultCollapseIcon={<CollapseIcon />}
            defaultExpandIcon={<ExpandIcon />}
            selected={selected}
          >
            <ElementsItems 
              list={listElements}
              sections={sections}
              columns={columns}
              onClickIcon={this.handleClickIcon}
              onClickLabel={this.handleClickElement}
            />
          </TreeView>
        </Scrollbars>
      );
    }

    if (type === 'elements') {
      return (
        <Scrollbars style={styles.container2}>
          {ELEMENTS.map(id =>
            <div 
              draggable 
              key={id} 
              style={styles.button} 
              onDragStart={(e) => this.handleDragStart(e, id)} 
              onDragEnd={this.handleDragEnd}
            >
              {id}
            </div>
          )}
        </Scrollbars>
      )
    }

    return null;
  }

}


export default Toolbar;
