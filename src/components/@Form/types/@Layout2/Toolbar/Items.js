import React from 'react';


import TreeItem from '@material-ui/lab/TreeItem';

import { useSpring, animated } from 'react-spring/web.cjs';
import { fade, withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';


import { TypeIcon } from './Icons';


const styles = {

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
      <ElementItemGroup { ...props} />
    </BasicItem>
  );
}

function ElementItemGroup(props) {
  return props.list.map(id => {
    const data = props.sections[id] || props.columns[id]
    if (data.columns) {
      return (
        <BasicItem
          key={id}
          nodeId={id}
          label={id}
          endIcon={<TypeIcon type={data.type}/>}
          onIconClick={(e) => props.onClickIcon(e, id, 'section')} 
          onLabelClick={(e) => props.onClickLabel(e, id, 'section')} 
        >
          <ElementItemGroup {...props} list={data.columns} />
        </BasicItem>
      )
    }
    if (data.type) {
      if (data.type === 'innersection') {
        return (
          <BasicItem
            key={id}
            nodeId={id}
            label={id}
            endIcon={<TypeIcon type={data.type}/>}
            onIconClick={(e) => props.onClickIcon(e, id, 'column')} 
            onLabelClick={(e) => props.onClickLabel(e, id, 'column')} 
          >
            <BasicItem
              key={data.sectionId}
              nodeId={data.sectionId}
              label={data.sectionId}
              endIcon={<TypeIcon type={props.sections[data.sectionId].type}/>}
              onIconClick={(e) => props.onClickIcon(e, data.sectionId, 'section')} 
              onLabelClick={(e) => props.onClickLabel(e, data.sectionId, 'section')} 
            >
              <ElementItemGroup {...props} list={props.sections[data.sectionId].columns} />
            </BasicItem>
          </BasicItem>
        )
      }
      return (
        <BasicItem
          key={id}
          nodeId={id}
          label={id}
          endIcon={<TypeIcon type={data.type}/>}
          onIconClick={(e) => props.onClickIcon(e, id, 'column')} 
          onLabelClick={(e) => props.onClickLabel(e, id, 'column')} 
        >
          <BasicItem
            key={id + data.type}
            nodeId={id + data.type}
            label={data.type}
            endIcon={<TypeIcon type={data.type}/>}
            onIconClick={(e) => props.onClickIcon(e, id, 'content', data.type)} 
            onLabelClick={(e) => props.onClickLabel(e, id, 'content', data.type)} 
          />
        </BasicItem>
      )
    }
    
    return (
      <BasicItem
        key={id}
        nodeId={id}
        label={id}
        endIcon={<TypeIcon type={data.type}/>}
        onIconClick={(e) => props.onClickIcon(e, id, 'column')} 
        onLabelClick={(e) => props.onClickLabel(e, id, 'column')} 
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


/*

       <IconButton style={styles.itemButton} size="small" onClick={(e) => props.onClickUp(e, props.nodeId, props.index)}>
          <ArrowUpwardIcon fontSize="inherit" />
        </IconButton>
        <IconButton style={styles.itemButton} size="small" onClick={(e) => props.onClickDown(e, props.nodeId, props.index)}>
          <ArrowDownwardIcon fontSize="inherit" />
        </IconButton>

*/