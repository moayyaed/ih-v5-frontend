import React from 'react';


import TreeItem from '@material-ui/lab/TreeItem';

import { useSpring, animated } from 'react-spring/web.cjs';
import { fade, withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';

import IconButton from '@material-ui/core/IconButton';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';

import { TypeIcon } from './Icons';


const styles = {
  masterItem: {
    display: 'flex',
    alignItems: 'center',
  },
  itemLabel: {
    width: '100%',
  },
  itemButtonsMaster: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    paddingRight: 6,
    paddingLeft: 12,
  },
  itemButtons: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    paddingRight: 6,
    paddingLeft: 12,
  },
  itemButton: {
    marginRight: 6,
  },
};

const classes = theme => ({
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
});

function OptionItem(props) {
  if (props.edits[props.nodeId] !== undefined) {
    return (
      <div style={styles.masterItem}>
          <input
            autoFocus
            className="text" 
            value={props.edits[props.nodeId]}
            onChange={(e) => props.onChangeTitle(props.nodeId, e.target.value)} 
            onBlur={() => props.onChangeTitleComplete(props)}
            onKeyUp={(e) => e.keyCode === 13 && props.onChangeTitleComplete(props)}
          />
        <div style={styles.itemButtonsMaster}>
          <IconButton size="small" style={styles.itemButton} onClick={(e) => props.onClickMenuToolbar(e, props)} >
            <MoreVertOutlinedIcon fontSize="inherit" />
          </IconButton>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.masterItem}>
      <div style={styles.itemLabel}>{props.label}</div>
      <div style={styles.itemButtonsMaster}>
        <IconButton size="small" style={styles.itemButton} onClick={(e) => props.onClickMenuToolbar(e, props)} >
          <MoreVertOutlinedIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  )
}


export function ElementsItems(props) {
  return (
    <BasicItem 
      nodeId="content" 
      label="Container"
      onIconClick={(e) => props.onClickIcon(e, 'content')} 
      onLabelClick={(e) => props.onClickLabel(e, 'content')} 
    >
      <ElementItemGroup { ...props} />
    </BasicItem>
  );
}

function ElementItemGroup(props) {
  return props.list.map(id => {
    if (props.elements[id].type === 'group') {
      return (
        <BasicItem
          key={id}
          nodeId={id}
          label={<OptionItem {...props} type="element" nodeId={id} label={props.elements[id]._label} />}
          endIcon={<TypeIcon type={props.elements[id].type}/>}
          onIconClick={(e) => props.onClickIcon(e, id)} 
          onLabelClick={(e) => props.onClickLabel(e, id)} 
        >
          <ElementItemGroup {...props} list={props.elements[id].elements} />
        </BasicItem>
      )
    }
    return (
      <BasicItem
        key={id}
        nodeId={id}
        label={<OptionItem {...props} type="element" nodeId={id} label={props.elements[id]._label} />}
        endIcon={<TypeIcon type={props.elements[id].type}/>}
        onIconClick={(e) => props.onClickIcon(e, id)} 
        onLabelClick={(e) => props.onClickLabel(e, id)} 
      />
    )
  })
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

function Item(props) {
  return <TreeItem {...props} TransitionComponent={TransitionComponent} />;
}

const BasicItem = withStyles(classes)(Item);
