import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createWindow() {
  const win = new BrowserWindow({
    width: 285,
    height: 316,
    frame: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: false,
    alwaysOnTop: true,
    icon: path.join(__dirname, 'app.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true // Added for extra security
    }
  });

  // Windows-specific adjustments
  if (process.platform === 'win32') {
    win.setMenuBarVisibility(false);
  }

  // Load dev server
  win.loadURL("http://localhost:5173");

  // IPC Handlers - Use .on() instead of .handle()
  ipcMain.on('minimize-window', () => win.minimize());
  ipcMain.on('close-window', () => win.close());
  
}

app.whenReady().then(() => {
  createWindow();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});