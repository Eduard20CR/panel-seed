import { exec } from "child_process";

const path = require("path");
const fsextra = require("fs-extra");

export class GenerateAngularPanels {
  private _commandsToExec: string[] = [];
  private _angularPath: string;
  constructor(private _projectPath: string, private _projectName: string) {
    this._angularPath = path.join(this._projectPath, "angular");
  }

  async generateProject() {
    // go to folder
    this._commandsToExec.push(`cd ${this._projectPath}`);

    // check if there is an angular project
    // ---> If exist => throw exeption
    console.log(await this.isAngularProjectInDirectory());
    if (await this.isAngularProjectInDirectory()) throw Error("Please delete angular folder in the destionation folder");

    // generate angular
    this._commandsToExec.push(`ng new ${this._projectName} --routing --skip-tests --directory=angular --style=scss`);

    // move to angular project
    this._commandsToExec.push(`cd angular`);

    // install bootstrap
    this._commandsToExec.push("npm i bootstrap");

    // install schematics library
    this._commandsToExec.push("npm i panel-seed-test --save-dev");

    // add seed with schematics
    this._commandsToExec.push(`ng g panel-seed-test/src/collection.json:panel-seed-template`);

    // change outputPath in angular.json
    this._commandsToExec.push(`sed -i '' 's/"outputPath": "[^"]*"/"outputPath": "\.\/\.\.\/webroot"/g' angular.json`);

    // change outputPath in angular.json
    this._commandsToExec.push(`sed -i '' 's/"scripts": \[[^"]*\]/"scripts": \["node_modules\/bootstrap\/dist\/js\/bootstrap.js"\]/g' angular.json`);

    // check if everything was created

    const terminal = exec(this._commandsToExec.join("; "));
    terminal.stdout.on("data", function (data) {
      console.log(data);
    });
  }

  addSchematics() {}

  private isAngularProjectInDirectory() {
    return fsextra.pathExists(this._angularPath);
  }
}
