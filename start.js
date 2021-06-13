const { app, BrowserWindow, session } = require('electron');
const path = require('path');
// causes sigsegv
const iohook = require('iohook');

let mainWindow = null;

function createWindowDev() {
  mainWindow = new BrowserWindow({
    transparent: false,
    frame: true,
    resizable: true,
    maximizable: true,
    hasShadow: true,
    minimizable: true,
    show: true,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'public', 'index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.once('ready-to-show', () => {
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': ["default-src 'none'"],
        },
      });
    });

    mainWindow.focus();
  });
}

app.on('ready', createWindowDev);

app.on('window-all-closed', () => {
  // close windows
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
