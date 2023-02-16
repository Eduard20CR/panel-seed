import { Report } from "../assets/magma-panel-report/Report";
import type { CapacitorElectronConfig } from "@capacitor-community/electron";
import { getCapacitorElectronConfig, setupElectronDeepLinking } from "@capacitor-community/electron";
import { dialog, ipcMain, MenuItemConstructorOptions } from "electron";
import { app, MenuItem } from "electron";
import electronIsDev from "electron-is-dev";
import unhandled from "electron-unhandled";

import { ElectronCapacitorApp, setupContentSecurityPolicy, setupReloadWatcher } from "./setup";
import { GenerateAngularPanels } from "./generators/panels/angular/generateAngularPanels";
import { IAngularConfig } from "./shared/interface/angular-config.interface";
import { exec, execSync } from "child_process";

// Graceful handling of unhandled errors.
unhandled();

// Define our menu templates (these are optional)
const trayMenuTemplate: (MenuItemConstructorOptions | MenuItem)[] = [new MenuItem({ label: "Quit App", role: "quit" })];
const appMenuBarMenuTemplate: (MenuItemConstructorOptions | MenuItem)[] = [
  { role: process.platform === "darwin" ? "appMenu" : "fileMenu" },
  { role: "viewMenu" },
  { role: "editMenu" },
];

// Get Config options from capacitor.config
const capacitorFileConfig: CapacitorElectronConfig = getCapacitorElectronConfig();

// Initialize our app. You can pass menu templates into the app here.
// const myCapacitorApp = new ElectronCapacitorApp(capacitorFileConfig);
const myCapacitorApp = new ElectronCapacitorApp(capacitorFileConfig, trayMenuTemplate, appMenuBarMenuTemplate);

// If deeplinking is enabled then we will set it up here.
if (capacitorFileConfig.electron?.deepLinkingEnabled) {
  setupElectronDeepLinking(myCapacitorApp, {
    customProtocol: capacitorFileConfig.electron.deepLinkingCustomProtocol ?? "mycapacitorapp",
  });
}

// If we are in Dev mode, use the file watcher components.
if (electronIsDev) {
  setupReloadWatcher(myCapacitorApp);
}

// Run Application
(async () => {
  // Wait for electron app to be ready.
  await app.whenReady();
  // Security - Set Content-Security-Policy based on whether or not we are in dev mode.
  setupContentSecurityPolicy(myCapacitorApp.getCustomURLScheme());
  // Initialize our app, build windows, and load content.
  await myCapacitorApp.init();
  // Check for updates if we are in a packaged app.
  //autoUpdater.checkForUpdatesAndNotify();
})();

// Handle when all of our windows are close (platforms have their own expectations).
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== "darwin") {
  app.quit();
  // }
});

// When the dock icon is clicked.
app.on("activate", async function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (myCapacitorApp.getMainWindow().isDestroyed()) {
    await myCapacitorApp.init();
  }
});

// Place all ipc or other electron api calls and custom functionality under this line

ipcMain.on("quit-application", () => {
  app.quit();
});

ipcMain.handle("get-destination-folder", async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ["openDirectory"] });
  if (canceled) throw new Error("Somthing happened");

  return filePaths;
});

ipcMain.handle("generate-angular", async (_, { projectName, projectPath }: IAngularConfig) => {
  const arr = [];

  console.log("starting");
  arr.push(`cd ${projectPath}`);

  // if (await this.isAngularProjectInDirectory()) throw Error("Please delete angular folder in the destionation folder");

  arr.push(`/oscar.vasquez/ng new ${projectName} --routing --skip-tests --directory=angular --style=scss`);

  // await new Promise((res, err) => {
  const commands = arr.join("; ");
  execSync(commands);
  // res("Panel generated!");
  // });
  // });

  // const angularApp = new GenerateAngularPanels(projectPath, projectName);
  // await angularApp.generateProject();
  return "Panel Done";
});
