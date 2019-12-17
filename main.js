const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 900,
    height: 600,
    icon: path.join(__dirname, "logo_small.png"),
    // frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  // Keyboard Shortcuts
  globalShortcut.register("f5", function() {
    win.reload();
  });
  globalShortcut.register("CommandOrControl+R", function() {
    win.reload();
  });
  globalShortcut.register("CTRL+SHIFT+I", function() {
    win.webContents.openDevTools();
  });

  // Size

  win.setMinimumSize(900, 600);
  win.setMaximumSize(900, 600);

  // and load the index.html of the app.
  win.loadFile("index.html");

  // Open the DevTools.
  //   win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  globalShortcut.unregisterAll();
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
