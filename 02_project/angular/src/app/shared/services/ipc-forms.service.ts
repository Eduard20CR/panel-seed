import { Injectable } from '@angular/core';
import { IAngularPanel } from '../interface/panels/angular-config.interface';

@Injectable({
  providedIn: 'root',
})
export class IpcFormsService {
  constructor() {}

  async getDestinationFolder() {
    try {
      const folder = await (<any>window).UTILS.getDestinationFolder();
      return folder[0] as string;
    } catch (error) {
      throw new Error('Se jodio');
    }
  }

  async generateAngular(angularConfig: IAngularPanel) {
    const res = await (<any>window).GENERATORS.generateAngularPanel(
      angularConfig
    );

    console.log(res);
  }
}
