const shell = require("shelljs");
const path = require("path");
const fsextra = require("fs-extra");

export class GenerateAngular {
  //   private _seedPanelFiles: string;

  constructor(private _projectPath: string, private _projectName: string, private shell: any) {}

  async generateProject() {
    // 1) go to folder
    this.shell.cd(this._projectPath);

    // 2) check if there is an angular project
    // ---> If exist => throw exeption
    try {
      const isAngularFolder = await fsextra.pathExists(path.join(this._projectPath, "angular"));
      if (isAngularFolder) throw Error("Please delete angular folder in the destionation folder");
    } catch (error) {
      throw error;
    }

    // 3) generate angular
    this.shell.exec(`ng new ${this._projectName} --routing true --style scss --skip-tests true --directory angular`);

    // 4) add seed with schematics
    this.shell.exec(`ng new ${this._projectName} --routing true --style scss --skip-tests true --directory angular`);

    // 5) change outputPath in angular.json
    // 6) install bootstrap dependency
    // 7) check if everything was created

    // this.shell.cd("angular");
  }

  addSchematics() {}
}

// const path = `./`;
const outputPath = `${__dirname}/../../../output`;
const projectName = "oscar";

const generatorAngular = new GenerateAngular(outputPath, projectName, shell);

generatorAngular.generateProject();
