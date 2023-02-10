"use strict";
exports.__esModule = true;
exports.GenerateAngular = void 0;
var shell = require("shelljs");
var GenerateAngular = /** @class */ (function () {
    function GenerateAngular(_projectPath, _projectName, shell) {
        this._projectPath = _projectPath;
        this._projectName = _projectName;
        this.shell = shell;
    }
    GenerateAngular.prototype.generateAngularProject = function () {
        this.shell.cd(this._projectPath);
        this.shell.exec("ng new ".concat(this._projectName, " --routing true --style scss --skip-tests true --directory angular"));
        this.shell.cd("angular");
        this.shell.exec("pwd");
    };
    GenerateAngular.prototype.addSchematics = function () { };
    return GenerateAngular;
}());
exports.GenerateAngular = GenerateAngular;
var path = "".concat(__dirname, "/../");
var projectName = "oscar";
var generatorAngular = new GenerateAngular(path, projectName, shell);
generatorAngular.generateAngularProject();
