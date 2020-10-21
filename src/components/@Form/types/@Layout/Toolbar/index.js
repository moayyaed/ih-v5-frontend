import React, { PureComponent } from 'react';
import core from 'core';

import CompactForm from 'components/@Form/Compact';

import Scrollbars from 'react-custom-scrollbars';

import TreeView from '@material-ui/lab/TreeView';

import { ContextMenu } from '@blueprintjs/core';
import Menu from 'components/Menu';

import { ElementsItems } from './Items';
import { CollapseIcon, ExpandIcon } from './Icons';

import scheme from '../Property/scheme2';
import './main.css';

const styles = {
  container: {
    height: '100%',
  },
  treeElements: {
    // width: '100%',
  },
  scroll: { 
    width: '100%', 
    height: '100%' 
  },
  container2: {
    display: 'flex',
    flexDirection: 'column',
  }
}


class Toolbar extends PureComponent {

  handleClickIcon = (e, id) => {

  }

  handleClickMenu = (e, props) => {

    e.preventDefault();
    e.stopPropagation();


    const pos = { left: e.clientX, top: e.clientY };
    const scheme = {
      main: [
        { id: '6', 
          title: 'Delete', 
          click: () => this.props.onClickMenu('delete', props.type, props),
        },        
      ]
    }

    ContextMenu.show(<Menu scheme={scheme} />, pos);
  }

  handleClickElement = (e, id) => {
    e.preventDefault();
    this.props.onClickElement(id);
  }

  handleClickMenu = (e, props) => {

    e.preventDefault();
    e.stopPropagation();


    const pos = { left: e.clientX, top: e.clientY };
    const scheme = {
      main: [
        { id: '6', 
          title: 'Delete', 
          click: () => this.props.onClickMenu('delete', props.type, props),
        },        
      ]
    }

    ContextMenu.show(<Menu scheme={scheme} />, pos);
  }

  render({ selectElements, listElements, elements } = this.props) {
    if (this.props.type === 'tree') {
      return (
        <Scrollbars style={styles.container}>
          <TreeView
            className="tree-elements"
            style={styles.treeElements}
            defaultExpanded={['content']}
            defaultCollapseIcon={<CollapseIcon />}
            defaultExpandIcon={<ExpandIcon />}
            selected={Object.keys(selectElements)}
          >
            <ElementsItems 
              list={listElements}
              elements={elements}
              onClickIcon={this.handleClickIcon}
              onClickLabel={this.handleClickElement}
              onClickMenuToolbar={this.handleClickMenu}
            />
          </TreeView>
        </Scrollbars>
      );
    }

    if (this.props.type === 'settings') {
      console.log(this.props.data)
      return (
        <Scrollbars style={styles.scroll}>
          <div style={styles.container2}>
            <CompactForm 
              key="property2"
              debug={false} 
              scheme={scheme[this.props.type]}
              route={{}}
              data={{}}
              cache={{}}
              onChange={() => {}}
              getStyle={this.props.getStyle}
            />
          </div>
        </Scrollbars>
      )
    }

  }

}


export default Toolbar;
