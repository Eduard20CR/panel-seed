"use strict";
exports.__esModule = true;
exports.GenerateElectron = void 0;
var shell = require("shelljs");
var GenerateElectron = /** @class */ (function () {
    function GenerateElectron(_projectPath, _projectName, shell) {
        this._projectPath = _projectPath;
        this._projectName = _projectName;
        this.shell = shell;
    }
    GenerateElectron.prototype.generateAngularProject = function () {
        this.shell.cd(this._projectPath);
        this.shell.mkdir("capacitor");
        this.shell.cd("capacitor");
        this.shell.exec("npm init -y");
        this.shell.exec("npm i @capacitor/core");
        this.shell.exec("npm i -D @capacitor/cli");
        this.shell.exec("npx cap init test com.test.app --web-dir ./../webroot");
        this.shell.exec("npm i @capacitor-community/electron");
        this.shell.exec("npx cap add @capacitor-community/electron");
    };
    GenerateElectron.prototype.addSchematics = function () { };
    return GenerateElectron;
}());
exports.GenerateElectron = GenerateElectron;
var path = "".concat(__dirname, "/../");
var projectName = "oscar";
var generatorAngular = new GenerateElectron(path, projectName, shell);
generatorAngular.generateAngularProject();
