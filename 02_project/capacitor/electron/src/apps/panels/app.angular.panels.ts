import path from "path";

export class AngularPanelApp {
  public _angularPath: string;
  public _panelOrientation?: string;
  constructor(public _projectPath: string, public _projectName: string, public _fontSize?: number, public _vh?: number, public _vw?: number) {
    this._angularPath = path.join(this._projectPath, "angular");

    if (this._vh) {
      this._panelOrientation = _vh < _vw ? "landscape" : "portrait";
    }
  }
}
