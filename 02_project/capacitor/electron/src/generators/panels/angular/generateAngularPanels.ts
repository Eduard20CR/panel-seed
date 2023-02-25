#!/usr/bin/env node
import { exec } from "child_process";
import { ENV_PATHS } from "./../../../shared/CONFIG/envShell";

const path = require("path");
const fsextra = require("fs-extra");
const fs = require("fs/promises");

export class GenerateAngularPanels {
  private _commandsToExec: string[] = [];
  private _angularPath: string;

  constructor(private _projectPath: string, private _projectName: string, private _ENV_PATHS: string) {
    this._angularPath = path.join(this._projectPath, "angular");
  }

  async runProject() {
    console.log("starting");

    if (await this.projectAlreadyExists()) throw Error("Please delete angular folder in the destionation folder");

    this.addCommands();

    this.addSchematics();

    await this.runCommands();

    await this.editFiles();
    console.log("ended");
  }

  private addCommands() {
    this._commandsToExec.push(`cd ${this._projectPath}`);

    this._commandsToExec.push(`ng new ${this._projectName} --routing --skip-tests --directory=angular --style=scss`);

    this._commandsToExec.push(`cd angular`);

    this._commandsToExec.push("npm i bootstrap");
  }

  private addSchematics() {
    this._commandsToExec.push("npm i panel-seed-test --save-dev");
    this._commandsToExec.push(`ng g panel-seed-test/src/collection.json:panel-seed-template`);
  }

  private async editFiles() {
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
      PATH: this._ENV_PATHS,
    };
    return await new Promise<string>((resolve, reject) => {
      exec(commands, { env }, (err) => {
        if (err) reject(err);
        resolve("Done");
      });
    });
  }

  private projectAlreadyExists() {
    return fsextra.pathExists(this._angularPath);
  }
}
