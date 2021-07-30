const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    icon: path.resolve(__dirname, "../assets/icon.png") ,  
    webPreferences:{
      nodeIntegration: true,
      preload: path.resolve(__dirname, "preload.js")
    }
  });

  mainWindow.loadFile(path.join(__dirname, '../public/index.html'));

  // mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

ipcMain.handle('add-file', async (event, arg) => {
  const sysIcon = process.platform === 'win32' ? 'ico' : null
  return dialog.showOpenDialog({ 
      properties: ['openFile'],
      filters: [{ name: 'Imagens', extensions: ['jpg', 'png', 'webp', 'jpeg', sysIcon]}]
  })
  .then( res => {
      return res.canceled === true ? false : res.filePaths
  })
})

ipcMain.on('change-icon', (event,arg) => {
  const window = BrowserWindow.getFocusedWindow()
  console.log(arg);
  window.setIcon(arg)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});