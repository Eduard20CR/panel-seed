// import { exec } from "child_process";
// import { app } from "electron";
// import path from "path";
// import { ENV_PATHS, PACKAGE_PATH } from "../CONFIG/envShell";
// const fsextra = require("fs-extra");

// export class ReferencePackage {
//   private _packagesToDownload = ["@angular/cli"];
//   private _commandsToExec: string[] = [];
//   private _packagePath: string;

//   constructor() {
//     this._packagePath = PACKAGE_PATH;
//   }

//   generateProject() {
//     console.log("starting");
//     this._commandsToExec.push(`cd ${this._packagePath}`);

//     // if (await this.isAngularProjectInDirectory()) throw Error("Please delete angular folder in the destionation folder");

//     this._commandsToExec.push("npm init -y");
//     this._commandsToExec.push("npm i @angular/cli");

//     this.runCommands();
//     console.log("ended");
//   }

//   createFolder() {
//     fsextra.mkdirs(this._packagePath);
//   }

//   private async runCommands() {
//     const commands = this._commandsToExec.join("; ");
//     const env = {
//       PATH: ENV_PATHS,
//     };

//     console.log(this._packagePath);
//     return await new Promise<string>((resolve, reject) => {
//       const shell = exec(commands, { env }, (err) => {
//         console.log(err);
//         if (err) reject(err);
//         resolve("Done");
//       });
//       shell.stdout.on("data", function (data) {
//         console.log(data);
//       });
//     });
//   }
// }
