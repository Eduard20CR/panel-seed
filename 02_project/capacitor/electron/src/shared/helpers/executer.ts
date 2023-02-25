import { exec } from "child_process";
import { EnvPathHandler } from "./envPathHandler";

export class Executer {
  constructor(private _EnvPathHandler: EnvPathHandler) {}

  async runCommands(commands: string) {
    this._EnvPathHandler.getPath();

    const env = {
      PATH: this._EnvPathHandler.getPath(),
    };

    return await new Promise<string>((resolve, reject) => {
      exec(commands, { env }, (err) => {
        if (err) reject(err);
        resolve("Done");
      });
    });
  }
}
