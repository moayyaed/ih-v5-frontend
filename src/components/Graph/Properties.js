import React, { Component } from 'react';
import core from 'core';


import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import SvgIcon from '@material-ui/core/SvgIcon';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import { Label } from '@blueprintjs/core';

import { Scrollbars } from 'react-custom-scrollbars';


const styles = {
  properties: {
    paddingTop: 35,
    position: 'absolute',
    top: 0,
    right: 0,
    width: 250,
    height: '100%',
    background: '#37474F',
    color: '#F5F5F5'
    // zIndex: 1500,
  },
  p1: {
    position: 'relative',
    padding: 8,
    height: '40%',
  },
  p2: {
    borderTop: '4px solid #263238',
    padding: 16,
    height: '60%',
  },
  p3: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    padding: 8,
    paddingBottom: 45,
  },
  i1: {
    display: 'flex',
  },
  i2: {
    width: '40%',
    border: '1px solid transparent',
    paddingLeft: 10,
    backgroundColor: '#263238',
  },
  i3: {
    marginLeft: 6,
    marginRight: 7,
  },
  i4: {
    backgroundColor: '#263238',
    border: '1px solid transparent',
    width: 35,
    textAlign: 'center',
  },
  i2a: {
    width: '40%',
    paddingLeft: 10,
    backgroundColor: '#004e71',
    border: '1px solid #0363af',
  },
  i4a: {
    backgroundColor: '#004e71',
    border: '1px solid #0363af',
    width: 35,
    textAlign: 'center',
  },
  t1: {
    position: 'absolute',
    background: 'transparent',
    border: 'none',
    color: '#F5F5F5',
    left: 32,
    height: 24,
    width: 74,
  },
  t2: {
    position: 'absolute',
    background: 'transparent',
    border: 'none',
    color: '#F5F5F5',
    left: 126,
    height: 22,
    width: 33,
    textAlign: 'center',
  },
  b1: {
    fontSize: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 16,
    height: 16,
    border: '1px solid #607D8B',
    margin: 5,
    marginLeft: 10,
    backgroundColor: '#EEEEEE',
    color: '#424242',
    fontWeight: 'bold',
  },
  b2: {
    visibility: 'hidden',
    fontSize: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 16,
    height: 16,
    border: '1px solid #607D8B',
    margin: 5,
    marginLeft: 10,
    backgroundColor: '#EEEEEE',
    color: '#424242',
    fontWeight: 'bold',
  }
};



const PrettoSlider = withStyles({
  root: {
    color: '#78909C',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);


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

const StyledTreeItem = withStyles(theme => ({
  root: {
    paddingTop: 4
  },
  content: {
    backgroundColor: '#37474F!important',
  },
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

const useStyles = makeStyles({
  root: {
    height: '100%',
    flexGrow: 1,
    maxWidth: 400,
  },
});

function ItemLabel(props) {

  if (props.select === props.item.id) {
    if (props.item.id === 'default') {
      return (
        <div onClick={(e) => props.onClick(e, 's', props.item.id)} style={styles.i1}>
          <div style={styles.i2a}><input type="text"  style={styles.t1} value={props.item.id} /></div>
          <div style={styles.i3}>:</div>
          <div style={styles.i4a}><input type="text"  style={styles.t2} value={props.item.value}/></div>
          <div style={styles.b2}>{props.item.mode}</div>
        </div>
      );
    }
    return (
      <div onClick={(e) => props.onClick(e, 's', props.item.id)} style={styles.i1}>
        <div style={styles.i2a}><input type="text" onKeyDown={e => e.stopPropagation()} onChange={(e) => props.onChange('k', props.item.id, e)} style={styles.t1} value={props.item.id} /></div>
        <div style={styles.i3}>:</div>
        <div style={styles.i4a}><input type="number" onKeyDown={e => e.stopPropagation()} onChange={(e) => props.onChange('v', props.item.id, e)} style={styles.t2} value={props.item.value}/></div>
        <div onClick={(e) => props.onClick(e, 'm', props.item.id, props.item.mode)} style={styles.b1}>{props.item.mode}</div>
      </div>
    );
  }
  return (
    <div onClick={(e) => props.onClick(e, 's', props.item.id)} style={styles.i1}>
      <div style={styles.i2}>{props.item.id}</div>
      <div style={styles.i3}>:</div>
      <div style={styles.i4}>{props.item.value}</div>
      {props.item.id === 'default' ? null: <div onClick={(e) => props.onClick(e, 'm', props.item.id, props.item.mode)} style={styles.b1}>{props.item.mode}</div>}
    </div>
  );
}
function getTree2(item) {
  const keys = Object.keys(item)
  if (keys.length === 0) {
    return null;
  }
  return keys.map(k => <StyledTreeItem nodeId={k} label={k + ': ' + item[k]} />)
}

function getTree1(item) {
  const keys = Object.keys(item)
  if (keys.length === 0) {
    return null;
  }
  return keys.map(k => <StyledTreeItem nodeId={k} label={k} >{getTree2(item[k])}</StyledTreeItem>)
}

function getTree(item) {
  const keys = Object.keys(item)
  if (keys.length === 0) {
    return null;
  }
  return keys.map(k => <StyledTreeItem nodeId={k} label={k} >{getTree1(item[k])}</StyledTreeItem>)
}

function Properties(props) {
  const classes = useStyles();
  return (
    <div style={styles.properties}>
      <div style={styles.p1}>
        <div style={styles.p3} >
          <Scrollbars style={{ width: '100%', height: '100%' }}>
            <TreeView
              className={classes.root}
              defaultExpanded={[]}
              defaultCollapseIcon={<MinusSquare />}
              defaultExpandIcon={<PlusSquare />}
              defaultEndIcon={<CloseSquare />}
            >
              {Object.keys(props.vars)
                .map((key, i) => {
                  if (key === 'default') {
                    return (
                      <StyledTreeItem 
                        key={i.toString()} 
                        nodeId={i.toString()} 
                        label={<ItemLabel onChange={props.onChangev} onClick={props.onClick} select={props.select} item={props.vars[key]} />} />
                    );
                  }
                  return (
                    <StyledTreeItem 
                      key={i.toString()} 
                      nodeId={i.toString()} 
                      label={<ItemLabel onChange={props.onChangev} onClick={props.onClick} select={props.select} item={props.vars[key]} />} >
                    {getTree(props.vars[key].state)}
                    </StyledTreeItem>
                  );
                })}
            </TreeView>
          </Scrollbars>
        </div>
        <ButtonGroup style={{ bottom: 6, position: 'absolute'}} size="small" color="primary">
          <Button onClick={props.onClickAdd}>+</Button>
          <Button onClick={props.onClickRemove}>-</Button>
        </ButtonGroup>
      </div>
      <div style={styles.p2}>
        <Typography gutterBottom>Размер рамки</Typography>
        <PrettoSlider 
          min={0}
          max={50}
          valueLabelDisplay="auto" 
          defaultValue={20} 
          onChange={(e, value) => props.onChange('borderSize', value)}
        />
        <Typography gutterBottom>Цвет рамки</Typography>
        <input type="color" onChange={(e, value) => props.onChange('borderColor', e)} />
        <p /><p />
        <Typography gutterBottom>Цвет Фона</Typography>
        <input type="color" onChange={(e, value) => props.onChange('backgroundColor', e)} />
      </div>
    </div>
  )
}


export default Properties;