import React from 'react';
import core from 'core';
import components from './types';


const styles = {
  divider: {
    height: 22,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTop: '1px solid #e9e9e9',
    borderBottom: '1px solid #e9e9e9',
  },
  dividerItem: {
    display: 'flex',
    width: '100%',
    height: 16,
    background: '#D9E1F2',
    color: '#305496',
    fontSize: 12,
    fontFamily: 'Helvetica,Arial,sans-serif',
    fontWeight: 'bold',
    paddingLeft: 6,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    alignItems: 'center',
  },
  basic: {
    display: 'flex',
    width: '100%',
    height: 23,
    color: '#707070',
    fontSize: 12,
    fontFamily: 'Helvetica,Arial,sans-serif',
  },
  basic2: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: 23,
  },
  basicItemLabel: {
    display: 'flex',
    width: '40%',
    alignItems: 'center',
    paddingLeft: 6,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    background: '#F5F5F5',
    marginLeft: 2,
  },
  basicItemValue: {
    display: 'flex',
    width: '60%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingRight: 8,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    background: '#F5F5F5',
    marginLeft: 2,
    borderLeft: '1px solid #f3f3f3',
  },
  basicItemLabel2: {
    display: 'flex',
    width: '40%',
    alignItems: 'center',
    paddingLeft: 6,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    background: '#FFF',
    marginLeft: 2,
  },
  basicItemValue2: {
    display: 'flex',
    width: '60%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingRight: 8,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    background: '#FFF',
    marginLeft: 2,
    borderLeft: '1px solid #f3f3f3',
  }
}


function CompactForm({ scheme, data, cache, route, onChange, getStyle, mode }) {
  let q = 0;
  return scheme.map(i => {
    q = q + 1;
    if (i.type === 'divider') {
      q = 0;
      return (
        <div key={i.prop} style={styles.divider} >
          <div style={styles.dividerItem} >
            {core.lang(i)}
          </div>
        </div>
      )
    }
    if (i.type === 'actions' || i.type === 'combine') {
      return (
        <div key={i.prop} style={styles.basic2} >
          {components(i.prop, i, data[i.prop] || {}, cache[i.prop], data, route, onChange, getStyle, true, mode)}
        </div>
      )
    }

    if (i.type === 'smartbutton') {
      return (
        <div key={i.prop} style={styles.basic} >
          <div style={q & 1 ? styles.basicItemLabel2: styles.basicItemLabel}>{i.title}</div>
          <div style={q & 1 ? styles.basicItemValue2: styles.basicItemValue}>{components(i.prop, i, data[i.prop] || {}, cache[i.prop], data, route, onChange, getStyle, true, mode)}</div>
        </div>
      )
    }
    
    return (
      <div key={i.prop} style={styles.basic} >
        <div style={q & 1 ? styles.basicItemLabel2: styles.basicItemLabel}>{core.lang(i)}</div>
        <div style={q & 1 ? styles.basicItemValue2: styles.basicItemValue}>{components(i.prop, i, data[i.prop] || {}, cache[i.prop], data, route, onChange, getStyle, true, mode)}</div>
      </div>
    )
  })
}


export default CompactForm;