import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IpcFormsService {
  constructor() {}

  async getDestinationFolder() {
    try {
      const folder = await (<any>window).IPC_FORMS.getDestinationFolder();
      return folder[0] as string;
    } catch (error) {
      throw new Error('Se jodio');
    }
  }

  async generateAngular(projectName: string, projectPath: string) {
    await (<any>window).IPC_FORMS.generateAngular(projectName, projectPath);
  }
}
