const { contextBridge } = require('electron');
const iohook = require('iohook');
const listeners = new Map();
let iohookStarted = false;

contextBridge.exposeInMainWorld('iohook', {
  stop: () => {
    if (iohookStarted) {
      iohook.stop();
    }
  },
  on: (event, func) => {
    listeners.set(event, func);
    iohook.on(event, func);

    if (!iohookStarted) {
      iohook.start();
    }
  },
  off: (event) => {
    if (listeners.has(event)) {
      iohook.off(event, listeners.get(event));
      listeners.delete(event);
    }
  },
});
