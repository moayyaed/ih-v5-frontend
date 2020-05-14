import React, { PureComponent } from 'react';
import core from 'core';

import Number from 'components/Number';

import SvgIcon from '@material-ui/core/SvgIcon';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support

import { Scrollbars } from 'react-custom-scrollbars';
import { select } from '../../@Container/actions';


function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 12, height: 12 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 12, height: 12 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  if (props.type === 'text') {
    return (
      <SvgIcon className="close" fontSize="inherit" style={{ width: 16, height: 16 }} {...props}>
        {/* tslint:disable-next-line: max-line-length */}
        <path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"></path>
      </SvgIcon>
    );
  }
  if (props.type === 'image') {
    return (
      <SvgIcon className="close" fontSize="inherit" style={{ width: 16, height: 16 }} {...props}>
        {/* tslint:disable-next-line: max-line-length */}
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path>
      </SvgIcon>
    );
  }
  if (props.type === 'animation') {
    return (
      <SvgIcon className="close" fontSize="inherit" style={{ width: 16, height: 16 }} {...props}>
        {/* tslint:disable-next-line: max-line-length */}
        <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
      </SvgIcon>
    );
  }
  return (
    <SvgIcon className="close" fontSize="inherit" style={{ width: 18, height: 18 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M3 4l9 16 9-16H3zm3.38 2h11.25L12 16 6.38 6z"></path>
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    '& .close': {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))((props) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

const StyledAnimItem = withStyles((theme) => ({
  content: {
    height: 22,
  },
  label: {
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  iconContainer: {
    '& .close': {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))((props) => 
  <TreeItem 
    {...props}
    TransitionComponent={TransitionComponent} 
    label={
      <>
        <Number value={props.value} onChange={(v) => props.onChange(props.nodeId, v)} />
        <div className="animTitle" style={styles.itemAnimTitle}>{props.nodeId}</div>
      </>
    } 
  />);


const styles = {
  state: {
    with: '100%',
    height: '100%',
    padding: '6px 12px',
  },
  stateItem: {
    width: '100%',
    height: 26,
    marginBottom: 4,
    border: '1px solid #BDBDBD',
    borderRadius: 4,
    cursor: 'pointer',
  },
  stateBody: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 26,
  },
  stateTtile: {
    // backgroundColor: 'black',
    width: '100%',
    textAlign: 'end',
    paddingRight: 16,
  },
  stateValue: {
    // backgroundColor: 'yellow',
    width: 45,
    flexShrink: 0,
  },
  tree: {
    with: '100%',
  },
  itemAnimTitle: {
    marginLeft: 4,
    paddingLeft: 4,
    paddingRight: 4,
  },
}

function item(id, elements, onIconClick, onLabelClick) {
  if (elements[id].type === 'group') {
    return (
      <StyledTreeItem 
        key={id} 
        nodeId={id} 
        label={id} 
        onIconClick={(e) => onIconClick(e, id)} 
        onLabelClick={(e) => onLabelClick(e, id)}
      >
        {elements[id].elements.map(id => item(id, elements, onIconClick, onLabelClick))}
      </StyledTreeItem>
    )
  }
  return (
    <StyledTreeItem 
      key={id} 
      nodeId={id} 
      label={id}
      endIcon={<CloseSquare type={elements[id].type} />}
      onIconClick={(e) => onIconClick(e, id)} 
      onLabelClick={(e) => onLabelClick(e, id)}
    />
  )
}


class Toolbar extends PureComponent {

  handleClickItemTree = (e, id) => {
    console.log(e.currentTarget)
  }

  handleIconClickTree = (e) => {

  }

  handleLabelClick = (e, id) => {
    e.preventDefault();

    this.props.onClickElement(id);
  }

  handleIconClickAnimation = (e, id) => {

  }

  handleLabelClickAnimation = (e, id) => {
    e.preventDefault();

    this.props.onChangeState(id)
  }

  handleClickStateItem = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.onChangeState(id)
  }

  handleChangeValueState = (id, v) => {
    this.props.onChangeValueState(id, v)
  }

  render({ list, listState, valueState, elements, selects, selectState } = this.props) {
    if (this.props.type === 'state') {
      return (
        <div style={styles.state}>
          <Scrollbars style={{ width: '100%', height: '100%' }}>
            {listState.map(id =>
              <div 
                style={{ 
                  ...styles.stateItem, 
                  border: selectState === id ? '2px solid #1E88E5' : '1px solid #BDBDBD' 
                }}
                onClick={(e) => this.handleClickStateItem(e, id)}
              >
                <div style={{ ...styles.stateBody, border: selectState === id ? 'unset' : '1px solid transparent'}}>
                  <div style={styles.stateTtile} >
                    {id}
                  </div>
                  <div style={styles.stateValue} >
                    <Number 
                      disabled={id === 'Master'} 
                      value={valueState[id] || 0}
                      onChange={(v) => this.handleChangeValueState(id, v)} 
                    />
                  </div>
                </div>
              </div>  
            )}
          </Scrollbars>
        </div>
      )
    }
    return (
      <Scrollbars style={{ width: '100%', height: '100%' }}>
        <TreeView
          className="tree"
          style={styles.tree}
          defaultExpanded={['template']}
          defaultCollapseIcon={<MinusSquare />}
          defaultExpandIcon={<PlusSquare />}
          selected={Object.keys(selects)}
        >
          <StyledTreeItem nodeId="template" label="Template" >
            {list.map(id => item(id, elements, this.handleIconClickTree, this.handleLabelClick))}
          </StyledTreeItem>
        </TreeView>
        <TreeView
          style={styles.tree}
          className="animation"
          defaultExpanded={['Animation']}
          defaultCollapseIcon={<MinusSquare />}
          defaultExpandIcon={<PlusSquare />}
          selected={selectState}
        >
          <StyledTreeItem nodeId="Animation" label="Animation" >
            {listState.map(id => 
              <StyledAnimItem 
                key={id} 
                nodeId={id} 
                label={id}
                value={valueState[id] || 0}
                endIcon={<CloseSquare type="animation" />}
                onIconClick={(e) => this.handleIconClickAnimation(e, id)} 
                onLabelClick={(e) => this.handleLabelClickAnimation(e, id)}
                onChange={this.handleChangeValueState} 
              />
            )}
          </StyledTreeItem>
        </TreeView>
      </Scrollbars>
    )
  }

}


export default Toolbar;
