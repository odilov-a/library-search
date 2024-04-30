const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      devTools: false,
    },
  });
  mainWindow.loadFile(path.join(__dirname, "index.html"));
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
  mainWindow.setMenu(null);

  globalShortcut.register("CommandOrControl+R", () => {
    mainWindow.reload();
  });

  globalShortcut.register("CommandOrControl+F", () => {
    mainWindow.setFullScreen(!mainWindow.isFullScreen());
  });
}

app.on("ready", () => {
  createWindow();
  app.on("will-quit", () => {
    globalShortcut.unregisterAll();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
