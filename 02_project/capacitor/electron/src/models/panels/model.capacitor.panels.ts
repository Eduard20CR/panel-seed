import path from "path";

export class CapacitorPanelApp {
  public _capacitorPath: string;
  constructor(public _projectPath: string, public _projectName: string) {
    this._capacitorPath = path.join(this._projectPath, "capacitor");
  }
}
