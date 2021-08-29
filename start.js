const { app, BrowserWindow} = require('electron');
const path = require('path');
app.allowRendererProcessReuse = false;

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    maximizable: false,
    hasShadow: false,
    fullscreen: true,
    show: true,
  });

  mainWindow.setIgnoreMouseEvents(false);

  mainWindow.loadFile(path.join(__dirname, 'public', 'index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.setAlwaysOnTop(true, 'screen-saver', 1);

  mainWindow.once('ready-to-show', () => {
    mainWindow.focus();
    mainWindow.webContents.openDevTools({
      mode: 'undocked'
    });
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // close windows
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
