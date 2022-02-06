// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const port = process.env.PORT ? process.env.PORT - 100 : 3000;

console.log(`OUR REACT PORT: ${port}`);

const v8 = require('v8');
v8.setFlagsFromString('--expose_gc');
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
app.commandLine.appendSwitch('js-flags', '--expose_gc');
app.commandLine.appendSwitch('ignore-certificate-errors');
app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('enable-precise-memory-info');
app.commandLine.appendSwitch('use-fake-ui-for-media-stream');
app.commandLine.appendSwitch('force_high_performance_gpu');
app.commandLine.appendSwitch('enable-speech-input');

function createMainWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    alwaysOnTop: true,
    enableLargerThanScreen: true,
    webPreferences: {
      backgroundThrottling: false
    }
  });
  // and load the index.html of the app.
  mainWindow.loadURL(`http://localhost:${port}`);
  mainWindow.setBackgroundThrottling(false);
  mainWindow.webContents.setBackgroundThrottling(false);
  // mainWindow.webContents.on('render-process-gone', (_, details) => {
  //   console.log('Render Process Gone', Date().toString(), details);
  //   if (details.reason !== 'clean-exit') {
  //     setTimeout(() => mainWindow.webContents.reload(), 500);
  //   }
  // });
  mainWindow.on('closed', () => {
    app.exit();
  });
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const mainWindow = createMainWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  // if (process.platform !== 'darwin') app.quit();
});

process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  // some other closing procedures go here
  process.exit(0);
});
