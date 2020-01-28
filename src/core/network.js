import 'whatwg-fetch';
import core from 'core';

function error(reject, data) {
  core.app.alert.error(data.message);
  reject(data);
}

export function fetch(data) {
  return new Promise((resolve, reject) => {
    window.fetch('api', { method: 'POST', body: JSON.stringify(data, null, 2)})
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        error(reject, { message: response.statusText });
      }
    })
    .then(function(json) {
      if (json.response) {
        resolve(json);
      } else {
        error(reject, json);
      }
    })
    .catch(err => {
      error(reject, { message: err.message });
    });
  }); 
  

}