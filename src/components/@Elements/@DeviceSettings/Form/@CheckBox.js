import React from 'react';
import CheckboxMui from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const styles = {
  root: {
    width: 16,
    height: 16,
    padding: 0,
  },
  container: {
    display: 'flex',
    height: 22,
    width: '100%',
    alignItems: 'center',
  },
  container2: {
    display: 'flex',
    height: 22,
    width: '100%',
    alignItems: 'center',
  },
}

function getAlign(v) {
  switch(v) {
    case 'left':
      return 'flex-start';
    case 'right':
      return 'flex-end';
    case 'center':
      return 'center';
    default:
      return 'flex-start';
  }
}


function CheckBox(props) {
  return (
    <div style={styles.container}>
      <div style={{ 
        flexShrink: 0, 
        marginRight: 8,
        color: props.item.titleColor, 
        fontSize: props.item.titleSize,
        textAlign: props.item.titleAlign,
        fontWeight: props.item.titleBold ? 600 : 'unset',
        fontStyle: props.item.titleItalic ? 'italic' : 'unset',
        marginTop: props.item.offsetTop,
        marginBottom: props.item.offsetBottom, 
        width: props.item.proportion, 
        ...props.item.style 
      }}>
        {props.item.title}
      </div>
      <div style={{ ...styles.container2, justifyContent: getAlign(props.item.align), ...props.item.style2 }}>
        <CheckboxMui
          size="small"
          color="primary"
          icon={<CheckBoxOutlineBlankIcon style={{ fontSize: props.item.size || '1.25rem' }} />}
          checkedIcon={<CheckBoxIcon style={{ fontSize: props.item.size || '1.25rem' }} />}
          style={{ ...styles.root, ...props.item.style2 }}
          checked={Boolean(props.data)}
        />
      </div>
    </div>
  );
}


export default CheckBox;