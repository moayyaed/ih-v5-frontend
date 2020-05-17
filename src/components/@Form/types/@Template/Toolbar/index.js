import React, { PureComponent } from 'react';
import core from 'core';

import Scrollbars from 'react-custom-scrollbars';

import TreeView from '@material-ui/lab/TreeView';

import { ElementsItems, AnimationItems } from './Items';
import { CollapseIcon, ExpandIcon } from './Icons';


const styles = {
  container: {
    height: '100%',
  },
  treeElements: {
    // width: '100%',
  },
  treeAnimation: {
    // width: '100%',
  },
}


class Toolbar extends PureComponent {

  handleClickIcon = (e, id) => {
    console.log('icon')
  }

  handleClickElement = (e, id) => {
    e.preventDefault();
    this.props.onClickElement(id);
  }

  handleClickAnimation = (e, id) => {
    e.preventDefault();
    if (id !== 'animation') {
      this.props.onChangeState(id)
    }
  }

  handleClickVisibility = (e, stateId, value) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.onChangeVisibilityState(stateId, value);
  }

  handleChangeNumber = (stateId, value) => {
    this.props.onChangeValueState(stateId, value);
  }

  handleClickUp = (e, stateId, index) => {
    e.preventDefault();
    e.stopPropagation();

    const targetId = this.props.listState[index - 1];
    const temp = this.props.listState
      .filter(i => i !== stateId)
      .reduce((p, c) => {
        if (c === targetId) {
          return p.concat(stateId, c)
        }
        return p.concat(c)
      }, []) 

    if (index !== 0) {
      this.props.onSortState(temp);
    }
  }

  handleClickDown = (e, stateId, index) => {
    e.preventDefault();
    e.stopPropagation();

    const targetId = this.props.listState[index + 1];
    const temp = this.props.listState
      .filter(i => i !== stateId)
      .reduce((p, c) => {
        if (c === targetId) {
          return p.concat(c, stateId)
        }
        return p.concat(c)
      }, []) 

    if (index !== this.props.listState.length - 1) {
      this.props.onSortState(temp);
    }
  }

  render({ selectElements, selectState, listElements, listState, elements, state } = this.props) {
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
        <TreeView
          className="tree-animation"
          style={styles.treeAnimation}
          defaultExpanded={['animation', 'master']}
          defaultCollapseIcon={<CollapseIcon />}
          defaultExpandIcon={<ExpandIcon />}
          selected={selectState}
        >
          <AnimationItems 
            list={listState}
            state={state}
            select={selectState}
            onClickIcon={this.handleClickIcon}
            onClickLabel={this.handleClickAnimation}
            onClickVisibility={this.handleClickVisibility}
            onChangeNumber={this.handleChangeNumber}
            onClickDown={this.handleClickDown}
            onClickUp={this.handleClickUp}
          />
        </TreeView>
      </Scrollbars>
    );
  }

}


export default Toolbar;
