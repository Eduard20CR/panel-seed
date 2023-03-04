import { Injectable } from '@angular/core';
import { IAngularWeb } from '../../interface/websites/angular-config.interface';

@Injectable({
  providedIn: 'root',
})
export class IpcWebsitesService {
  private ipc = (window as any).IPC_GENERATOR_WEBSITES;
  constructor() {}

  generateAngular(angularConfig: IAngularWeb) {
    this.ipc.angularPanel(angularConfig);
  }

  generateComponent() {}
}
