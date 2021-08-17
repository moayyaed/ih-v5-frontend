import uuidv4 from 'uuid/v4';
import cctv from 'libs/cctv';

import { FWebSocket } from './transport';

const urlCreator = window.URL || window.webkitURL;


export function playerJpeg(container, config) {

  function fullscreen() {
    if (
        !document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  const img = document.createElement("img");
  img.style.height = '100%';
  container.appendChild(img);
  container.addEventListener('dblclick', fullscreen);

  config.uuid = uuidv4();

  const stream1 = new FWebSocket(config, 'control');
  const stream2 = new FWebSocket(config, 'data');

  stream1.buf = null;


  stream1.onopen = () => console.log('open')
  stream1.onmessage = e => console.log(e)
  stream1.onclose = () => {}
  stream1.destroy = () => {
    if (stream1.buf !== null) {
      urlCreator.revokeObjectURL(stream1.buf);
    }
  }

  stream2.onopen = () => console.log('open')
  stream2.onmessage = e => {
    const arrayBufferView = new Uint8Array(e.data.slice(4));
    const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
    if (stream1.buf !== null) {
      urlCreator.revokeObjectURL(stream1.buf);
    }
    stream1.buf = urlCreator.createObjectURL(blob);
    img.src = stream1.buf;
  }
  stream2.onclose = () => {}
  return stream1
}

export function playerH264(container, config) {

  function play() {

  }

  function pause() {
    if (!document.hidden) {
      video.currentTime = video.duration - 2;
      video.play()
    }
  }

  function timeupdate() {
    if (document.hidden === false) {
      const delta = video.duration - video.currentTime;
      if (delta >= 6 && delta <= 60 && video.playbackRate === 1) {
        video.playbackRate = 5;
      }

      if (delta >= 61) {
        video.playbackRate = 1;
        video.currentTime = video.duration - 2;
      }

      if (delta < 3 && video.playbackRate !== 1) {
        video.playbackRate = 1;
      }

      if (video.readyState === 4 && video.paused === true) {
        video.play();
      }

      if (video.ended) {
        ended();
      }
    }
  }

  function ended() {
    if (player.close && player.off === false) {
      player.off = true;
      player.close(config.id);
    }
  }

  function error() {

  }

  function abort() {

  }

  function unlink() {
    if (player && player.rtimer) {
      clearTimeout(player.rtimer)
    }
    video.removeEventListener('playing', play, false);
    video.removeEventListener('pause', pause, false);
    video.removeEventListener('timeupdate', timeupdate, false);
    video.removeEventListener('error', error, false);
    video.removeEventListener('abort', abort, false);

    video.pause();
    video.removeAttribute('src');
    video.load();

  }

  const video = document.createElement('video');
  const source = document.createElement('source');

  source.src = 'rtsp://127.0.0.1:554';
  source.type = 'application/x-rtsp';

  video.addEventListener('playing', play, false);
  video.addEventListener('pause', pause, false);
  video.addEventListener('timeupdate', timeupdate, false);
  video.addEventListener('error', error, false);
  video.addEventListener('abort', abort, false);

  video.style = 'position:absolute;width:100%;height:100%'
  video.controls = true;
  video.loop = false;
  video.muted = 'muted';


  video.appendChild(source);
  container.appendChild(video);

  config.uuid = uuidv4();

  const player = cctv.player(video, { socket: config });
  player.unlink = unlink;
  player.off = false;
  player.rtimer = setTimeout(ended, 1000 * 60 * 60);

  setTimeout(() => video.play(), 1000)
  return player;
}