import core from 'core';


function sound(uuid, files) {
  let i = 0;

  const list = files.map(file => ({ file, canplay: false, error: false }));

  function play(index) {
    if (list[index] !== undefined && i === index) {
      const item = list[index];
      if (item.error === false) {
        item.audio.play();
        item.canplay = false;
      } else {
        next();
      }
    }
  }

  function next() {
    i = i + 1;
    clear(i);
    play(i);
  }

  function clear(index) {
    if (window.__ihp2p && list[index] !== undefined && list[index].file) {
      URL.revokeObjectURL(list[index].file);
    }
  }

  list.forEach((item, index) => {
    checkP2P(`/sounds/${encodeURI(item.file)}`, (file) => {
      item.file = file;

      if (file === false) {
        item.canplay = false;
        item.error = true;

        play(index)
      } else {
        item.audio = new Audio(file);
  
        item.audio.addEventListener('canplay', event => {
          item.canplay = true;
          play(index);
        });
  
        item.audio.addEventListener('ended', e => {
          next();
        });
  
        item.audio.addEventListener('error', (e) => {
          list[i].error = true;
          if (i === index) {
            next();
          }
        });
      }
    })
  });
}

function checkP2P(url, cb) {

  if (window.__ihp2p) {
    const xhr = new window.__ihp2p.xhr();

    xhr.responseType = 'blob';
    xhr.open('GET', url);
    xhr.setRequestHeader('token', core.cache.token);
    xhr.send();
  
    xhr.onerror = (e) => {
      cb(false);
    }
  
    xhr.onload = () => {
        if (xhr.status === 200) {
          const url = URL.createObjectURL(xhr.response)
          cb(url);
        } else {
          cb(false);
        }
    }
  } else {
    cb(url)
  }
}


export default sound;