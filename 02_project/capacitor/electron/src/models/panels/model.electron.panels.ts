import path from "path";

export class ElectronPanelApp {
  public _capacitorPath: string;
  public _electronPath: string;
  constructor(
    public _projectPath: string,
    public _projectName: string,
    public _brand: string,
    public _timezone: string
  ) {
    this._capacitorPath = path.join(this._projectPath, "capacitor");
    this._electronPath = path.join(this._capacitorPath, "electron");
  }
}
