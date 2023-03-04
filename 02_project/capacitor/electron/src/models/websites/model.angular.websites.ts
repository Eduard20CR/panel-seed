import path from "path";

import { IAngularWeb } from "../../interfaces/models/websites/angular-config.interface";

export class AngularPanelApp implements IAngularWeb {
  public angularPath: string;
  public panelOrientation: string;
  constructor(public projectPath: string, public projectName: string) {
    this.angularPath = path.join(this.projectPath, "angular");
  }
}
