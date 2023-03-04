import { randomBytes } from "crypto";
import { ipcRenderer, contextBridge } from "electron";
import { EventEmitter } from "events";
import { IAngularPanel } from "../interfaces/models/panels/angular-config.interface";
import { ICapacitorPanel } from "../interfaces/models/panels/capacitor-config.interface";
import { IElectronPanel } from "../interfaces/models/panels/electron-config.interface";
import { IIosPanel } from "../interfaces/models/panels/ios-config.interface";

////////////////////////////////////////////////////////
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugins = require("./electron-plugins");

const randomId = (length = 5) => randomBytes(length).toString("hex");

const contextApi: {
  [plugin: string]: { [functionName: string]: () => Promise<any> };
} = {};

Object.keys(plugins).forEach((pluginKey) => {
  Object.keys(plugins[pluginKey])
    .filter((className) => className !== "default")
    .forEach((classKey) => {
      const functionList = Object.getOwnPropertyNames(plugins[pluginKey][classKey].prototype).filter(
        (v) => v !== "constructor"
      );

      if (!contextApi[classKey]) {
        contextApi[classKey] = {};
      }

      functionList.forEach((functionName) => {
        if (!contextApi[classKey][functionName]) {
          contextApi[classKey][functionName] = (...args) => ipcRenderer.invoke(`${classKey}-${functionName}`, ...args);
        }
      });

      // Events
      if (plugins[pluginKey][classKey].prototype instanceof EventEmitter) {
        const listeners: { [key: string]: { type: string; listener: (...args: any[]) => void } } = {};
        const listenersOfTypeExist = (type) =>
          !!Object.values(listeners).find((listenerObj) => listenerObj.type === type);

        Object.assign(contextApi[classKey], {
          addListener(type: string, callback: (...args) => void) {
            const id = randomId();

            // Deduplicate events
            if (!listenersOfTypeExist(type)) {
              ipcRenderer.send(`event-add-${classKey}`, type);
            }

            const eventHandler = (_, ...args) => callback(...args);

            ipcRenderer.addListener(`event-${classKey}-${type}`, eventHandler);
            listeners[id] = { type, listener: eventHandler };

            return id;
          },
          removeListener(id: string) {
            if (!listeners[id]) {
              throw new Error("Invalid id");
            }

            const { type, listener } = listeners[id];

            ipcRenderer.removeListener(`event-${classKey}-${type}`, listener);

            delete listeners[id];

            if (!listenersOfTypeExist(type)) {
              ipcRenderer.send(`event-remove-${classKey}-${type}`);
            }
          },
          removeAllListeners(type: string) {
            Object.entries(listeners).forEach(([id, listenerObj]) => {
              if (listenerObj.type === type) {
                ipcRenderer.removeListener(`event-${classKey}-${type}`, listenerObj.listener);
                delete listeners[id];
              }
            });

            ipcRenderer.send(`event-remove-${classKey}-${type}`);
          },
        });
      }
    });
});

contextBridge.exposeInMainWorld("CapacitorCustomPlatform", {
  name: "electron",
  plugins: contextApi,
});
////////////////////////////////////////////////////////

contextBridge.exposeInMainWorld("UTILS", {
  getDestinationFolder: () => ipcRenderer.invoke("get-destination-folder"),
});

contextBridge.exposeInMainWorld("IPC_GENERATOR_PANELS", {
  angularPanel: (AngularConfig: IAngularPanel) => ipcRenderer.invoke("generate-angular-panels", AngularConfig),
  electronPanel: (ElectronConfig: IElectronPanel) => ipcRenderer.invoke("generate-electron-panels", ElectronConfig),
  iosPanel: (IosConfig: IIosPanel) => ipcRenderer.invoke("generate-ios-panels", IosConfig),
  capacitorPanel: (CapacitorConfig: ICapacitorPanel) =>
    ipcRenderer.invoke("generate-capacitor-panels", CapacitorConfig),
});

contextBridge.exposeInMainWorld("IPC_GENERATOR_WEBSITES", {
  angularPanel: (AngularConfig: IAngularPanel) => ipcRenderer.invoke("generate-angular-websites", AngularConfig),
});

contextBridge.exposeInMainWorld("IPC_GENERATOR_COMPONENTS", {
  panelsComponent: (componentID: string, componentConfig: any) =>
    ipcRenderer.invoke("generate-component-panels", componentID, componentConfig),
  websitesComponent: (componentID: string, componentConfig: any) =>
    ipcRenderer.invoke("generate-component-websites", componentID, componentConfig),
});

// contextBridge.exposeInMainWorld("API_ELECTRON", {
//   name: "electron",
//   plugins: contextApi,
// on: (channel: any, listener: any) => {
//   ipcRenderer.on(channel, listener);
// },
//   send: (channel: any, ...args: any) => {
//     ipcRenderer.send(channel, ...args);
//   },
//   removeAllListeners: (channel: any) => {
//     ipcRenderer.removeAllListeners(channel);
//   },
// });
