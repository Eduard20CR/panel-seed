const shell = require("shelljs");

export class GenerateElectron {
  //   private _seedPanelFiles: string;

  constructor(private _projectPath: string, private _projectName: string, private shell: any) {}

  generateAngularProject() {
    this.shell.cd(this._projectPath);
    this.shell.mkdir("capacitor");
    this.shell.cd("capacitor");
    this.shell.exec(`npm init -y`);
    this.shell.exec(`npm i @capacitor/core`);
    this.shell.exec(`npm i -D @capacitor/cli`);
    this.shell.exec(`npx cap init test com.test.app --web-dir ./../webroot`);
    this.shell.exec(`npm i @capacitor-community/electron`);
    this.shell.exec(`npx cap add @capacitor-community/electron`);
  }
  addSchematics() {}
}

const path = `${__dirname}/../`;
const projectName = "oscar";

const generatorAngular = new GenerateElectron(path, projectName, shell);

generatorAngular.generateAngularProject();
