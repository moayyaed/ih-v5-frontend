import React, { PureComponent } from 'react';
import core from 'core';

import Scrollbars from 'react-custom-scrollbars';

import TreeView from '@material-ui/lab/TreeView';

import { ContextMenu } from '@blueprintjs/core';
import Menu from 'components/Menu';

import { ElementsItems } from './Items';
import { CollapseIcon, ExpandIcon } from './Icons';

import './main.css';

const styles = {
  container: {
    height: '100%',
  },
  treeElements: {
    // width: '100%',
  },
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

}


export default Toolbar;
