import path from "path";
import { IAngularPanel } from "../../interfaces/models/panels/angular-config.interface";

export class AngularPanelApp implements IAngularPanel {
  public angularPath: string;
  public panelOrientation: string;
  constructor(
    public projectPath: string,
    public projectName: string,
    public fontSize: number,
    public vh: number,
    public vw: number
  ) {
    this.angularPath = path.join(this.projectPath, "angular");

    this.panelOrientation = vh < vw ? "landscape" : "portrait";
  }
}
