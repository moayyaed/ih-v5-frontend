import React from 'react';
import CheckboxMui from '@material-ui/core/Checkbox';


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
}


function CheckBox(props) {
  return (
    <div style={styles.container}>
      <div style={{ flexShrink: 0, width: props.item.proportion, ...props.item.style2 }}>{props.item.title}</div>
      <CheckboxMui
        size="small"
        color="primary"
        style={styles.root}
        checked={Boolean(props.data)}
      />
    </div>
  );
}


export default CheckBox;