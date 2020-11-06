import React, { PureComponent } from 'react';
import core from 'core';

import CompactForm from 'components/@Form/Compact';
import Scrollbars from 'react-custom-scrollbars';

import TreeView from '@material-ui/lab/TreeView';

import { ContextMenu } from '@blueprintjs/core';
import Menu from 'components/Menu';

import { ElementsItems, EventsItems, AnimationItems } from './Items';
import { CollapseIcon, ExpandIcon } from './Icons';

import scheme from 'components/schemes/toolbar';
import './main.css';

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

const route = {}
const cache = {}


class Toolbar extends PureComponent {

  handleClickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onClickAddState();
  }


  handleClickOptions = (e, id, index) => {
    e.preventDefault();
    e.stopPropagation();


    const pos = { left: e.clientX, top: e.clientY };
    const scheme = {
      main: [
        { id: '1', 
          title: 'Edit', 
          click: () => this.handleClickEdit(id, true),
        },
        { id: '2', type: 'divider' },
        { id: '3', 
          title: 'Prioritet Up', 
          click: () => this.handleClickUp(id, index),
        },
        { id: '4', 
          title: 'Prioritet Down', 
          click: () => this.handleClickDown(id, index),
        },
        { id: '5', type: 'divider' },
        { id: '6', 
          title: 'Delete', 
          click: () => this.handleClickDelete(id),
        },        
      ]
    }

    ContextMenu.show(<Menu scheme={scheme} />, pos);
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

  handleClickEdit = (id, v) => {
    this.props.onClickEditIdState(id, v);
  }

  handleClickDelete = (id) => {
    this.props.onClickDeleteState(id);
  }

  handleClickIcon = (e, id) => {
  
  }

  handleClickElement = (e, id) => {
    if (id !== 'events') {
      e.preventDefault();
      this.props.onClickElement(id);
    }
  }

  handleClickAnimation = (e, id) => {
    if (id !== 'variables') {
      e.preventDefault();
      this.props.onChangeState(id)
    }
  }

  handleClickVisibility = (e, stateId, value) => {
    e.preventDefault();
    e.stopPropagation();

    if (stateId === 'master' || !this.props.state.master.hide) {
      this.props.onChangeVisibilityState(stateId, value);
    }
  }

  handleChangeNumber = (stateId, value) => {
    this.props.onChangeValueState(stateId, value);
  }

  handleClickUp = (stateId, index) => {
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

  handleClickDown = (stateId, index) => {
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

  handleChangeTitle = (e, stateId) => {
    this.props.onChangeTitleState(stateId, e.target.value);
  }

  handleChangeComplitetitle = (stateId) => {
    this.props.onClickEditIdState(stateId, false);
  }

  handleChange = (id, options, target, value) => {
    this.props.onChange(id, value);
  }

  render({ selectElements, selectState, listElements, listState, elements, state } = this.props) {
    if (this.props.type === 'tree') {
      return (
        <Scrollbars style={styles.container}>
          <TreeView
            key="1"
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
    if (this.props.type === 'vars') {
      return (
        <Scrollbars style={styles.container}>
          <TreeView
            key="2"
            className="tree-animation"
            style={styles.treeAnimation}
            defaultExpanded={['variables']}
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
              onClickAdd={this.handleClickAdd}
              onClickDelete={this.handleClickDelete}
              onClickOptions={this.handleClickOptions}
              onClickMenuToolbar={this.handleClickMenu}
              onChangeTitle={this.handleChangeTitle}
              onChangeCompliteTitle={this.handleChangeComplitetitle}
            />
          </TreeView>
        </Scrollbars>
      );
    }

    if (this.props.type === 'events') {
      return (
        <Scrollbars style={styles.container}>
          <TreeView
            key="3"
            className="tree-elements"
            style={styles.treeElements}
            defaultExpanded={['events']}
            defaultCollapseIcon={<CollapseIcon />}
            defaultExpandIcon={<ExpandIcon />}
            selected={Object.keys(selectElements)}
          >
            <EventsItems 
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
      const data = { 
        devBackgroundColor: { value: 'rgba(0,0,0,0.25)' },
        devBackgroundColor2: { value: 'rgba(255,255,255,0.8)' },
        ...this.props.data 
      } 
      return (
        <Scrollbars style={styles.scroll}>
          <div style={styles.container2}>
            <CompactForm 
              key="property2"
              debug={false} 
              scheme={scheme.settings}
              route={route}
              data={data}
              cache={cache}
              onChange={this.handleChange}
              getStyle={this.props.getStyle}
            />
          </div>
        </Scrollbars>
      )
    }
  }

}


export default Toolbar;
