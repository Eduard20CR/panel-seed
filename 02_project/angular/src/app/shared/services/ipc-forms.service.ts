import { Injectable } from '@angular/core';
import { IAngularConfig } from '../interface/angular-config.interface';

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

  async generateAngular(angularConfig: IAngularConfig) {
    const res = await (<any>window).GENERATORS.generateAngularPanel(
      angularConfig
    );

    console.log(res);
  }
}
