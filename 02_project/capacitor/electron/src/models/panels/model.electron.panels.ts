import path from "path";
import { IElectronPanel } from "../../interfaces/models/panels/electron-config.interface";

export class ElectronPanelApp implements IElectronPanel {
  public capacitorPath: string;
  public electronPath: string;
  constructor(public projectPath: string, public projectName: string, public brand: string, public timezone: string) {
    this.capacitorPath = path.join(this.projectPath, "capacitor");
    this.electronPath = path.join(this.capacitorPath, "electron");
  }
}
