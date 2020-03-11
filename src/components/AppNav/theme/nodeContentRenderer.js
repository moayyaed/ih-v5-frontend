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

function MinusSquare(props) {
  return (
    <SvgIcon style={{ fontSize: 16 }} fontSize="inherit" viewBox="0 0 16 16"  {...props}>
      <path d="M13 3.5V6H12V4H6.5L6.146 3.854L5.293 3H1V10.418L0.025 13.342L0.5 14L0 13.5V2.5L0.5 2H5.5L5.854 2.146L6.707 3H12.5L13 3.5Z" fill="#424242"/>
      <path d="M15.151 6H8.50002L8.14602 6.146L7.29302 7H2.50002L2.02502 7.342L0.0250244 13.342L0.500024 14L12.516 14L13 13.629L15.634 6.629L15.151 6ZM12.133 13L1.19302 13L2.86002 8H7.50002L7.85402 7.854L8.70702 7H14.5L12.133 13Z" fill="#424242"/>
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon style={{ fontSize: 16 }}  fontSize="inherit" viewBox="0 0 16 16"  {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M1.01087 2.5L1.51087 2H6.50713L6.86068 2.14645L7.71349 2.99925H14.5011L15.0011 3.49925V8.99512L14.9903 9.00599V13.5021L14.4903 14.0021H1.5L1 13.5021V6.50735L1.01087 6.49648V2.5ZM14.0011 3.99925V5.00311H7.5005L7.14695 5.14956L6.28915 6.00735H2.01087V3H6.30002L7.15283 3.8528L7.50638 3.99925H14.0011ZM6.49626 7.00735H2.01087V7.49588H1.99963V11.4929H2V13.0021H13.9903V11.4929H13.9906V7.49588H13.9903V6.00311H7.70761L6.84981 6.8609L6.49626 7.00735Z" fill="#424242"/>
    </SvgIcon>
  );
}

function ChildSquare(props) {
  return (
    <SvgIcon className="close" style={{ fontSize: 15 }}  fontSize="inherit" viewBox="0 0 24 24" {...props}>
      <path d="M11.201,24 L12.799,24 C13.776,24 14.571,23.205 14.571,22.228 L14.571,21.409 C15.365,21.194 16.127,20.879 16.839,20.465 L17.418,21.044 C17.75,21.376 18.197,21.566 18.669,21.566 C19.14,21.566 19.587,21.384 19.919,21.044 L21.044,19.919 C21.376,19.587 21.566,19.14 21.566,18.669 C21.566,18.197 21.384,17.75 21.044,17.418 L20.465,16.839 C20.879,16.127 21.194,15.365 21.409,14.571 L22.228,14.571 C23.205,14.571 24,13.776 24,12.799 L24,11.201 C24,10.224 23.205,9.429 22.228,9.429 L21.409,9.429 C21.194,8.635 20.879,7.873 20.465,7.161 L21.044,6.582 C21.376,6.25 21.566,5.803 21.566,5.331 C21.566,4.86 21.384,4.413 21.044,4.081 L19.919,2.956 C19.587,2.624 19.14,2.434 18.669,2.434 C18.197,2.434 17.75,2.616 17.418,2.956 L16.839,3.535 C16.127,3.121 15.365,2.806 14.571,2.591 L14.571,1.772 C14.571,0.795 13.776,0 12.799,0 L11.201,0 C10.224,0 9.429,0.795 9.429,1.772 L9.429,2.591 C8.635,2.806 7.873,3.121 7.161,3.535 L6.582,2.956 C6.25,2.624 5.803,2.434 5.331,2.434 C4.86,2.434 4.413,2.616 4.081,2.956 L2.956,4.081 C2.268,4.769 2.268,5.894 2.956,6.582 L3.535,7.161 C3.121,7.873 2.806,8.635 2.591,9.429 L1.772,9.429 C0.795,9.429 0,10.224 0,11.201 L0,12.799 C0,13.776 0.795,14.571 1.772,14.571 L2.591,14.571 C2.806,15.365 3.121,16.127 3.535,16.839 L2.956,17.418 C2.268,18.106 2.268,19.231 2.956,19.919 L4.081,21.044 C4.413,21.376 4.86,21.566 5.331,21.566 C5.803,21.566 6.25,21.384 6.582,21.044 L7.161,20.465 C7.873,20.879 8.635,21.194 9.429,21.409 L9.429,22.228 C9.438,23.205 10.232,24 11.201,24 z M7.501,18.751 C7.36,18.66 7.202,18.611 7.045,18.611 C6.83,18.611 6.623,18.693 6.466,18.851 L5.431,19.885 C5.398,19.919 5.365,19.927 5.34,19.927 C5.315,19.927 5.282,19.919 5.249,19.885 L4.123,18.76 C4.073,18.71 4.073,18.627 4.123,18.577 L5.158,17.543 C5.431,17.269 5.481,16.831 5.257,16.508 C4.661,15.622 4.255,14.637 4.048,13.594 C3.974,13.213 3.634,12.931 3.245,12.931 L1.78,12.931 C1.705,12.931 1.647,12.873 1.647,12.799 L1.647,11.201 C1.647,11.127 1.705,11.069 1.78,11.069 L3.245,11.069 C3.634,11.069 3.974,10.795 4.048,10.406 C4.255,9.363 4.661,8.378 5.257,7.492 C5.472,7.169 5.431,6.731 5.158,6.457 L4.123,5.423 C4.073,5.373 4.073,5.29 4.123,5.24 L5.249,4.115 C5.282,4.081 5.315,4.073 5.34,4.073 C5.365,4.073 5.398,4.081 5.431,4.115 L6.466,5.166 C6.739,5.439 7.178,5.489 7.501,5.265 C8.386,4.669 9.372,4.264 10.415,4.057 C10.795,3.982 11.077,3.643 11.077,3.254 L11.077,1.788 C11.077,1.714 11.135,1.656 11.209,1.656 L12.807,1.656 C12.882,1.656 12.94,1.714 12.94,1.788 L12.94,3.254 C12.94,3.643 13.213,3.982 13.602,4.057 C14.645,4.264 15.63,4.669 16.516,5.265 C16.839,5.481 17.278,5.439 17.551,5.166 L18.586,4.131 C18.619,4.098 18.652,4.09 18.677,4.09 C18.702,4.09 18.735,4.098 18.768,4.131 L19.894,5.257 C19.927,5.29 19.935,5.323 19.935,5.348 C19.935,5.373 19.927,5.406 19.894,5.439 L18.859,6.474 C18.586,6.747 18.536,7.186 18.76,7.509 C19.356,8.395 19.761,9.38 19.968,10.423 C20.043,10.804 20.382,11.085 20.771,11.085 L22.237,11.085 C22.311,11.085 22.369,11.143 22.369,11.218 L22.369,12.815 C22.369,12.89 22.311,12.948 22.237,12.948 L20.771,12.948 C20.382,12.948 20.043,13.221 19.968,13.61 C19.761,14.653 19.356,15.638 18.76,16.524 C18.544,16.847 18.586,17.286 18.859,17.559 L19.894,18.594 C19.927,18.627 19.935,18.66 19.935,18.685 C19.935,18.71 19.927,18.743 19.894,18.776 L18.768,19.902 C18.735,19.935 18.702,19.943 18.677,19.943 C18.652,19.943 18.619,19.935 18.586,19.902 L17.551,18.867 C17.278,18.594 16.839,18.544 16.516,18.768 C15.63,19.364 14.645,19.77 13.602,19.977 C13.221,20.051 12.94,20.39 12.94,20.78 L12.94,22.245 C12.94,22.319 12.882,22.377 12.807,22.377 L11.209,22.377 C11.135,22.377 11.077,22.319 11.077,22.245 L11.077,20.78 C11.077,20.39 10.804,20.051 10.415,19.977 C9.372,19.753 8.386,19.347 7.501,18.751 z" fill="#000000"/>
      <path d="M16.864,12.012 C16.864,9.33 14.678,7.145 11.996,7.145 C9.314,7.145 7.136,9.33 7.136,12.012 C7.136,14.695 9.322,16.88 12.004,16.88 C14.686,16.88 16.864,14.695 16.864,12.012 z M8.775,12.012 C8.775,10.232 10.224,8.784 12.004,8.784 C13.784,8.784 15.233,10.232 15.233,12.012 C15.233,13.792 13.784,15.241 12.004,15.241 C10.224,15.241 8.775,13.784 8.775,12.012 z" />
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