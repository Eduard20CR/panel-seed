import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IpcComponentsService {
  private ipc = (window as any).IPC_GENERATOR_COMPONENTS;
  constructor() {}

  generatePanelComponent(componentId: string, componentConfig: any) {
    this.ipc.panelsComponent(componentId, componentConfig);
  }

  generateWebsiteComponent(componentId: string, componentConfig: any) {
    this.ipc.websitesComponent(componentId, componentConfig);
  }
}
