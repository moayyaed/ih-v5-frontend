import React from 'react';


import TreeItem from '@material-ui/lab/TreeItem';

import { useSpring, animated } from 'react-spring/web.cjs';
import { fade, withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';

import IconButton from '@material-ui/core/IconButton';
import Number from 'components/Number';

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined';

import { TypeIcon } from './Icons';


const styles = {
  animationItem: {
    display: 'flex',
    alignItems: 'center',
  },
  propertyItem: {
    display: 'flex',
    alignItems: 'center',
  },
  editItem: {
    display: 'flex',
    alignItems: 'center',
  },
  itemLabel: {
    width: '100%',
  },
  itemButtonsDefault: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    paddingRight: 6,
  },
  itemButtons: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    paddingRight: 6,
  },
  itemButton: {
    marginRight: 4,
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


export function ElementsItems(props) {
  return (
    <BasicItem 
      nodeId="content" 
      label="Content"
      onIconClick={(e) => props.onClickIcon(e, 'content')} 
      onLabelClick={(e) => props.onClickLabel(e, 'content')} 
    >
      {props.list.map(id => 
        <TreeItem
          key={id}
          nodeId={id}
          label={id}
          endIcon={<TypeIcon type={props.elements[id].type}/>}
          onIconClick={(e) => props.onClickIcon(e, id)} 
          onLabelClick={(e) => props.onClickLabel(e, id)} 
        />
      )}
    </BasicItem>
  );
}


export function AnimationItems(props) {
  return (
    <BasicItem 
      nodeId="animation" 
      label="Animation"
      onIconClick={(e) => props.onClickIcon(e, 'animation')} 
      onLabelClick={(e) => props.onClickLabel(e, 'animation')} 
    >
      <BasicItem 
        nodeId="master" 
        label={<EditItem {...props} label="Default" />}
        onIconClick={(e) => props.onClickIcon(e, 'master')} 
        onLabelClick={(e) => props.onClickLabel(e, 'master')} 
      >
        {props.list.map((id, key)=> {
          return (
            <TreeItem
              key={id}
              nodeId={id}
              style={{ opacity: props.select === 'master' || props.state[id].hide ? 0.3 : 1 }}
              label={<AnimationItem {...props} nodeId={id} label={id} index={key} />}
              endIcon={<TypeIcon type="animation" />}
              onIconClick={(e) => props.onClickIcon(e, id)} 
              onLabelClick={(e) => props.onClickLabel(e, id)}
            >
              {Object
                .keys(props.state[id].values)
                .map(v => 
                  <TreeItem key={v} nodeId={v} label={v} >
                    {Object
                      .keys(props.state[id].values[v])
                      .map(i => 
                        <TreeItem key={i} nodeId={i} label={i} >
                          {Object
                            .keys(props.state[id].values[v][i])
                            .map(p => 
                              <TreeItem 
                                key={p} 
                                nodeId={p} 
                                label={<PropertyItem nodeId={p} label={p} value={props.state[id].values[v][i][p]} />}
                                endIcon={<TypeIcon type="property" />} 
                              />
                            )}
                        </TreeItem>
                      )}
                  </TreeItem>
                )
              }
            </TreeItem>
          )
        })}
      </BasicItem>
    </BasicItem>
  );
}

function AnimationItem(props) {
  return (
    <div style={styles.animationItem}>
      <div style={styles.itemLabel}>{props.label}</div>
      <div style={styles.itemButtons}>
        <Number 
          value={props.state[props.nodeId].curent || 0}
          style={styles.itemButton}
          onChange={v => props.onChangeNumber(props.nodeId, v)}
        />
        <IconButton style={styles.itemButton} size="small" onClick={(e) => props.onClickUp(e, props.nodeId, props.index)}>
          <ArrowUpwardIcon fontSize="inherit" />
        </IconButton>
        <IconButton style={styles.itemButton} size="small" onClick={(e) => props.onClickDown(e, props.nodeId, props.index)}>
          <ArrowDownwardIcon fontSize="inherit" />
        </IconButton>
        <IconButton style={styles.itemButton} size="small" onClick={(e) => props.onClickVisibility(e, props.nodeId, !props.state[props.nodeId].hide)}>
          {props.select === 'master' || props.state[props.nodeId].hide ? <VisibilityOffIcon fontSize="inherit" /> : <VisibilityIcon fontSize="inherit" />}
        </IconButton>
      </div>
    </div>
  );
}

function EditItem(props) {
  return (
    <div style={styles.editItem}>
      <div style={styles.itemLabel}>{props.label}</div>
      <div style={styles.itemButtonsDefault}>
        <IconButton size="small" style={styles.itemButton} onClick={(e) => props.onClickAdd(e)}>
          <PostAddOutlinedIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
}

function PropertyItem(props) {
  switch(props.label) {
    case 'backgroundColor':
    case 'borderColor':
      return (
        <div style={styles.propertyItem}>
          {props.label} : 
          <div style={{ width: 12, height: 12, marginLeft: 5, backgroundColor: props.value }} />
        </div>
      );
    case 'borderSize':
    case 'text':
    case 'textSize':
    case 'imgRotate':
    case 'imgSize':
      return (
        <div style={styles.propertyItem}>
          {props.label} : {props.value}
        </div>
      );
    case 'textAlignV':
    case 'textAlignH':
      return (
        <div style={styles.propertyItem}>
          {props.label} : {props.value.title}
        </div>
      );
    case 'img':
      return (
        <div style={styles.propertyItem}>
          {props.label} : {props.value}
        </div>
      );
    default:
      return null;
  }
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
