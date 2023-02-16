import { exec } from "child_process";

const path = require("path");
const fsextra = require("fs-extra");
const fs = require("fs/promises");

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

    // run all commands
    await this.runCommands();

    // change outputPath in angular.json
    // change scripts in angular.json
    await this.editFile();

    // check if everything was created
    console.log("Panel Generated");
  }

  addSchematics() {}

  async editFile() {
    const angularJsonFile = path.join(this._angularPath, "angular.json");

    const newFileData = await fs.readFile(angularJsonFile, "utf-8");

    const editedFileData = newFileData
      .replaceAll(/"outputPath": "[^"]*"/gm, '"outputPath": "./../webroot"')
      .replaceAll(/"scripts": \[((?:\s*"(?:[^"\\]|\\.)*"\s*,\s*)*|(?:\s*))\]/gm, '"scripts": ["node_modules/bootstrap/dist/js/bootstrap.js"]');

    return await fs.writeFile(angularJsonFile, editedFileData);
  }

  private runCommands() {
    return new Promise((res, err) => {
      const commands = this._commandsToExec.join("; ");
      exec(commands, (error) => {
        if (error) {
          return err(new Error("Something happened"));
        }
        res("Panel generated!");
      });
    });
  }

  private isAngularProjectInDirectory() {
    return fsextra.pathExists(this._angularPath);
  }
}
