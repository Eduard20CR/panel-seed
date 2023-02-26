#!/usr/bin/env node
import { AngularPanelApp } from "../../models/panels/model.angular.panels";
import { IGenerator } from "../../interfaces/generators/interface.IGenerator";
import { Executer } from "../../helpers/executer";

const path = require("path");
const fsextra = require("fs-extra");
const fs = require("fs/promises");

export class GenerateAngularPanels implements IGenerator {
  _commandsToExec: string[] = [];

  constructor(private angularPanelApp: AngularPanelApp, public _executer: Executer) {}

  async runProject() {
    console.log("starting");

    if (await this.projectAlreadyExists()) throw Error("Please delete angular folder in the destionation folder");

    this.addCommands();
    this.addSchematicsCommands();
    await this.runCommands();
    await this.editFiles();

    if (!(await this.projectAlreadyExists())) throw Error("App was not created");

    console.log("ended");
  }

  async runCommands() {
    const commands = this._commandsToExec.join("; ");
    await this._executer.runCommands(commands);

    return;
  }

  addCommands() {
    this._commandsToExec.push(`cd ${this.angularPanelApp.projectPath}`);
    this._commandsToExec.push(
      `ng new ${this.angularPanelApp.projectName} --routing --skip-tests --directory=angular --style=scss`
    );
    this._commandsToExec.push(`cd angular`);
    this._commandsToExec.push("npm i bootstrap");
  }

  addSchematicsCommands() {
    this._commandsToExec.push("npm i panel-seed-test --save-dev");
    this._commandsToExec.push(`ng g panel-seed-test/src/collection.json:panel-seed-template`);
  }

  async editFiles() {
    const angularJsonFile = path.join(this.angularPanelApp.angularPath, "angular.json");
    const newFileData = await fs.readFile(angularJsonFile, "utf-8");

    const editedFileData = newFileData
      .replaceAll(/"outputPath": "[^"]*"/gm, '"outputPath": "./../webroot"')
      .replaceAll(
        /"scripts": \[((?:\s*"(?:[^"\\]|\\.)*"\s*,\s*)*|(?:\s*))\]/gm,
        '"scripts": ["node_modules/bootstrap/dist/js/bootstrap.js"]'
      );

    await fs.writeFile(angularJsonFile, editedFileData);

    return;
  }

  projectAlreadyExists(): boolean {
    return fsextra.pathExists(this.angularPanelApp.angularPath);
  }
}
