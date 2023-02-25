#!/usr/bin/env node
import { exec } from "child_process";
import { CapacitorPanelApp } from "../../apps/panels/app.capacitor.panels";

import { IGenerator } from "../../interfaces/generators/interface.IGenerator";
import { EnvPathHandler } from "../../shared/helpers/envPathHandler";
import { Executer } from "../../shared/helpers/executer";

const path = require("path");
const fsextra = require("fs-extra");
const fs = require("fs/promises");

export class GenerateCapacitorPanels implements IGenerator {
  _commandsToExec: string[] = [];

  constructor(private capacitorPanelApp: CapacitorPanelApp, public _executer: Executer) {}

  async runProject() {
    console.log("starting");

    if (await this.projectAlreadyExists()) throw Error("Please delete capacitor folder in the destionation folder");

    this.addCommands();
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
    this._commandsToExec.push(`cd ${this.capacitorPanelApp._projectPath}`);
    this._commandsToExec.push(`ng new ${this.capacitorPanelApp._projectName} --routing --skip-tests --directory=angular --style=scss`);
    this._commandsToExec.push(`cd angular`);
    this._commandsToExec.push("npm i bootstrap");
  }

  async editFiles() {
    return;
  }

  projectAlreadyExists(): boolean {
    const capacitorApp = path.join(this.capacitorPanelApp, "capacitor");
    return fsextra.pathExists(capacitorApp);
  }
}
