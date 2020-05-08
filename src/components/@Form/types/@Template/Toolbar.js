import React, { PureComponent } from 'react';
import core from 'core';

import { Button } from "@blueprintjs/core";

import SvgIcon from '@material-ui/core/SvgIcon';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support

export const TOOLBAR_BUTTONS = [
  <Button key="3" icon="diagram-tree" minimal />
];


function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
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



const styles = {
  root: {
    with: '100%',
    height: '100%',
    flexGrow: 1,
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

  render({ list, elements, selects } = this.props) {
    return (
      <TreeView
        style={styles.root}
        defaultExpanded={['template']}
        defaultCollapseIcon={<MinusSquare />}
        defaultExpandIcon={<PlusSquare />}
        defaultEndIcon={<CloseSquare />}
        selected={Object.keys(selects)}
      >
        <StyledTreeItem nodeId="template" label="Template" >
          {list.map(id => item(id, elements, this.handleIconClickTree, this.handleLabelClick))}
        </StyledTreeItem>
      </TreeView>
    )
  }

}


export default Toolbar;
