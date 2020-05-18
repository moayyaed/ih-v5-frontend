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
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';

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
      nodeId="master" 
      label={<MasterItem {...props} label="Style" />}
      onIconClick={(e) => props.onClickIcon(e, 'master')} 
      onLabelClick={(e) => props.onClickLabel(e, 'master')} 
    >
      {props.list.map((id, key)=> {
        return (
          <TreeItem
            key={id}
            nodeId={id}
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
  );
}

function EditText(props) {

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  if (props.edit) {
    return (
      <input
        autoFocus
        className="text" 
        value={props.value}
        onClick={handleClick} 
        onChange={props.onChange}
        onBlur={props.onComplete}
      />
    )
  }
  return props.value || '';
}

function AnimationItem(props) {
  return (
    <div style={styles.animationItem}>
      <div style={styles.itemLabel}>
        <EditText 
          edit={props.state[props.nodeId].edit} 
          value={props.state[props.nodeId].title}
          onChange={(e) => props.onChangeTitle(e, props.nodeId)}
          onComplete={() => props.onChangeCompliteTitle(props.nodeId)}
        />
      </div>
      <div style={styles.itemButtons}>
        <Number 
          value={props.state[props.nodeId].curent || 0}
          style={styles.itemButton}
          onChange={v => props.onChangeNumber(props.nodeId, v)}
        />
        <IconButton style={styles.itemButton} size="small" onClick={(e) => props.onClickVisibility(e, props.nodeId, !props.state[props.nodeId].hide)}>
          {props.state.master.hide || props.state[props.nodeId].hide ? <VisibilityOffIcon fontSize="inherit" /> : <VisibilityIcon fontSize="inherit" />}
        </IconButton>
        <IconButton size="small" style={styles.itemButton} onClick={(e) => props.onClickOptions(e, props.nodeId, props.index)}>
          <MoreVertOutlinedIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
}

function MasterItem(props) {
  if (props.state.master === undefined) {
    return null;
  }
  return (
    <div style={styles.masterItem}>
      <div style={styles.itemLabel}>{props.label}</div>
      <div style={styles.itemButtonsMaster}>
        <IconButton style={styles.itemButton} size="small" onClick={(e) => props.onClickVisibility(e, 'master', !props.state.master.hide)}>
          {props.state.master.hide ? <VisibilityOffIcon fontSize="inherit" /> : <VisibilityIcon fontSize="inherit" />}
        </IconButton>
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


/*

       <IconButton style={styles.itemButton} size="small" onClick={(e) => props.onClickUp(e, props.nodeId, props.index)}>
          <ArrowUpwardIcon fontSize="inherit" />
        </IconButton>
        <IconButton style={styles.itemButton} size="small" onClick={(e) => props.onClickDown(e, props.nodeId, props.index)}>
          <ArrowDownwardIcon fontSize="inherit" />
        </IconButton>

*/