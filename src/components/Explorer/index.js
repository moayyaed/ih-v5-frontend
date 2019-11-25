import React, { Component } from 'react';

import context from 'context';
import Skeleton from '@material-ui/lab/Skeleton';

import Panel from 'components/basic/Panel';

import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';

import { useSpring, animated } from 'react-spring';

const styles = {
  box: {
    height: '100%',
    backgroundColor: '#ECEFF1',
    padding: 6,
    flexShrink: 0,
    overflow: 'hidden',
    borderRight: '1px solid #d3d3d3',
  },
  box2: {
    width: 200,
    height: '100%',
    backgroundColor: '#ECEFF1',
    padding: 6,
    flexShrink: 0,
    overflow: 'hidden',
    borderRight: '1px solid #d3d3d3',
  },
};

const classes = theme => ({
  root: {
    height: '100%',
    flexGrow: 1,
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
    context.event('app:navigator', this.props.id, this.props.navid);
  }
  componentWillUnmount() {
    context.event('app:navigator:exit', this.props.id, this.props.navid);
  }

  handleClick = (value) => {
    const { path, history, match } = this.props;
    context.event('app:navigator:click', path, history, value);
    history.push(`${path}/${value.scheme}/${value.tablename}`);
  }

  render({ id, state, path, classes } = this.props) {
    if (state.loading) {
      return (
        <div style={styles.box2}>
          {state.list.map(item => 
            <div style={{ marginLeft: 10 }}>
              <Skeleton width={item.width}  />
              {item.list.map(i => <Skeleton style={{ marginLeft: 15 }} width={i} height={8} />)}
            </div>
          )}
        </div>
      );
    }
    const test = state.list
      .map((i, key) => String(key))
      .concat(String(state.list.length));
    return (
      <Panel width={200} position="right" style={styles.box}>
        <TreeView
          key={state.id}
          className={classes.root}
          defaultExpanded={test}
          defaultCollapseIcon={<MinusSquare />}
          defaultExpandIcon={<PlusSquare />}
          defaultEndIcon={<CloseSquare />}
          onNodeToggle={(a,b,c,d) => console.log(a,b,c,d)}
          selected={['0', 'scenes']}
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
                    <StyledTreeItem
                      key={i.id} 
                      nodeId={i.id}
                      classes={{ label: classes.itemLabel }} 
                      nodeId={i.id} 
                      label={i.label}
                      onClick={() => this.handleClick(i)}
                    />
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
      </Panel>
    );
  }
}


export default context.connect(withStyles(classes)(Explorer));