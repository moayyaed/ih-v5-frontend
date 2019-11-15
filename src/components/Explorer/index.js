import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import context from 'context';


import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';

import { useSpring, animated } from 'react-spring';

const styles = {
  box: {
    width: 200,
    height: '100%',
    backgroundColor: '#ECEFF1',
    padding: 6,
    flexShrink: 0,
  },
};

const classes = theme => ({
  root: {
    height: '100%',
    flexGrow: 1,
    maxWidth: 200 - 12,
  },
  itemLabel: {
    fontSize: '0.9rem',
  }
});

const StyledTreeItem = withStyles(theme => ({
  iconContainer: {
    '& .close': {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 12,
    paddingLeft: 12,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))(props => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon className="close" fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
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


class Explorer extends Component {
  componentDidMount() {
    context.event('app:navigator:init', this.props.id, this.props.navid);
  }

  handleClick = (value) => {
    
  }

  render({ id, state, path, classes } = this.props) {
    return (
      <div style={styles.box}>
        <TreeView
          key={state.id}
          className={classes.root}
          defaultExpanded={['0']}
          defaultCollapseIcon={<MinusSquare />}
          defaultExpandIcon={<PlusSquare />}
          defaultEndIcon={<CloseSquare />}
        >
          {state.list.map(item => {
            if (item.children) {
              return (
                <StyledTreeItem
                  key={item.id} 
                  classes={{ label: classes.itemLabel }} 
                  nodeId={item.id} 
                  label={item.label} 
                >
                  {item.children.map(i => 
                    <Link to={`${path}/${i.scheme}/${i.tablename}`}>
                      <StyledTreeItem
                        key={i.id} 
                        classes={{ label: classes.itemLabel }} 
                        nodeId={i.id} 
                        label={i.label}
                      />
                    </Link>
                  )}
                </StyledTreeItem>
              );
            }
            return (
              <StyledTreeItem
                key={item.id} 
                classes={{ label: classes.itemLabel }} 
                nodeId={item.id} 
                label={item.label} 
              />
            );
          })}
        </TreeView>
      </div>
    );
  }
}


export default context.connect(withStyles(classes)(Explorer));

/*

    <StyledTreeItem classes={{ label: classes.itemLabel }} nodeId="2" label="2" />
          <StyledTreeItem classes={{ label: classes.itemLabel }} nodeId="3" label="3">
            <StyledTreeItem classes={{ label: classes.itemLabel }} nodeId="6" label="6" />
            <StyledTreeItem classes={{ label: classes.itemLabel }} nodeId="7" label="Sub-subtree with 7">
              <StyledTreeItem classes={{ label: classes.itemLabel }} nodeId="9" label="Child 1" />
              <StyledTreeItem classes={{ label: classes.itemLabel }} nodeId="10" label="Child 2" />
              <StyledTreeItem classes={{ label: classes.itemLabel }} nodeId="11" label="Child 3" />
            </StyledTreeItem>
            <StyledTreeItem classes={{ label: classes.itemLabel }} nodeId="8" label="Hello" />
          </StyledTreeItem>
          <StyledTreeItem classes={{ label: classes.itemLabel }} nodeId="4" label="World" />
          <StyledTreeItem classes={{ label: classes.itemLabel }} nodeId="5" label="Something something" />
*/
