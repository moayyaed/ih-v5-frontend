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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { TypeIcon } from './Icons';


const styles = {
  animationItem: {
    display: 'flex',
    alignItems: 'center',
  },
  propertyItem: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
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
  itemButtonLock: {
    marginRight: 36,
    marginLeft: 62,
  }
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


export function EventsItems(props) {
  return (
    <BasicItem 
      nodeId="events" 
      label="Actions"
      onIconClick={(e) => props.onClickIcon(e, 'events')} 
      onLabelClick={(e) => props.onClickLabel(e, 'events')} 
    >
      <EventsItemGroup { ...props} />
    </BasicItem>
  );
}

export function ElementsItems(props) {
  return (
    <BasicItem 
      nodeId="content" 
      label="Шаблон"
      onIconClick={(e) => props.onClickIcon(e, 'content')} 
      onLabelClick={(e) => props.onClickLabel(e, 'content')} 
    >
      <ElementItemGroup { ...props} />
    </BasicItem>
  );
}

function OptionItem(props) {
  if (props.edits && props.edits[props.nodeId] !== undefined) {
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
      <div style={styles.itemLabel}>{props.type === 'property' ? <PropertyItem nodeId={props.p} label={props.p} value={props.label} /> : props.label}</div>
      <div style={styles.itemButtonsMaster}>
        <IconButton size="small" style={styles.itemButton} onClick={(e) => props.onClickMenuToolbar(e, props)} >
          <MoreVertOutlinedIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  )
}

export function AnimationItems(props) {
  return (
    <BasicItem 
      nodeId="variables" 
      label={<StyleItem {...props} label="Variables" />}
      onIconClick={(e) => props.onClickIcon(e, 'variables')} 
      onLabelClick={(e) => props.onClickLabel(e, 'variables')} 
    >
      {props.list.map((id, key)=> {
        return (
          <BasicItem
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
                <BasicItem key={id + '_' + v} nodeId={id + '_' + v} label={<OptionItem nodeId={v} {...props} type="value" s={id} v={v} label={`${props.state[id].title}: ${v}`} />} >
                  {Object
                    .keys(props.state[id].values[v])
                    .map(i => 
                      <BasicItem key={id + '_' + v + '_' + i} nodeId={id + '_' + v + '_' + i} label={<OptionItem nodeId={i} {...props} s={id} v={v} i={i} type="id" label={props.elements[i] ? props.elements[i]._label : i} />} >
                        {Object
                          .keys(props.state[id].values[v][i])
                          .map(p => {
                            const data = props.state[id].values[v][i][p];
                            return (
                              <BasicItem 
                                key={id + '_' + v + '_' + i + '_' + p} 
                                nodeId={id + '_' + v + '_' + i + '_' + p} 
                                label={<OptionItem nodeId={p} {...props} type="property" s={id} v={v} i={i} p={p}  label={data} />}
                                endIcon={<TypeIcon type="property" />} 
                              />
                            )
                          })}
                      </BasicItem>
                    )}
                </BasicItem>
              )
            }
          </BasicItem>
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

function EventsItemGroup(props) {
  return props.list.map(id => {
    if (props.elements[id].type === 'group') {
      return (
        <BasicItem
          key={id}
          nodeId={id}
          label={id}
          endIcon={<TypeIcon type={props.elements[id].type}/>}
          onIconClick={(e) => props.onClickIcon(e, id)} 
          onLabelClick={(e) => props.onClickLabel(e, id)} 
        >
          <ElementItemGroup {...props} list={props.elements[id].elements} />
        </BasicItem>
      )
    }
    if (props.elements[id].type === 'action') {
      return (
        <BasicItem
          key={id}
          nodeId={id}
          label={<OptionItem nodeId={id} {...props} type="element" label={props.elements[id]._label} />}
          endIcon={<TypeIcon type={props.elements[id].type}/>}
          onIconClick={(e) => props.onClickIcon(e, id)} 
          onLabelClick={(e) => props.onClickLabel(e, id)} 
        />
      )
    }

    return null;
  })
}

function ElementItemGroup(props) {
  return props.list.map(id => {
    if (props.elements[id].type === 'group') {
      return (
        <BasicItem
          key={id}
          nodeId={id}
          label={id}
          endIcon={<TypeIcon type={props.elements[id].type}/>}
          onIconClick={(e) => props.onClickIcon(e, id)} 
          onLabelClick={(e) => props.onClickLabel(e, id)} 
        >
          <ElementItemGroup {...props} list={props.elements[id].elements} />
        </BasicItem>
      )
    }
    if (props.elements[id].type === 'action') {
      return null;
    }
    return (
      <BasicItem
        key={id}
        nodeId={id}
        label={<OptionItem nodeId={id} {...props} type="element" label={props.elements[id]._label} />}
        endIcon={<TypeIcon type={props.elements[id].type}/>}
        onIconClick={(e) => props.onClickIcon(e, id)} 
        onLabelClick={(e) => props.onClickLabel(e, id)} 
      />
    )
  })
}

function AnimationItem(props) {
  return (
    <div style={styles.animationItem}>
      <div style={{ ...styles.itemLabel, color: props.nodeId === props.select ? '#01579B' : 'rgba(0, 0, 0, 0.54)', fontWeight: props.nodeId === props.select ? 600 : 'unset' }}>
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
        <IconButton size="small" style={styles.itemButton} onClick={(e) => props.onClickOptions(e, props.nodeId, props.index)}>
          <MoreVertOutlinedIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
}


function StyleItem(props) {
  if (props.state.master === undefined) {
    return null;
  }
  return (
    <div style={styles.masterItem}>
      <div style={styles.itemLabel}>{props.label}</div>
      <div style={styles.itemButtonsMaster}>
        <IconButton size="small" style={styles.itemButton} onClick={(e) => props.onClickAdd(e)}>
          <PostAddOutlinedIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
}

function DefaultItem(props) {
  if (props.state.master === undefined) {
    return null;
  }
  return (
    <div style={styles.masterItem}>
      <div style={{ ...styles.itemLabel, color: props.select ? '#01579B' : 'rgba(0, 0, 0, 0.54)', fontWeight: props.select === 'master' ? 600 : 'unset' }}>{props.label}</div>
      <div style={styles.itemButtonsMaster}>
        <IconButton disabled size="small" style={styles.itemButtonLock} >
          <LockOutlinedIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
}


function PropertyItem(props) {
  switch(props.label) {
    case 'boxShadow':
      return (
        <div style={styles.propertyItem}>
          {props.label} : 
          <div style={{ width: 12, height: 12, marginLeft: 5, boxShadow: props.value.value }} />
        </div>
      );
    case 'backgroundColor':
      return (
        <div style={styles.propertyItem}>
          {props.label} : 
          <div style={{ width: 12, height: 12, marginLeft: 5, background: props.value.value }} />
        </div>
      );
    case 'borderColor':
    case 'textColor':
    case 'imgColor':
      return (
        <div style={styles.propertyItem}>
          {props.label} : 
          <div style={{ width: 12, height: 12, marginLeft: 5, backgroundColor: props.value.value }} />
        </div>
      );
    case 'textRotate':
    case 'opacity':
    case 'textItalic':
    case 'textBold':
    case 'borderRadius':
    case 'opacity':
    case 'zIndex':
    case 'borderSize':
    case 'text':
    case 'textSize':
    case 'imgRotate':
    case 'imgSize':
    case 'singleClickLeft':
    case 'doubleClickLeft':
    case 'longClickLeft':
    case 'singleClickRight':
    case 'doubleClickRight':
    case 'longClickRight':
    case 'x':
    case 'y':
    case 'w':
    case 'h':
      return (
        <div style={styles.propertyItem}>
          {props.label} : {props.value._bind ? props.value._bind : props.value.value}
        </div>
      );
    case 'textFontFamily':
    case 'borderStyle':
    case 'textAlignV':
    case 'textAlignH':
      return (
        <div style={styles.propertyItem}>
          {props.label} : {props.value.value.title}
        </div>
      );
    case 'img':
      return (
        <div style={styles.propertyItem}>
          {props.label} : {props.value.value}
        </div>
      );
    default:
      return (
        <div style={styles.propertyItem}>
          {props.label} 
          <div style={{ width: 12, height: 12, marginLeft: 5 }} />
        </div>
      );
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
