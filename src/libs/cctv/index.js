/* eslint-disable */

import * as streamedian from './player.js';
import WebsocketTransport from './transport/websocket.js';
import RTSPClient from './client/rtsp/client.js';
import {isSafari} from "./core/util/browser.js";




const cctv = {
    stop() {
      stop();
    },
    destroy() {
      destroy();
    },
    player(node, opts) {
        if (!opts.socket) {
            throw new Error("socket parameter is not set");
        }

        let _options = {
            modules: [
                {
                    client: RTSPClient,
                    transport: {
                        constructor: WebsocketTransport,
                        options: {
                            socket: opts.socket
                        }
                    }
                }
            ],
            errorHandler(e) {
                if(opts.onerror) {
                    opts.onerror(e);
                } else {
                    alert(`Failed to start player: ${e.message}`);
                }
            },
            queryCredentials(client) {
                return new Promise((resolve, reject) => {
                    let c = prompt('input credentials in format user:password');
                    if (c) {
                        client.setCredentials.apply(client, c.split(':'));
                        resolve();
                    } else {
                        reject();
                    }
                });
            }
        };
        return new streamedian.WSPlayer(node, _options);
    }
};

export default cctv;
