import React, { Component } from 'react';
import core from 'core';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Scrollbars } from 'react-custom-scrollbars';

import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';

import { ContextMenu } from "@blueprintjs/core";
import Menu from 'components/Menu';

import widgets from 'components/@Widget';

import Section from './Section';


const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '30px 15px',
  },
  root2: {
    width: '100%',
    height: '100%',
    display: 'flex',
    padding: 30,
  },
  stub: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 175,
  },
  stubText: {
    margin: 8,
  },
  stubButton: {
    margin: 8,
  }
}


function getIdSection(index, sections) {
  if (sections[`s${index + 1}`] === undefined) {
    return `s${index + 1}`;
  }
  return getIdSection(index + 1, sections);
}

function getIdColumn(index, sectioId, columns) {
  if (columns[`${sectioId}_c${index + 1}`] === undefined) {
    return `${sectioId}_c${index + 1}`;
  }
  return getIdColumn(index + 1, sectioId, columns);
}

function moveTo(list, index, id) {
  const result = Array.from(list);
  result.splice(index, 0, id);

  return result;
}

function removeTo(list, index) {
  const result = Array.from(list);
  result.splice(index, 1)

  return result;
}

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}


class Canvas extends Component {

  componentDidMount() {
    core.transfer.sub('lauout', this.handleTransferData);

  }

  componentWillUnmount() {
    core.transfer.unsub('lauout', this.handleTransferData);
    this.isSave = null;
  }

  handleTransferData = (button, save, reset) => {
    if (button === 'save') {
      this.isSave = null;
      save({
        [this.props.id]: {
          [this.props.prop]: {
            select: { section: null, column: null },
            hover: { sections: {}, columns: {} },
            drag: { section: null, column: null },
            list: this.props.list,
            sections: this.props.sections,
            columns: this.props.columns,
          }
        }
      })
    } else {
      this.isSave = null;
      reset();
    }
  }

  save = () => {
    if (!this.isSave) {
      this.isSave = true;
      core.actions.apppage.data({ save: 'lauout' })
    }
  }

  handleHoverEnter = (sectionId, columnId) => {
    core.actions.layout
      .hover(
        this.props.id, this.props.prop, 
        { section: sectionId, column: columnId }
      )
  }

  handleHoverOut = (e, sectionId, columnId) => {
    if (e.relatedTarget && e.relatedTarget.parentNode && e.relatedTarget.parentNode.className === 'toolbar') {
      core.actions.layout
        .removeHover(
          this.props.id, this.props.prop, 
          null, columnId
        )
    } else {
      core.actions.layout
        .removeHover(
          this.props.id, this.props.prop, 
          sectionId, columnId
        )
    }
  }

  setCheckHover = (e) => {
    core.actions.layout
      .forceHover(
        this.props.id, this.props.prop, 
        { check: { x: e.clientX, y: e.clientY } }
      );
  }

  handleCheckHover = (x, y) => {
    let found = false;

    const elements = window.document.elementsFromPoint(x, y);

    elements.forEach(i => {
      const sectionid = i.getAttribute('sectionid');
      const columnid = i.getAttribute('columnid');
      
      if (found === false && sectionid && sectionid !== '' && columnid && columnid !== '') {
        found = { sectionId: sectionid, columnId: columnid };
      }
    });

    if (found) {
      core.actions.layout
        .hover(
          this.props.id, this.props.prop, 
          { section: found.sectionId, column: found.columnId });
    } else {
      core.actions.layout
        .forceHover(
          this.props.id, this.props.prop, 
          { sections: {}, columns: {}, check: null, }
        );
    }
  }

  handleClickToolbar = (e, button, value, columnId) => {
    e.preventDefault();
    e.stopPropagation();

    if (button === 'b1') {
      this.handleAddSection(value);
    }
    if (button === 'b2') {
      this.handleClickSection(value);
    }
    if (button === 'b3') {
      this.handleRemoveSection(e, value);
    }
    if (button === 'b4') {
      this.handleClickToolbarColumn(e, value);
    }
    if (button === 'b5') {
      this.handleRemoveSectionInner(e, value, columnId);
    }
  }

  handleAddSection = (sectionId) => {
    const i = Number(sectionId.slice(1));
    const newSectionId = getIdSection(i, this.props.sections);

    core.actions.layout
      .addSection(
        this.props.id, this.props.prop, 
        sectionId, newSectionId,
      );
    this.save();
  }

  handleClickSection = (sectionId) => {
    core.actions.layout
      .select(
        this.props.id, this.props.prop, 
        { section: sectionId, column: null, content: null },
      )
  }

  handleRemoveSection = (e, sectionId) => {
    core.actions.layout
      .removeSection(
        this.props.id, this.props.prop, 
        sectionId,
      );
    this.save();
    
      if (e) {
        const elements = window.document.elementsFromPoint(e.clientX, e.clientY);
        elements.forEach(i => {
          const sectionid = i.getAttribute('sectionid');
          const columnid = i.getAttribute('columnid');
          
          if (sectionid && sectionid !== '' && columnid && columnid !== '') {
            this.handleHoverEnter(sectionid, columnid);
          }
        });
      }
  }

  handleRemoveSectionInner = (e, sectionId, columnId) => { 
    core.actions.layout
      .removeSectionInner(
        this.props.id, this.props.prop, 
        sectionId,
        columnId,
      );
    this.save();
    
      if (e) {
        const elements = window.document.elementsFromPoint(e.clientX, e.clientY);
        elements.forEach(i => {
          const sectionid = i.getAttribute('sectionid');
          const columnid = i.getAttribute('columnid');
          
          if (sectionid && sectionid !== '' && columnid && columnid !== '') {
            this.handleHoverEnter(sectionid, columnid);
          }
        });
      }
  }

  handleClickToolbarColumn = (e, columnId) => {
    e.preventDefault();
    e.stopPropagation();

    core.actions.layout
      .select(
        this.props.id, this.props.prop, 
        { column: columnId, section: null, content: null },
      )
  }

  handleClickColumn = (e, sectionId, columnId, item) => {
    e.preventDefault();
    e.stopPropagation();

    core.actions.layout
      .select(
        this.props.id, this.props.prop, 
        { section: null, column: columnId, content: item.type },
      )
  }

  handleClickBody = (e) => {
    if (this.props.isDragging) {
      /* core.actions.layout
        .hover(
          this.props.id, this.props.options.prop, 
          { 
            ...this.props.data.hover,
            check: { x: e.clientX, y: e.clientY }, 
          }); */
    } else {
      core.actions.layout
        .data(
          this.props.id, this.props.prop, 
          { 
            hover: { sections: {}, columns: {} },
            select: { section: null, column: null },
            drag: { section: null, column: null },
          },
        )
    }
  }

  handleDragStart = (result) => {
    core.actions.layout
      .data(this.props.id, this.props.prop, { isDragging: true });

    if (result.type === 'section') {
      core.actions.layout
      .hover(
        this.props.id, this.props.prop, 
        { section: result.draggableId, column: 'none' }
      )
    }
  }

  handleDragEnd = (result) => {
    core.actions.layout
      .data(this.props.id, this.props.prop, { isDragging: false });

    if (!result.destination) {
      return;
    }

    if (result.type === 'section') {
      this.handleDragEndSection(result)
    } else {
      this.handleDragEndColumn(result)
    }
  }

  handleDragEndSection = (result) => {
    const list = reorder(
      this.props.list,
      result.source.index,
      result.destination.index
    );

    core.actions.layout
      .data(
        this.props.id, this.props.prop, 
        { list },
      )
    this.save();
  }

  handleDragEndColumn = (result) => {
    const sourceSectionId = result.source.droppableId;
    const targetSectionId = result.destination.droppableId;


    if (sourceSectionId !== targetSectionId) {
      const sourceColumns = removeTo(
        this.props.sections[sourceSectionId].columns,
        result.source.index,
      );
      const targetColumns = moveTo(
        this.props.sections[targetSectionId].columns,
        result.destination.index,
        result.draggableId,
      );

      core.actions.layout
        .moveColumn(
          this.props.id, this.props.prop, 
          sourceSectionId, targetSectionId, sourceColumns, targetColumns,
        )
    } else {
      const columns = reorder(
        this.props.sections[targetSectionId].columns,
        result.source.index,
        result.destination.index
      );

      core.actions.layout
        .editSection(
          this.props.id, this.props.prop, 
          targetSectionId, { columns },
        )
    }
    this.save();
  }

  handleDragEnter = (sectionId, columnId) => {
    if (columnId && this.props.drag.column !== columnId) {
      core.actions.layout
        .data(
          this.props.id, this.props.prop, 
          { drag: { section: null, column: columnId } }
        )
      this.save();
    }

  }

  handleDragOut = (e) => {
    if (this.props.drag.column !== null) {
      let check = false;

      const elements = window.document.elementsFromPoint(e.clientX, e.clientY);

      elements.forEach(i => {
        const sectionid = i.getAttribute('sectionid');
        const columnid = i.getAttribute('columnid');
        
        if (sectionid && sectionid !== '' && columnid && columnid !== '') {
          check = true;
        }
      });

      if (!check) {
        core.actions.layout
          .data(
            this.props.id, this.props.prop, 
            { drag: { section: null, column: null } }
          )
      }
    }
  }

  handleDragDrop = (e, sectionId, columnId) => {
    const type = e.dataTransfer.getData('text');

    if (type === 'SECTION') {
      const i = Number(this.props.list.slice(-1).slice(1));
      const newSectionId = getIdSection(i, this.props.sections);
      core.actions.layout
        .addSectionInner(
          this.props.id, this.props.prop, 
          newSectionId, columnId,
        )
      core.actions.layout
        .hover(
          this.props.id, this.props.prop, 
          { section: newSectionId, column: `${newSectionId}_c1` }
        )
    } else if (type === 'CONTAINER') {
      core.actions.layout
        .editColumn(
          this.props.id, this.props.prop, 
          columnId, { type, containerId: { id: 'mn006', title: 'АБК 1 Этаж - Безопасность' } },
        )
      core.actions.layout
        .hover(
          this.props.id, this.props.prop, 
          { section: sectionId, column: columnId }
        )
    } else {
      core.actions.layout
        .editColumn(
          this.props.id, this.props.prop, 
          columnId, { type },
        )
      core.actions.layout
        .hover(
          this.props.id, this.props.prop, 
          { section: sectionId, column: columnId }
        )
    }
    this.save();
  }

  handleClickButtonStub = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
 
    const data = {
      isHoverStub: false,
      select: {
        section: 's1',
        column: null,
      },
      hover: {
        sections: { s1: true },
        columns: { s1_c1: true },
      },
      list: ['s1'],
      sections: { s1: { height: 100, direction: 'row', columns: ['s1_c1'] } },
      columns: { s1_c1: { type: null, size: 100 } }
    };

    core.actions.layout
      .data(this.props.id, this.props.prop, data);
    this.save();
  }

  handleDragDropStub = () => {
    this.handleClickButtonStub(null);
  }

  handleDragEnterStub = (e) => {
    core.actions.layout
      .data(this.props.id, this.props.prop, { isHoverStub: true });
    this.save();
  }

  handleDragOutStub = (e) => {
    core.actions.layout
      .data(this.props.id, this.props.prop, { isHoverStub: false });
  }

  handleAddColumn = (e, sectionId, columnId) => {
    const i = Number(columnId.split('_')[1].slice(1));
    const newColumnId = getIdColumn(i, sectionId, this.props.columns);
  
    core.actions.layout
      .addColumn(this.props.id, this.props.prop, sectionId, columnId, newColumnId);
    this.save();

    if (e) {
      this.setCheckHover(e);
    }
  }

  handleRemoveColumn = (e, sectionId, columnId) => {
    if (this.props.sections[sectionId].columns.length === 1) {
      core.actions.layout
        .clearSection(this.props.id, this.props.prop, sectionId);
    } else {
      core.actions.layout
        .removeColumn(this.props.id, this.props.prop, sectionId, columnId);
    }
    this.save();

    if (e) {
      this.setCheckHover(e);
    }
  }

  handleContextMenu = (e, direction, sectionId, columnId) => {
    e.preventDefault();
    e.stopPropagation();

    const pos = { left: e.clientX, top: e.clientY };
    const scheme = {
      main: [
        { id: '1', 
          title: direction === 'row' ? 'Add Column' : 'Add Row', 
          click: (e) => this.handleAddColumn(e, sectionId, columnId) 
        },
        { id: '2', type: 'divider' },
        { id: '3', title: 'Delete', click: (e) => this.handleRemoveColumn(e, sectionId, columnId) },
      ]
    }

    ContextMenu.show(<Menu scheme={scheme} />, pos);
  }

  handleResizeColumn = (columnIdA, valueA, columnIdB, valueB) => {
    core.actions.layout
      .resizeColumns(this.props.id, this.props.prop,
        columnIdA, valueA, columnIdB, valueB);
    this.save();
  }

  handleRenderContent = (columnId, item) => {
    if (item.type === 'SECTION') {
      return (
        <Section
          inner={columnId} 
          id={item.sectionId}
          provided={{
            draggableProps: {
              style: {}
            },
            innerRef: null,
          }}
          select={this.props.select}
          hover={this.props.hover}
          drag={this.props.drag}
          item={this.props.sections[item.sectionId]}
          columns={this.props.columns}
          isDraggingGlobal={this.props.isDragging}
          isDragging={false}
          isPreview={false}
          onClickToolbar={this.handleClickToolbar}
          onClickColumn={this.handleClickColumn}
          onHoverEnter={this.handleHoverEnter}
          onHoverOut={this.handleHoverOut}
          onDragEnter={this.handleDragEnter}
          onDragOut={this.handleDragOut}
          onDragDrop={this.handleDragDrop}
          onContextMenu={this.handleContextMenu}
          onResizeColumn={this.handleResizeColumn}
          onRenderContent={this.handleRenderContent}
        />
      );
    }
    return widgets(columnId, item)
  }

  handleDragUpdate = (a, b, c, d) => {
    console.log(a, b, c, d)
  }

  componentDidUpdate() {
    if (this.props.hover && this.props.hover.check) {
      this.handleCheckHover(this.props.hover.check.x, this.props.hover.check.y);
    }
  }

  render() {
    if (this.props.list.length === 0) {
      return (
        <div style={styles.root2}>
          <div 
            style={{ 
              ...styles.stub, 
              border: this.props.isHoverStub ? '2px dashed #3eaaf5' : '2px dashed #BDBDBD'
            }} 
            onDrop={this.handleDragDropStub}
            onDragEnter={this.handleDragEnterStub}
            onDragLeave={this.handleDragOutStub}
          >
            <div style={{ ...styles.stub, pointerEvents: this.props.isDraggingToolbar ? 'none': 'all' }}>
              <Fab color="primary" style={styles.stubButton} onClick={this.handleClickButtonStub}>
                <AddIcon />
              </Fab>
              <div style={styles.stubText}>Drag an element here or click to add new section</div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <DragDropContext onDragStart={this.handleDragStart} onDragUpdate={this.handleDragUpdate} onDragEnd={this.handleDragEnd}>
        <Droppable droppableId="droppable" type="section" >
        {(provided, snapshot1) => (
          <Scrollbars style={{width: '100%', height: '100%' }}>
            <div 
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={styles.root}
              className="canvas"
              onClick={this.handleClickBody}
            >
              {this.props.list
                .map((id, index) =>
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot2) => (
                      <Section 
                        id={id}
                        provided={provided}
                        select={this.props.select}
                        hover={this.props.hover}
                        drag={this.props.drag}
                        item={this.props.sections[id]}
                        columns={this.props.columns}
                        isDraggingGlobal={this.props.isDragging}
                        isDragging={snapshot1.isDraggingOver}
                        isPreview={snapshot2.isDragging}
                        onClickToolbar={this.handleClickToolbar}
                        onClickColumn={this.handleClickColumn}
                        onHoverEnter={this.handleHoverEnter}
                        onHoverOut={this.handleHoverOut}
                        onDragEnter={this.handleDragEnter}
                        onDragOut={this.handleDragOut}
                        onDragDrop={this.handleDragDrop}
                        onContextMenu={this.handleContextMenu}
                        onResizeColumn={this.handleResizeColumn}
                        onRenderContent={this.handleRenderContent}
                      />
                    )}
                  </Draggable>
              )}
              {provided.placeholder}
            </div>
          </Scrollbars>
        )}
        </Droppable>
      </DragDropContext>
    );
  }

}


export default Canvas;