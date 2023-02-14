const shell = require("shelljs");
const path = require("path");
const fsextra = require("fs-extra");

export class GenerateAngular {
  private _seedPanelFiles = "/Users/oscar.vasquez/Documents/02_internal/2023/02_New_Panel_Seed/01_learn/panel-seed/src/collection.json:panel-seed-template";

  constructor(private _projectPath: string, private _projectName: string, private shell: any) {}

  async generateProject() {
    // 1) go to folder
    this.shell.cd(this._projectPath);

    // 2) check if there is an angular project
    // ---> If exist => throw exeption
    try {
      const angularPath = path.join(this._projectPath, "angular");
      const isAngularFolder = await fsextra.pathExists(angularPath);
      if (isAngularFolder) throw Error("Please delete angular folder in the destionation folder");
    } catch (error) {
      throw error;
    }

    // 3) generate angular
    this.shell.exec(`ng new ${this._projectName} --routing true --style scss --skip-tests true --directory angular`);

    // 4) move to angular project
    this.shell.cd("angular");

    // 4) install bootstrap
    this.shell.exec("npm i bootstrap");

    this.shell.exec("npm i panel-seed-test --save-dev");

    // 5) add seed with schematics
    this.shell.exec(`ng g panel-seed-test/src/collection.json:panel-seed-template`);

    // 6) change outputPath in angular.json//
    // 7) install bootstrap dependency
    // 8) check if everything was created
  }

  addSchematics() {}
}

// const path = `./`;
const outputPath = `${__dirname}/../../../output`;
const projectName = "oscar";

const generatorAngular = new GenerateAngular(outputPath, projectName, shell);

generatorAngular.generateProject();
