import path from "path";
import { IAngularPanel } from "../../interfaces/models/angular-config.interface";

export class AngularPanelApp implements IAngularPanel {
  public angularPath: string;
  public panelOrientation?: string;
  constructor(
    public projectPath: string,
    public projectName: string,
    public fontSize?: number,
    public vh?: number,
    public vw?: number
  ) {
    this.angularPath = path.join(this.projectPath, "angular");

    if (this.vh && this.vw) {
      this.panelOrientation = vh < vw ? "landscape" : "portrait";
    }
  }
}
