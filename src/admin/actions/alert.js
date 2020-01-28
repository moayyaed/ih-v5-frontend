import core from 'core';


core.app.alert.error = function(message) {
  if (message) {
    core.components.app.setAlertOpen('error', message);
  } else {
    core.components.app.setAlertClose();
  }
}

core.app.alert.warning = function(message) {
  if (message) {
    core.components.app.setAlertOpen('warning', message);
  } else {
    core.components.app.setAlertClose();
  }
}

core.app.alert.info = function(message) {
  if (message) {
    core.components.app.setAlertOpen('info', message);
  } else {
    core.components.app.setAlertClose();
  }
}

core.app.alert.success = function(message) {
  if (message) {
    core.components.app.setAlertOpen('success', message);
  } else {
    core.components.app.setAlertClose();
  }
}

