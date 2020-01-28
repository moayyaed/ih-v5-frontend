import 'whatwg-fetch';
import core from 'core';

function error(reject, data) {
  core.app.alert.error(data.message);
  reject(data);
}

export function fetch(data) {
  return new Promise((resolve, reject) => {
    window.fetch('api', { 
      method: 'POST', body: JSON.stringify(data, null, 2),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        error(reject, { message: response.statusText });
      }
    })
    .then((json) => {
      if (json.response) {
        resolve(json);
      } else {
        if (json.error === 'NEEDAUTH') {
          core.app.exit();
          error(reject, json);
        } else {
          error(reject, json);
        }
      }
    })
    .catch(err => {});
  }); 
  

}