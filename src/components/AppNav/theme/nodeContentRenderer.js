import React, { Component } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import PropTypes from 'prop-types';
import styles from './node.module.css';

function isDescendant(older, younger) {
  return (
    !!older.children &&
    typeof older.children !== 'function' &&
    older.children.some(
      child => child === younger || isDescendant(child, younger)
    )
  );
}

//<path d="M13 3.5V6H12V4H6.5L6.146 3.854L5.293 3H1V10.418L0.025 13.342L0.5 14L0 13.5V2.5L0.5 2H5.5L5.854 2.146L6.707 3H12.5L13 3.5Z" fill="#424242"/>
//<path d="M15.151 6H8.50002L8.14602 6.146L7.29302 7H2.50002L2.02502 7.342L0.0250244 13.342L0.500024 14L12.516 14L13 13.629L15.634 6.629L15.151 6ZM12.133 13L1.19302 13L2.86002 8H7.50002L7.85402 7.854L8.70702 7H14.5L12.133 13Z" fill="#424242"/>
function MinusSquare(props) {
  return (
    <SvgIcon style={{ fontSize: 13 }} fontSize="inherit" viewBox="0 0 24 24"  {...props}>
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" fill="#424242" />
    </SvgIcon>
  );
}
//<path fillRule="evenodd" clipRule="evenodd" d="M1.01087 2.5L1.51087 2H6.50713L6.86068 2.14645L7.71349 2.99925H14.5011L15.0011 3.49925V8.99512L14.9903 9.00599V13.5021L14.4903 14.0021H1.5L1 13.5021V6.50735L1.01087 6.49648V2.5ZM14.0011 3.99925V5.00311H7.5005L7.14695 5.14956L6.28915 6.00735H2.01087V3H6.30002L7.15283 3.8528L7.50638 3.99925H14.0011ZM6.49626 7.00735H2.01087V7.49588H1.99963V11.4929H2V13.0021H13.9903V11.4929H13.9906V7.49588H13.9903V6.00311H7.70761L6.84981 6.8609L6.49626 7.00735Z" fill="#424242"/>
function PlusSquare(props) {
  return (
    <SvgIcon style={{ fontSize: 13 }}  fontSize="inherit" viewBox="0 0 24 24"  {...props}>
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" fill="#424242"></path>
    </SvgIcon>
  );
}

function ChildSquare(props) {
  return (
    <SvgIcon className="close" style={{ fontSize: 16 }}  fontSize="inherit" viewBox="0 0 16 16" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M4 1L3 2V14L4 15H13L14 14V5L13.7071 4.29289L10.7071 1.29289L10 1H4ZM4 14V2L9 2V6H13V14H4ZM13 5L10 2V5L13 5Z" fill="#424242"/>
    </SvgIcon>
  );
}

// eslint-disable-next-line react/prefer-stateless-function
class FileThemeNodeContentRenderer extends Component {

  handleFocusInput = (e) => {
    if (e) {
      e.select();
    }
  }

  handleKeyPressInput = (e, node) => {
    if(e.key === 'Enter'){
      this.props.handleEndRename(e.target.value, node);
    }
  }

  handleBlurInput = (e, node) => {
    this.props.handleEndRename(e.target.value, node);
  }
  render() {
    const {
      scaffoldBlockPxWidth,
      toggleChildrenVisibility,
      connectDragPreview,
      connectDragSource,
      isDragging,
      canDrop,
      canDrag,
      node,
      title,
      draggedNode,
      path,
      treeIndex,
      isSearchMatch,
      isSearchFocus,
      icons,
      buttons,
      className,
      style,
      didDrop,
      lowerSiblingCounts,
      listIndex,
      swapFrom,
      swapLength,
      swapDepth,
      treeId, // Not needed, but preserved for other renderers
      isOver, // Not needed, but preserved for other renderers
      parentNode, // Needed for dndManager
      rowDirection,
      ...otherProps
    } = this.props;

    const nodeTitle = title || node.title;

    const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
    const isLandingPadActive = !didDrop && isDragging;

    // Construct the scaffold representing the structure of the tree
    const scaffold = [];
    const check = lowerSiblingCounts.length - 1;
    lowerSiblingCounts.forEach((lowerSiblingCount, i) => {
      if (i === 0) {
        scaffold.push(
          <div
            key={`pre_${1 + i}`}
            style={{ width: scaffoldBlockPxWidth }}
            className={`${check === i ? styles.lineBlockEnd : styles.lineBlockEnd} ${otherProps.renameid ? styles.opacity: ''}`}
          />
        );
      } else {
        scaffold.push(
          <div
            key={`pre_${1 + i}`}
            style={{ width: scaffoldBlockPxWidth }}
            className={`${check === i ? styles.lineBlockEnd : styles.lineBlock} ${otherProps.renameid ? styles.opacity: ''}`}
          />
        );
      }

      if (treeIndex !== listIndex && i === swapDepth) {
        // This row has been shifted, and is at the depth of
        // the line pointing to the new destination
        let highlightLineClass = '';

        if (listIndex === swapFrom + swapLength - 1) {
          // This block is on the bottom (target) line
          // This block points at the target block (where the row will go when released)
          highlightLineClass = styles.highlightBottomLeftCorner;
        } else if (treeIndex === swapFrom) {
          // This block is on the top (source) line
          highlightLineClass = styles.highlightTopLeftCorner;
        } else {
          // This block is between the bottom and top
          highlightLineClass = styles.highlightLineVertical;
          // debugger;
        }

        scaffold.push(
          <div
            key={`highlight_${1 + i}`}
            style={{
              width: scaffoldBlockPxWidth,
              left: scaffoldBlockPxWidth * i,
            }}
            className={`${styles.absoluteLineBlock} ${highlightLineClass}`}
          />
        );
      }
    });

    const nodeLabel = (
      connectDragPreview(<div
        className={
          styles.row +
          (isLandingPadActive ? ` ${styles.rowLandingPad}` : '') +
          (isLandingPadActive && !canDrop
            ? ` ${styles.rowCancelPad}`
            : '') +
          (isSearchMatch ? ` ${styles.rowSearchMatch}` : '') +
          (isSearchFocus ? ` ${styles.rowSearchFocus}` : '') +
          (className ? ` ${className}` : '')
        }
        style={{
          opacity: isDraggedDescendant ? 0.5 : otherProps.renameid ? otherProps.renameid === node.id ? 1 : 0.2 : 1,
          width: otherProps.renameid === node.id ? '100%' : 'auto',
          ...style,
        }}
        onClick={(e) => {
          /*
          if (e.shiftKey || e.ctrlKey || e.metaKey) {
            if (node.children && !node.expanded) {
              node.children && toggleChildrenVisibility({ node, path, treeIndex });
            }
          } else {
            node.children && toggleChildrenVisibility({ node, path, treeIndex });
          }
          */
        }}
      >
        <div
          className={
            styles.rowContents +
            (!canDrag ? ` ${styles.rowContentsDragDisabled}` : '')
          }
        >
          <div className={styles.rowToolbar}>
            {icons.map((icon, index) => (
              <div
                key={index} // eslint-disable-line react/no-array-index-key
                className={styles.toolbarButton}
              >
                {icon}
              </div>
            ))}
          </div>
          {otherProps.renameid === node.id ?
            <div className={styles.rowLabel} style={{ width: '100%', padding: 0 }}>
              <span className={styles.rowTitle}>
                <input 
                  ref={this.handleFocusInput} 
                  type="text" 
                  style={{ border: '1px solid #2196F3', width: '100%' }}
                  onBlur={(e) => this.handleBlurInput(e, node)} 
                  onKeyPress={(e) => this.handleKeyPressInput(e, node)}
                  defaultValue={node.title} 
                />
              </span>
            </div>
          :
          <div className={styles.rowLabel}>
            <span className={styles.rowTitle}>
              {typeof nodeTitle === 'function'
                ? nodeTitle({
                    node,
                    path,
                    treeIndex,
                  })
                : nodeTitle}
            </span>
          </div>}
          <div className={styles.rowToolbar}>
            {buttons.map((btn, index) => (
              <div
                key={index} // eslint-disable-line react/no-array-index-key
                className={styles.toolbarButton}
              >
                {btn}
              </div>
            ))}
          </div>
        </div>
      </div>)
    )

    const nodeContent = (
      <div style={{ height: '100%' }} {...otherProps}>
        {toggleChildrenVisibility &&
          node.children ? (
            <button
              type="button"
              className={`${styles.collapseButton} ${otherProps.renameid ? styles.opacity : ''}`}
              style={{
                left: (lowerSiblingCounts.length - 0.7) * scaffoldBlockPxWidth - 8.5
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                
                toggleChildrenVisibility({
                  node,
                  path,
                  treeIndex,
                })
              }}
            >
             {node.expanded ? <MinusSquare /> : <PlusSquare />}
            </button>
          ) : (
            <button
            type="button"
            className={`${styles.childButton} ${otherProps.renameid ? styles.opacity : ''}`}
            style={{
              left: (lowerSiblingCounts.length - 0.7) * scaffoldBlockPxWidth - 8.5
            }}
          >
           < ChildSquare />
          </button>
          )
          }

        <div
          className={
            styles.rowWrapper +
            (!canDrag ? ` ${styles.rowWrapperDragDisabled}` : '')
          }
        >
            <div style={{ display: 'flex' }}>
              {scaffold}
              {canDrag ? connectDragSource(nodeLabel, { dropEffect: 'copy' }) : nodeLabel}
            </div>
        </div>
      </div>
    );

    return nodeContent;
  }
}

FileThemeNodeContentRenderer.defaultProps = {
  buttons: [],
  canDrag: false,
  canDrop: false,
  className: '',
  draggedNode: null,
  icons: [],
  isSearchFocus: false,
  isSearchMatch: false,
  parentNode: null,
  style: {},
  swapDepth: null,
  swapFrom: null,
  swapLength: null,
  title: null,
  toggleChildrenVisibility: null,
};

FileThemeNodeContentRenderer.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.node),
  canDrag: PropTypes.bool,
  className: PropTypes.string,
  icons: PropTypes.arrayOf(PropTypes.node),
  isSearchFocus: PropTypes.bool,
  isSearchMatch: PropTypes.bool,
  listIndex: PropTypes.number.isRequired,
  lowerSiblingCounts: PropTypes.arrayOf(PropTypes.number).isRequired,
  node: PropTypes.shape({}).isRequired,
  path: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  scaffoldBlockPxWidth: PropTypes.number.isRequired,
  style: PropTypes.shape({}),
  swapDepth: PropTypes.number,
  swapFrom: PropTypes.number,
  swapLength: PropTypes.number,
  title: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  toggleChildrenVisibility: PropTypes.func,
  treeIndex: PropTypes.number.isRequired,
  treeId: PropTypes.string.isRequired,
  rowDirection: PropTypes.string.isRequired,

  // Drag and drop API functions
  // Drag source
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  didDrop: PropTypes.bool.isRequired,
  draggedNode: PropTypes.shape({}),
  isDragging: PropTypes.bool.isRequired,
  parentNode: PropTypes.shape({}), // Needed for dndManager
  // Drop target
  canDrop: PropTypes.bool,
  isOver: PropTypes.bool.isRequired,
};

export default FileThemeNodeContentRenderer;