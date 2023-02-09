const shell = require("shelljs");

export class GenerateAngular {
  private _seedPanelFiles: string;

  constructor(private _projectPath: string, private _projectName: string, private shell: any) {}

  generateAngularProject() {
    this.shell.cd(this._projectPath);
    this.shell.exec(`ng new ${this._projectName} --routing true --style scss`);
    this.shell.cd(this._projectName);
    this.shell.exec("pwd");
  }

  addSchematics() {}
}

const generatorAngular = new GenerateAngular(`${__dirname}/../`, "oscar", shell);

generatorAngular.generateAngularProject();
