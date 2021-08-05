import core from 'core';


export function layoutCommand(data) {
  if (data.command === 'gotolayout') {
    const prevlayoutid = this.props.state.layoutid;
    const nextlayoutid = data.id;

    if (prevlayoutid === nextlayoutid) {
      this.requestChangeContainer(data.context)
    } else {
      this.requestChangeLayout(nextlayoutid, data.context)
    }
  }

  if (data.command === 'showdialog') {
    core.transfer.send('show_dialog_command', data);
  }

  if (data.command === 'synccharts') {
    if (data.containerId) {
      core.actions.layout.syncChartsContainer(data.containerId, data.range, data.realtime);
    } else {
      core.actions.layout.syncChartsLayout(data.range, data.realtime);
    }
  }

  if ( data.command === 'synccharts_dialog') {
    core.actions.layoutDialog.syncCharts(data.range, data.realtime);
  }

  if (data.command === 'synccharts_home_all') {
    if (data.containerId) {
      core.actions.layout.syncChartsContainerHomeAll(data.containerId, true);
    } else {
      core.actions.layout.syncChartsLayoutHomeAll(true);
    }
  }

  if ( data.command === 'synccharts_home_all_dialog') {
    core.actions.layoutDialog.syncChartsHomeAll(true);
  }

  if (data.command === 'synccharts_date_all') {
    if (data.containerId) {
      core.actions.layout.syncChartsContainerHomeAll(data.containerId, false, data.date);
    } else {
      core.actions.layout.syncChartsLayoutHomeAll(false, data.date);
    }
  }

  if ( data.command === 'synccharts_date_all_dialog') {
    core.actions.layoutDialog.syncChartsHomeAll(false, data.date);
  }

  if (data.command === 'synccharts_next_all') {
    if (data.containerId) {
      core.actions.layout.syncChartsContainerHomeAll(data.containerId, 'next');
    } else {
      core.actions.layout.syncChartsLayoutHomeAll('next');
    }
  }

  if ( data.command === 'synccharts_next_all_dialog') {
    core.actions.layoutDialog.syncChartsHomeAll('next');
  }

  if (data.command === 'synccharts_before_all') {
    if (data.containerId) {
      core.actions.layout.syncChartsContainerHomeAll(data.containerId, 'before');
    } else {
      core.actions.layout.syncChartsLayoutHomeAll('before');
    }
  }

  if ( data.command === 'synccharts_before_all_dialog') {
    core.actions.layoutDialog.syncChartsHomeAll('before');
  }
}

