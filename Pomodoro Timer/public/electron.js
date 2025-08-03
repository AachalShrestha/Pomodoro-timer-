import { app, BrowserWindow } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'

// Fix __dirname equivalent for ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url))

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 500,
    frame: false, // Remove default title bar
    titleBarStyle: 'hidden', // For macOS
    titleBarOverlay: true, // For Windows 11
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  // Load dev server in development
  win.loadURL("http://localhost:5173") // Changed to Vite's default port
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})