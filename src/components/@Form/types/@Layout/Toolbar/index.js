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

  handleClickElement = (e, id, type) => {
    if (id !== 'content') {
      e.preventDefault();
      this.props.onClickElement(id, type);
    }
  }

  render({ type, selectElements, listElements, sections, columns } = this.props) {
    if (type === 'tree') {
      const selected = selectElements.column ? selectElements.column : selectElements.section;
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
      return <div>ELEMENTS</div>
    }

    return null;
  }

}


export default Toolbar;
