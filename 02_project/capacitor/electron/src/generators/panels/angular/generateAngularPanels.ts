import { exec, execSync } from "child_process";

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
    console.log("starting");
    this._commandsToExec.push(`cd ${this._projectPath}`);

    if (await this.isAngularProjectInDirectory()) throw Error("Please delete angular folder in the destionation folder");

    this._commandsToExec.push(`ng new ${this._projectName} --routing --skip-tests --directory=angular --style=scss`);

    this._commandsToExec.push(`cd angular`);

    this._commandsToExec.push("npm i bootstrap");

    this.addSchematics();
    console.log("commands added");

    console.log("start commands exec");
    await this.runCommands();
    console.log("end commands exec");

    console.log("edit files");
    await this.editFile();
  }

  private addSchematics() {
    this._commandsToExec.push("npm i panel-seed-test --save-dev");
    this._commandsToExec.push(`ng g panel-seed-test/src/collection.json:panel-seed-template`);
  }

  async editFile() {
    const angularJsonFile = path.join(this._angularPath, "angular.json");

    const newFileData = await fs.readFile(angularJsonFile, "utf-8");

    const editedFileData = newFileData
      .replaceAll(/"outputPath": "[^"]*"/gm, '"outputPath": "./../webroot"')
      .replaceAll(/"scripts": \[((?:\s*"(?:[^"\\]|\\.)*"\s*,\s*)*|(?:\s*))\]/gm, '"scripts": ["node_modules/bootstrap/dist/js/bootstrap.js"]');

    return await fs.writeFile(angularJsonFile, editedFileData);
  }

  private runCommands() {
    const commands = this._commandsToExec.join("; ");

    const localNodeModulesPath = path.join(process.cwd(), "node_modules", "@angular", "cli", "bin");

    const env = { PATH: `${process.env.PATH}:/usr/local/bin:${localNodeModulesPath}` };
    // console.log(process.env.PATH);

    execSync(commands, { env });
  }

  private isAngularProjectInDirectory() {
    return fsextra.pathExists(this._angularPath);
  }
}
