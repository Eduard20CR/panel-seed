const shell = require("shelljs");
const path = require("path");
const fsextra = require("fs-extra");

export class GenerateAngular {
  private _seedPanelFiles = "D:/03 CURSOS/01 PROGRAMACION/02_TRABAJOS_PERSONALES/21_PANEL_SEED/01_learn/panel-seed/src/collection.json";
  private _angularPath: string;
  constructor(private _projectPath: string, private _projectName: string, private shell: any) {
    this._angularPath = path.join(this._projectPath, "angular");
  }

  generateProject() {
    // 1) go to folder
    this.shell.cd(this._projectPath);

    // 2) check if there is an angular project
    // ---> If exist => throw exeption
    if (this.checkIfAngularExists()) throw new Error("Please remove any angular project in the destination directory");

    // 3) generate angular
    this.shell.exec(`ng new ${this._projectName} --routing --style=scss --skip-tests --directory=angular`);

    // 4) move to angular project
    this.shell.cd("angular");

    // 4) install bootstrap
    this.shell.exec("npm i bootstrap");

    // 5) add seed with schematics
    const relativePath = path.relative(this._angularPath, this._seedPanelFiles);
    this.shell.exec(`ng g ${relativePath}:panel-seed-template`);

    // 6) change outputPath in angular.json
    shell.sed("-i", /"outputPath":\s*("[^"]*"|''),/gm, '"outputPath": "./../webroot",', "angular.json");
    shell.sed("-i", /\"scripts\":\s*\[\s*\]/, '"scripts": ["node_modules/bootstrap/dist/js/bootstrap.js"]', "angular.json");

    // 8) check if everything was created
    if (!this.checkIfAngularExists()) throw new Error("Something went wrong");
  }

  addSchematics() {}

  private checkIfAngularExists() {
    return fsextra.pathExistsSync(this._angularPath);
  }
}

// const path = `./`;
const outputPath = `D:/03 CURSOS/01 PROGRAMACION/02_TRABAJOS_PERSONALES/21_PANEL_SEED/01_learn/webroot`;
const projectName = "oscar";

const generatorAngular = new GenerateAngular(outputPath, projectName, shell);

generatorAngular.generateProject();

// shell.sed(
//   "-i",
//   /"outputPath":\s*("[^"]*"|''),/gm,
//   '"outputPath": "./../webroot",',
//   "D:/03 CURSOS/01 PROGRAMACION/02_TRABAJOS_PERSONALES/21_PANEL_SEED/01_learn/webroot/editFile/angular.json"
// );
