import { Injectable } from '@angular/core';
import { IAngularPanel } from '../../interface/panels/angular-config.interface';
import { IElectronPanel } from '../../interface/panels/electron-config.interface';
import { IIosPanel } from '../../interface/panels/ios-config.interface';

@Injectable({
  providedIn: 'root',
})
export class IpcPanelsService {
  private ipc = (window as any).IPC_GENERATOR_PANELS;

  constructor() {}

  generateAngular(angularConfig: IAngularPanel) {
    this.ipc.angularPanel(angularConfig);
  }

  generateElectron(electronConfig: IElectronPanel) {
    this.ipc.electronPanel(electronConfig);
  }

  generateIos(iosConfig: IIosPanel) {
    this.ipc.iosPanel(iosConfig);
  }

  generateComponent() {}
}
