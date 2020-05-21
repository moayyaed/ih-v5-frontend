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
  treeElements: {
    // width: '100%',
  },
}


class Toolbar extends PureComponent {

  handleClickIcon = (e, id) => {
    console.log('icon')
  }

  handleClickElement = (e, id) => {
    if (id !== 'content') {
      e.preventDefault();
      this.props.onClickElement(id);
    }
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
          />
        </TreeView>
      </Scrollbars>
    );
  }

}


export default Toolbar;
