const { app, BrowserWindow, session } = require('electron');
const path = require('path');
app.allowRendererProcessReuse = false;

let mainWindow = null;

function createWindowDev() {
  mainWindow = new BrowserWindow({
    transparent: true,
    frame: false,
    resizable: false,
    maximizable: false,
    hasShadow: false,
    fullscreen: true,
    acceptFirstMouse: true,
    show: true,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.resolve(__dirname, 'preload.js'),
    },
  });

  mainWindow.setIgnoreMouseEvents(false);

  mainWindow.loadFile(path.join(__dirname, 'public', 'index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.focus();
    mainWindow.webContents.openDevTools({
      mode: 'undocked'
    });
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
