const electron= require("electron");
const ejs=require("ejs-electron");
const app=electron.app;
const BrowserWindow=electron.BrowserWindow;

ejs.data({
    title:"My Sheet 1"
})
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:{
      nodeIntegration: true,
      enableRemoteModule:true
    }
  })

  win.loadFile('index.ejs').then(() =>{
    win.webContents.openDevTools();
    win.removeMenu();
    win.show();
    win.maximize();
  })
}

app.whenReady().then(createWindow)


//mac
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})