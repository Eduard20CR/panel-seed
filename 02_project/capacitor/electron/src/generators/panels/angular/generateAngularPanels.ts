#!/usr/bin/env node
import { exec, execSync } from "child_process";
import { app } from "electron";

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

    const ngBing = path.join("..", "node_modules", ".bin", "ng");

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

  private async runCommands() {
    const commands = this._commandsToExec.join("; ");

    const env = {
      PATH: `/Users/oscar.vasquez/.rvm/gems/ruby-2.7.6/bin:/Users/oscar.vasquez/.rvm/gems/ruby-2.7.6@global/bin:/Users/oscar.vasquez/.rvm/rubies/ruby-2.7.6/bin:/Users/oscar.vasquez/.nvm/versions/node/v16.15.0/bin:~/Applications/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/share/dotnet:~/.dotnet/tools:/Library/Apple/usr/bin:/Library/Frameworks/Mono.framework/Versions/Current/Commands:/Users/oscar.vasquez/.rvm/bin`,
    };

    execSync(commands, { env });
  }

  private isAngularProjectInDirectory() {
    return fsextra.pathExists(this._angularPath);
  }
}
